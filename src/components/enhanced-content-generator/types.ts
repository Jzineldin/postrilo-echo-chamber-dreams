
export interface FormData {
  topic: string;
  platform: 'instagram' | 'twitter' | 'linkedin' | 'facebook' | 'tiktok' | 'youtube';
  goal: 'engagement' | 'brand-awareness' | 'lead-generation' | 'promotion';
  tone: 'professional' | 'casual' | 'humorous' | 'inspirational' | 'educational';
  contentType: 'post' | 'video-script' | 'story' | 'reel' | 'carousel' | 'thread';
  keyPoints: string;
  emojiUsage: boolean;
  hashtagDensity: boolean;
  shortSentences: boolean;
  useCache: boolean;
}

export interface GeneratedContent {
  id: string;
  content: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  topic: string;
  timestamp: number;
  hashtags: string[];
  cached: boolean;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  metadata: {
    platform: string;
    contentType: string;
    generatedAt: number;
    promptVersion: string;
  };
}

export interface GenerationError {
  type: 'network' | 'authentication' | 'rate_limit' | 'quota_exceeded' | 'service_unavailable' | 'content_blocked' | 'validation_error' | 'security_error' | 'unknown';
  message: string;
  userFriendlyMessage?: string;
  retryable: boolean;
  retryAfter?: number;
}

// Platform options
export const platforms = [
  { value: 'instagram', label: 'Instagram', region: 'global' },
  { value: 'twitter', label: 'Twitter/X', region: 'global' },
  { value: 'linkedin', label: 'LinkedIn', region: 'global' },
  { value: 'facebook', label: 'Facebook', region: 'global' },
  { value: 'tiktok', label: 'TikTok', region: 'global' },
  { value: 'youtube', label: 'YouTube', region: 'global' }
];

// Content goals
export const goals = [
  { value: 'engagement', label: 'Drive Engagement' },
  { value: 'brand-awareness', label: 'Brand Awareness' },
  { value: 'lead-generation', label: 'Lead Generation' },
  { value: 'promotion', label: 'Product Promotion' }
];

// Tone options
export const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'inspirational', label: 'Inspirational' },
  { value: 'educational', label: 'Educational' }
];

// Content types
export const contentTypes = [
  { value: 'post', label: 'Social Media Post' },
  { value: 'video-script', label: 'Video Script' },
  { value: 'story', label: 'Story' },
  { value: 'reel', label: 'Reel' },
  { value: 'carousel', label: 'Carousel' },
  { value: 'thread', label: 'Thread' }
];
