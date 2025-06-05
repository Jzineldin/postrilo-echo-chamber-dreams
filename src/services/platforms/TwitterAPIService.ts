
import { OAuthTokens } from '../oauth/OAuthService';

export interface TwitterPost {
  text: string;
  mediaIds?: string[];
  pollOptions?: string[];
  replyToTweetId?: string;
}

export interface TwitterUser {
  id: string;
  username: string;
  name: string;
  profileImageUrl?: string;
  verified?: boolean;
}

export class TwitterAPIService {
  private static readonly BASE_URL = 'https://api.twitter.com/2';

  static async postTweet(tokens: OAuthTokens, post: TwitterPost): Promise<{ id: string; text: string }> {
    const response = await fetch(`${this.BASE_URL}/tweets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: post.text,
        media: post.mediaIds ? { media_ids: post.mediaIds } : undefined,
        poll: post.pollOptions ? { options: post.pollOptions, duration_minutes: 1440 } : undefined,
        reply: post.replyToTweetId ? { in_reply_to_tweet_id: post.replyToTweetId } : undefined
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to post tweet: ${error}`);
    }

    const data = await response.json();
    return data.data;
  }

  static async getUser(tokens: OAuthTokens): Promise<TwitterUser> {
    const response = await fetch(`${this.BASE_URL}/users/me?user.fields=profile_image_url,verified`, {
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get user: ${error}`);
    }

    const data = await response.json();
    return {
      id: data.data.id,
      username: data.data.username,
      name: data.data.name,
      profileImageUrl: data.data.profile_image_url,
      verified: data.data.verified
    };
  }

  static async deletePost(tokens: OAuthTokens, tweetId: string): Promise<boolean> {
    const response = await fetch(`${this.BASE_URL}/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to delete tweet: ${error}`);
    }

    const data = await response.json();
    return data.data.deleted;
  }

  static validateContentLength(text: string): { isValid: boolean; length: number; maxLength: number } {
    const maxLength = 280;
    return {
      isValid: text.length <= maxLength,
      length: text.length,
      maxLength
    };
  }
}
