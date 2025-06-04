
import { useState } from 'react';
import { useContentTracker } from './useContentTracker';
import { centralizedAIService } from '@/services/centralizedAIService';
import { useToast } from './use-toast';
import { FormData, GeneratedContent, GenerationError } from '@/components/enhanced-content-generator/types';

export const useEnhancedContentGeneration = (
  onContentGenerated: (content: GeneratedContent) => void,
  onGenerationError: (error: GenerationError) => void
) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { trackContentGeneration } = useContentTracker();
  const { toast } = useToast();

  const generateEnhancedContent = async (formData: FormData) => {
    if (!formData.topic?.trim()) {
      onGenerationError({
        type: 'validation_error',
        message: "Please provide a topic for your content",
        userFriendlyMessage: "Please provide a topic for your content",
        retryable: false
      });
      return;
    }

    setIsGenerating(true);

    try {
      toast({
        title: "Generating Content",
        description: `Creating ${formData.contentType} for ${formData.platform}...`,
      });

      const response = await centralizedAIService.generateContent({
        prompt: formData.topic,
        type: formData.contentType === 'video-script' ? 'video-script' : 'content',
        temperature: 0.7,
        maxTokens: formData.contentType === 'video-script' ? 800 : 600,
        platforms: [formData.platform]
      });

      if (response.error && !response.content) {
        throw new Error(response.error);
      }

      const content = response.content;
      if (!content || content.trim().length === 0) {
        throw new Error("No content was generated. Please try again.");
      }

      const contentId = `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Track content generation for analytics
      trackContentGeneration({
        contentId,
        platform: formData.platform,
        contentType: formData.contentType,
        tone: formData.tone,
        goal: formData.goal,
        topic: formData.topic
      });

      const generatedContent: GeneratedContent = {
        id: contentId,
        content,
        platform: formData.platform,
        contentType: formData.contentType,
        tone: formData.tone,
        goal: formData.goal,
        topic: formData.topic,
        timestamp: Date.now(),
        hashtags: [],
        cached: false,
        usage: {
          promptTokens: response.usage?.promptTokens || 0,
          completionTokens: response.usage?.completionTokens || 0,
          totalTokens: response.usage?.totalTokens || 0
        },
        metadata: {
          platform: formData.platform,
          contentType: formData.contentType,
          generatedAt: Date.now(),
          promptVersion: 'v1.0'
        }
      };

      onContentGenerated(generatedContent);

      toast({
        title: "Content Generated!",
        description: `Created ${formData.contentType} for ${formData.platform}`,
      });

    } catch (error) {
      console.error('Content generation failed:', error);
      
      onGenerationError({
        type: 'unknown',
        message: error instanceof Error ? error.message : 'Failed to generate content',
        userFriendlyMessage: error instanceof Error ? error.message : 'Failed to generate content',
        retryable: true
      });

      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : 'Failed to generate content',
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generateEnhancedContent
  };
};
