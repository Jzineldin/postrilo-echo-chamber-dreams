
interface OptimizationRequest {
  content: string;
  platform: string;
  objective: string;
}

interface OptimizationSuggestion {
  type: 'engagement' | 'clarity' | 'platform' | 'cta';
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

export class ContentOptimizationService {
  async optimizeContent(request: OptimizationRequest): Promise<OptimizationSuggestion[]> {
    console.log('🎯 ContentOptimization: Analyzing content for', request.platform);
    
    const suggestions: OptimizationSuggestion[] = [];
    
    // Analyze content length for platform
    const platformOptimalLength = this.getPlatformOptimalLength(request.platform);
    if (request.content.length > platformOptimalLength * 1.2) {
      suggestions.push({
        type: 'platform',
        suggestion: `Content is too long for ${request.platform}. Consider shortening to ~${platformOptimalLength} characters.`,
        priority: 'high'
      });
    }
    
    // Check for call-to-action
    if (!this.hasCallToAction(request.content)) {
      suggestions.push({
        type: 'cta',
        suggestion: 'Add a clear call-to-action to improve engagement',
        priority: 'medium'
      });
    }
    
    // Check for platform-specific features
    const platformSuggestions = this.getPlatformSpecificSuggestions(request.content, request.platform);
    suggestions.push(...platformSuggestions);
    
    return suggestions;
  }

  async improveContent(content: string, improvements: string[]): Promise<string> {
    console.log('🔧 ContentOptimization: Applying improvements:', improvements);
    
    let improvedContent = content;
    
    // Apply basic improvements based on suggestions
    for (const improvement of improvements) {
      if (improvement.includes('call-to-action')) {
        improvedContent = this.addCallToAction(improvedContent);
      } else if (improvement.includes('hashtags')) {
        improvedContent = this.addHashtags(improvedContent);
      } else if (improvement.includes('shorten')) {
        improvedContent = this.shortenContent(improvedContent);
      }
    }
    
    return improvedContent;
  }

  private getPlatformOptimalLength(platform: string): number {
    const lengths: Record<string, number> = {
      twitter: 280,
      instagram: 2200,
      linkedin: 1300,
      facebook: 400,
      tiktok: 150
    };
    
    return lengths[platform] || 500;
  }

  private hasCallToAction(content: string): boolean {
    const ctaKeywords = ['comment', 'share', 'like', 'follow', 'click', 'visit', 'learn more', 'sign up'];
    return ctaKeywords.some(keyword => content.toLowerCase().includes(keyword));
  }

  private getPlatformSpecificSuggestions(content: string, platform: string): OptimizationSuggestion[] {
    const suggestions: OptimizationSuggestion[] = [];
    
    switch (platform) {
      case 'instagram':
        if (!content.includes('#')) {
          suggestions.push({
            type: 'platform',
            suggestion: 'Add relevant hashtags to increase discoverability on Instagram',
            priority: 'medium'
          });
        }
        break;
      case 'linkedin':
        if (!content.includes('professional') && !content.includes('career')) {
          suggestions.push({
            type: 'platform',
            suggestion: 'Consider adding professional context for LinkedIn audience',
            priority: 'low'
          });
        }
        break;
      case 'twitter':
        if (content.length > 250) {
          suggestions.push({
            type: 'platform',
            suggestion: 'Consider breaking into a thread for better engagement',
            priority: 'medium'
          });
        }
        break;
    }
    
    return suggestions;
  }

  private addCallToAction(content: string): string {
    const ctas = [
      '\n\nWhat do you think? Share your thoughts below! 👇',
      '\n\nLet me know your experience in the comments!',
      '\n\nFollow for more tips like this! ✨'
    ];
    
    const randomCta = ctas[Math.floor(Math.random() * ctas.length)];
    return content + randomCta;
  }

  private addHashtags(content: string): string {
    const commonHashtags = ['#content', '#social', '#tips', '#inspiration'];
    const hashtags = commonHashtags.slice(0, 3).join(' ');
    return content + '\n\n' + hashtags;
  }

  private shortenContent(content: string): string {
    if (content.length <= 280) return content;
    
    // Simple shortening - take first part and add ellipsis
    const shortened = content.substring(0, 250).trim();
    const lastSpace = shortened.lastIndexOf(' ');
    return shortened.substring(0, lastSpace) + '...';
  }
}

export const contentOptimizationService = new ContentOptimizationService();
