
import { centralizedAIService } from '@/services/centralizedAIService';
import { ImprovedAIErrorHandler, DetailedAIError } from './improvedErrorHandling';

export interface RobustGenerationRequest {
  prompt: string;
  type?: "content" | "hashtags" | "video-script";
  platform?: string;
  maxRetries?: number;
  showProgressToUser?: boolean;
}

export interface RobustGenerationResponse {
  content: string;
  success: boolean;
  error?: DetailedAIError;
  attemptsMade: number;
  fallbackUsed: boolean;
}

export class RobustContentGenerationService {
  private static readonly DEFAULT_MAX_RETRIES = 3;
  private static readonly FALLBACK_CONTENT_TEMPLATES = {
    instagram: `🌟 Ready to elevate your content strategy?

Here's what successful creators are doing:
✅ Focusing on authentic storytelling
✅ Building genuine connections
✅ Staying consistent with their voice

What's your approach? Share your thoughts below!

#ContentCreation #SocialMedia #Strategy`,

    twitter: `💡 Pro tip for content creators:

Authenticity > Perfection

Focus on:
• Genuine value
• Consistent voice
• Community engagement

What's working for you? 🚀

#ContentStrategy #CreatorTips`,

    linkedin: `Key insights for professional content creators:

→ Authentic storytelling drives engagement
→ Consistent value builds trust
→ Community interaction sparks growth

What strategies have you found most effective in your content journey?

#ContentMarketing #ProfessionalGrowth`,

    default: `Ready to create amazing content? 

Focus on these fundamentals:
• Know your audience
• Provide genuine value
• Stay consistent
• Engage authentically

What's your next content goal?`
  };

  static async generateWithRobustErrorHandling(
    request: RobustGenerationRequest,
    onProgress?: (message: string) => void
  ): Promise<RobustGenerationResponse> {
    const maxRetries = request.maxRetries || this.DEFAULT_MAX_RETRIES;
    let lastError: DetailedAIError | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Show progress if requested
        if (onProgress && attempt > 1) {
          onProgress(ImprovedAIErrorHandler.getProgressiveRetryMessage(attempt, maxRetries));
        }

        console.log(`🚀 Content generation attempt ${attempt}/${maxRetries}`);

        const response = await centralizedAIService.generateContent({
          prompt: request.prompt,
          type: request.type || 'content',
          temperature: 0.7,
          maxTokens: 600
        });

        if (response.content && response.content.trim()) {
          console.log(`✅ Content generated successfully on attempt ${attempt}`);
          return {
            content: response.content,
            success: true,
            attemptsMade: attempt,
            fallbackUsed: false
          };
        }

        // Empty content is treated as an error
        throw new Error('AI returned empty content');

      } catch (error) {
        console.error(`❌ Attempt ${attempt} failed:`, error);
        
        const categorizedError = ImprovedAIErrorHandler.categorizeError(error);
        lastError = categorizedError;

        // Check if we should retry
        if (!ImprovedAIErrorHandler.shouldRetry(categorizedError, attempt, maxRetries)) {
          console.log(`🛑 Not retrying due to error type: ${categorizedError.type}`);
          break;
        }

        // If this isn't the last attempt, wait before retrying
        if (attempt < maxRetries) {
          const delay = ImprovedAIErrorHandler.getRetryDelay(categorizedError, attempt);
          console.log(`⏱️ Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // All retries failed, use fallback content
    console.log('🔄 All retries failed, using fallback content');
    
    const fallbackContent = this.generateFallbackContent(request.prompt, request.platform);
    
    return {
      content: fallbackContent,
      success: false,
      error: lastError || {
        type: 'unknown',
        message: 'All generation attempts failed',
        userFriendlyMessage: 'Content generation failed, but we created fallback content for you.',
        retryable: true,
        suggestedAction: 'You can edit this content or try generating again.'
      },
      attemptsMade: maxRetries,
      fallbackUsed: true
    };
  }

  private static generateFallbackContent(prompt: string, platform?: string): string {
    const template = platform && this.FALLBACK_CONTENT_TEMPLATES[platform as keyof typeof this.FALLBACK_CONTENT_TEMPLATES] 
      || this.FALLBACK_CONTENT_TEMPLATES.default;

    // Try to incorporate the user's topic if possible
    const topic = this.extractTopicFromPrompt(prompt);
    if (topic) {
      return template.replace(/content strategy|amazing content/gi, topic);
    }

    return template;
  }

  private static extractTopicFromPrompt(prompt: string): string | null {
    const cleanPrompt = prompt.toLowerCase().trim();
    
    // Look for topic indicators
    const patterns = [
      /about\s+([^.!?\n]+)/,
      /topic[:\s]+([^.!?\n]+)/,
      /create.*for\s+([^.!?\n]+)/,
      /write.*about\s+([^.!?\n]+)/
    ];
    
    for (const pattern of patterns) {
      const match = cleanPrompt.match(pattern);
      if (match && match[1]) {
        return match[1].trim().split(' ').slice(0, 3).join(' ');
      }
    }
    
    // Fallback to first few words
    const words = prompt.trim().split(' ').slice(0, 3).join(' ');
    return words.length > 0 ? words : null;
  }
}
