
export const APP_CONFIG = {
  availablePlatforms: [
    'instagram',
    'twitter', 
    'facebook',
    'linkedin',
    'tiktok',
    'youtube'
  ] as const,
  
  availableTones: [
    'professional',
    'casual',
    'friendly',
    'authoritative',
    'humorous',
    'inspirational'
  ] as const,
  
  contentGoals: [
    'engagement',
    'awareness', 
    'conversion',
    'education',
    'entertainment',
    'community-building'
  ] as const,

  contentTypes: [
    'post',
    'story',
    'reel',
    'thread',
    'article'
  ] as const,

  maxContentLength: {
    twitter: 280,
    instagram: 2200,
    facebook: 63206,
    linkedin: 1300,
    tiktok: 150,
    youtube: 5000
  },

  defaultSettings: {
    temperature: 0.7,
    maxTokens: 500,
    model: 'gpt-3.5-turbo'
  },

  defaultPostLimit: 10,
  maxRetryAttempts: 3
};

export type Platform = typeof APP_CONFIG.availablePlatforms[number];
export type Tone = typeof APP_CONFIG.availableTones[number];
export type ContentGoal = typeof APP_CONFIG.contentGoals[number];
export type ContentType = typeof APP_CONFIG.contentTypes[number];
