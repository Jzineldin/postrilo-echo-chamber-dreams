import { useToast } from "@/hooks/use-toast";

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
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  apiConfig?: {
    clientId?: string;
    clientSecret?: string;
    redirectUri?: string;
  };
}

export class SocialMediaService {
  private static readonly SUPPORTED_PLATFORMS = [
    'twitter', 'instagram', 'facebook', 'linkedin', 'tiktok', 'youtube'
  ];

  static async connectPlatform(platform: string, credentials: any): Promise<{ success: boolean; error?: string }> {
    try {
      console.log(`🔗 Connecting to ${platform}...`);
      
      // Validate platform
      if (!this.SUPPORTED_PLATFORMS.includes(platform)) {
        return { success: false, error: `Platform ${platform} is not supported` };
      }

      // Simulate OAuth flow for demo purposes
      const connection: SocialMediaConnection = {
        platform,
        isConnected: true,
        username: credentials.username,
        accessToken: 'demo_token_' + Date.now(),
        expiresAt: new Date(Date.now() + 3600000) // 1 hour from now
      };

      // Store connection
      this.saveConnection(platform, connection);
      
      console.log(`✅ Successfully connected to ${platform}`);
      return { success: true };

    } catch (error) {
      console.error(`❌ Failed to connect to ${platform}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Connection failed' 
      };
    }
  }

  static async testConnection(platform: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Check if platform is supported
      if (!this.SUPPORTED_PLATFORMS.includes(platform)) {
        return { success: false, error: `Platform ${platform} is not supported` };
      }

      // Check for stored credentials
      const connection = this.getStoredConnection(platform);
      if (!connection || !connection.isConnected) {
        return { success: false, error: `${platform} is not connected` };
      }

      // Check if token is expired
      if (connection.expiresAt && new Date() > connection.expiresAt) {
        return { success: false, error: `${platform} connection has expired` };
      }

      // Test the connection based on platform
      switch (platform) {
        case 'twitter':
          return await this.testTwitterConnection(connection);
        case 'instagram':
          return await this.testInstagramConnection(connection);
        case 'facebook':
          return await this.testFacebookConnection(connection);
        case 'linkedin':
          return await this.testLinkedInConnection(connection);
        default:
          return { success: true }; // Default to success for demo
      }
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
      if (!connection || !connection.isConnected) {
        return { success: false, error: `${post.platform} is not connected` };
      }

      // Validate content length for platform
      const validation = this.validateContentForPlatform(post.content, post.platform);
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      // Post to the specific platform
      switch (post.platform) {
        case 'twitter':
          return await this.postToTwitter(post, connection);
        case 'instagram':
          return await this.postToInstagram(post, connection);
        case 'facebook':
          return await this.postToFacebook(post, connection);
        case 'linkedin':
          return await this.postToLinkedIn(post, connection);
        default:
          // For now, open composer in browser as fallback
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

  private static async testTwitterConnection(connection: SocialMediaConnection): Promise<{ success: boolean; error?: string }> {
    // Simulate Twitter API test call
    try {
      // In a real implementation, this would make an API call to Twitter
      if (connection.accessToken) {
        return { success: true };
      }
      return { success: false, error: 'Invalid Twitter credentials' };
    } catch (error) {
      return { success: false, error: 'Twitter connection failed' };
    }
  }

  private static async testInstagramConnection(connection: SocialMediaConnection): Promise<{ success: boolean; error?: string }> {
    try {
      if (connection.accessToken) {
        return { success: true };
      }
      return { success: false, error: 'Invalid Instagram credentials' };
    } catch (error) {
      return { success: false, error: 'Instagram connection failed' };
    }
  }

  private static async testFacebookConnection(connection: SocialMediaConnection): Promise<{ success: boolean; error?: string }> {
    try {
      if (connection.accessToken) {
        return { success: true };
      }
      return { success: false, error: 'Invalid Facebook credentials' };
    } catch (error) {
      return { success: false, error: 'Facebook connection failed' };
    }
  }

  private static async testLinkedInConnection(connection: SocialMediaConnection): Promise<{ success: boolean; error?: string }> {
    try {
      if (connection.accessToken) {
        return { success: true };
      }
      return { success: false, error: 'Invalid LinkedIn credentials' };
    } catch (error) {
      return { success: false, error: 'LinkedIn connection failed' };
    }
  }

  private static async postToTwitter(post: SocialMediaPost, connection: SocialMediaConnection): Promise<{ success: boolean; postId?: string; error?: string }> {
    // For now, use the composer approach until Twitter API is fully integrated
    return this.openPlatformComposer(post);
  }

  private static async postToInstagram(post: SocialMediaPost, connection: SocialMediaConnection): Promise<{ success: boolean; postId?: string; error?: string }> {
    return { success: false, error: 'Instagram direct posting requires media files and is not yet implemented' };
  }

  private static async postToFacebook(post: SocialMediaPost, connection: SocialMediaConnection): Promise<{ success: boolean; postId?: string; error?: string }> {
    return this.openPlatformComposer(post);
  }

  private static async postToLinkedIn(post: SocialMediaPost, connection: SocialMediaConnection): Promise<{ success: boolean; postId?: string; error?: string }> {
    return this.openPlatformComposer(post);
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
    const limits = {
      twitter: 280,
      instagram: 2200,
      facebook: 63206,
      linkedin: 1300,
      tiktok: 150,
      youtube: 5000
    };

    const limit = limits[platform as keyof typeof limits];
    if (limit && content.length > limit) {
      return { 
        isValid: false, 
        error: `Content exceeds ${platform} character limit of ${limit}` 
      };
    }

    return { isValid: true };
  }

  static getStoredConnection(platform: string): SocialMediaConnection | null {
    try {
      const stored = localStorage.getItem(`social-connection-${platform}`);
      return stored ? JSON.parse(stored) : null;
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

  static async configureAPI(platform: string, config: any): Promise<{ success: boolean; error?: string }> {
    try {
      const connection = this.getStoredConnection(platform) || {
        platform,
        isConnected: false
      };

      connection.apiConfig = config;
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
