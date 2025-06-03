
export interface PlatformConstraints {
  charLimit: number;
  hashtagStyle: string;
  emojiUsage: string;
  contentStyle: string;
}

export class PlatformConstraintsService {
  private readonly PLATFORM_CONSTRAINTS: Record<string, PlatformConstraints> = {
    'twitter': {
      charLimit: 280,
      hashtagStyle: 'minimal and strategic',
      emojiUsage: 'moderate',
      contentStyle: 'concise and punchy'
    },
    'instagram': {
      charLimit: 2200,
      hashtagStyle: 'comprehensive (up to 30)',
      emojiUsage: 'liberal and visual',
      contentStyle: 'visual storytelling'
    },
    'linkedin': {
      charLimit: 3000,
      hashtagStyle: 'professional (3-5)',
      emojiUsage: 'minimal and professional',
      contentStyle: 'professional and value-driven'
    },
    'facebook': {
      charLimit: 63206,
      hashtagStyle: 'moderate (5-10)',
      emojiUsage: 'moderate',
      contentStyle: 'community-focused and conversational'
    },
    'tiktok': {
      charLimit: 150,
      hashtagStyle: 'trending focused',
      emojiUsage: 'high and trendy',
      contentStyle: 'casual and trend-aware'
    },
    'youtube': {
      charLimit: 5000,
      hashtagStyle: 'searchable keywords',
      emojiUsage: 'moderate',
      contentStyle: 'descriptive and engaging'
    }
  };

  getPlatformConstraints(platform: string): PlatformConstraints {
    return this.PLATFORM_CONSTRAINTS[platform as keyof typeof this.PLATFORM_CONSTRAINTS] || this.PLATFORM_CONSTRAINTS['instagram'];
  }

  getOptimalPostingTime(platform: string): string {
    const postingTimes = {
      'twitter': 'Tuesday-Thursday, 9 AM - 12 PM EST',
      'instagram': 'Tuesday-Thursday, 11 AM - 1 PM EST',
      'linkedin': 'Tuesday-Thursday, 8 AM - 10 AM EST',
      'facebook': 'Wednesday-Friday, 1 PM - 3 PM EST',
      'tiktok': 'Tuesday-Thursday, 6 PM - 10 PM EST',
      'youtube': 'Saturday-Sunday, 2 PM - 4 PM EST'
    };
    
    return postingTimes[platform as keyof typeof postingTimes] || 'Tuesday-Thursday, 10 AM - 12 PM EST';
  }
}

export const platformConstraintsService = new PlatformConstraintsService();
