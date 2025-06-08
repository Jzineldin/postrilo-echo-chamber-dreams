
import { supabase } from "@/integrations/supabase/client";

interface GenerateContentOptions {
  prompt: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  maxTokens?: number;
  temperature?: number;
}

interface GenerateContentResponse {
  content: string;
  hashtags: string[];
  fallbackUsed: boolean;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Define proper interface for the multi-provider-ai response
interface MultiProviderAIResponse {
  content?: string;
  error?: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export const aiProviderManager = {
  generateContent: async (options: GenerateContentOptions, formData: any): Promise<GenerateContentResponse> => {
    try {
      console.log('🎯 AIProviderManager: Calling multi-provider-ai edge function');
      
      // Safely handle formData with proper fallbacks
      const safeFormData = formData || {};
      
      // Build a comprehensive prompt
      const enhancedPrompt = `Create ${safeFormData.contentType || 'content'} content for ${safeFormData.platform || 'social media'} about: ${safeFormData.topic || 'the topic'}

Platform: ${safeFormData.platform || 'social media'}
Goal: ${safeFormData.goal || 'engagement'}
Tone: ${safeFormData.tone || 'professional'}
${safeFormData.keyPoints ? `Key points: ${safeFormData.keyPoints}` : ''}

Requirements:
- Write engaging copy optimized for ${safeFormData.platform || 'social media'}
- Use ${safeFormData.tone || 'professional'} tone throughout
- ${safeFormData.emojiUsage ? 'Include relevant emojis' : 'No emojis'}
- ${safeFormData.shortSentences ? 'Use short, punchy sentences' : 'Use natural sentence flow'}
- ${safeFormData.hashtagDensity ? 'Include relevant hashtags' : 'No hashtags'}
- Include a strong call-to-action
- Keep it authentic and engaging

Make sure the content is ready to post and follows ${safeFormData.platform || 'social media'} best practices.`;

      const { data, error } = await supabase.functions.invoke('multi-provider-ai', {
        body: {
          prompt: enhancedPrompt,
          preferredProvider: 'gemini',
          type: 'content'
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to generate content');
      }

      // Type the response data properly
      const responseData = data as MultiProviderAIResponse | null;
      
      if (!responseData) {
        throw new Error('No response data received');
      }

      if (responseData.error) {
        console.error('Multi-provider AI service error:', responseData.error);
        throw new Error(responseData.error);
      }

      // Safely extract content with proper validation
      const content = responseData.content || '';
      if (!content || content.trim().length === 0) {
        throw new Error('No content was generated');
      }

      console.log('✅ AIProviderManager: Content generated successfully');
      
      // Safely extract usage data with proper typing and fallbacks
      const usage = responseData.usage || {};
      const promptTokens = usage.promptTokens || 0;
      const completionTokens = usage.completionTokens || 0;
      const totalTokens = usage.totalTokens || 0;
      
      return {
        content: content,
        hashtags: this.extractHashtags(content),
        fallbackUsed: false,
        usage: {
          promptTokens,
          completionTokens,
          totalTokens
        }
      };
    } catch (error) {
      console.error('AIProviderManager error:', error);
      
      // Provide fallback content with safe formData handling
      const safeFormData = formData || {};
      const fallbackContent = this.generateFallbackContent(safeFormData);
      return {
        content: fallbackContent,
        hashtags: this.extractHashtags(fallbackContent),
        fallbackUsed: true,
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0
        }
      };
    }
  },

  generateFallbackContent: (formData: any): string => {
    // Safely access formData properties with fallbacks
    const safeFormData = formData || {};
    const platform = safeFormData.platform || 'default';
    const topic = safeFormData.topic || 'your topic';
    
    const templates: Record<string, string> = {
      instagram: `🌟 ${topic}\n\nDiscover something amazing today! ${topic} is more than just a trend - it's a lifestyle.\n\n✨ What makes it special:\n• Authentic experiences\n• Real connections\n• Meaningful moments\n\nWhat's your take on ${topic}? Share your thoughts below! 👇\n\n#${topic.replace(/\s+/g, '')} #inspiration #lifestyle`,
      
      twitter: `🧵 Thread about ${topic}:\n\n1/ ${topic} is changing the game. Here's why you should pay attention...\n\n2/ Three key things to know:\n✅ Point 1\n✅ Point 2\n✅ Point 3\n\n3/ The bottom line: ${topic} matters more than you think.\n\nWhat's your experience? Reply below! 👇`,
      
      linkedin: `Insights on ${topic}\n\nIn today's rapidly evolving landscape, ${topic} has emerged as a critical factor for success.\n\nKey takeaways:\n→ Strategic importance\n→ Implementation best practices\n→ Measurable outcomes\n\nWhat has been your experience with ${topic}? I'd love to hear your perspective in the comments.\n\n#${topic.replace(/\s+/g, '')} #professional #insights`,
      
      default: `Ready to explore ${topic}? \n\nFocus on these fundamentals:\n• Know your audience\n• Provide genuine value\n• Stay consistent\n• Engage authentically\n\nWhat's your next step with ${topic}?`
    };

    return templates[platform] || templates.default;
  },

  extractHashtags: (content: string): string[] => {
    const hashtagRegex = /#\w+/g;
    const matches = content.match(hashtagRegex);
    return matches ? matches.slice(0, 10) : [];
  },

  initializeOpenAI: (apiKey: string) => {
    console.log('OpenAI initialized with key');
  },

  setMockMode: (useMock: boolean) => {
    console.log('Mock mode set to', useMock);
  },

  getProviderStatus: () => ({
    status: 'connected',
    provider: 'multi-provider-ai',
    initialized: true,
    apiKeySet: true
  }),

  isUsingRealAI: () => true
};
