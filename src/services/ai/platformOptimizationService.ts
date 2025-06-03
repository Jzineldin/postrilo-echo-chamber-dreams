
interface PlatformOptimization {
  platform: string;
  maxLength: number;
  optimalLength: number;
  hashtagLimit: number;
  recommendedHashtags: number;
  emojiStrategy: 'heavy' | 'moderate' | 'minimal' | 'none';
  contentStructure: string[];
  bestPostingTimes: string[];
  trendingFormats: string[];
}

export class PlatformOptimizationService {
  private optimizations: Record<string, PlatformOptimization> = {
    twitter: {
      platform: 'twitter',
      maxLength: 280,
      optimalLength: 240,
      hashtagLimit: 5,
      recommendedHashtags: 2,
      emojiStrategy: 'moderate',
      contentStructure: ['hook', 'value', 'cta'],
      bestPostingTimes: ['9-10 AM', '12-1 PM', '3-4 PM', '6-7 PM'],
      trendingFormats: ['threads', 'quote tweets', 'polls', 'memes']
    },
    instagram: {
      platform: 'instagram',
      maxLength: 2200,
      optimalLength: 1000,
      hashtagLimit: 30,
      recommendedHashtags: 15,
      emojiStrategy: 'heavy',
      contentStructure: ['story', 'value', 'community_question', 'hashtags'],
      bestPostingTimes: ['11 AM-1 PM', '2-3 PM', '5-7 PM'],
      trendingFormats: ['carousels', 'reels', 'stories', 'behind-the-scenes']
    },
    linkedin: {
      platform: 'linkedin',
      maxLength: 3000,
      optimalLength: 1500,
      hashtagLimit: 10,
      recommendedHashtags: 5,
      emojiStrategy: 'minimal',
      contentStructure: ['professional_hook', 'insight', 'experience', 'question'],
      bestPostingTimes: ['8-9 AM', '12-1 PM', '5-6 PM'],
      trendingFormats: ['thought leadership', 'industry insights', 'career advice', 'case studies']
    },
    facebook: {
      platform: 'facebook',
      maxLength: 63206,
      optimalLength: 500,
      hashtagLimit: 20,
      recommendedHashtags: 5,
      emojiStrategy: 'moderate',
      contentStructure: ['engaging_opener', 'story', 'call_to_action'],
      bestPostingTimes: ['9 AM-12 PM', '1-3 PM'],
      trendingFormats: ['stories', 'videos', 'polls', 'community posts']
    },
    tiktok: {
      platform: 'tiktok',
      maxLength: 150,
      optimalLength: 100,
      hashtagLimit: 20,
      recommendedHashtags: 8,
      emojiStrategy: 'heavy',
      contentStructure: ['hook', 'content', 'trending_cta'],
      bestPostingTimes: ['6-10 AM', '7-9 PM'],
      trendingFormats: ['trending sounds', 'challenges', 'duets', 'tutorials']
    },
    youtube: {
      platform: 'youtube',
      maxLength: 5000,
      optimalLength: 2000,
      hashtagLimit: 15,
      recommendedHashtags: 5,
      emojiStrategy: 'moderate',
      contentStructure: ['title_hook', 'value_promise', 'subscribe_cta'],
      bestPostingTimes: ['2-4 PM', '6-8 PM'],
      trendingFormats: ['tutorials', 'vlogs', 'reviews', 'how-to guides']
    }
  };

  getOptimization(platform: string): PlatformOptimization | null {
    return this.optimizations[platform] || null;
  }

  optimizeContent(content: string, platform: string): {
    optimized: string;
    recommendations: string[];
    warnings: string[];
  } {
    const optimization = this.getOptimization(platform);
    if (!optimization) {
      return {
        optimized: content,
        recommendations: ['Platform optimization not available'],
        warnings: []
      };
    }

    const recommendations: string[] = [];
    const warnings: string[] = [];
    let optimized = content;

    // Length optimization
    if (content.length > optimization.maxLength) {
      warnings.push(`Content exceeds ${platform} limit (${content.length}/${optimization.maxLength} chars)`);
      optimized = content.substring(0, optimization.maxLength - 3) + '...';
    } else if (content.length < optimization.optimalLength * 0.5) {
      recommendations.push(`Consider adding more content (current: ${content.length}, optimal: ${optimization.optimalLength} chars)`);
    }

    // Hashtag analysis
    const hashtagCount = (content.match(/#\w+/g) || []).length;
    if (hashtagCount > optimization.hashtagLimit) {
      warnings.push(`Too many hashtags (${hashtagCount}/${optimization.hashtagLimit})`);
    } else if (hashtagCount < optimization.recommendedHashtags) {
      recommendations.push(`Add ${optimization.recommendedHashtags - hashtagCount} more hashtags for better reach`);
    }

    // Emoji analysis
    const emojiCount = (content.match(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu) || []).length;
    
    switch (optimization.emojiStrategy) {
      case 'heavy':
        if (emojiCount < 3) recommendations.push('Add more emojis for better engagement');
        break;
      case 'moderate':
        if (emojiCount === 0) recommendations.push('Consider adding 1-2 relevant emojis');
        if (emojiCount > 5) warnings.push('Too many emojis may reduce professionalism');
        break;
      case 'minimal':
        if (emojiCount > 2) warnings.push('Reduce emoji usage for professional tone');
        break;
      case 'none':
        if (emojiCount > 0) warnings.push('Remove emojis for formal content');
        break;
    }

    // Structure recommendations
    recommendations.push(`Recommended structure: ${optimization.contentStructure.join(' → ')}`);
    recommendations.push(`Best posting times: ${optimization.bestPostingTimes.join(', ')}`);

    return {
      optimized,
      recommendations,
      warnings
    };
  }

  generatePlatformSpecificPrompt(baseTopic: string, platform: string, goal: string): string {
    const optimization = this.getOptimization(platform);
    if (!optimization) return baseTopic;

    let prompt = `Create ${platform} content about: ${baseTopic}\n\n`;
    prompt += `Platform: ${platform.toUpperCase()}\n`;
    prompt += `Max length: ${optimization.maxLength} characters\n`;
    prompt += `Optimal length: ${optimization.optimalLength} characters\n`;
    prompt += `Hashtags: ${optimization.recommendedHashtags} recommended (max ${optimization.hashtagLimit})\n`;
    prompt += `Emoji strategy: ${optimization.emojiStrategy}\n`;
    prompt += `Structure: ${optimization.contentStructure.join(' → ')}\n`;
    prompt += `Trending formats: ${optimization.trendingFormats.join(', ')}\n\n`;
    
    prompt += `Goal: ${goal}\n\n`;
    
    prompt += `Requirements:\n`;
    prompt += `- Follow ${platform} best practices\n`;
    prompt += `- Use ${optimization.emojiStrategy} emoji approach\n`;
    prompt += `- Include ${optimization.recommendedHashtags} relevant hashtags\n`;
    prompt += `- Structure content for maximum ${goal}\n`;
    prompt += `- Keep under ${optimization.maxLength} characters\n`;
    prompt += `- Optimize for ${optimization.bestPostingTimes.join(' or ')} posting\n`;

    return prompt;
  }

  getAllPlatforms(): string[] {
    return Object.keys(this.optimizations);
  }

  getRecommendedContentTypes(platform: string): string[] {
    const optimization = this.getOptimization(platform);
    return optimization ? optimization.trendingFormats : [];
  }
}

export const platformOptimizationService = new PlatformOptimizationService();
