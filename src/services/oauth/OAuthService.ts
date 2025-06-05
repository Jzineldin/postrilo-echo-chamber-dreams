
export interface OAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scope: string[];
  authUrl: string;
  tokenUrl: string;
}

export interface OAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  tokenType?: string;
}

export interface OAuthUser {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  profileImage?: string;
}

export class OAuthService {
  private static readonly OAUTH_CONFIGS: Record<string, Partial<OAuthConfig>> = {
    twitter: {
      authUrl: 'https://twitter.com/i/oauth2/authorize',
      tokenUrl: 'https://api.twitter.com/2/oauth2/token',
      scope: ['tweet.read', 'tweet.write', 'users.read']
    },
    facebook: {
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
      tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
      scope: ['pages_manage_posts', 'pages_read_engagement']
    },
    instagram: {
      authUrl: 'https://api.instagram.com/oauth/authorize',
      tokenUrl: 'https://api.instagram.com/oauth/access_token',
      scope: ['user_profile', 'user_media']
    },
    linkedin: {
      authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
      tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
      scope: ['w_member_social', 'r_liteprofile']
    }
  };

  static generateAuthUrl(platform: string, clientId: string, redirectUri: string, state: string): string {
    const config = this.OAUTH_CONFIGS[platform];
    if (!config) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: config.scope?.join(' ') || '',
      response_type: 'code',
      state: state
    });

    return `${config.authUrl}?${params.toString()}`;
  }

  static async exchangeCodeForTokens(
    platform: string,
    code: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string
  ): Promise<OAuthTokens> {
    const config = this.OAUTH_CONFIGS[platform];
    if (!config) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: code
    });

    const response = await fetch(config.tokenUrl!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: params.toString()
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    const data = await response.json();
    
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1000) : undefined,
      tokenType: data.token_type || 'Bearer'
    };
  }

  static async refreshAccessToken(
    platform: string,
    refreshToken: string,
    clientId: string,
    clientSecret: string
  ): Promise<OAuthTokens> {
    const config = this.OAUTH_CONFIGS[platform];
    if (!config) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret
    });

    const response = await fetch(config.tokenUrl!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: params.toString()
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || refreshToken,
      expiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1000) : undefined,
      tokenType: data.token_type || 'Bearer'
    };
  }

  static generateStateParameter(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  static validateState(receivedState: string, expectedState: string): boolean {
    return receivedState === expectedState;
  }
}
