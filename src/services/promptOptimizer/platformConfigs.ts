
export const platformCharacterLimits = {
  twitter: 280,
  instagram: 2200,
  linkedin: 3000,
  facebook: 63206,
  tiktok: 150,
  youtube: 5000
};

export const enhancedPlatformStyles = {
  twitter: {
    prefix: "Create a Twitter/X post that's",
    style: "conversational, concise, and thread-friendly with strategic hashtag placement",
    callToAction: "engagement-focused (likes, retweets, replies, quote tweets)",
    contentStructure: ['hook', 'value', 'conversation_starter'],
    bestPractices: [
      'Use Twitter-friendly formatting with line breaks',
      'Include potential for threading if topic is complex',
      'Optimize for quote tweet potential',
      'Use 1-2 strategic hashtags maximum',
      'Include mentions potential for networking'
    ],
    viralElements: ['trending topics', 'controversial takes', 'relatable observations', 'industry insights']
  },
  instagram: {
    prefix: "Create an Instagram post that's",
    style: "visual-focused, storytelling, aesthetically appealing with strong community engagement",
    callToAction: "community-building with save/share prompts and story potential",
    contentStructure: ['visual_hook', 'story', 'value_delivery', 'community_question', 'hashtags'],
    bestPractices: [
      'Start with a scroll-stopping hook in first line',
      'Use line breaks and spacing for readability',
      'Include behind-the-scenes storytelling elements',
      'Optimize for saves and shares',
      'Create carousel-worthy content structure'
    ],
    viralElements: ['transformation stories', 'relatable struggles', 'aesthetic visuals', 'trending audio potential']
  },
  linkedin: {
    prefix: "Create a LinkedIn post that's",
    style: "professional, thought-provoking, value-driven with industry expertise demonstration",
    callToAction: "professional networking and career-focused discussions",
    contentStructure: ['professional_hook', 'industry_insight', 'personal_experience', 'discussion_question'],
    bestPractices: [
      'Lead with industry-relevant insights',
      'Share personal professional experiences',
      'Include data or research when relevant',
      'Optimize for professional sharing',
      'Create thought leadership content'
    ],
    viralElements: ['industry disruption', 'career advice', 'leadership insights', 'business case studies']
  },
  facebook: {
    prefix: "Create a Facebook post that's",
    style: "community-focused, conversational, relatable with local connection potential",
    callToAction: "community engagement, sharing, and group discussion",
    contentStructure: ['relatable_opener', 'community_story', 'discussion_starter'],
    bestPractices: [
      'Create conversation starters for comments',
      'Include community and local elements',
      'Optimize for sharing within friend groups',
      'Use Facebook-specific features like polls',
      'Build relationships with community pages'
    ],
    viralElements: ['local events', 'community stories', 'relatable family content', 'nostalgic references']
  },
  tiktok: {
    prefix: "Create TikTok content that's",
    style: "trendy, attention-grabbing, hook-focused with viral potential",
    callToAction: "viral engagement with trending elements and duet potential",
    contentStructure: ['scroll_stopping_hook', 'trend_integration', 'value_delivery', 'engagement_driver'],
    bestPractices: [
      'Hook viewers within first 3 seconds',
      'Integrate trending sounds and effects',
      'Create duet and stitch potential',
      'Use generation-specific language',
      'Optimize for algorithm discovery'
    ],
    viralElements: ['trending challenges', 'before/after content', 'quick tutorials', 'reaction content']
  },
  youtube: {
    prefix: "Create YouTube content that's",
    style: "informative, entertaining, value-packed with SEO optimization",
    callToAction: "subscribe-focused with notification bell and engagement",
    contentStructure: ['compelling_title_hook', 'value_promise', 'content_breakdown', 'subscribe_cta'],
    bestPractices: [
      'Include searchable keywords naturally',
      'Create compelling thumbnails descriptions',
      'Structure for watch time optimization',
      'Include timestamps for longer content',
      'Optimize for suggested videos'
    ],
    viralElements: ['tutorial content', 'how-to guides', 'reaction videos', 'educational series']
  }
};
