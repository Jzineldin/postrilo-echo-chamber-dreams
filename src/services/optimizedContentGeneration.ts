
import { ContentFormData, GeneratedContentResult } from '@/types/contentGeneration';
import { StandardizedErrorHandler } from '@/services/ai/standardizedErrorHandling';
import { unifiedAIService } from '@/services/ai/unifiedAIService';
import { aiProviderManager } from '@/services/ai/aiProviderManager';
import { configurationManager } from '@/services/configurationManager';

interface GenerationMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  retryCount: number;
  fallbackUsed: boolean;
  cacheHit: boolean;
}

interface OptimizedGenerationResult {
  content: GeneratedContentResult;
  metrics: GenerationMetrics;
  warnings: string[];
}

export class OptimizedContentGenerationService {
  private static cache = new Map<string, { content: GeneratedContentResult; timestamp: number }>();
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  static async generateWithOptimizations(
    formData: ContentFormData,
    onProgress?: (stage: string, progress: number) => void
  ): Promise<OptimizedGenerationResult> {
    const metrics: GenerationMetrics = {
      startTime: Date.now(),
      endTime: 0,
      duration: 0,
      retryCount: 0,
      fallbackUsed: false,
      cacheHit: false
    };

    const warnings: string[] = [];

    try {
      onProgress?.('Initializing', 10);

      // Check cache first if enabled
      if (formData.useCache) {
        const cacheKey = this.generateCacheKey(formData);
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
          metrics.cacheHit = true;
          metrics.endTime = Date.now();
          metrics.duration = metrics.endTime - metrics.startTime;
          
          onProgress?.('Content Retrieved', 100);
          
          return {
            content: cached.content,
            metrics,
            warnings: ['Content retrieved from cache']
          };
        }
      }

      onProgress?.('Validating', 25);

      // Validate form data
      const validation = configurationManager.validateContentFormData(formData);
      if (!validation.valid) {
        throw StandardizedErrorHandler.createError(
          'validation_error',
          `Validation failed: ${validation.errors.join(', ')}`,
          validation.errors.join(', '),
          false
        );
      }

      onProgress?.('Checking Provider', 40);

      // Check provider status
      const providerStatus = aiProviderManager.getProviderStatus();
      if (!providerStatus.initialized) {
        warnings.push('AI provider not fully configured, using fallback');
        metrics.fallbackUsed = true;
      }

      onProgress?.('Generating Content', 60);

      // Generate content with retry logic
      let lastError: Error | null = null;
      const maxRetries = configurationManager.getAIConfig().maxRetries;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          metrics.retryCount = attempt - 1;
          
          const content = await unifiedAIService.generateFromFormData(formData);
          
          // Cache the result if caching is enabled
          if (formData.useCache) {
            const cacheKey = this.generateCacheKey(formData);
            this.cache.set(cacheKey, { content, timestamp: Date.now() });
          }

          metrics.endTime = Date.now();
          metrics.duration = metrics.endTime - metrics.startTime;
          metrics.fallbackUsed = false; // Set based on actual generation logic

          onProgress?.('Completed', 100);

          // Add performance warnings
          if (metrics.duration > 10000) {
            warnings.push('Generation took longer than expected');
          }
          
          if (metrics.retryCount > 0) {
            warnings.push(`Required ${metrics.retryCount} retries`);
          }

          return {
            content,
            metrics,
            warnings
          };
        } catch (error) {
          lastError = error as Error;
          
          if (attempt < maxRetries) {
            onProgress?.(`Retrying (${attempt}/${maxRetries})`, 40 + (attempt * 10));
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }
        }
      }

      throw lastError || new Error('Generation failed after all retries');

    } catch (error) {
      metrics.endTime = Date.now();
      metrics.duration = metrics.endTime - metrics.startTime;

      console.error('Optimized content generation failed:', error);
      throw error;
    }
  }

  private static generateCacheKey(formData: ContentFormData): string {
    const keyData = {
      topic: formData.topic,
      platform: formData.platform,
      contentType: formData.contentType,
      tone: formData.tone,
      goal: formData.goal
    };
    
    return btoa(JSON.stringify(keyData));
  }

  static clearCache(): void {
    this.cache.clear();
  }

  static getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}
