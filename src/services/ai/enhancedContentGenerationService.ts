
import { promptTemplateService } from './promptTemplate';
import { coreAIService } from './coreAIService';
import { GenerateContentResponse } from './types';
import { PromptBuilderService } from './promptBuilderService';
import { fallbackContentService } from './fallbackContentService';

export interface EnhancedGenerateRequest {
  templateId: string;
  variables: Record<string, any>;
  useTemplate?: boolean;
  // New fields for dynamic behavior
  topic: string;
  platform: string;
  goal: string;
  tone: string;
  template: string;
  length: string;
  hashtagCount: string;
  useEmojis: boolean;
  useHashtags: boolean;
}

export class EnhancedContentGenerationService {
  async generateWithTemplate(request: EnhancedGenerateRequest): Promise<GenerateContentResponse> {
    console.log('🧩 STEP 1 — Gathering user inputs:', {
      topic: request.topic,
      platform: request.platform,
      goal: request.goal,
      tone: request.tone,
      template: request.template,
      length: request.length,
      hashtagCount: request.hashtagCount,
      useEmojis: request.useEmojis,
      useHashtags: request.useHashtags
    });

    try {
      // Validate required fields
      if (!request.topic?.trim()) {
        return {
          content: '',
          error: 'Topic is required for content generation',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        };
      }

      if (!request.platform) {
        return {
          content: '',
          error: 'Platform selection is required',
          usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        };
      }

      // 🧾 STEP 3 — Form AI prompt dynamically
      const dynamicPrompt = PromptBuilderService.buildDynamicPrompt(request);
      
      console.log('Generated dynamic prompt:', dynamicPrompt.substring(0, 300) + '...');

      // Call AI service with the dynamically generated prompt
      const result = await coreAIService.callAI(dynamicPrompt, 'gemini');

      if (result.error) {
        console.error('AI service error:', result.error);
        // Provide fallback content instead of just returning error
        return {
          content: this.generateTemplateFallback(request),
          error: `AI generation failed: ${result.error}. Using fallback content.`,
          usage: {
            promptTokens: 0,
            completionTokens: 0,
            totalTokens: 0
          }
        };
      }

      if (!result.content?.trim()) {
        console.error('Empty content returned from AI service');
        return {
          content: this.generateTemplateFallback(request),
          error: 'AI returned empty content. Using fallback content.',
          usage: {
            promptTokens: 0,
            completionTokens: 0,
            totalTokens: 0
          }
        };
      }

      return {
        content: result.content,
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0
        }
      };

    } catch (error) {
      console.error('Enhanced content generation error:', error);
      
      return {
        content: this.generateTemplateFallback(request),
        error: `Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}. Using fallback content.`,
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0
        }
      };
    }
  }

  private generateTemplateFallback(request: EnhancedGenerateRequest): string {
    return fallbackContentService.generateTemplateFallback({
      topic: request.topic,
      platform: request.platform,
      tone: request.tone,
      template: request.template,
      useEmojis: request.useEmojis,
      useHashtags: request.useHashtags
    });
  }

  // ♻️ STEP 4 — Auto-regenerate capability (to be called when settings change)
  async regenerateOnSettingsChange(request: EnhancedGenerateRequest): Promise<GenerateContentResponse> {
    console.log('♻️ STEP 4 — Auto-regenerating on settings change');
    // Rebuild and resend the prompt with new settings
    return this.generateWithTemplate(request);
  }

  // Keep existing methods for backward compatibility
  getTemplates() {
    return promptTemplateService.getTemplates();
  }

  getTemplate(id: string) {
    return promptTemplateService.getTemplateById(id);
  }
}

export const enhancedContentGenerationService = new EnhancedContentGenerationService();
