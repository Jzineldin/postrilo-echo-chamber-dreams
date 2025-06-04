import { PromptOptimizer } from '../promptOptimizer';
import { coreAIService } from './coreAIService';
import { fallbackGenerators } from './fallbackGenerators';
import { GenerateContentRequest, GenerateContentResponse } from './types';

export class ContentGenerationService {
  async generateContent(request: GenerateContentRequest): Promise<GenerateContentResponse> {
    console.log('🎨 ContentGeneration: Starting generation for:', request.type);
    console.log('🎨 ContentGeneration: Template:', request.templateId);
    console.log('🎨 ContentGeneration: Platforms:', request.platforms);

    try {
      // Use PromptOptimizer to create platform-specific prompts
      let optimizedPrompt = request.prompt;
      
      if (request.platforms && request.platforms.length > 0) {
        // For now, optimize for the first platform if multiple are selected
        const primaryPlatform = request.platforms[0];
        
        optimizedPrompt = PromptOptimizer.generateOptimizedPrompt({
          platform: primaryPlatform,
          contentType: request.type === 'video-script' ? 'video' : 'post',
          tone: this.getToneFromTemplate(request.templateId || ''),
          goal: this.getGoalFromTemplate(request.templateId || ''),
          topic: request.prompt,
          emojiUsage: this.shouldUseEmojis(primaryPlatform),
          hashtagDensity: this.shouldUseMoreHashtags(primaryPlatform),
          shortSentences: this.shouldUseShortSentences(primaryPlatform)
        });
      }

      console.log('🎯 ContentGeneration: Using optimized prompt, length:', optimizedPrompt.length);

      const result = await coreAIService.callAI(optimizedPrompt, 'gemini');

      if (result.error && !result.fallback) {
        console.log('⚠️ ContentGeneration: AI failed, using intelligent fallback');
        return {
          content: fallbackGenerators.generateIntelligentFallback({
            prompt: request.prompt,
            type: request.type || 'content',
            platforms: request.platforms || []
          }),
          error: result.error,
          usage: {
            promptTokens: 0,
            completionTokens: 0,
            totalTokens: 0
          }
        };
      }

      const responseContent = result.content || fallbackGenerators.generateIntelligentFallback({
        prompt: request.prompt,
        type: request.type || 'content',
        platforms: request.platforms || []
      });
      const isUsingFallback = result.fallback || !result.content;

      console.log(`✅ ContentGeneration: Generated ${responseContent.length} characters${isUsingFallback ? ' (fallback)' : ''}`);

      return {
        content: responseContent,
        error: result.error,
        usage: {
          promptTokens: isUsingFallback ? 0 : Math.floor(optimizedPrompt.length / 4),
          completionTokens: isUsingFallback ? 0 : Math.floor(responseContent.length / 4),
          totalTokens: isUsingFallback ? 0 : Math.floor((optimizedPrompt.length + responseContent.length) / 4)
        }
      };

    } catch (error) {
      console.error('🚨 ContentGeneration: Service error:', error);
      
      return {
        content: fallbackGenerators.generateIntelligentFallback({
          prompt: request.prompt,
          type: request.type || 'content',
          platforms: request.platforms || []
        }),
        error: 'Content generation temporarily unavailable - using smart fallback',
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0
        }
      };
    }
  }

  private getToneFromTemplate(templateId: string): string {
    const toneMap: Record<string, string> = {
      'quote-inspiration': 'inspirational',
      'brand-story': 'professional',
      'product-launch': 'professional',
      'tutorial-post': 'educational',
      'behind-the-scenes': 'casual',
      'community-post': 'casual'
    };
    return toneMap[templateId] || 'professional';
  }

  private getGoalFromTemplate(templateId: string): string {
    const goalMap: Record<string, string> = {
      'quote-inspiration': 'engagement',
      'brand-story': 'brand-awareness',
      'product-launch': 'promotion',
      'tutorial-post': 'engagement',
      'behind-the-scenes': 'engagement',
      'community-post': 'engagement'
    };
    return goalMap[templateId] || 'engagement';
  }

  private shouldUseEmojis(platform: string): boolean {
    return ['instagram', 'facebook', 'tiktok'].includes(platform);
  }

  private shouldUseMoreHashtags(platform: string): boolean {
    return ['instagram', 'tiktok'].includes(platform);
  }

  private shouldUseShortSentences(platform: string): boolean {
    return ['twitter', 'tiktok'].includes(platform);
  }
}

export const contentGenerationService = new ContentGenerationService();
