
import { EnhancedContentGenerationService, EnhancedGenerationRequest } from './enhancedContentGenerationService';
import { DetailedAIError } from '@/services/ai/improvedErrorHandling';

export interface UnifiedGenerationRequest {
  topic: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  keyPoints?: string;
  emojiUsage?: boolean;
  hashtagDensity?: boolean;
  shortSentences?: boolean;
  maxRetries?: number;
}

export interface UnifiedGenerationResponse {
  id: string;
  content: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  topic: string;
  timestamp: number;
  hashtags: string[];
  fallbackUsed: boolean;
  metadata: {
    platform: string;
    contentType: string;
    generatedAt: number;
    promptVersion: string;
  };
}

export interface GenerationProgress {
  stage: 'initializing' | 'analyzing' | 'generating' | 'optimizing' | 'finalizing' | 'completed' | 'error';
  message: string;
  progress: number;
  estimatedTimeRemaining?: number;
}

export class UnifiedContentGenerationService {
  static async generateContent(
    request: UnifiedGenerationRequest,
    onProgress?: (progress: GenerationProgress) => void,
    onSuccess?: (content: UnifiedGenerationResponse, fallbackUsed: boolean) => void,
    onError?: (error: DetailedAIError) => void
  ): Promise<UnifiedGenerationResponse | null> {
    try {
      console.log('🎯 UnifiedContentGeneration: Starting generation for:', request.topic);
      
      // Update progress
      onProgress?.({
        stage: 'initializing',
        message: 'Preparing content generation...',
        progress: 10
      });

      // Input validation
      if (!request.topic?.trim()) {
        const error: DetailedAIError = {
          type: 'validation_error',
          message: 'Topic is required',
          userFriendlyMessage: 'Please provide a topic for your content.',
          retryable: true,
          suggestedAction: 'Enter a topic or subject for your content.'
        };
        onError?.(error);
        return null;
      }

      onProgress?.({
        stage: 'analyzing',
        message: 'Analyzing content requirements...',
        progress: 25
      });

      // Convert to enhanced request
      const enhancedRequest: EnhancedGenerationRequest = {
        topic: request.topic,
        platform: request.platform,
        contentType: request.contentType,
        tone: request.tone,
        goal: request.goal,
        keyPoints: request.keyPoints,
        emojiUsage: request.emojiUsage,
        hashtagDensity: request.hashtagDensity,
        shortSentences: request.shortSentences,
        maxRetries: request.maxRetries || 3
      };

      onProgress?.({
        stage: 'generating',
        message: 'Generating your content...',
        progress: 50
      });

      // Use enhanced generation service
      const result = await EnhancedContentGenerationService.generateContent(enhancedRequest);

      if (!result.success && result.error) {
        const error: DetailedAIError = {
          type: 'generation_error',
          message: result.error,
          userFriendlyMessage: 'Content generation failed. Using fallback content.',
          retryable: true,
          suggestedAction: 'Try again or modify your topic.'
        };
        onError?.(error);
      }

      onProgress?.({
        stage: 'finalizing',
        message: 'Finalizing content...',
        progress: 90
      });

      // Create unified response
      const unifiedResponse: UnifiedGenerationResponse = {
        id: result.id,
        content: result.content,
        platform: result.platform,
        contentType: result.contentType,
        tone: result.tone,
        goal: result.goal,
        topic: result.topic,
        timestamp: result.timestamp,
        hashtags: result.hashtags,
        fallbackUsed: result.fallbackUsed,
        metadata: {
          platform: result.platform,
          contentType: result.contentType,
          generatedAt: result.timestamp,
          promptVersion: result.metadata.promptVersion
        }
      };

      onProgress?.({
        stage: 'completed',
        message: 'Content generation completed!',
        progress: 100
      });

      onSuccess?.(unifiedResponse, result.fallbackUsed);
      console.log('✅ UnifiedContentGeneration: Content generated successfully');
      return unifiedResponse;

    } catch (error) {
      console.error('🚨 UnifiedContentGeneration: Service error:', error);
      
      const detailedError: DetailedAIError = {
        type: 'unknown',
        message: error instanceof Error ? error.message : 'Content generation failed',
        userFriendlyMessage: 'Something went wrong while generating your content. Please try again.',
        retryable: true,
        suggestedAction: 'Try again or modify your topic.'
      };

      onError?.(detailedError);
      return null;
    }
  }

  static getRandomContentBrief(): string {
    const topics = [
      'Tips for staying productive while working from home',
      'The importance of work-life balance in modern careers',
      'How to build meaningful professional relationships',
      'Strategies for personal growth and development',
      'The future of remote work and digital collaboration'
    ];
    
    return topics[Math.floor(Math.random() * topics.length)];
  }
}
