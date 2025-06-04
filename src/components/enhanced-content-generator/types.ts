
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
}
