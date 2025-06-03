
import { PromptOptimizer, PlatformPromptConfig } from './promptOptimizer';

export interface EnhancedAIRequest extends PlatformPromptConfig {
  maxTokens?: number;
  temperature?: number;
  useCache?: boolean;
}

export interface AIError {
  type: 'rate_limit' | 'service_disruption' | 'content_moderation' | 'api_error' | 'network_error';
  message: string;
  retryAfter?: number;
  details?: any;
}

export interface EnhancedAIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  cached?: boolean;
  error?: AIError;
  metadata?: {
    platform: string;
    contentType: string;
    generatedAt: number;
    promptVersion: string;
  };
}

class EnhancedAIService {
  private apiKey: string | null = null;
  private provider: string = 'openai';
  private retryAttempts = 3;
  private retryDelay = 1000;

  setApiKey(apiKey: string, provider: string = 'openai') {
    console.log('Enhanced AI Service: Setting API key for provider:', provider);
    this.apiKey = apiKey;
    this.provider = provider;
  }

  async generateEnhancedContent(request: EnhancedAIRequest): Promise<EnhancedAIResponse> {
    console.log('Enhanced AI Service: Generate content request:', {
      platform: request.platform,
      contentType: request.contentType,
      hasApiKey: !!this.apiKey,
      provider: this.provider
    });

    try {
      // Generate optimized prompt
      const optimizedPrompt = PromptOptimizer.generateOptimizedPrompt(request);
      
      // Try to use real AI if API key is available
      if (this.apiKey && this.provider === 'openai') {
        return await this.generateWithEnhancedOpenAI(optimizedPrompt, request);
      }
      
      // Fallback to enhanced demo mode
      return await this.generateEnhancedDemo(optimizedPrompt, request);
    } catch (error) {
      console.error('Enhanced AI generation error:', error);
      return this.handleAIError(error, request);
    }
  }

  private async generateWithEnhancedOpenAI(prompt: string, request: EnhancedAIRequest): Promise<EnhancedAIResponse> {
    console.log('Using enhanced OpenAI API for content generation');
    
    let lastError: any;
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You are a world-class social media content creator and copywriter. Create engaging, platform-optimized content that drives results. Follow the exact requirements provided.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: request.temperature || 0.7,
            max_tokens: request.maxTokens || 500,
          }),
        });

        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('retry-after') || '60');
          throw { type: 'rate_limit', retryAfter, message: 'Rate limit exceeded' };
        }

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Check for content moderation flags
        if (data.choices[0].finish_reason === 'content_filter') {
          throw { type: 'content_moderation', message: 'Content was filtered by moderation system' };
        }
        
        return {
          content: data.choices[0].message.content,
          usage: {
            promptTokens: data.usage?.prompt_tokens || 0,
            completionTokens: data.usage?.completion_tokens || 0,
            totalTokens: data.usage?.total_tokens || 0
          },
          metadata: {
            platform: request.platform,
            contentType: request.contentType,
            generatedAt: Date.now(),
            promptVersion: '2.0'
          }
        };
      } catch (error: any) {
        lastError = error;
        
        if (error.type === 'rate_limit' && attempt < this.retryAttempts) {
          console.log(`Rate limited, retrying in ${error.retryAfter}s...`);
          await new Promise(resolve => setTimeout(resolve, error.retryAfter * 1000));
          continue;
        }
        
        if (attempt < this.retryAttempts && !error.type) {
          console.log(`Attempt ${attempt} failed, retrying...`);
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
          continue;
        }
        
        throw error;
      }
    }
    
    throw lastError;
  }

  private async generateEnhancedDemo(prompt: string, request: EnhancedAIRequest): Promise<EnhancedAIResponse> {
    console.log('Using enhanced demo mode for content generation');
    
    // Simulate realistic AI delay
    const delay = 2000 + Math.random() * 3000;
    await new Promise(resolve => setTimeout(resolve, delay));

    const content = this.generatePlatformSpecificContent(request);

    return {
      content,
      usage: {
        promptTokens: Math.floor(prompt.length / 4),
        completionTokens: Math.floor(content.length / 4),
        totalTokens: 0
      },
      metadata: {
        platform: request.platform,
        contentType: request.contentType,
        generatedAt: Date.now(),
        promptVersion: '2.0-demo'
      }
    };
  }

  private generatePlatformSpecificContent(request: EnhancedAIRequest): string {
    const { platform, contentType, tone, goal, topic } = request;

    // Platform-specific content generation
    if (platform === 'twitter') {
      return this.generateTwitterContent(topic, tone, goal);
    } else if (platform === 'instagram') {
      return this.generateInstagramContent(topic, tone, goal);
    } else if (platform === 'linkedin') {
      return this.generateLinkedInContent(topic, tone, goal);
    } else if (platform === 'facebook') {
      return this.generateFacebookContent(topic, tone, goal);
    } else if (platform === 'tiktok') {
      return this.generateTikTokContent(topic, tone, goal);
    } else if (platform === 'youtube') {
      return this.generateYouTubeContent(topic, tone, goal);
    }

    return this.generateGenericContent(topic, tone, goal);
  }

  private generateTwitterContent(topic: string, tone: string, goal: string): string {
    const hooks = ["🧵 Thread:", "Hot take:", "Unpopular opinion:", "Real talk:", "Quick reminder:"];
    const hook = hooks[Math.floor(Math.random() * hooks.length)];
    
    return `${hook} ${topic} is changing everything.

Here's why this matters for your business:

• Problem: Most people struggle with outdated approaches
• Solution: Modern strategies that actually work
• Result: Better outcomes in less time

The key insight? Start small, think big, move fast.

What's your experience with ${topic}? Drop a comment 👇

#business #growth #${topic.replace(/\s+/g, '').toLowerCase()}`;
  }

  private generateInstagramContent(topic: string, tone: string, goal: string): string {
    return `✨ The ${topic} game is changing, and here's what you need to know...

🎯 What I've learned:
→ Consistency beats perfection every time
→ Authentic content outperforms polished posts
→ Community is everything

💫 The secret sauce? 
Stop trying to be everything to everyone. Find your niche, serve your people, and watch the magic happen.

📸 Swipe for more insights →

What's your biggest challenge with ${topic}? Let me know in the comments! 👇

#${topic.replace(/\s+/g, '').toLowerCase()} #contentcreator #businesstips #authenticity #growth #community #entrepreneur #socialmediamarketing #digitalmarketing #success`;
  }

  private generateLinkedInContent(topic: string, tone: string, goal: string): string {
    return `The future of ${topic} isn't what most people think it is.

After analyzing industry trends and working with dozens of companies, I've identified three critical shifts happening right now:

1️⃣ Traditional approaches are becoming obsolete
Companies that stick to old methods are losing competitive advantage daily.

2️⃣ Innovation is democratizing opportunities
Small businesses can now compete with enterprise-level solutions.

3️⃣ Customer expectations have fundamentally changed
What worked 5 years ago won't work today.

The companies thriving in this new landscape share one common trait: they embrace change as a competitive advantage.

📊 Key insight: Organizations that adapt quickly see 40% better performance metrics than those that resist change.

What trends are you seeing in your industry? I'd love to hear your perspective in the comments.

♻️ Repost if this resonates with your network.

#leadership #innovation #businessstrategy #digitaltransformation #${topic.replace(/\s+/g, '').toLowerCase()}`;
  }

  private generateFacebookContent(topic: string, tone: string, goal: string): string {
    return `Hey everyone! 👋

I wanted to share something that's been on my mind lately about ${topic}...

You know that feeling when you discover something that completely changes your perspective? That's exactly what happened to me recently.

Here's the thing: we often overcomplicate ${topic} when the solution is usually much simpler than we think.

🔑 The game-changer? 
Start with one small step. Just one. Then build from there.

I've seen so many people (myself included!) get overwhelmed trying to do everything at once. But the most successful people I know? They master the basics first.

💭 What's one small step you could take today related to ${topic}?

Drop a comment below - I love hearing your thoughts and experiences! Let's learn from each other. 🤗

#${topic.replace(/\s+/g, '').toLowerCase()} #community #growth #motivation`;
  }

  private generateTikTokContent(topic: string, tone: string, goal: string): string {
    return `POV: You just discovered the ${topic} hack that changes everything 🤯

Wait for it... 

The secret everyone's been gatekeeping:

✨ Step 1: Stop overthinking it
✨ Step 2: Start before you're ready  
✨ Step 3: Learn as you go

Plot twist: The "experts" started exactly where you are right now 😮‍💨

Who else needed to hear this today? 

Drop a 🔥 if you're ready to stop waiting and start doing!

#${topic.replace(/\s+/g, '').toLowerCase()} #motivation #fyp #mindset #success #viral #trendy #gamechangers #facts #truth`;
  }

  private generateYouTubeContent(topic: string, tone: string, goal: string): string {
    return `🎬 In today's video: The Ultimate ${topic} Guide That Actually Works

I've been getting tons of questions about ${topic}, so I decided to create the most comprehensive guide you'll find anywhere.

📚 What you'll learn:
• The biggest mistakes people make (and how to avoid them)
• Step-by-step strategy that gets results
• Real examples from successful implementations
• Tools and resources I personally recommend

⚡ Timestamps:
00:00 - Introduction
02:30 - Common Mistakes
05:15 - The Framework
08:45 - Real Examples
12:20 - Tools & Resources
15:00 - Next Steps

This video took me weeks to put together, and I'm sharing everything I've learned from years of experience in ${topic}.

💬 Let me know in the comments which part was most helpful, and what topics you'd like me to cover next!

🔔 Don't forget to subscribe and hit the notification bell for more content like this!

#${topic.replace(/\s+/g, '').toLowerCase()} #tutorial #guide #tips #education #howto`;
  }

  private generateGenericContent(topic: string, tone: string, goal: string): string {
    return `The truth about ${topic} that no one talks about:

It's not about having the perfect strategy or the best tools.

It's about consistency, adaptability, and genuine value creation.

Here's what I've learned:
• Start with your audience's needs, not your product
• Authenticity beats perfection every time
• Small consistent actions create massive results

Ready to transform your approach to ${topic}?

#contentstrategy #marketing #growth #${topic.replace(/\s+/g, '').toLowerCase()}`;
  }

  private handleAIError(error: any, request: EnhancedAIRequest): EnhancedAIResponse {
    console.error('AI Service Error:', error);

    let aiError: AIError;

    if (error.type === 'rate_limit') {
      aiError = {
        type: 'rate_limit',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: error.retryAfter
      };
    } else if (error.type === 'content_moderation') {
      aiError = {
        type: 'content_moderation',
        message: 'Content was flagged by moderation system. Please try a different topic.',
        details: error.details
      };
    } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
      aiError = {
        type: 'network_error',
        message: 'Network error. Please check your connection and try again.'
      };
    } else if (error.message?.includes('API')) {
      aiError = {
        type: 'service_disruption',
        message: 'AI service is temporarily unavailable. Please try again in a few minutes.'
      };
    } else {
      aiError = {
        type: 'api_error',
        message: 'An unexpected error occurred. Please try again.',
        details: error.message
      };
    }

    // Return fallback content for certain error types
    if (aiError.type === 'content_moderation' || aiError.type === 'service_disruption') {
      return {
        content: this.generateFallbackContent(request),
        error: aiError,
        metadata: {
          platform: request.platform,
          contentType: request.contentType,
          generatedAt: Date.now(),
          promptVersion: 'fallback'
        }
      };
    }

    return {
      content: '',
      error: aiError
    };
  }

  private generateFallbackContent(request: EnhancedAIRequest): string {
    return `Ready to elevate your ${request.topic} strategy? 

Here's what successful brands are doing:
✅ Focusing on value-first content
✅ Building authentic connections
✅ Staying consistent with their message

What's your approach to ${request.topic}? Share your thoughts below!

#${request.topic.replace(/\s+/g, '').toLowerCase()} #contentmarketing #socialmedia`;
  }
}

export const enhancedAIService = new EnhancedAIService();
