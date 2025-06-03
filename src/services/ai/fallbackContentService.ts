
export interface FallbackContentRequest {
  topic: string;
  platform: string;
  tone?: string;
  template?: string;
  useEmojis?: boolean;
  useHashtags?: boolean;
}

export class FallbackContentService {
  generateTemplateFallback(request: FallbackContentRequest): string {
    const { topic, platform, tone = 'casual', useEmojis = true, useHashtags = true } = request;
    
    // Platform-specific fallback content templates
    const fallbackTemplates = {
      instagram: this.generateInstagramFallback(topic, tone, useEmojis, useHashtags),
      twitter: this.generateTwitterFallback(topic, tone, useEmojis, useHashtags),
      linkedin: this.generateLinkedInFallback(topic, tone, useEmojis, useHashtags),
      facebook: this.generateFacebookFallback(topic, tone, useEmojis, useHashtags),
      tiktok: this.generateTikTokFallback(topic, tone, useEmojis, useHashtags),
      youtube: this.generateYouTubeFallback(topic, tone, useEmojis, useHashtags)
    };

    return fallbackTemplates[platform as keyof typeof fallbackTemplates] || this.generateGenericFallback(topic, tone, useEmojis, useHashtags);
  }

  private generateInstagramFallback(topic: string, tone: string, useEmojis: boolean, useHashtags: boolean): string {
    const emoji = useEmojis ? '✨ ' : '';
    const hashtags = useHashtags ? `\n\n#${topic.replace(/\s+/g, '').toLowerCase()} #content #instagram #socialmedia #marketing` : '';
    
    return `${emoji}Excited to share some thoughts on ${topic}!

This is something I'm passionate about because it truly makes a difference in how we approach our daily lives.

Here are my key takeaways:
• It's all about finding the right balance
• Consistency is more important than perfection
• Small steps lead to big changes

What's your experience with ${topic}? I'd love to hear your thoughts in the comments! 👇${hashtags}`;
  }

  private generateTwitterFallback(topic: string, tone: string, useEmojis: boolean, useHashtags: boolean): string {
    const emoji = useEmojis ? '🔥 ' : '';
    const hashtags = useHashtags ? ` #${topic.replace(/\s+/g, '').toLowerCase()} #content` : '';
    
    return `${emoji}Hot take on ${topic}:

The key isn't just knowing about it—it's actually implementing what you learn.

Stop overthinking, start doing.${hashtags}`;
  }

  private generateLinkedInFallback(topic: string, tone: string, useEmojis: boolean, useHashtags: boolean): string {
    const hashtags = useHashtags ? `\n\n#${topic.replace(/\s+/g, '').toLowerCase()} #business #professional #linkedin` : '';
    
    return `I've been reflecting on ${topic} lately, and here's what I've learned:

In today's fast-paced business environment, understanding ${topic} isn't just beneficial—it's essential.

Three key insights that have shaped my perspective:

1. Context matters more than content
2. Practical application beats theoretical knowledge
3. Continuous learning is non-negotiable

The professionals who thrive are those who can adapt their approach while maintaining their core principles.

What has your experience taught you about ${topic}? I'm always eager to learn from different perspectives.${hashtags}`;
  }

  private generateFacebookFallback(topic: string, tone: string, useEmojis: boolean, useHashtags: boolean): string {
    const emoji = useEmojis ? '😊 ' : '';
    const hashtags = useHashtags ? `\n\n#${topic.replace(/\s+/g, '').toLowerCase()} #community #facebook` : '';
    
    return `${emoji}I wanted to share something that's been on my mind about ${topic}.

We often overcomplicate things, but sometimes the simplest approach is the most effective.

Here's what I've discovered:
✓ Start small and build momentum
✓ Focus on progress, not perfection
✓ Celebrate the little wins along the way

I'd love to hear how you approach ${topic}. What works best for you?${hashtags}`;
  }

  private generateTikTokFallback(topic: string, tone: string, useEmojis: boolean, useHashtags: boolean): string {
    const emoji = useEmojis ? '🎯 ' : '';
    const hashtags = useHashtags ? ` #${topic.replace(/\s+/g, '').toLowerCase()} #fyp #trending #tiktok #viral` : '';
    
    return `${emoji}POV: You finally understand ${topic}

That moment when everything clicks and you realize it was simpler than you thought 💡

Drop a 🔥 if you can relate!${hashtags}`;
  }

  private generateYouTubeFallback(topic: string, tone: string, useEmojis: boolean, useHashtags: boolean): string {
    const hashtags = useHashtags ? `\n\n#${topic.replace(/\s+/g, '').toLowerCase()} #youtube #tutorial #howto` : '';
    
    return `Welcome back to the channel! Today we're diving deep into ${topic}.

In this video, you'll learn:
• The fundamentals you need to know
• Common mistakes to avoid
• Practical tips you can implement today

If you find this helpful, please like and subscribe for more content like this!

Let me know in the comments what specific aspect of ${topic} you'd like me to cover next.${hashtags}`;
  }

  private generateGenericFallback(topic: string, tone: string, useEmojis: boolean, useHashtags: boolean): string {
    const emoji = useEmojis ? '✨ ' : '';
    const hashtags = useHashtags ? `\n\n#${topic.replace(/\s+/g, '').toLowerCase()} #content #socialmedia` : '';
    
    return `${emoji}Let's talk about ${topic}.

It's fascinating how this subject continues to evolve and impact our daily lives. The key is staying informed and adapting to new developments.

What are your thoughts on ${topic}? Share your perspective!${hashtags}`;
  }

  static generateFallbackHashtags(platform: string): string[] {
    const fallbackHashtags = {
      instagram: ['#content', '#socialmedia', '#marketing', '#business', '#brand'],
      twitter: ['#content', '#marketing'],
      linkedin: ['#business', '#professional', '#networking'],
      tiktok: ['#content', '#viral', '#trending', '#fyp'],
      facebook: ['#business', '#marketing', '#community'],
      youtube: ['#content', '#video', '#tutorial']
    };
    
    return fallbackHashtags[platform as keyof typeof fallbackHashtags] || ['#content'];
  }
}

export const fallbackContentService = new FallbackContentService();
