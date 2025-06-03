
export interface GenerateContentResponse {
  content: string;
  error?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  provider?: string;
  cached?: boolean;
}

export interface GenerateContentRequest {
  prompt: string;
  templateId?: string;
  type?: 'content' | 'hashtags' | 'video-script';
  temperature?: number;
  maxTokens?: number;
  platforms?: string[];
  variables?: Record<string, any>;
}

export interface AIProviderResponse {
  content: string;
  error?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  provider?: string;
}

export interface OptimizeContentRequest {
  content: string;
  platform: string;
  objective: string;
}

export interface ContentSuggestion {
  type: string;
  suggestion: string;
  reasoning: string;
  confidence: number;
}
