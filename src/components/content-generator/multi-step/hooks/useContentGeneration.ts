
import { useState, useCallback } from 'react';
import { FormData } from '../types';
import { useToast } from '@/hooks/use-toast';

interface GeneratedContent {
  content: string;
  hashtags: string[];
  platform: string;
}

export const useContentGeneration = () => {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [suggestedHashtags, setSuggestedHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateMockContent = useCallback((formData: FormData): GeneratedContent => {
    const platform = formData.platforms[0] || 'instagram';
    
    // Mock content generation based on form data
    const contentTemplates = {
      'post': `🌟 Let's talk about ${formData.topic}!

${formData.keyPoints.length > 0 ? formData.keyPoints.map((point, index) => `${index + 1}. ${point}`).join('\n') : 'Here are some key insights about this topic...'}

What are your thoughts? Let me know in the comments! 👇

#${formData.topic.replace(/\s+/g, '')} #SocialMedia`,
      
      'video-script': `[INTRO]
Hey everyone! Today we're diving into ${formData.topic}.

[MAIN CONTENT]
${formData.keyPoints.length > 0 ? formData.keyPoints.map(point => `- ${point}`).join('\n') : 'Key points about this topic...'}

[OUTRO]
Thanks for watching! Don't forget to like and subscribe!`,
      
      'story': `Quick story about ${formData.topic}! 📱

${formData.keyPoints.length > 0 ? formData.keyPoints[0] : 'Something interesting happened...'}`
    };

    const hashtagTemplates = {
      'instagram': ['#instagram', '#content', '#socialmedia', '#marketing'],
      'twitter': ['#twitter', '#tweet', '#socialmedia'],
      'linkedin': ['#linkedin', '#professional', '#business'],
      'facebook': ['#facebook', '#social', '#community'],
      'tiktok': ['#tiktok', '#viral', '#trending'],
      'youtube': ['#youtube', '#video', '#creator']
    };

    return {
      content: contentTemplates[formData.contentType as keyof typeof contentTemplates] || contentTemplates['post'],
      hashtags: hashtagTemplates[platform as keyof typeof hashtagTemplates] || hashtagTemplates['instagram'],
      platform
    };
  }, []);

  const handleGenerate = useCallback(async (formData: FormData, canGenerate: boolean) => {
    if (!canGenerate) {
      toast({
        title: "Generation Limit Reached",
        description: "You've reached your monthly generation limit.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = generateMockContent(formData);
      setGeneratedContent(result.content);
      setSuggestedHashtags(result.hashtags);
      
      toast({
        title: "Content Generated!",
        description: `Successfully generated content for ${result.platform}`,
      });
    } catch (error) {
      console.error('Content generation error:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  }, [generateMockContent, toast]);

  return {
    generatedContent,
    suggestedHashtags,
    isGenerating,
    handleGenerate
  };
};
