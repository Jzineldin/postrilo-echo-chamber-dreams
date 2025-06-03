
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { centralizedAIService } from "@/services/centralizedAIService";
import { EnhancedPromptService } from "@/services/ai/enhancedPromptService";
import { ContentQualityService } from "@/services/ai/contentQualityService";
import { ContentLanguageService } from "@/services/ai/contentLanguageService";
import { EngagingPromptService } from "@/services/ai/engagingPromptService";
import { useContentValidation } from "@/hooks/useContentValidation";
import { FormData } from "../types";

export const useContentGeneration = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [suggestedHashtags, setSuggestedHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { shouldRetryGeneration, evaluateRetryImprovement } = useContentValidation();

  const handleGenerate = async (formData: FormData, canGenerateMore: boolean) => {
    if (!canGenerateMore) {
      toast({
        title: "Generation Limit Reached",
        description: "You've reached your monthly post limit.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.topic?.trim()) {
      toast({
        title: "Missing Topic",
        description: "Please provide a topic for your content.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Create engaging prompt
      const engagingPrompt = EngagingPromptService.createEngagingPrompt(formData);
      
      console.log('🎯 Enhanced Engaging Prompt:', engagingPrompt);
      
      const response = await centralizedAIService.generateContent({
        prompt: engagingPrompt,
        type: formData.contentType === 'video-script' ? 'video-script' : 'content',
        temperature: formData.tone === 'humorous' ? 0.8 : 0.7,
        maxTokens: formData.contentType === 'video-script' ? 1000 : 800,
        platforms: [formData.platform]
      });

      if (response.error && !response.content) {
        throw new Error(response.error);
      }

      let content = response.content;
      
      // Clean up content
      content = ContentLanguageService.cleanGeneratedContent(content, formData.language);
      
      // Quality check
      const qualityCheck = ContentQualityService.evaluateContent(
        content, 
        formData.platform, 
        formData.language
      );
      
      console.log('📊 Content Quality Analysis:', {
        score: qualityCheck.score,
        issues: qualityCheck.issues,
        language: formData.language
      });
      
      // Retry if needed
      if (shouldRetryGeneration(content, formData, qualityCheck.score)) {
        console.log('🔄 Quality issue detected, attempting refined prompt...');
        
        const refinedPrompt = EngagingPromptService.createRefinedRetryPrompt(formData);
        
        const retryResponse = await centralizedAIService.generateContent({
          prompt: refinedPrompt,
          type: formData.contentType === 'video-script' ? 'video-script' : 'content',
          temperature: formData.tone === 'humorous' ? 0.9 : 0.8,
          maxTokens: formData.contentType === 'video-script' ? 1000 : 800,
          platforms: [formData.platform]
        });
        
        if (retryResponse.content) {
          const cleanedRetryContent = ContentLanguageService.cleanGeneratedContent(
            retryResponse.content, 
            formData.language
          );
          
          const improvement = evaluateRetryImprovement(content, cleanedRetryContent, formData);
          
          if (improvement.useRetry) {
            content = cleanedRetryContent;
            console.log('✅', improvement.reason);
          }
        }
      }

      setGeneratedContent(content);

      // Generate hashtags
      if (formData.platform !== 'linkedin') {
        const hashtags = EnhancedPromptService.generateSmartHashtags(
          content, 
          formData.platform, 
          formData.language
        );
        setSuggestedHashtags(hashtags);
      }

      toast({
        title: "Content Generated!",
        description: `Engaging content created for ${formData.platform} in ${formData.language}`,
      });

    } catch (error) {
      console.error('Content generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatedContent,
    suggestedHashtags,
    isGenerating,
    handleGenerate
  };
};
