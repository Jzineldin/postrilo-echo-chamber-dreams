
import { useState, useCallback } from 'react';
import { ContentFormData, GeneratedContentResult } from '@/types/contentGeneration';
import { StandardizedAIError } from '@/services/ai/standardizedErrorHandling';
import { unifiedAIService } from '@/services/ai/unifiedAIService';

interface UnifiedContentGenerationOptions {
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

export const useUnifiedContentGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastError, setLastError] = useState<StandardizedAIError | null>(null);

  const generateContent = useCallback(async (
    options: UnifiedContentGenerationOptions,
    onSuccess?: (content: GeneratedContentResult) => void,
    onError?: (error: StandardizedAIError) => void
  ) => {
    setIsGenerating(true);
    setLastError(null);

    try {
      const formData: ContentFormData = {
        topic: options.topic,
        platform: options.platform as any,
        contentType: options.contentType as any,
        tone: options.tone as any,
        goal: options.goal as any,
        keyPoints: options.keyPoints || '',
        emojiUsage: options.emojiUsage || false,
        hashtagDensity: options.hashtagDensity || false,
        shortSentences: options.shortSentences || false,
        useCache: true
      };

      const result = await unifiedAIService.generateFromFormData(formData);
      onSuccess?.(result);
      return result;
    } catch (error) {
      const standardizedError = error as StandardizedAIError;
      setLastError(standardizedError);
      onError?.(standardizedError);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setLastError(null);
  }, []);

  return {
    generateContent,
    isGenerating,
    lastError,
    clearError
  };
};
