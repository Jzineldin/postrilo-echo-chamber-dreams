
import { useState, useCallback } from 'react';
import { ContentFormData, GeneratedContentResult } from '@/types/contentGeneration';
import { StandardizedAIError } from '@/services/ai/standardizedErrorHandling';
import { UseContentGeneratorResult, ContentGeneratorState } from '@/types/unifiedContentGeneration';
import { unifiedAIService } from '@/services/ai/unifiedAIService';
import { configurationManager } from '@/services/configurationManager';
import { APP_CONFIG } from '@/config/app';

const getInitialFormData = (): ContentFormData => ({
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
});

export const useUnifiedContentGenerator = (
  onContentGenerated?: (content: GeneratedContentResult) => void,
  onGenerationError?: (error: StandardizedAIError) => void
): UseContentGeneratorResult => {
  const [state, setState] = useState<ContentGeneratorState>({
    formData: getInitialFormData(),
    isGenerating: false,
    generatedContent: null,
    generationError: null,
    retryCount: 0
  });

  const updateFormData = useCallback((updates: Partial<ContentFormData>) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...updates }
    }));
  }, []);

  const generateContent = useCallback(async () => {
    console.log('🎯 useUnifiedContentGenerator: Starting generation');
    
    // Validate form data
    const validation = configurationManager.validateContentFormData(state.formData);
    if (!validation.valid) {
      const error: StandardizedAIError = {
        type: 'validation_error',
        message: `Validation failed: ${validation.errors.join(', ')}`,
        userFriendlyMessage: validation.errors.join(', '),
        retryable: true,
        timestamp: Date.now()
      };
      
      setState(prev => ({ ...prev, generationError: error }));
      onGenerationError?.(error);
      return;
    }

    setState(prev => ({
      ...prev,
      isGenerating: true,
      generationError: null
    }));

    try {
      const result = await unifiedAIService.generateFromFormData(state.formData);
      
      setState(prev => ({
        ...prev,
        generatedContent: result,
        retryCount: 0,
        isGenerating: false
      }));
      
      onContentGenerated?.(result);
      console.log('✅ useUnifiedContentGenerator: Content generated successfully');
    } catch (error) {
      console.error('🚨 useUnifiedContentGenerator: Generation failed:', error);
      const standardizedError = error as StandardizedAIError;
      
      setState(prev => ({
        ...prev,
        generationError: standardizedError,
        isGenerating: false
      }));
      
      onGenerationError?.(standardizedError);
    }
  }, [state.formData, onContentGenerated, onGenerationError]);

  const retryGeneration = useCallback(() => {
    const maxRetries = configurationManager.getAIConfig().maxRetries;
    
    if (state.retryCount < maxRetries) {
      console.log(`🔄 useUnifiedContentGenerator: Retrying generation (${state.retryCount + 1}/${maxRetries})`);
      setState(prev => ({ ...prev, retryCount: prev.retryCount + 1 }));
      generateContent();
    } else {
      console.log('🛑 useUnifiedContentGenerator: Max retries reached');
    }
  }, [state.retryCount, generateContent]);

  const copyContent = useCallback(() => {
    if (state.generatedContent?.content) {
      navigator.clipboard.writeText(state.generatedContent.content);
    }
  }, [state.generatedContent]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, generationError: null }));
  }, []);

  return {
    state,
    actions: {
      updateFormData,
      generateContent,
      retryGeneration,
      copyContent,
      clearError
    }
  };
};
