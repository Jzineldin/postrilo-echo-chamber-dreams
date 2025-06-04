
import { centralizedAIService } from '@/services/centralizedAIService';
import { fallbackGenerators } from '@/services/ai/fallbackGenerators';

export interface EnhancedGenerationRequest {
  topic: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  keyPoints?: string;
  emojiUsage?: boolean;
  hashtagDensity?: boolean;
  shortSentences?: boolean;
  maxRetries?: number;
}

export interface EnhancedGenerationResponse {
  id: string;
  content: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  topic: string;
  timestamp: number;
  hashtags: string[];
  fallbackUsed: boolean;
  success: boolean;
  error?: string;
  metadata: {
    platform: string;
    contentType: string;
    generatedAt: number;
    promptVersion: string;
    processingTime: number;
  };
}

export class EnhancedContentGenerationService {
  private static readonly MAX_RETRIES = 3;
  private static readonly TIMEOUT_MS = 15000; // 15 seconds

  static async generateContent(
    request: EnhancedGenerationRequest
  ): Promise<EnhancedGenerationResponse> {
    const startTime = Date.now();
    const contentId = `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Input validation
    if (!request.topic?.trim()) {
      return this.createErrorResponse(contentId, request, 'Topic is required', startTime);
    }

    if (!request.platform) {
      return this.createErrorResponse(contentId, request, 'Platform is required', startTime);
    }

    try {
      // Build enhanced prompt
      const enhancedPrompt = this.buildEnhancedPrompt(request);
      
      // Attempt generation with retries
      const maxRetries = request.maxRetries || this.MAX_RETRIES;
      let lastError = '';
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`🎯 Generation attempt ${attempt}/${maxRetries} for ${request.platform}`);
          
          const result = await this.generateWithTimeout(enhancedPrompt, request);
          
          if (result.content && result.content.trim().length > 0) {
            return this.createSuccessResponse(contentId, request, result.content, false, startTime);
          } else if (result.error) {
            lastError = result.error;
            console.log(`⚠️ Attempt ${attempt} failed: ${result.error}`);
          }
        } catch (error) {
          lastError = error instanceof Error ? error.message : 'Unknown error';
          console.log(`🚨 Attempt ${attempt} error: ${lastError}`);
        }
        
        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }

      // All retries failed, use intelligent fallback
      console.log('🔄 All retries failed, using intelligent fallback');
      const fallbackContent = this.generateIntelligentFallback(request);
      return this.createSuccessResponse(contentId, request, fallbackContent, true, startTime);

    } catch (error) {
      console.error('🚨 Enhanced content generation failed:', error);
      const fallbackContent = this.generateIntelligentFallback(request);
      return this.createSuccessResponse(contentId, request, fallbackContent, true, startTime);
    }
  }

  private static async generateWithTimeout(
    prompt: string, 
    request: EnhancedGenerationRequest
  ): Promise<{ content?: string; error?: string }> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve({ error: 'Generation timeout' });
      }, this.TIMEOUT_MS);

      centralizedAIService.generateContent({
        prompt,
        type: request.contentType === 'video-script' ? 'video-script' : 'content',
        temperature: 0.7,
        maxTokens: 600,
        platforms: [request.platform]
      }).then(result => {
        clearTimeout(timeout);
        resolve(result);
      }).catch(error => {
        clearTimeout(timeout);
        resolve({ error: error.message || 'Generation failed' });
      });
    });
  }

  private static buildEnhancedPrompt(request: EnhancedGenerationRequest): string {
    const platformSpecs = this.getPlatformSpecifications(request.platform);
    
    return `Create a ${request.contentType} for ${request.platform} about: ${request.topic}

Platform: ${request.platform}
Goal: ${request.goal}
Tone: ${request.tone}
${request.keyPoints ? `Key points: ${request.keyPoints}` : ''}

Platform Requirements:
${platformSpecs}

Content Requirements:
- Write engaging copy optimized for ${request.platform}
- Use ${request.tone} tone throughout
- ${request.emojiUsage ? 'Include relevant emojis' : 'No emojis'}
- ${request.shortSentences ? 'Use short, punchy sentences' : 'Use natural sentence flow'}
- ${request.hashtagDensity ? 'Include relevant hashtags' : 'No hashtags'}
- Include a strong call-to-action
- Keep it authentic and engaging

Make sure the content is ready to post and follows ${request.platform} best practices.`;
  }

  private static getPlatformSpecifications(platform: string): string {
    const specs: Record<string, string> = {
      instagram: '- Character limit: 2,200\n- Use hashtags strategically\n- Visual storytelling focus\n- Encourage engagement',
      twitter: '- Character limit: 280\n- Concise and punchy\n- Use threads if needed\n- Trending hashtags',
      linkedin: '- Professional tone\n- Longer form content accepted\n- Industry insights\n- Professional networking focus',
      facebook: '- Conversational tone\n- Community building\n- Share-worthy content\n- Clear call-to-action',
      tiktok: '- Trendy and energetic\n- Short-form video script\n- Hook within first 3 seconds\n- Trending sounds/hashtags'
    };
    
    return specs[platform] || '- Follow platform best practices\n- Engaging and authentic content';
  }

  private static generateIntelligentFallback(request: EnhancedGenerationRequest): string {
    const templates: Record<string, Record<string, string>> = {
      instagram: {
        post: `🌟 ${request.topic}\n\nDiscover something amazing today! ${request.topic} is more than just a trend - it's a lifestyle.\n\n✨ What makes it special:\n• Authentic experiences\n• Real connections\n• Meaningful moments\n\nWhat's your take on ${request.topic}? Share your thoughts below! 👇\n\n#${request.topic.replace(/\s+/g, '')} #inspiration #lifestyle #authentic`,
        
        story: `Hey there! 👋\n\nJust wanted to share something cool about ${request.topic}!\n\nIt's amazing how this can totally change your perspective. Have you tried it?\n\nSwipe up to learn more! ⬆️`,
        
        video: `Hook: "You won't believe what I discovered about ${request.topic}!"\n\nMiddle: Share 3 key insights or benefits\n\nEnd: "Try this and let me know what you think!"\n\nCall-to-action: Follow for more tips like this! ❤️`
      },
      
      twitter: {
        post: `🧵 Thread about ${request.topic}:\n\n1/ ${request.topic} is changing the game. Here's why you should pay attention...\n\n2/ Three key things to know:\n✅ Point 1\n✅ Point 2  \n✅ Point 3\n\n3/ The bottom line: ${request.topic} matters more than you think.\n\nWhat's your experience? Reply below! 👇`,
        
        thread: `${request.topic} - a quick thread 🧵\n\n1/ Why this matters now\n2/ What you need to know\n3/ How to get started\n\nRetweet if this helps! 🔄`
      },
      
      linkedin: {
        post: `Insights on ${request.topic}\n\nIn today's rapidly evolving landscape, ${request.topic} has emerged as a critical factor for success.\n\nKey takeaways:\n→ Strategic importance\n→ Implementation best practices\n→ Measurable outcomes\n\nWhat has been your experience with ${request.topic}? I'd love to hear your perspective in the comments.\n\n#${request.topic.replace(/\s+/g, '')} #professional #insights #leadership`,
        
        article: `The Future of ${request.topic}: What You Need to Know\n\nAs we navigate an increasingly complex business environment, understanding ${request.topic} has become essential.\n\nThis article explores:\n• Current trends and implications\n• Actionable strategies for implementation\n• Real-world case studies and outcomes\n\nRead more in the comments or DM me for the full analysis.\n\n#thoughtleadership #${request.topic.replace(/\s+/g, '')}`
      }
    };

    const platformTemplates = templates[request.platform] || templates.instagram;
    const template = platformTemplates[request.contentType] || platformTemplates.post;
    
    return template;
  }

  private static createSuccessResponse(
    id: string,
    request: EnhancedGenerationRequest,
    content: string,
    fallbackUsed: boolean,
    startTime: number
  ): EnhancedGenerationResponse {
    return {
      id,
      content,
      platform: request.platform,
      contentType: request.contentType,
      tone: request.tone,
      goal: request.goal,
      topic: request.topic,
      timestamp: Date.now(),
      hashtags: this.extractHashtags(content),
      fallbackUsed,
      success: true,
      metadata: {
        platform: request.platform,
        contentType: request.contentType,
        generatedAt: Date.now(),
        promptVersion: fallbackUsed ? 'fallback' : 'v2.1',
        processingTime: Date.now() - startTime
      }
    };
  }

  private static createErrorResponse(
    id: string,
    request: EnhancedGenerationRequest,
    error: string,
    startTime: number
  ): EnhancedGenerationResponse {
    return {
      id,
      content: this.generateIntelligentFallback(request),
      platform: request.platform,
      contentType: request.contentType,
      tone: request.tone,
      goal: request.goal,
      topic: request.topic,
      timestamp: Date.now(),
      hashtags: [],
      fallbackUsed: true,
      success: false,
      error,
      metadata: {
        platform: request.platform,
        contentType: request.contentType,
        generatedAt: Date.now(),
        promptVersion: 'fallback',
        processingTime: Date.now() - startTime
      }
    };
  }

  private static extractHashtags(content: string): string[] {
    const hashtagRegex = /#\w+/g;
    const matches = content.match(hashtagRegex);
    return matches ? matches.slice(0, 10) : []; // Limit to 10 hashtags
  }
}
