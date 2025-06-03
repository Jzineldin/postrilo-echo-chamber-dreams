
import { useState, useCallback } from "react";
import { enhancedAIService } from "@/services/ai/enhancedAIService";
import { FormData, GeneratedContent, GenerationError } from "../types";

export const useEnhancedContentGeneration = (
  onSuccess: (content: GeneratedContent) => void,
  onError: (error: GenerationError) => void
) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateEnhancedContent = useCallback(async (formData: FormData) => {
    setIsGenerating(true);
    
    try {
      const result = await enhancedAIService.generateContent({
        prompt: `Create ${formData.contentType} content about ${formData.topic} for ${formData.platform}. Tone: ${formData.tone}. Goal: ${formData.goal}. ${formData.emojiUsage ? 'Include emojis.' : ''} ${formData.hashtagDensity ? 'Include relevant hashtags.' : ''} ${formData.shortSentences ? 'Use short, punchy sentences.' : ''}`,
        platform: formData.platform,
        contentType: formData.contentType,
        tone: formData.tone,
        goal: formData.goal
      });

      if (result.error) {
        const error: GenerationError = {
          type: 'unknown',
          message: typeof result.error === 'string' ? result.error : String(result.error),
          userFriendlyMessage: 'An error occurred while generating content. Please try again.',
          retryable: true
        };
        onError(error);
      } else {
        const content: GeneratedContent = {
          id: Date.now().toString(),
          content: result.content || 'No content generated',
          platform: formData.platform,
          contentType: formData.contentType,
          tone: formData.tone,
          goal: formData.goal,
          topic: formData.topic,
          timestamp: Date.now(),
          hashtags: [],
          cached: false,
          usage: result.usage,
          metadata: {
            platform: formData.platform,
            contentType: formData.contentType,
            generatedAt: Date.now(),
            promptVersion: '1.0'
          }
        };
        onSuccess(content);
      }
    } catch (error) {
      const generationError: GenerationError = {
        type: 'unknown',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        userFriendlyMessage: 'Failed to generate content. Please check your connection and try again.',
        retryable: true
      };
      onError(generationError);
    } finally {
      setIsGenerating(false);
    }
  }, [onSuccess, onError]);

  return {
    isGenerating,
    generateEnhancedContent
  };
};
