
import { OAuthService, OAuthTokens } from '../oauth/OAuthService';
import { TwitterAPIService } from '../platforms/TwitterAPIService';
import { LinkedInAPIService } from '../platforms/LinkedInAPIService';
import { SocialMediaConnection, PlatformCredentials } from './types';

export class ConnectionManager {
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
