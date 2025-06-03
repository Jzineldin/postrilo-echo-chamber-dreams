
import { enhancedAIService } from './ai/enhancedAIService';
import { contentOptimizationService } from './ai/contentOptimizationService';
import { hashtagService } from './ai/hashtagService';
import { contentBriefService } from './ai/contentBriefService';
import { GenerateContentRequest, GenerateContentResponse, OptimizeContentRequest, ContentSuggestion } from './ai/types';

class CentralizedAIService {
  async generateContent(request: GenerateContentRequest): Promise<GenerateContentResponse> {
    console.log('🎯 CentralizedAI: Using enhanced AI service for generation');
    
    try {
      const result = await enhancedAIService.generateContent({
        prompt: request.prompt,
        platform: request.platforms?.[0] || 'instagram',
        contentType: request.type === 'video-script' ? 'video-script' : 'post',
        tone: 'professional',
        goal: 'engagement'
      });

      return {
        content: result.content,
        error: result.error,
        usage: result.usage || {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0
        }
      };
    } catch (error) {
      console.error('🚨 CentralizedAI: Generation failed:', error);
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Content generation failed',
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0
        }
      };
    }
  }

  async optimizeContent(request: OptimizeContentRequest): Promise<ContentSuggestion[]> {
    return contentOptimizationService.optimizeContent(request);
  }

  async improveContent(content: string, improvements: string[]): Promise<string> {
    return contentOptimizationService.improveContent(content, improvements);
  }

  async generateHashtags(content: string, count: number = 5): Promise<string[]> {
    return hashtagService.generateHashtags(content, count);
  }

  getRandomContentBrief(): string {
    return contentBriefService.getRandomContentBrief();
  }

  async healthCheck(): Promise<{ 
    status: 'healthy' | 'degraded' | 'down'; 
    details: string;
    canGenerate: boolean;
  }> {
    return enhancedAIService.healthCheck();
  }
}

export const centralizedAIService = new CentralizedAIService();
