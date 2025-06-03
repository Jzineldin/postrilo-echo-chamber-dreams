
interface PlatformLimits {
  maxCharacters: number;
  maxHashtags: number;
  recommendedLength: number;
  warningThreshold: number;
}

export class CharacterCountService {
  private static platformLimits: Record<string, PlatformLimits> = {
    twitter: {
      maxCharacters: 280,
      maxHashtags: 2,
      recommendedLength: 240,
      warningThreshold: 260
    },
    instagram: {
      maxCharacters: 2200,
      maxHashtags: 30,
      recommendedLength: 150,
      warningThreshold: 2000
    },
    facebook: {
      maxCharacters: 63206,
      maxHashtags: 10,
      recommendedLength: 200,
      warningThreshold: 500
    },
    linkedin: {
      maxCharacters: 3000,
      maxHashtags: 5,
      recommendedLength: 300,
      warningThreshold: 2800
    },
    tiktok: {
      maxCharacters: 300,
      maxHashtags: 10,
      recommendedLength: 100,
      warningThreshold: 280
    },
    pinterest: {
      maxCharacters: 500,
      maxHashtags: 20,
      recommendedLength: 200,
      warningThreshold: 450
    },
    youtube: {
      maxCharacters: 5000,
      maxHashtags: 15,
      recommendedLength: 500,
      warningThreshold: 4800
    },
    reddit: {
      maxCharacters: 40000,
      maxHashtags: 0,
      recommendedLength: 300,
      warningThreshold: 1000
    },
    jodel: {
      maxCharacters: 300,
      maxHashtags: 3,
      recommendedLength: 150,
      warningThreshold: 280
    },
    researchgate: {
      maxCharacters: 1000,
      maxHashtags: 5,
      recommendedLength: 300,
      warningThreshold: 900
    }
  };

  static getCharacterCount(text: string): number {
    return text.length;
  }

  static getPlatformLimits(platform: string): PlatformLimits {
    return this.platformLimits[platform] || this.platformLimits.instagram;
  }

  static validateContent(content: string, platform: string): {
    isValid: boolean;
    characterCount: number;
    status: 'optimal' | 'warning' | 'error';
    message: string;
    remainingCharacters: number;
  } {
    const limits = this.getPlatformLimits(platform);
    const count = this.getCharacterCount(content);
    const remaining = limits.maxCharacters - count;

    let status: 'optimal' | 'warning' | 'error' = 'optimal';
    let message = `${count}/${limits.maxCharacters} characters`;

    if (count > limits.maxCharacters) {
      status = 'error';
      message = `Content exceeds ${platform} limit by ${Math.abs(remaining)} characters`;
    } else if (count > limits.warningThreshold) {
      status = 'warning';
      message = `Close to ${platform} limit (${remaining} characters remaining)`;
    } else if (count <= limits.recommendedLength) {
      message = `Optimal length for ${platform} (${remaining} characters remaining)`;
    }

    return {
      isValid: count <= limits.maxCharacters,
      characterCount: count,
      status,
      message,
      remainingCharacters: remaining
    };
  }

  static getHashtagValidation(hashtags: string[], platform: string): {
    isValid: boolean;
    count: number;
    maxAllowed: number;
    message: string;
  } {
    const limits = this.getPlatformLimits(platform);
    const count = hashtags.length;

    return {
      isValid: count <= limits.maxHashtags,
      count,
      maxAllowed: limits.maxHashtags,
      message: count > limits.maxHashtags 
        ? `Too many hashtags for ${platform} (${count}/${limits.maxHashtags})`
        : `${count}/${limits.maxHashtags} hashtags`
    };
  }
}
