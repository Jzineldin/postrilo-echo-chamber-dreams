
import { supabase } from '@/integrations/supabase/client';

export interface AIGenerationRequest {
  prompt: string;
  platform: string;
  contentType: string;
  tone?: string;
  goal?: string;
  maxRetries?: number;
}

export interface AIGenerationResponse {
  content: string;
  error?: string;
  provider?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

class EnhancedAIService {
  private maxRetries = 3;
  private retryDelay = 1000; // 1 second

  async generateContent(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    console.log('🎯 EnhancedAI: Starting content generation with enhanced error handling');
    
    const maxRetries = request.maxRetries || this.maxRetries;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 EnhancedAI: Attempt ${attempt}/${maxRetries}`);
        
        const { data, error } = await supabase.functions.invoke('multi-provider-ai', {
          body: { 
            prompt: this.buildOptimizedPrompt(request),
            preferredProvider: 'gemini'
          }
        });

        if (error) {
          console.error(`🚨 EnhancedAI: Supabase function error on attempt ${attempt}:`, error);
          
          if (attempt === maxRetries) {
            return this.generateFallbackContent(request);
          }
          
          await this.delay(this.retryDelay * attempt);
          continue;
        }

        if (data?.error) {
          console.error(`🚨 EnhancedAI: AI provider error on attempt ${attempt}:`, data.error);
          
          if (attempt === maxRetries) {
            return this.generateFallbackContent(request);
          }
          
          await this.delay(this.retryDelay * attempt);
          continue;
        }

        if (!data?.content?.trim()) {
          console.error(`🚨 EnhancedAI: Empty content received on attempt ${attempt}`);
          
          if (attempt === maxRetries) {
            return this.generateFallbackContent(request);
          }
          
          await this.delay(this.retryDelay * attempt);
          continue;
        }

        console.log('✅ EnhancedAI: Successfully generated content');
        return {
          content: data.content,
          provider: data.provider || 'unknown',
          usage: data.usage || { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
        };

      } catch (error) {
        console.error(`🚨 EnhancedAI: Network error on attempt ${attempt}:`, error);
        
        if (attempt === maxRetries) {
          return this.generateFallbackContent(request);
        }
        
        await this.delay(this.retryDelay * attempt);
      }
    }

    return this.generateFallbackContent(request);
  }

  private buildOptimizedPrompt(request: AIGenerationRequest): string {
    const { prompt, platform, contentType, tone = 'professional', goal = 'engagement' } = request;
    
    return `Create a ${contentType} for ${platform} about: ${prompt}

Platform: ${platform}
Goal: ${goal}
Tone: ${tone}

Requirements:
- Write engaging copy optimized for ${platform}
- Use ${tone} tone throughout
- Include a strong call-to-action
- Keep appropriate length for ${platform}
- Make it compelling and shareable

Topic: ${prompt}`;
  }

  private generateFallbackContent(request: AIGenerationRequest): AIGenerationResponse {
    console.log('🔄 EnhancedAI: Generating intelligent fallback content');
    
    const topic = this.extractTopicFromPrompt(request.prompt);
    const platform = request.platform;
    
    const fallbackTemplates = {
      instagram: `🌟 Exciting insights about ${topic}!

${topic} is transforming the way we think about innovation. Here's what makes it special:

✨ Revolutionary approach to modern challenges
🎯 Real-world impact that matters
💡 Future possibilities worth exploring

What's your experience with ${topic}? Share your thoughts below!

#${topic.replace(/\s+/g, '')} #Innovation #Insights`,

      twitter: `🚀 ${topic} is changing the game!

Key insights:
• Breakthrough developments
• Practical applications  
• Future trends to watch

What do you think about ${topic}? Share your thoughts! 

#${topic.replace(/\s+/g, '')} #Innovation`,

      linkedin: `Insights on ${topic}

${topic} represents a significant development in our industry. Here are key considerations:

→ Strategic implications for businesses
→ Emerging opportunities and challenges  
→ Best practices for implementation

How is your organization approaching ${topic}? I'd welcome your perspective.

#${topic.replace(/\s+/g, '')} #Business #Innovation`,

      facebook: `Let's talk about ${topic}! 🌟

${topic} has been creating waves, and here's why it matters:

🔍 Unique value proposition
🌈 Measurable impact across industries
⚡ Building momentum for what's next

How do you see ${topic} evolving? Share your thoughts - I'd love to hear your perspective!

#${topic.replace(/\s+/g, '')} #Discussion`,

      tiktok: `POV: You discovered ${topic} 🤯

${topic} is literally changing everything and here's why:

🔥 Game-changing innovation
🔥 Real-world applications  
🔥 Future possibilities
🔥 Community impact

Who else is excited about ${topic}?? Drop a 🚀 if you're ready to learn more!

#${topic.replace(/\s+/g, '')} #Innovation #TikTokMadeMeDoIt`
    };

    const content = fallbackTemplates[platform as keyof typeof fallbackTemplates] || fallbackTemplates.instagram;
    
    return {
      content,
      error: 'AI service temporarily unavailable - using smart fallback content',
      provider: 'fallback',
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
    };
  }

  private extractTopicFromPrompt(prompt: string): string {
    const cleanPrompt = prompt.toLowerCase().trim();
    
    // Extract topic after common phrases
    const patterns = [
      /about[:\s]+([^.!?\n]+)/,
      /topic[:\s]+([^.!?\n]+)/,
      /create.*for[:\s]+([^.!?\n]+)/,
      /generate.*about[:\s]+([^.!?\n]+)/,
      /write.*about[:\s]+([^.!?\n]+)/
    ];
    
    for (const pattern of patterns) {
      const match = cleanPrompt.match(pattern);
      if (match && match[1]) {
        return match[1].trim().split(' ').slice(0, 3).join(' ');
      }
    }
    
    // Fallback to first few words
    const words = prompt.trim().split(' ').slice(0, 3).join(' ');
    return words || 'innovation';
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async healthCheck(): Promise<{ 
    status: 'healthy' | 'degraded' | 'down'; 
    details: string;
    canGenerate: boolean;
  }> {
    try {
      const testPrompt = "Test connection - respond with 'Connection successful'";
      const result = await this.generateContent({
        prompt: testPrompt,
        platform: 'twitter',
        contentType: 'post',
        maxRetries: 1
      });
      
      if (result.error && result.provider !== 'fallback') {
        return {
          status: 'down',
          details: result.error,
          canGenerate: false
        };
      }
      
      if (result.provider === 'fallback') {
        return {
          status: 'degraded',
          details: 'AI service using fallback mode',
          canGenerate: true
        };
      }
      
      return {
        status: 'healthy',
        details: 'AI service is fully operational',
        canGenerate: true
      };
      
    } catch (error) {
      return {
        status: 'down',
        details: 'Health check failed',
        canGenerate: false
      };
    }
  }
}

export const enhancedAIService = new EnhancedAIService();
