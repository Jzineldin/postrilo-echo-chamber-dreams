
import { OAuthService } from '../oauth/OAuthService';
import { TwitterAPIService } from '../platforms/TwitterAPIService';
import { LinkedInAPIService } from '../platforms/LinkedInAPIService';
import { SocialMediaPost } from './types';
import { ConnectionManager } from './connectionManager';
import { ContentValidator } from './contentValidator';

export class ContentPoster {
  static async postContent(post: SocialMediaPost): Promise<{ success: boolean; postId?: string; error?: string }> {
    try {
      const connection = ConnectionManager.getStoredConnection(post.platform);
      if (!connection || !connection.isConnected || !connection.tokens) {
        return { success: false, error: `${post.platform} is not connected` };
      }

      // Validate content length for platform
      const validation = ContentValidator.validateContentForPlatform(post.content, post.platform);
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      // Refresh token if needed
      if (connection.tokens.expiresAt && new Date() > connection.tokens.expiresAt) {
        if (connection.tokens.refreshToken && connection.clientId && connection.clientSecret) {
          connection.tokens = await OAuthService.refreshAccessToken(
            post.platform,
            connection.tokens.refreshToken,
            connection.clientId,
            connection.clientSecret
          );
          ConnectionManager.saveConnection(post.platform, connection);
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
}
