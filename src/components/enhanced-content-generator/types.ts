
export interface FormData {
  topic: string;
  platform: "instagram" | "twitter" | "linkedin" | "tiktok" | "facebook" | "youtube";
  goal: "engagement" | "awareness" | "conversion" | "education" | "entertainment";
  tone: "professional" | "casual" | "friendly" | "authoritative" | "playful" | "conversational" | "inspiring";
  contentType: "post" | "story" | "reel" | "video-script" | "carousel" | "thread";
  keyPoints: string;
  emojiUsage: boolean;
  hashtagDensity: boolean;
  shortSentences: boolean;
  useCache: boolean;
}

export interface UsageData {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
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
  fallbackUsed?: boolean;
  cached?: boolean;
  usage?: UsageData;
  metadata?: {
    platform: string;
    contentType: string;
    generatedAt: number;
    promptVersion: string;
  };
}

export interface GenerationError {
  type: 'network' | 'authentication' | 'rate_limit' | 'quota_exceeded' | 'service_unavailable' | 'content_blocked' | 'unknown';
  message: string;
  userFriendlyMessage: string;
  retryable: boolean;
  retryAfter?: number;
  suggestedAction?: string;
  details?: any;
}

// Data arrays that components are importing
export const platforms = [
  { value: "instagram", label: "Instagram", region: "global" },
  { value: "twitter", label: "Twitter/X", region: "global" },
  { value: "linkedin", label: "LinkedIn", region: "global" },
  { value: "tiktok", label: "TikTok", region: "global" },
  { value: "facebook", label: "Facebook", region: "global" },
  { value: "youtube", label: "YouTube", region: "global" }
];

export const contentTypes = [
  { value: "post", label: "Social Media Post" },
  { value: "story", label: "Story" },
  { value: "reel", label: "Reel/Short Video" },
  { value: "video-script", label: "Video Script" },
  { value: "carousel", label: "Carousel Post" },
  { value: "thread", label: "Thread" }
];

export const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "authoritative", label: "Authoritative" },
  { value: "playful", label: "Playful" },
  { value: "conversational", label: "Conversational" },
  { value: "inspiring", label: "Inspiring" }
];

export const goals = [
  { value: "engagement", label: "Drive Engagement" },
  { value: "awareness", label: "Build Awareness" },
  { value: "conversion", label: "Drive Conversions" },
  { value: "education", label: "Educate Audience" },
  { value: "entertainment", label: "Entertain" }
];
