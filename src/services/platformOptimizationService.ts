
export interface PlatformOptimization {
  platform: string;
  bestPractices: string[];
  optimalTimes: string[];
  contentTips: string[];
  hashtagStrategy: string;
  engagementTactics: string[];
}

export class PlatformOptimizationService {
  private static optimizations: Record<string, PlatformOptimization> = {
    instagram: {
      platform: 'Instagram',
      bestPractices: [
        'Use high-quality visuals',
        'Write engaging captions with storytelling',
        'Include 5-15 relevant hashtags',
        'Post consistently at optimal times',
        'Engage with your community in comments'
      ],
      optimalTimes: [
        'Tuesday-Thursday: 11 AM - 1 PM CET',
        'Saturday-Sunday: 10 AM - 12 PM CET',
        'Avoid posting late evenings in Nordic countries'
      ],
      contentTips: [
        'Start with a hook in the first line',
        'Use line breaks for readability',
        'Include calls-to-action',
        'Share behind-the-scenes content',
        'Use Nordic cultural references when relevant'
      ],
      hashtagStrategy: 'Mix popular and niche hashtags, include location tags for Nordic markets',
      engagementTactics: [
        'Ask questions in your caption',
        'Use Instagram Stories polls and stickers',
        'Respond to comments within 2 hours',
        'Share user-generated content',
        'Collaborate with Nordic influencers'
      ]
    },
    
    twitter: {
      platform: 'Twitter/X',
      bestPractices: [
        'Keep tweets concise and punchy',
        'Use 1-2 strategic hashtags maximum',
        'Engage in trending conversations',
        'Share valuable insights quickly',
        'Use threads for longer content'
      ],
      optimalTimes: [
        'Tuesday-Thursday: 9 AM - 12 PM CET',
        'Wednesday: 9 AM and 7-9 PM CET',
        'Avoid weekends for business content'
      ],
      contentTips: [
        'Start with a strong hook',
        'Use Twitter-friendly formatting',
        'Include relevant mentions',
        'Share quick tips and insights',
        'Reference Nordic trends and discussions'
      ],
      hashtagStrategy: 'Use 1-2 trending or community hashtags, avoid hashtag spam',
      engagementTactics: [
        'Reply to comments and mentions quickly',
        'Retweet and quote tweet relevant content',
        'Join Twitter chats in your industry',
        'Share timely reactions to news',
        'Create Twitter polls for engagement'
      ]
    },

    linkedin: {
      platform: 'LinkedIn',
      bestPractices: [
        'Share professional insights and expertise',
        'Use a conversational but professional tone',
        'Include industry-relevant keywords',
        'Post valuable content that sparks discussion',
        'Share company culture and achievements'
      ],
      optimalTimes: [
        'Tuesday-Thursday: 8 AM - 10 AM CET',
        'Tuesday-Wednesday: 12 PM - 2 PM CET',
        'Avoid posting on weekends'
      ],
      contentTips: [
        'Start with a question or insight',
        'Share lessons learned and expertise',
        'Include data and research when possible',
        'Write in first person for authenticity',
        'Reference Nordic business culture'
      ],
      hashtagStrategy: 'Use 3-5 professional hashtags, include industry-specific terms',
      engagementTactics: [
        'Respond professionally to all comments',
        'Share and comment on others\' posts',
        'Write thoughtful long-form posts',
        'Share employee spotlights',
        'Participate in LinkedIn groups'
      ]
    },

    facebook: {
      platform: 'Facebook',
      bestPractices: [
        'Create community-focused content',
        'Use conversational and relatable tone',
        'Share behind-the-scenes content',
        'Post visual content with engaging captions',
        'Build local community connections'
      ],
      optimalTimes: [
        'Wednesday-Friday: 1 PM - 3 PM CET',
        'Saturday-Sunday: 12 PM - 2 PM CET',
        'Evening posts work well for engagement'
      ],
      contentTips: [
        'Tell stories that resonate locally',
        'Ask questions to encourage comments',
        'Share community events and news',
        'Use Facebook-specific features like polls',
        'Include Nordic local references'
      ],
      hashtagStrategy: 'Use 5-10 hashtags, focus on local and community tags',
      engagementTactics: [
        'Respond to comments and messages',
        'Create Facebook events for local gatherings',
        'Share content in relevant groups',
        'Use Facebook Live for real-time engagement',
        'Build relationships with local community pages'
      ]
    },

    tiktok: {
      platform: 'TikTok',
      bestPractices: [
        'Create attention-grabbing opening hooks',
        'Use trending sounds and effects',
        'Keep content authentic and entertaining',
        'Jump on trending challenges appropriately',
        'Optimize for mobile viewing'
      ],
      optimalTimes: [
        'Tuesday-Thursday: 6 PM - 10 PM CET',
        'Friday-Sunday: 7 AM - 9 AM CET',
        'Target younger Nordic audience peak times'
      ],
      contentTips: [
        'Hook viewers in first 3 seconds',
        'Use trending music and sounds',
        'Create educational or entertaining content',
        'Keep it authentic and relatable',
        'Include Nordic cultural elements'
      ],
      hashtagStrategy: 'Mix trending hashtags with niche ones, use 15-20 hashtags',
      engagementTactics: [
        'Respond to comments with video replies',
        'Duet and stitch with relevant content',
        'Participate in trending challenges',
        'Use TikTok Live for direct engagement',
        'Collaborate with Nordic TikTok creators'
      ]
    }
  };

  static getOptimization(platform: string): PlatformOptimization {
    return this.optimizations[platform] || this.optimizations.instagram;
  }

  static getAllOptimizations(): PlatformOptimization[] {
    return Object.values(this.optimizations);
  }

  static getBestPostingTime(platform: string): string {
    const optimization = this.getOptimization(platform);
    return optimization.optimalTimes[0] || 'Tuesday-Thursday: 10 AM - 12 PM CET';
  }

  static getContentTips(platform: string): string[] {
    const optimization = this.getOptimization(platform);
    return optimization.contentTips;
  }

  static getHashtagStrategy(platform: string): string {
    const optimization = this.getOptimization(platform);
    return optimization.hashtagStrategy;
  }
}

export const platformOptimizationService = new PlatformOptimizationService();
