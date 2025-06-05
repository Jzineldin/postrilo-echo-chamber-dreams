
import { OAuthTokens } from '../oauth/OAuthService';

export interface LinkedInPost {
  text: string;
  visibility: 'PUBLIC' | 'CONNECTIONS' | 'LOGGED_IN_MEMBERS';
  mediaUrls?: string[];
  articleUrl?: string;
}

export interface LinkedInUser {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  headline?: string;
}

export class LinkedInAPIService {
  private static readonly BASE_URL = 'https://api.linkedin.com/v2';

  static async postUpdate(tokens: OAuthTokens, post: LinkedInPost): Promise<{ id: string }> {
    // First get the user's profile to get their URN
    const userProfile = await this.getUser(tokens);
    
    const shareContent = {
      author: `urn:li:person:${userProfile.id}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: post.text
          },
          shareMediaCategory: post.mediaUrls ? 'IMAGE' : 'NONE',
          media: post.mediaUrls ? post.mediaUrls.map(url => ({
            status: 'READY',
            media: url
          })) : undefined
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': post.visibility
      }
    };

    const response = await fetch(`${this.BASE_URL}/ugcPosts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(shareContent)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to post LinkedIn update: ${error}`);
    }

    const data = await response.json();
    return { id: data.id };
  }

  static async getUser(tokens: OAuthTokens): Promise<LinkedInUser> {
    const response = await fetch(`${this.BASE_URL}/people/~:(id,firstName,lastName,profilePicture(displayImage~:playableStreams),headline)`, {
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get LinkedIn user: ${error}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      firstName: data.firstName.localized.en_US,
      lastName: data.lastName.localized.en_US,
      profilePicture: data.profilePicture?.displayImage?.elements?.[0]?.identifiers?.[0]?.identifier,
      headline: data.headline?.localized?.en_US
    };
  }

  static validateContentLength(text: string): { isValid: boolean; length: number; maxLength: number } {
    const maxLength = 1300;
    return {
      isValid: text.length <= maxLength,
      length: text.length,
      maxLength
    };
  }
}
