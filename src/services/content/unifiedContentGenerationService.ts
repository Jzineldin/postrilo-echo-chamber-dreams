
import { centralizedAIService } from '@/services/centralizedAIService';
import { RobustContentGenerationService } from '@/services/ai/robustContentGenerationService';
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
      // Update progress
      onProgress?.({
        stage: 'initializing',
        message: 'Preparing content generation...',
        progress: 10
      });

      // Build enhanced prompt
      const enhancedPrompt = this.buildEnhancedPrompt(request);

      onProgress?.({
        stage: 'analyzing',
        message: 'Analyzing content requirements...',
        progress: 25
      });

      // Use robust generation service
      const response = await RobustContentGenerationService.generateWithRobustErrorHandling(
        {
          prompt: enhancedPrompt,
          type: request.contentType === 'video-script' ? 'video-script' : 'content',
          platform: request.platform,
          maxRetries: request.maxRetries || 3,
          showProgressToUser: true
        },
        (message) => {
          onProgress?.({
            stage: 'generating',
            message,
            progress: 50
          });
        }
      );

      if (!response.success && response.error) {
        onError?.(response.error);
        return null;
      }

      onProgress?.({
        stage: 'finalizing',
        message: 'Finalizing content...',
        progress: 90
      });

      // Create unified response
      const contentId = `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const unifiedResponse: UnifiedGenerationResponse = {
        id: contentId,
        content: response.content,
        platform: request.platform,
        contentType: request.contentType,
        tone: request.tone,
        goal: request.goal,
        topic: request.topic,
        timestamp: Date.now(),
        hashtags: [],
        fallbackUsed: response.fallbackUsed,
        metadata: {
          platform: request.platform,
          contentType: request.contentType,
          generatedAt: Date.now(),
          promptVersion: response.fallbackUsed ? 'fallback' : 'v2.0'
        }
      };

      onProgress?.({
        stage: 'completed',
        message: 'Content generation completed!',
        progress: 100
      });

      onSuccess?.(unifiedResponse, response.fallbackUsed);
      return unifiedResponse;

    } catch (error) {
      console.error('Unified content generation failed:', error);
      
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

  private static buildEnhancedPrompt(request: UnifiedGenerationRequest): string {
    return `Create a ${request.contentType} for ${request.platform} about: ${request.topic}

Platform: ${request.platform}
Goal: ${request.goal}
Tone: ${request.tone}
${request.keyPoints ? `Key points: ${request.keyPoints}` : ''}

Requirements:
- Write engaging copy optimized for ${request.platform}
- Use ${request.tone} tone throughout
- ${request.emojiUsage ? 'Include relevant emojis' : 'No emojis'}
- ${request.shortSentences ? 'Use short, punchy sentences' : 'Use natural sentence flow'}
- Include a strong call-to-action`;
  }

  static getRandomContentBrief(): string {
    return centralizedAIService.getRandomContentBrief();
  }
}
