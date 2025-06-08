
import { ConnectionManager } from './social/connectionManager';
import { ContentPoster } from './social/contentPoster';
import { ContentValidator } from './social/contentValidator';

// Re-export types for backward compatibility
export type { SocialMediaPost, SocialMediaConnection, PlatformCredentials } from './social/types';

export class SocialMediaService {
  // OAuth management
  static async initiateOAuth(platform: string, credentials: import('./social/types').PlatformCredentials) {
    return ConnectionManager.initiateOAuth(platform, credentials);
  }

  static async handleOAuthCallback(
    platform: string, 
    code: string, 
    state: string, 
    credentials: import('./social/types').PlatformCredentials
  ) {
    return ConnectionManager.handleOAuthCallback(platform, code, state, credentials);
  }

  // User profile management
  static async getUserProfile(platform: string, tokens: import('./oauth/OAuthService').OAuthTokens) {
    return ConnectionManager.getUserProfile(platform, tokens);
  }

  // Connection testing
  static async testConnection(platform: string) {
    return ConnectionManager.testConnection(platform);
  }

  // Content posting
  static async postContent(post: import('./social/types').SocialMediaPost) {
    return ContentPoster.postContent(post);
  }

  // Connection storage
  static getStoredConnection(platform: string) {
    return ConnectionManager.getStoredConnection(platform);
  }

  static saveConnection(platform: string, connection: import('./social/types').SocialMediaConnection) {
    return ConnectionManager.saveConnection(platform, connection);
  }

  static disconnectPlatform(platform: string) {
    return ConnectionManager.disconnectPlatform(platform);
  }

  static getAllConnections() {
    return ConnectionManager.getAllConnections();
  }

  // API configuration
  static async configureAPI(platform: string, credentials: import('./social/types').PlatformCredentials) {
    return ConnectionManager.configureAPI(platform, credentials);
  }

  // Content validation
  static validateContentForPlatform(content: string, platform: string) {
    return ContentValidator.validateContentForPlatform(content, platform);
  }
}

export const socialMediaService = new SocialMediaService();
