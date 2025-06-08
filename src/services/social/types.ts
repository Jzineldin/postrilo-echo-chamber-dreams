
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
  tokens?: import('../oauth/OAuthService').OAuthTokens;
  lastSync?: Date;
  clientId?: string;
  clientSecret?: string;
}

export interface PlatformCredentials {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}
