
export interface ContentFormData {
  topic: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  emojiUsage: boolean;
  hashtagDensity: boolean;
  shortSentences: boolean;
  keyPoints: string;
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
  createdAt: Date;
  wordCount: number;
  characterCount: number;
  hashtags?: string[];
  metadata?: Record<string, any>;
}

export interface GeneratedContentResult {
  content: string;
  hashtags?: string[];
  wordCount?: number;
  characterCount?: number;
  metadata?: Record<string, any>;
}

export interface ContentGenerationOptions {
  useCache?: boolean;
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface ContentGenerationResult {
  success: boolean;
  content?: GeneratedContent;
  error?: string;
  cached?: boolean;
}

export interface ContentGenerationError {
  type: 'network' | 'authentication' | 'rate_limit' | 'quota_exceeded' | 'service_unavailable' | 'content_blocked' | 'validation_error' | 'generation_error' | 'unknown';
  message: string;
  userFriendlyMessage: string;
  retryable: boolean;
  timestamp: number;
  retryAfter?: number;
  suggestedAction?: string;
  details?: any;
}

export class ContentFormValidator {
  static validateFormData(formData: ContentFormData): string | null {
    if (!formData.topic.trim()) {
      return 'Topic is required';
    }
    if (!formData.platform) {
      return 'Platform is required';
    }
    if (!formData.contentType) {
      return 'Content type is required';
    }
    if (!formData.tone) {
      return 'Tone is required';
    }
    if (!formData.goal) {
      return 'Goal is required';
    }
    return null;
  }

  static getFormDataDefaults(): ContentFormData {
    return {
      topic: '',
      platform: 'instagram',
      contentType: 'post',
      tone: 'professional',
      goal: 'engagement',
      emojiUsage: false,
      hashtagDensity: false,
      shortSentences: false,
      keyPoints: '',
      useCache: true
    };
  }
}
