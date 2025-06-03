
export const enhancedPlatformCharacterLimits = {
  twitter: 280,
  instagram: 2200,
  linkedin: 3000,
  facebook: 63206,
  tiktok: 150,
  youtube: 5000
};

export const detailedPlatformStyles = {
  twitter: {
    prefix: "Create a Twitter/X post that's",
    style: "conversational, concise, and thread-friendly with strategic hashtag placement",
    callToAction: "engagement-focused (likes, retweets, replies, quote tweets)",
    contentStructure: ['attention_hook', 'core_value', 'conversation_starter', 'strategic_hashtags'],
    bestPractices: [
      'Hook readers within first 10 words',
      'Use Twitter-friendly formatting with line breaks',
      'Include potential for threading if topic is complex',
      'Optimize for quote tweet potential',
      'Use 1-2 strategic hashtags maximum',
      'Include mentions potential for networking',
      'Create tweetable moments within longer content'
    ],
    viralElements: ['trending topics', 'controversial takes', 'relatable observations', 'industry insights', 'thread potential'],
    toneAdaptations: {
      professional: 'Authoritative yet approachable, industry insights',
      casual: 'Conversational, relatable, friend-to-friend tone',
      humorous: 'Witty, clever wordplay, unexpected twists',
      inspirational: 'Motivating, action-oriented, empowering language',
      educational: 'Clear explanations, step-by-step insights, value-first'
    },
    contentFormats: ['single tweets', 'thread series', 'quote tweets', 'reply chains'],
    engagementTactics: ['ask questions', 'use polls', 'create debate', 'share hot takes', 'offer exclusive insights']
  },
  instagram: {
    prefix: "Create an Instagram post that's",
    style: "visual-focused, storytelling, aesthetically appealing with strong community engagement",
    callToAction: "community-building with save/share prompts and story potential",
    contentStructure: ['scroll_stopping_hook', 'visual_story', 'value_delivery', 'community_question', 'strategic_hashtags'],
    bestPractices: [
      'Start with a scroll-stopping hook in first line',
      'Use line breaks and spacing for readability',
      'Include behind-the-scenes storytelling elements',
      'Optimize for saves and shares',
      'Create carousel-worthy content structure',
      'Use Instagram-specific language and trends',
      'Include story continuation potential',
      'Encourage user-generated content'
    ],
    viralElements: ['transformation stories', 'relatable struggles', 'aesthetic visuals', 'trending audio potential', 'before/after content'],
    toneAdaptations: {
      professional: 'Polished yet authentic, showcasing expertise',
      casual: 'Behind-the-scenes, authentic moments, relatable content',
      humorous: 'Playful captions, funny observations, entertaining stories',
      inspirational: 'Motivational stories, transformation journeys, empowering messages',
      educational: 'Step-by-step tutorials, infographic-style content, how-to guides'
    },
    contentFormats: ['single posts', 'carousel series', 'story highlights', 'reel scripts'],
    engagementTactics: ['save-worthy content', 'share prompts', 'comment questions', 'story polls', 'user challenges']
  },
  linkedin: {
    prefix: "Create a LinkedIn post that's",
    style: "professional, thought-provoking, value-driven with industry expertise demonstration",
    callToAction: "professional networking and career-focused discussions",
    contentStructure: ['professional_hook', 'industry_insight', 'personal_experience', 'actionable_takeaway', 'discussion_question'],
    bestPractices: [
      'Lead with industry-relevant insights',
      'Share personal professional experiences',
      'Include data or research when relevant',
      'Optimize for professional sharing',
      'Create thought leadership content',
      'Use professional language with personality',
      'Include career development value',
      'Reference industry trends and news'
    ],
    viralElements: ['industry disruption', 'career advice', 'leadership insights', 'business case studies', 'professional growth stories'],
    toneAdaptations: {
      professional: 'Executive-level insights, authoritative expertise',
      casual: 'Approachable professional, mentor-like guidance',
      humorous: 'Professional wit, light industry humor, relatable workplace moments',
      inspirational: 'Leadership motivation, career empowerment, success stories',
      educational: 'Industry education, skill development, professional tutorials'
    },
    contentFormats: ['thought leadership', 'industry commentary', 'career advice', 'business insights'],
    engagementTactics: ['industry questions', 'experience sharing', 'professional polls', 'connection invites', 'thought debates']
  },
  facebook: {
    prefix: "Create a Facebook post that's",
    style: "community-focused, conversational, relatable with local connection potential",
    callToAction: "community engagement, sharing, and group discussion",
    contentStructure: ['relatable_opener', 'community_story', 'shared_experience', 'discussion_starter'],
    bestPractices: [
      'Create conversation starters for comments',
      'Include community and local elements',
      'Optimize for sharing within friend groups',
      'Use Facebook-specific features like polls',
      'Build relationships with community pages',
      'Include family-friendly content',
      'Encourage group discussions',
      'Use longer-form storytelling'
    ],
    viralElements: ['local events', 'community stories', 'relatable family content', 'nostalgic references', 'group discussions'],
    toneAdaptations: {
      professional: 'Accessible expertise, community leadership',
      casual: 'Neighborly, friendly, community-minded',
      humorous: 'Family-friendly humor, relatable life moments',
      inspirational: 'Community empowerment, local success stories',
      educational: 'Community education, helpful local information'
    },
    contentFormats: ['community posts', 'event announcements', 'group discussions', 'local stories'],
    engagementTactics: ['community questions', 'local events', 'group polls', 'photo sharing', 'story telling']
  },
  tiktok: {
    prefix: "Create TikTok content that's",
    style: "trendy, attention-grabbing, hook-focused with viral potential",
    callToAction: "viral engagement with trending elements and duet potential",
    contentStructure: ['scroll_stopping_hook', 'trend_integration', 'quick_value_delivery', 'viral_engagement_driver'],
    bestPractices: [
      'Hook viewers within first 3 seconds',
      'Integrate trending sounds and effects',
      'Create duet and stitch potential',
      'Use generation-specific language',
      'Optimize for algorithm discovery',
      'Include trending hashtags',
      'Create rewatchable moments',
      'Design for mobile vertical viewing'
    ],
    viralElements: ['trending challenges', 'before/after content', 'quick tutorials', 'reaction content', 'dance trends', 'comedy skits'],
    toneAdaptations: {
      professional: 'Expert tips in trendy format, accessible expertise',
      casual: 'Authentic, unfiltered, relatable Gen Z/Alpha language',
      humorous: 'Comedy skits, funny reactions, viral memes',
      inspirational: 'Quick motivation, transformation stories, life hacks',
      educational: 'Fast tutorials, life hacks, quick explanations'
    },
    contentFormats: ['short videos', 'trending challenges', 'duet responses', 'tutorial clips'],
    engagementTactics: ['trend participation', 'duet invitations', 'challenge creation', 'reaction content', 'viral hooks']
  },
  youtube: {
    prefix: "Create YouTube content that's",
    style: "informative, entertaining, value-packed with SEO optimization",
    callToAction: "subscribe-focused with notification bell and engagement",
    contentStructure: ['compelling_title_hook', 'value_promise', 'structured_content_breakdown', 'subscribe_cta'],
    bestPractices: [
      'Include searchable keywords naturally',
      'Create compelling thumbnails descriptions',
      'Structure for watch time optimization',
      'Include timestamps for longer content',
      'Optimize for suggested videos',
      'Create series potential',
      'Include clear value propositions',
      'Design for retention and rewatching'
    ],
    viralElements: ['tutorial content', 'how-to guides', 'reaction videos', 'educational series', 'entertainment value'],
    toneAdaptations: {
      professional: 'Expert tutorials, industry deep-dives, professional development',
      casual: 'Vlog-style content, personal stories, behind-the-scenes',
      humorous: 'Entertainment content, comedy videos, funny tutorials',
      inspirational: 'Motivational content, success stories, personal growth',
      educational: 'Comprehensive tutorials, educational series, skill development'
    },
    contentFormats: ['tutorials', 'vlogs', 'reviews', 'educational series'],
    engagementTactics: ['subscribe reminders', 'comment questions', 'series announcements', 'community posts', 'live streams']
  }
};
