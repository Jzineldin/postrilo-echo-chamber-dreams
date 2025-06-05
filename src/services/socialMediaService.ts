
import { OAuthService, OAuthTokens } from './oauth/OAuthService';
import { TwitterAPIService } from './platforms/TwitterAPIService';
import { LinkedInAPIService } from './platforms/LinkedInAPIService';

export interface SocialMediaPost {
  platform: string;
  content: string;
  scheduledAt?: Date;
  status: 'draft' | 'scheduled' | 'posted' | 'failed';
  mediaUrls?: string[];
  hashtags?: string[];
}

export interface SocialMediaConnection {
  platform: string;
  isConnected: boolean;
  username?: string;
  displayName?: string;
  profileImage?: string;
  tokens?: OAuthTokens;
  lastSync?: Date;
  clientId?: string;
  clientSecret?: string;
}

export interface PlatformCredentials {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export class SocialMediaService {
  private static readonly SUPPORTED_PLATFORMS = [
    'twitter', 'instagram', 'facebook', 'linkedin', 'tiktok', 'youtube'
  ];

  static async initiateOAuth(platform: string, credentials: PlatformCredentials): Promise<{ authUrl: string; state: string }> {
    if (!this.SUPPORTED_PLATFORMS.includes(platform)) {
      throw new Error(`Platform ${platform} is not supported`);
    }

    const state = OAuthService.generateStateParameter();
    const authUrl = OAuthService.generateAuthUrl(platform, credentials.clientId, credentials.redirectUri, state);
    
    // Store state for validation
    sessionStorage.setItem(`oauth_state_${platform}`, state);
    
    return { authUrl, state };
  }

  static async handleOAuthCallback(
    platform: string, 
    code: string, 
    state: string, 
    credentials: PlatformCredentials
  ): Promise<SocialMediaConnection> {
    // Validate state
    const expectedState = sessionStorage.getItem(`oauth_state_${platform}`);
    if (!expectedState || !OAuthService.validateState(state, expectedState)) {
      throw new Error('Invalid OAuth state parameter');
    }

    // Exchange code for tokens
    const tokens = await OAuthService.exchangeCodeForTokens(
      platform,
      code,
      credentials.clientId,
      credentials.clientSecret,
      credentials.redirectUri
    );

    // Get user profile
    const userProfile = await this.getUserProfile(platform, tokens);

    const connection: SocialMediaConnection = {
      platform,
      isConnected: true,
      username: userProfile.username,
      displayName: userProfile.displayName,
      profileImage: userProfile.profileImage,
      tokens,
      lastSync: new Date(),
      clientId: credentials.clientId,
      clientSecret: credentials.clientSecret
    };

    // Store connection
    this.saveConnection(platform, connection);
    
    // Clean up state
    sessionStorage.removeItem(`oauth_state_${platform}`);
    
    return connection;
  }

  static async getUserProfile(platform: string, tokens: OAuthTokens): Promise<{ username: string; displayName: string; profileImage?: string }> {
    switch (platform) {
      case 'twitter':
        const twitterUser = await TwitterAPIService.getUser(tokens);
        return {
          username: twitterUser.username,
          displayName: twitterUser.name,
          profileImage: twitterUser.profileImageUrl
        };
      
      case 'linkedin':
        const linkedinUser = await LinkedInAPIService.getUser(tokens);
        return {
          username: `${linkedinUser.firstName} ${linkedinUser.lastName}`,
          displayName: `${linkedinUser.firstName} ${linkedinUser.lastName}`,
          profileImage: linkedinUser.profilePicture
        };
      
      default:
        throw new Error(`User profile retrieval not implemented for ${platform}`);
    }
  }

  static async testConnection(platform: string): Promise<{ success: boolean; error?: string }> {
    try {
      const connection = this.getStoredConnection(platform);
      if (!connection || !connection.isConnected || !connection.tokens) {
        return { success: false, error: `${platform} is not connected` };
      }

      // Check if token is expired and refresh if needed
      if (connection.tokens.expiresAt && new Date() > connection.tokens.expiresAt) {
        if (connection.tokens.refreshToken && connection.clientId && connection.clientSecret) {
          try {
            const newTokens = await OAuthService.refreshAccessToken(
              platform,
              connection.tokens.refreshToken,
              connection.clientId,
              connection.clientSecret
            );
            connection.tokens = newTokens;
            this.saveConnection(platform, connection);
          } catch (error) {
            return { success: false, error: `Token refresh failed: ${error}` };
          }
        } else {
          return { success: false, error: `${platform} connection has expired and cannot be refreshed` };
        }
      }

      // Test the connection by fetching user profile
      await this.getUserProfile(platform, connection.tokens);
      return { success: true };

    } catch (error) {
      console.error(`Error testing ${platform} connection:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown connection error' 
      };
    }
  }

  static async postContent(post: SocialMediaPost): Promise<{ success: boolean; postId?: string; error?: string }> {
    try {
      const connection = this.getStoredConnection(post.platform);
      if (!connection || !connection.isConnected || !connection.tokens) {
        return { success: false, error: `${post.platform} is not connected` };
      }

      // Validate content length for platform
      const validation = this.validateContentForPlatform(post.content, post.platform);
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      // Refresh token if needed
      if (connection.tokens.expiresAt && new Date() > connection.tokens.expiresAt) {
        if (connection.tokens.refreshToken && connection.clientId && connection.clientSecret) {
          connection.tokens = await OAuthService.refreshAccessToken(
            platform,
            connection.tokens.refreshToken,
            connection.clientId,
            connection.clientSecret
          );
          this.saveConnection(post.platform, connection);
        } else {
          return { success: false, error: 'Access token expired and cannot be refreshed' };
        }
      }

      // Post to the specific platform
      let result;
      switch (post.platform) {
        case 'twitter':
          result = await TwitterAPIService.postTweet(connection.tokens, {
            text: post.content,
            mediaIds: post.mediaUrls
          });
          return { success: true, postId: result.id };
        
        case 'linkedin':
          result = await LinkedInAPIService.postUpdate(connection.tokens, {
            text: post.content,
            visibility: 'PUBLIC',
            mediaUrls: post.mediaUrls
          });
          return { success: true, postId: result.id };
        
        default:
          // For platforms not yet implemented, fall back to composer
          return this.openPlatformComposer(post);
      }
    } catch (error) {
      console.error(`Error posting to ${post.platform}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to post content' 
      };
    }
  }

  private static openPlatformComposer(post: SocialMediaPost): { success: boolean; postId?: string; error?: string } {
    const encodedContent = encodeURIComponent(post.content);
    let url = '';

    switch (post.platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedContent}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?quote=${encodedContent}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedContent}`;
        break;
      default:
        return { success: false, error: `Composer not available for ${post.platform}` };
    }

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
      return { success: true, postId: 'composer-opened' };
    } catch (error) {
      return { success: false, error: 'Failed to open composer' };
    }
  }

  private static validateContentForPlatform(content: string, platform: string): { isValid: boolean; error?: string } {
    switch (platform) {
      case 'twitter':
        const twitterValidation = TwitterAPIService.validateContentLength(content);
        return {
          isValid: twitterValidation.isValid,
          error: twitterValidation.isValid ? undefined : `Content exceeds Twitter's ${twitterValidation.maxLength} character limit`
        };
      
      case 'linkedin':
        const linkedinValidation = LinkedInAPIService.validateContentLength(content);
        return {
          isValid: linkedinValidation.isValid,
          error: linkedinValidation.isValid ? undefined : `Content exceeds LinkedIn's ${linkedinValidation.maxLength} character limit`
        };
      
      default:
        return { isValid: true };
    }
  }

  static getStoredConnection(platform: string): SocialMediaConnection | null {
    try {
      const stored = localStorage.getItem(`social-connection-${platform}`);
      if (!stored) return null;
      
      const connection = JSON.parse(stored);
      
      // Parse dates
      if (connection.tokens?.expiresAt) {
        connection.tokens.expiresAt = new Date(connection.tokens.expiresAt);
      }
      if (connection.lastSync) {
        connection.lastSync = new Date(connection.lastSync);
      }
      
      return connection;
    } catch (error) {
      console.error(`Error loading ${platform} connection:`, error);
      return null;
    }
  }

  static saveConnection(platform: string, connection: SocialMediaConnection): void {
    try {
      localStorage.setItem(`social-connection-${platform}`, JSON.stringify(connection));
    } catch (error) {
      console.error(`Error saving ${platform} connection:`, error);
    }
  }

  static disconnectPlatform(platform: string): void {
    try {
      localStorage.removeItem(`social-connection-${platform}`);
    } catch (error) {
      console.error(`Error disconnecting ${platform}:`, error);
    }
  }

  static getAllConnections(): SocialMediaConnection[] {
    return this.SUPPORTED_PLATFORMS.map(platform => 
      this.getStoredConnection(platform) || {
        platform,
        isConnected: false
      }
    );
  }

  static async configureAPI(platform: string, credentials: PlatformCredentials): Promise<{ success: boolean; error?: string }> {
    try {
      const connection = this.getStoredConnection(platform) || {
        platform,
        isConnected: false
      };

      connection.clientId = credentials.clientId;
      connection.clientSecret = credentials.clientSecret;
      
      this.saveConnection(platform, connection);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to configure API' 
      };
    }
  }
}

export const socialMediaService = new SocialMediaService();
