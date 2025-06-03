
export interface PlatformConstraints {
  maxCharacters: number;
  maxHashtags: number;
  supportsEmojis: boolean;
  supportsImages: boolean;
  supportsVideo: boolean;
  shortFormOnly: boolean;
  region?: 'global' | 'nordic';
  culturalNotes?: string;
}

export interface PlatformSuggestion {
  platform: string;
  suggestions: string[];
}

export class PlatformValidationService {
  private static platformConstraints: Record<string, PlatformConstraints> = {
    // Global Platforms
    'facebook': {
      maxCharacters: 63206,
      maxHashtags: 10,
      supportsEmojis: true,
      supportsImages: true,
      supportsVideo: true,
      shortFormOnly: false,
      region: 'global'
    },
    'instagram': {
      maxCharacters: 2200,
      maxHashtags: 30,
      supportsEmojis: true,
      supportsImages: true,
      supportsVideo: true,
      shortFormOnly: false,
      region: 'global'
    },
    'twitter': {
      maxCharacters: 280,
      maxHashtags: 2,
      supportsEmojis: true,
      supportsImages: true,
      supportsVideo: true,
      shortFormOnly: true,
      region: 'global'
    },
    'linkedin': {
      maxCharacters: 3000,
      maxHashtags: 5,
      supportsEmojis: false,
      supportsImages: true,
      supportsVideo: true,
      shortFormOnly: false,
      region: 'global'
    },
    'tiktok': {
      maxCharacters: 2200,
      maxHashtags: 20,
      supportsEmojis: true,
      supportsImages: false,
      supportsVideo: true,
      shortFormOnly: false,
      region: 'global'
    },
    'pinterest': {
      maxCharacters: 500,
      maxHashtags: 20,
      supportsEmojis: true,
      supportsImages: true,
      supportsVideo: true,
      shortFormOnly: true,
      region: 'global'
    },
    'youtube': {
      maxCharacters: 5000,
      maxHashtags: 15,
      supportsEmojis: true,
      supportsImages: true,
      supportsVideo: true,
      shortFormOnly: false,
      region: 'global'
    },
    'reddit': {
      maxCharacters: 40000,
      maxHashtags: 0,
      supportsEmojis: true,
      supportsImages: true,
      supportsVideo: true,
      shortFormOnly: false,
      region: 'global'
    },
    
    // Nordic-Specific Platforms
    'jodel': {
      maxCharacters: 200,
      maxHashtags: 0,
      supportsEmojis: true,
      supportsImages: true,
      supportsVideo: false,
      shortFormOnly: true,
      region: 'nordic',
      culturalNotes: 'Anonymous community platform popular in Nordic countries. Focus on local, community-oriented content.'
    },
    'researchgate': {
      maxCharacters: 1000,
      maxHashtags: 5,
      supportsEmojis: false,
      supportsImages: true,
      supportsVideo: false,
      shortFormOnly: false,
      region: 'nordic',
      culturalNotes: 'Academic platform popular in Nordic research communities. Maintain professional, research-focused tone.'
    }
  };

  private static platformSuggestions: Record<string, string[]> = {
    'facebook': [
      'Use storytelling to engage your community',
      'Ask questions to encourage comments',
      'Share behind-the-scenes content',
      'Create posts that are shareable'
    ],
    'instagram': [
      'Start with a compelling first line',
      'Use 5-15 relevant hashtags',
      'Include emojis for visual appeal',
      'End with a call-to-action'
    ],
    'twitter': [
      'Keep it under 280 characters',
      'Use 1-2 strategic hashtags',
      'Include relevant mentions',
      'Create conversation starters'
    ],
    'linkedin': [
      'Focus on professional value',
      'Share industry insights',
      'Use minimal hashtags (2-3)',
      'Include data or research when possible'
    ],
    'tiktok': [
      'Hook viewers in first 3 seconds',
      'Use trendy language and references',
      'Keep it authentic and relatable',
      'Include popular hashtags'
    ],
    'pinterest': [
      'Use keyword-rich descriptions',
      'Create inspirational content',
      'Include clear value propositions',
      'Optimize for search discovery'
    ],
    'youtube': [
      'Write detailed descriptions',
      'Include timestamps for longer videos',
      'Use relevant keywords',
      'Add subscribe call-to-action'
    ],
    'reddit': [
      'Be authentic and helpful',
      'Follow community rules',
      'Engage in discussions',
      'Provide value before promoting'
    ],
    'jodel': [
      'Keep content locally relevant',
      'Use anonymous community style',
      'Reference Nordic cultural elements',
      'Focus on authentic community engagement'
    ],
    'researchgate': [
      'Maintain academic credibility',
      'Include research citations when relevant',
      'Focus on scientific value',
      'Connect with Nordic research communities'
    ]
  };

  static getConstraints(platform: string): PlatformConstraints | null {
    return this.platformConstraints[platform] || null;
  }

  static getSuggestions(platform: string): string[] {
    return this.platformSuggestions[platform] || [];
  }

  static validateContent(content: string, platform: string): {
    isValid: boolean;
    warnings: string[];
    characterCount: number;
    maxCharacters: number;
  } {
    const constraints = this.getConstraints(platform);
    if (!constraints) {
      return {
        isValid: true,
        warnings: ['Platform not recognized'],
        characterCount: content.length,
        maxCharacters: 0
      };
    }

    const warnings: string[] = [];
    const characterCount = content.length;

    if (characterCount > constraints.maxCharacters) {
      warnings.push(`Content exceeds ${platform} character limit (${characterCount}/${constraints.maxCharacters})`);
    }

    // Check hashtag count
    const hashtagCount = (content.match(/#\w+/g) || []).length;
    if (hashtagCount > constraints.maxHashtags) {
      warnings.push(`Too many hashtags for ${platform} (${hashtagCount}/${constraints.maxHashtags})`);
    }

    // Platform-specific warnings
    if (platform === 'linkedin' && content.includes('🔥')) {
      warnings.push('Consider using more professional emojis for LinkedIn');
    }

    if (platform === 'jodel' && !constraints.supportsVideo && content.toLowerCase().includes('video')) {
      warnings.push('Jodel does not support video content');
    }

    return {
      isValid: warnings.length === 0 || characterCount <= constraints.maxCharacters,
      warnings,
      characterCount,
      maxCharacters: constraints.maxCharacters
    };
  }

  static getAllPlatforms(): Array<{value: string, label: string, region: string}> {
    return Object.entries(this.platformConstraints).map(([key, constraints]) => ({
      value: key,
      label: this.formatPlatformName(key),
      region: constraints.region || 'global'
    }));
  }

  static getNordicPlatforms(): Array<{value: string, label: string}> {
    return Object.entries(this.platformConstraints)
      .filter(([_, constraints]) => constraints.region === 'nordic')
      .map(([key, _]) => ({
        value: key,
        label: this.formatPlatformName(key)
      }));
  }

  private static formatPlatformName(platform: string): string {
    const names: Record<string, string> = {
      'facebook': 'Facebook',
      'instagram': 'Instagram',
      'twitter': 'Twitter/X',
      'linkedin': 'LinkedIn',
      'tiktok': 'TikTok',
      'pinterest': 'Pinterest',
      'youtube': 'YouTube',
      'reddit': 'Reddit',
      'jodel': 'Jodel',
      'researchgate': 'ResearchGate'
    };
    return names[platform] || platform.charAt(0).toUpperCase() + platform.slice(1);
  }
}

export const platformValidationService = new PlatformValidationService();
