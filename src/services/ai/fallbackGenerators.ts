
import { GenerateContentRequest, ContentSuggestion } from './types';

export class FallbackGenerators {
  generateIntelligentFallback(request: GenerateContentRequest): string {
    const platformSpecific = this.getPlatformSpecificContent(request.platforms?.[0] || 'instagram');
    const templateSpecific = this.getTemplateContent(request.templateId || 'basic-post');
    
    return `${platformSpecific}\n\n${templateSpecific}\n\n#socialMedia #content`;
  }

  generateFallbackOptimizations(content: string, platform: string): ContentSuggestion[] {
    return [
      {
        type: 'engagement',
        suggestion: 'Add a compelling call-to-action to increase engagement',
        reasoning: 'CTAs typically increase interaction rates by 20-30%',
        confidence: 0.8
      },
      {
        type: 'hashtag_optimization',
        suggestion: `Add platform-specific hashtags for ${platform}`,
        reasoning: 'Relevant hashtags improve discoverability',
        confidence: 0.75
      },
      {
        type: 'copy_improvement',
        suggestion: 'Use shorter sentences for better readability',
        reasoning: 'Shorter sentences improve engagement on social media',
        confidence: 0.7
      }
    ];
  }

  generateFallbackImprovement(content: string): string {
    // Simple improvement: add emojis and make it more engaging
    const improvedContent = content
      .replace(/\./g, ' ✨')
      .replace(/!/g, ' 🚀')
      .replace(/\?/g, ' 🤔');
    
    return `${improvedContent}\n\nWhat do you think? Share your thoughts below! 👇`;
  }

  private getPlatformSpecificContent(platform: string): string {
    const platformContent = {
      instagram: "✨ Ready to transform your feed? Here's something special for you!",
      facebook: "Hey everyone! 👋 Excited to share this with our amazing community:",
      twitter: "🧵 Thread: Something you need to know about...",
      linkedin: "Professional insight: Here's what industry leaders are saying...",
      tiktok: "POV: You discover the secret that changes everything... 🤯",
      youtube: "In today's video, we're diving deep into..."
    };
    
    return platformContent[platform as keyof typeof platformContent] || platformContent.instagram;
  }

  private getTemplateContent(templateId: string): string {
    const templateContent = {
      'basic-post': "Share your thoughts and connect with your audience.",
      'quote-inspiration': "Let this motivate you to chase your dreams and never give up.",
      'brand-story': "Every brand has a story. Here's ours and what makes us unique.",
      'product-launch': "Introducing something amazing that will change how you think about [topic].",
      'tutorial-post': "Step-by-step guide to mastering [skill]. Save this for later!",
      'behind-the-scenes': "Ever wondered what goes on behind the scenes? Here's the inside look.",
      'community-post': "Our community is everything to us. Thank you for being part of this journey."
    };
    
    return templateContent[templateId as keyof typeof templateContent] || templateContent['basic-post'];
  }
}

export const fallbackGenerators = new FallbackGenerators();
