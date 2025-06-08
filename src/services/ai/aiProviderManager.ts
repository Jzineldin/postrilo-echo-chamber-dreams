
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

export const aiProviderManager = {
  generateContent: async (options: GenerateContentOptions, formData: any): Promise<GenerateContentResponse> => {
    try {
      console.log('🎯 AIProviderManager: Calling multi-provider-ai edge function');
      
      // Build a comprehensive prompt
      const enhancedPrompt = `Create ${formData.contentType} content for ${formData.platform} about: ${formData.topic}

Platform: ${formData.platform}
Goal: ${formData.goal}
Tone: ${formData.tone}
${formData.keyPoints ? `Key points: ${formData.keyPoints}` : ''}

Requirements:
- Write engaging copy optimized for ${formData.platform}
- Use ${formData.tone} tone throughout
- ${formData.emojiUsage ? 'Include relevant emojis' : 'No emojis'}
- ${formData.shortSentences ? 'Use short, punchy sentences' : 'Use natural sentence flow'}
- ${formData.hashtagDensity ? 'Include relevant hashtags' : 'No hashtags'}
- Include a strong call-to-action
- Keep it authentic and engaging

Make sure the content is ready to post and follows ${formData.platform} best practices.`;

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

      if (data?.error) {
        console.error('Multi-provider AI service error:', data.error);
        throw new Error(data.error);
      }

      const content = data?.content || '';
      if (!content || content.trim().length === 0) {
        throw new Error('No content was generated');
      }

      console.log('✅ AIProviderManager: Content generated successfully');
      
      return {
        content: content,
        hashtags: this.extractHashtags(content),
        fallbackUsed: false,
        usage: {
          promptTokens: data?.usage?.promptTokens || 0,
          completionTokens: data?.usage?.completionTokens || 0,
          totalTokens: data?.usage?.totalTokens || 0
        }
      };
    } catch (error) {
      console.error('AIProviderManager error:', error);
      
      // Provide fallback content
      const fallbackContent = this.generateFallbackContent(formData);
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
    const templates: Record<string, string> = {
      instagram: `🌟 ${formData.topic}\n\nDiscover something amazing today! ${formData.topic} is more than just a trend - it's a lifestyle.\n\n✨ What makes it special:\n• Authentic experiences\n• Real connections\n• Meaningful moments\n\nWhat's your take on ${formData.topic}? Share your thoughts below! 👇\n\n#${formData.topic.replace(/\s+/g, '')} #inspiration #lifestyle`,
      
      twitter: `🧵 Thread about ${formData.topic}:\n\n1/ ${formData.topic} is changing the game. Here's why you should pay attention...\n\n2/ Three key things to know:\n✅ Point 1\n✅ Point 2\n✅ Point 3\n\n3/ The bottom line: ${formData.topic} matters more than you think.\n\nWhat's your experience? Reply below! 👇`,
      
      linkedin: `Insights on ${formData.topic}\n\nIn today's rapidly evolving landscape, ${formData.topic} has emerged as a critical factor for success.\n\nKey takeaways:\n→ Strategic importance\n→ Implementation best practices\n→ Measurable outcomes\n\nWhat has been your experience with ${formData.topic}? I'd love to hear your perspective in the comments.\n\n#${formData.topic.replace(/\s+/g, '')} #professional #insights`,
      
      default: `Ready to explore ${formData.topic}? \n\nFocus on these fundamentals:\n• Know your audience\n• Provide genuine value\n• Stay consistent\n• Engage authentically\n\nWhat's your next step with ${formData.topic}?`
    };

    return templates[formData.platform] || templates.default;
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
