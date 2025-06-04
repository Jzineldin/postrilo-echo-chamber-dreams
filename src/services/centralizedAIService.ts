import { coreAIService } from './ai/coreAIService';
import { fallbackGenerators } from './ai/fallbackGenerators';
import { ContentGenerationOptimizer, PerformanceMonitor } from './performance/contentGenerationOptimizer';

interface UsageMetrics {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

interface AIResponse {
  content?: string;
  error?: string;
  usage?: UsageMetrics;
  fallback?: boolean;
}

interface GenerateContentRequest {
  prompt: string;
  templateId?: string;
  type?: 'content' | 'video-script';
  temperature?: number;
  maxTokens?: number;
  platforms?: string[];
}

interface GenerateContentResponse {
  content: string;
  error?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

class CentralizedAIService {
  private readonly defaultTemplates = {
    'quote-inspiration': {
      prompt: 'Create an inspirational quote post',
      platforms: ['instagram', 'facebook', 'linkedin']
    },
    'brand-story': {
      prompt: 'Share a compelling brand story',
      platforms: ['instagram', 'linkedin', 'facebook']
    },
    'product-launch': {
      prompt: 'Announce a new product launch',
      platforms: ['twitter', 'instagram', 'linkedin']
    },
    'tutorial-post': {
      prompt: 'Create educational tutorial content',
      platforms: ['instagram', 'youtube', 'linkedin']
    },
    'behind-the-scenes': {
      prompt: 'Share behind-the-scenes content',
      platforms: ['instagram', 'facebook', 'twitter']
    },
    'community-post': {
      prompt: 'Create community engagement content',
      platforms: ['facebook', 'instagram', 'linkedin']
    }
  };

  async generateContent(request: GenerateContentRequest): Promise<GenerateContentResponse> {
    const endTimer = PerformanceMonitor.startTimer('content-generation');
    
    try {
      console.log('🎯 CentralizedAI: Starting optimized generation');
      
      // Use performance optimizer for better load handling
      const result = await ContentGenerationOptimizer.optimizedGenerate(
        () => this.performGeneration(request),
        'normal'
      );
      
      const duration = endTimer();
      console.log(`⚡ Generation completed in ${duration.toFixed(2)}ms`);
      
      return result;
    } catch (error) {
      endTimer();
      console.error('🚨 CentralizedAI: Generation failed, using fallback:', error);
      
      return {
        content: this.generateFallbackContent(request),
        error: error instanceof Error ? error.message : 'Generation failed',
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0
        }
      };
    }
  }

  private async performGeneration(request: GenerateContentRequest): Promise<GenerateContentResponse> {
    // Input validation
    if (!request.prompt?.trim()) {
      throw new Error('Prompt is required for content generation');
    }

    // Build optimized prompt
    let optimizedPrompt = request.prompt;
    
    if (request.platforms && request.platforms.length > 0) {
      const primaryPlatform = request.platforms[0];
      optimizedPrompt = this.buildPlatformOptimizedPrompt(request.prompt, primaryPlatform, request.type);
    }

    console.log('🎯 CentralizedAI: Using optimized prompt, length:', optimizedPrompt.length);

    // Call AI service with timeout protection
    const result = await Promise.race([
      coreAIService.callAI(optimizedPrompt, 'gemini'),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Generation timeout')), 15000)
      )
    ]);

    if (result.error && !result.content) {
      throw new Error(result.error);
    }

    const responseContent = result.content || this.generateFallbackContent(request);
    const isUsingFallback = !result.content;

    console.log(`✅ CentralizedAI: Generated ${responseContent.length} characters${isUsingFallback ? ' (fallback)' : ''}`);

    return {
      content: responseContent,
      error: result.error,
      usage: {
        promptTokens: isUsingFallback ? 0 : Math.floor(optimizedPrompt.length / 4),
        completionTokens: isUsingFallback ? 0 : Math.floor(responseContent.length / 4),
        totalTokens: isUsingFallback ? 0 : Math.floor((optimizedPrompt.length + responseContent.length) / 4)
      }
    };
  }

  private buildPlatformOptimizedPrompt(prompt: string, platform: string, type?: string): string {
    const platformSpecs = this.getPlatformSpecifications(platform);
    const contentTypeSpecs = this.getContentTypeSpecifications(type || 'content');
    
    return `${prompt}

Platform: ${platform}
${platformSpecs}

${contentTypeSpecs}

Requirements:
- Make it engaging and platform-appropriate
- Include a clear call-to-action
- Use appropriate tone for the platform
- Keep it concise but impactful
- Follow ${platform} best practices`;
  }

  private getPlatformSpecifications(platform: string): string {
    const specs: Record<string, string> = {
      instagram: 'Style: Visual storytelling, use emojis, hashtags welcome, 2200 char limit',
      twitter: 'Style: Concise and punchy, 280 char limit, trending hashtags',
      linkedin: 'Style: Professional, thought leadership, longer form OK',
      facebook: 'Style: Conversational, community-focused, shareable',
      tiktok: 'Style: Trendy, energetic, hook in first 3 seconds',
      youtube: 'Style: Educational or entertaining, clear structure'
    };
    
    return specs[platform] || 'Style: Platform-appropriate, engaging content';
  }

  private getContentTypeSpecifications(type: string): string {
    const specs: Record<string, string> = {
      'video-script': 'Format: Video script with clear scenes, hooks, and timing',
      'content': 'Format: Social media post ready to publish',
      'story': 'Format: Story format with beginning, middle, end',
      'carousel': 'Format: Multi-slide carousel with clear progression'
    };
    
    return specs[type] || 'Format: Standard social media content';
  }

  private generateFallbackContent(request: GenerateContentRequest): string {
    try {
      return fallbackGenerators.generateIntelligentFallback({
        prompt: request.prompt,
        type: request.type || 'content',
        platforms: request.platforms || ['instagram']
      });
    } catch (error) {
      console.error('🚨 Fallback generation failed:', error);
      return `Check out this interesting topic: ${request.prompt}\n\nWhat do you think? Share your thoughts below! 👇\n\n#content #engagement #social`;
    }
  }

  async generateHashtags(content: string, count: number = 8): Promise<string[]> {
    const endTimer = PerformanceMonitor.startTimer('hashtag-generation');
    
    try {
      const result = await ContentGenerationOptimizer.optimizedGenerate(
        () => this.performHashtagGeneration(content, count),
        'low' // Lower priority than content generation
      );
      
      endTimer();
      return result;
    } catch (error) {
      endTimer();
      console.error('🚨 Hashtag generation failed:', error);
      return this.generateFallbackHashtags(content, count);
    }
  }

  private async performHashtagGeneration(content: string, count: number): Promise<string[]> {
    const prompt = `Generate ${count} relevant hashtags for this social media content. Return only hashtags, one per line, starting with #:

${content}`;

    const result = await coreAIService.callAI(prompt, 'gemini');
    
    if (result.content) {
      const hashtags = result.content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('#'))
        .slice(0, count);
      
      return hashtags.length > 0 ? hashtags : this.generateFallbackHashtags(content, count);
    }
    
    return this.generateFallbackHashtags(content, count);
  }

  private generateFallbackHashtags(content: string, count: number): string[] {
    const commonHashtags = [
      '#content', '#social', '#engagement', '#community', '#inspiration',
      '#motivation', '#tips', '#lifestyle', '#business', '#growth',
      '#success', '#mindset', '#creativity', '#innovation', '#trending'
    ];
    
    // Extract words from content for relevant hashtags
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && word.length < 15);
    
    const contentBasedHashtags = words
      .slice(0, 3)
      .map(word => `#${word}`);
    
    const allHashtags = [...contentBasedHashtags, ...commonHashtags];
    return allHashtags.slice(0, count);
  }

  getRandomContentBrief(): string {
    const topics = [
      'Share a behind-the-scenes moment from your day',
      'What\'s one productivity tip that changed your life?',
      'Describe your morning routine in 3 steps',
      'What\'s the best advice you\'ve ever received?',
      'Share a recent win, big or small',
      'What\'s one book that influenced your thinking?',
      'Describe your workspace in one word',
      'What\'s your go-to motivation when things get tough?',
      'Share a lesson you learned this week',
      'What\'s one skill you\'re currently developing?'
    ];
    
    return topics[Math.floor(Math.random() * topics.length)];
  }

  getPerformanceMetrics() {
    return {
      queueStatus: ContentGenerationOptimizer.getQueueStatus(),
      performanceMetrics: PerformanceMonitor.getAllMetrics()
    };
  }

  clearPerformanceData() {
    PerformanceMonitor.clearMetrics();
    ContentGenerationOptimizer.clearQueue();
  }
}

export const centralizedAIService = new CentralizedAIService();
