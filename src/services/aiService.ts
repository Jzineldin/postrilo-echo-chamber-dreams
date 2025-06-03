
import { OpenAIProvider } from './ai/providers/openAIProvider';
import { DemoProvider } from './ai/providers/demoProvider';
import { AIErrorHandler, AIError } from './ai/errorHandling';

export interface AIProvider {
  name: string;
  apiKey: string;
  models: string[];
}

export interface AIGenerationRequest {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  context?: string;
}

export interface AIGenerationResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface ContentOptimizationRequest {
  content: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok';
  objective: 'engagement' | 'reach' | 'conversion' | 'brand_awareness';
}

export interface ContentSuggestion {
  type: 'hashtag' | 'copy_improvement' | 'timing' | 'visual' | 'cta';
  suggestion: string;
  reasoning: string;
  confidence: number;
}

class AIService {
  private apiKey: string | null = null;
  private provider: string = 'openai';
  private openAIProvider: OpenAIProvider | null = null;
  private demoProvider: DemoProvider = new DemoProvider();

  setApiKey(apiKey: string, provider: string = 'openai') {
    console.log('AI Service: Setting API key for provider:', provider);
    this.apiKey = apiKey;
    this.provider = provider;
    
    if (apiKey && provider === 'openai') {
      this.openAIProvider = new OpenAIProvider(apiKey);
    }
  }

  async generateContent(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    console.log('AI Service: Generate content request:', {
      promptLength: request.prompt.length,
      model: request.model,
      hasApiKey: !!this.apiKey,
      provider: this.provider
    });

    try {
      // Try to use real AI if API key is available
      if (this.openAIProvider) {
        return await this.openAIProvider.generateContent({
          prompt: request.prompt,
          maxTokens: request.maxTokens,
          temperature: request.temperature
        });
      }
      
      // Fallback to enhanced demo mode
      return await this.demoProvider.generateContent({
        prompt: request.prompt,
        maxTokens: request.maxTokens,
        temperature: request.temperature
      });
    } catch (error) {
      console.error('AI generation error:', error);
      // Fallback to enhanced demo if real AI fails
      return await this.demoProvider.generateContent({
        prompt: request.prompt,
        maxTokens: request.maxTokens,
        temperature: request.temperature
      });
    }
  }

  private async generateWithOpenAI(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    console.log('Using real OpenAI API for content generation');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional social media content creator and copywriter. Create engaging, authentic, and platform-optimized content that drives engagement and conversions.'
          },
          {
            role: 'user',
            content: request.prompt
          }
        ],
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      content: data.choices[0].message.content,
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      }
    };
  }

  private async generateEnhancedDemo(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    console.log('Using enhanced demo mode for content generation');
    
    // Simulate realistic AI delay
    const delay = 2000 + Math.random() * 3000;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Parse the prompt to understand what's being requested
    const prompt = request.prompt.toLowerCase();
    let enhancedContent = '';

    if (prompt.includes('nocco') && prompt.includes('energy drink')) {
      enhancedContent = this.generateNoccoContent(request);
    } else if (prompt.includes('brand story')) {
      enhancedContent = this.generateBrandStoryContent(request);
    } else if (prompt.includes('video script')) {
      enhancedContent = this.generateVideoScriptContent(request);
    } else {
      enhancedContent = this.generateGenericContent(request);
    }

    const response = {
      content: enhancedContent,
      usage: {
        promptTokens: Math.floor(request.prompt.length / 4),
        completionTokens: Math.floor(enhancedContent.length / 4),
        totalTokens: 0
      }
    };
    response.usage.totalTokens = response.usage.promptTokens + response.usage.completionTokens;

    return response;
  }

  private generateNoccoContent(request: AIGenerationRequest): string {
    const platform = this.extractPlatform(request.prompt);
    const contentType = this.extractContentType(request.prompt);
    const tone = this.extractTone(request.prompt);

    if (platform === 'tiktok') {
      if (tone === 'professional') {
        return `🚀 Meet NOCCO - The Energy Revolution

New to the energy drink game? Here's why NOCCO is changing everything:

✅ Zero sugar, maximum energy
✅ BCAA-powered performance boost  
✅ Clean ingredients you can pronounce
✅ Tastes incredible (seriously!)

While other brands pump you full of sugar crashes, NOCCO delivers sustained energy that actually works WITH your body.

Ready to upgrade your energy game? 

#NOCCO #EnergyDrink #ZeroSugar #CleanEnergy #Fitness #Performance #NewBrand #EnergyRevolution #HealthyLiving #TikTokMadeMeBuyIt`;
      } else {
        return `POV: You found the energy drink that doesn't make you crash 😮‍💨

Guys... NOCCO just dropped and I'm OBSESSED ✨

🔥 Zero sugar (but tastes like candy)
🔥 BCAA for actual muscle recovery
🔥 Energy that lasts ALL DAY
🔥 No jittery feeling

The strawberry flavor is literally heaven in a can 🍓

Who else is trying this?? Drop a 🚀 if you're ready to ditch your old energy drink!

#NOCCO #EnergyDrink #NewObsession #ZeroSugar #FitnessCheck #EnergyBoost #TikTokFinds #MustTry #CleanEnergy #GameChanger`;
      }
    }

    return `Introducing NOCCO - The next generation energy drink that's about to change your entire routine.

What makes NOCCO different? Everything.

While other energy drinks leave you crashing, NOCCO delivers clean, sustained energy with zero sugar and added BCAAs for recovery.

This isn't just another energy drink - it's a complete performance upgrade.

Ready to experience the difference?

#NOCCO #EnergyDrink #ZeroSugar #Performance #CleanEnergy #NewLaunch`;
  }

  private generateBrandStoryContent(request: AIGenerationRequest): string {
    const companyMatch = request.prompt.match(/about ([^.]+)\./);
    const companyName = companyMatch ? companyMatch[1] : 'our company';
    
    return `🌟 The ${companyName} Story

Every innovation starts with a problem that won't let you sleep.

For us, it was watching talented people struggle with outdated solutions while better alternatives remained just out of reach.

So we built something different. Not just another product, but a complete reimagining of what's possible.

Today, ${companyName} isn't just solving problems - we're preventing them. We're not just building software - we're crafting experiences that make people's lives genuinely better.

From our first prototype to serving thousands of customers, one thing has never changed: our obsession with getting the details right.

Ready to see what happens when passion meets purpose?

#Innovation #StartupStory #PurposeDriven #CustomerFirst #TechForGood #Entrepreneurship #BuildingTheFuture`;
  }

  private generateVideoScriptContent(request: AIGenerationRequest): string {
    return `Hook: "I spent $500 testing every energy drink so you don't have to - here's what I found"

Main Content: "Most energy drinks are basically sugar water with caffeine. But then I discovered NOCCO. Zero sugar, packed with BCAAs for recovery, and sustained energy without the crash. The raspberry flavor literally tastes like a sports drink but with none of the guilt. I've been drinking this for 3 months and my workout performance is noticeably better."

Call to Action: "Comment 'ENERGY' if you want me to do a full ingredient breakdown! And if you try NOCCO, tag me - I want to see your reaction!"`;
  }

  private generateGenericContent(request: AIGenerationRequest): string {
    return `Creating content that truly connects starts with understanding your audience's deepest needs.

Here's what most brands get wrong: they talk about features instead of transformations.

Your audience doesn't care about what you do - they care about who they become after working with you.

The secret? Stop selling products. Start selling better versions of your customers.

What transformation are you really offering?

#ContentStrategy #MarketingTips #BrandBuilding #CustomerFirst #ValueDriven #DigitalMarketing #GrowthHacking`;
  }

  private extractPlatform(prompt: string): string {
    if (prompt.includes('tiktok')) return 'tiktok';
    if (prompt.includes('instagram')) return 'instagram';
    if (prompt.includes('linkedin')) return 'linkedin';
    if (prompt.includes('twitter')) return 'twitter';
    if (prompt.includes('facebook')) return 'facebook';
    return 'general';
  }

  private extractContentType(prompt: string): string {
    if (prompt.includes('video script')) return 'video';
    if (prompt.includes('carousel')) return 'carousel';
    if (prompt.includes('story')) return 'story';
    return 'post';
  }

  private extractTone(prompt: string): string {
    if (prompt.includes('professional')) return 'professional';
    if (prompt.includes('casual')) return 'casual';
    if (prompt.includes('humorous')) return 'humorous';
    if (prompt.includes('inspirational')) return 'inspirational';
    return 'engaging';
  }

  async optimizeContent(request: ContentOptimizationRequest): Promise<ContentSuggestion[]> {
    console.log('AI Service: Content optimization request:', {
      contentLength: request.content.length,
      platform: request.platform,
      objective: request.objective
    });

    // Simulate optimization suggestions
    const suggestions: ContentSuggestion[] = [
      {
        type: 'hashtag',
        suggestion: `Add trending hashtags for ${request.platform} like #ContentCreation #SocialMediaTips #DigitalMarketing`,
        reasoning: `These hashtags are currently trending on ${request.platform} and will increase discoverability`,
        confidence: 0.85
      },
      {
        type: 'copy_improvement',
        suggestion: 'Start with a hook question or bold statement to grab attention',
        reasoning: 'First 3 seconds are crucial for social media engagement',
        confidence: 0.9
      },
      {
        type: 'cta',
        suggestion: 'Add a clear call-to-action like "Save this post" or "Share your thoughts below"',
        reasoning: 'CTAs can increase engagement by up to 40%',
        confidence: 0.8
      },
      {
        type: 'timing',
        suggestion: `Best posting time for ${request.platform}: 9-10 AM or 7-9 PM on weekdays`,
        reasoning: 'Based on platform analytics and user activity patterns',
        confidence: 0.75
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('AI Service: Optimization suggestions generated:', suggestions.length);
    return suggestions;
  }

  async generateHashtags(content: string, count: number = 10): Promise<string[]> {
    console.log('AI Service: Hashtag generation request:', { contentLength: content.length, count });

    // Simulate hashtag generation based on content
    const baseHashtags = [
      '#contentstrategy', '#socialmedia', '#digitalmarketing', '#engagement',
      '#branding', '#marketing', '#content', '#business', '#growth', '#inspiration',
      '#tips', '#advice', '#success', '#entrepreneur', '#lifestyle', '#motivation'
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return random selection of hashtags
    const shuffled = baseHashtags.sort(() => 0.5 - Math.random());
    const result = shuffled.slice(0, Math.min(count, baseHashtags.length));
    
    console.log('AI Service: Generated hashtags:', result);
    return result;
  }

  async improveContent(content: string, improvements: string[]): Promise<string> {
    console.log('AI Service: Content improvement request:', { 
      contentLength: content.length, 
      improvements: improvements.length 
    });

    // Simulate content improvement
    const improved = `🎯 ${content}

✨ ENHANCED WITH:
${improvements.map(imp => `• ${imp}`).join('\n')}

💡 Ready to boost your engagement? Try these strategies and watch your content perform better!

#ContentImprovement #SocialMediaTips #Engagement`;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('AI Service: Content improved successfully');
    return improved;
  }
}

export const aiService = new AIService();
