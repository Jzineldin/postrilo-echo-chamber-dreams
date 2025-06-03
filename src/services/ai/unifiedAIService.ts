
import { ContentFormData, GeneratedContentResult } from '@/types/contentGeneration';
import { StandardizedAIError, StandardizedErrorHandler } from './standardizedErrorHandling';
import { configurationManager } from '@/services/configurationManager';
import { aiProviderManager } from './aiProviderManager';

export class UnifiedAIService {
  private static instance: UnifiedAIService;

  static getInstance(): UnifiedAIService {
    if (!this.instance) {
      this.instance = new UnifiedAIService();
    }
    return this.instance;
  }

  async generateFromFormData(formData: ContentFormData): Promise<GeneratedContentResult> {
    console.log('🎯 UnifiedAIService: Starting content generation');
    
    try {
      // Validate form data using configuration manager
      const validation = configurationManager.validateContentFormData(formData);
      if (!validation.valid) {
        throw StandardizedErrorHandler.createError(
          'validation_error',
          `Validation failed: ${validation.errors.join(', ')}`,
          validation.errors.join(', '),
          true
        );
      }

      // Generate content prompt
      const prompt = this.buildPrompt(formData);
      
      // Call AI service with retry logic
      const result = await this.generateWithRetry(prompt, formData);
      
      console.log('✅ UnifiedAIService: Content generated successfully');
      return result;
      
    } catch (error) {
      console.error('🚨 UnifiedAIService: Generation failed:', error);
      
      if (this.isStandardizedError(error)) {
        throw error;
      }
      
      throw StandardizedErrorHandler.handleFetchError(error);
    }
  }

  private isStandardizedError(error: any): error is StandardizedAIError {
    return error && typeof error === 'object' && 'type' in error && 'userFriendlyMessage' in error;
  }

  private buildPrompt(formData: ContentFormData): string {
    const platformConfig = configurationManager.exportConfig().content;
    
    let prompt = `Create a ${formData.contentType} for ${formData.platform} with the following requirements:\n\n`;
    prompt += `Topic: ${formData.topic}\n`;
    prompt += `Tone: ${formData.tone}\n`;
    prompt += `Goal: ${formData.goal}\n`;
    
    if (formData.keyPoints) {
      prompt += `Key Points: ${formData.keyPoints}\n`;
    }
    
    prompt += `\nFormatting preferences:\n`;
    prompt += `- Use emojis: ${formData.emojiUsage ? 'Yes' : 'No'}\n`;
    prompt += `- Include hashtags: ${formData.hashtagDensity ? 'Yes' : 'No'}\n`;
    prompt += `- Use short sentences: ${formData.shortSentences ? 'Yes' : 'No'}\n`;
    
    prompt += `\nPlease create engaging, ${formData.tone} content that achieves the goal of ${formData.goal}.`;
    
    return prompt;
  }

  private async generateWithRetry(prompt: string, formData: ContentFormData): Promise<GeneratedContentResult> {
    const maxRetries = configurationManager.getAIConfig().maxRetries;
    let lastError: StandardizedAIError | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 UnifiedAIService: Generation attempt ${attempt}/${maxRetries}`);
        
        // Use AI provider manager for generation
        const response = await aiProviderManager.generateContent({
          prompt,
          platform: formData.platform,
          contentType: formData.contentType,
          tone: formData.tone,
          goal: formData.goal,
          maxTokens: 500,
          temperature: 0.7
        }, formData);
        
        return {
          content: response.content,
          hashtags: response.hashtags,
          metadata: {
            platform: formData.platform,
            contentType: formData.contentType,
            generatedAt: Date.now(),
            promptVersion: response.fallbackUsed ? 'mock-v1.0' : 'real-v1.0',
            fallbackUsed: response.fallbackUsed,
            usage: response.usage
          }
        };
        
      } catch (error) {
        if (this.isStandardizedError(error)) {
          lastError = error;
        } else {
          lastError = StandardizedErrorHandler.handleFetchError(error);
        }

        console.error(`🚨 UnifiedAIService: Attempt ${attempt} failed:`, lastError);

        if (attempt < maxRetries && StandardizedErrorHandler.shouldRetry(lastError, attempt, maxRetries)) {
          const delay = StandardizedErrorHandler.getRetryDelay(lastError, attempt);
          console.log(`⏳ UnifiedAIService: Retrying in ${delay}ms`);
          await this.sleep(delay);
        }
      }
    }

    throw lastError || StandardizedErrorHandler.createError(
      'generation_error',
      'All retry attempts failed',
      'Failed to generate content after multiple attempts. Please try again.'
    );
  }

  private generateId(): string {
    return `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Configuration methods
  setOpenAIKey(apiKey: string): void {
    aiProviderManager.initializeOpenAI(apiKey);
  }

  setMockMode(useMock: boolean): void {
    aiProviderManager.setMockMode(useMock);
  }

  getProviderStatus() {
    return aiProviderManager.getProviderStatus();
  }
}

export const unifiedAIService = UnifiedAIService.getInstance();
