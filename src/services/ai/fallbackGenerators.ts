
interface FallbackRequest {
  prompt: string;
  type: string;
  platforms: string[];
}

export class FallbackGenerators {
  generateIntelligentFallback(request: FallbackRequest): string {
    console.log('🔄 FallbackGenerators: Creating intelligent fallback for', request.type);
    
    const platform = request.platforms[0] || 'social';
    const topic = this.extractTopicFromPrompt(request.prompt);
    
    // Get platform-specific template
    const template = this.getPlatformTemplate(platform, request.type);
    
    // Customize template with topic
    return this.customizeTemplate(template, topic, platform);
  }

  private extractTopicFromPrompt(prompt: string): string {
    // Extract the main topic from the prompt
    const words = prompt.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(' ')
      .filter(word => word.length > 3)
      .slice(0, 3);
    
    return words.join(' ') || 'social media';
  }

  private getPlatformTemplate(platform: string, type: string): string {
    const templates: Record<string, Record<string, string>> = {
      instagram: {
        content: `🌟 Let's talk about {topic}!\n\nHere's what you need to know:\n✨ Key insight #1\n✨ Key insight #2\n✨ Key insight #3\n\nWhat's your experience with {topic}? Drop a comment below! 👇\n\n#{hashtag} #content #engagement`,
        'video-script': `Hook: "You won't believe what I discovered about {topic}!"\n\nMain content:\n- Share the key insight\n- Provide practical tips\n- Add personal experience\n\nCall to action: "Save this post and try it yourself!"\n\n#{hashtag} #tips #viral`
      },
      twitter: {
        content: `🧵 Thread about {topic}:\n\n1/ Here's what you need to know about {topic}\n\n2/ Key takeaways:\n• Point 1\n• Point 2\n• Point 3\n\n3/ What's your take? Let me know below! 👇\n\n#{hashtag} #thread`,
        'video-script': `Quick take on {topic}:\n\n• Main point\n• Why it matters\n• What to do next\n\nRetweet if this helps! 🔄\n\n#{hashtag}`
      },
      linkedin: {
        content: `Insights on {topic} 💼\n\nIn today's fast-paced environment, understanding {topic} is crucial for success.\n\nKey points:\n→ Strategic importance\n→ Implementation tips\n→ Long-term benefits\n\nWhat has been your experience with {topic}? I'd love to hear your thoughts.\n\n#{hashtag} #professional #insights`,
        'video-script': `Professional perspective on {topic}:\n\n1. Current landscape analysis\n2. Strategic recommendations\n3. Implementation roadmap\n\nConnect with me to discuss further strategies.\n\n#{hashtag} #leadership`
      },
      facebook: {
        content: `Hey everyone! 👋\n\nLet's chat about {topic}. I've been thinking about this lately and wanted to share some thoughts.\n\nHere's what I've learned:\n• Insight 1\n• Insight 2\n• Insight 3\n\nWhat do you think? Have you had similar experiences? Let's discuss in the comments!\n\n#{hashtag}`,
        'video-script': `Community discussion about {topic}:\n\n• Why this matters to our community\n• Practical applications\n• How we can support each other\n\nShare your stories below! 💬\n\n#{hashtag}`
      }
    };

    const platformTemplates = templates[platform] || templates.instagram;
    return platformTemplates[type] || platformTemplates.content;
  }

  private customizeTemplate(template: string, topic: string, platform: string): string {
    // Replace placeholders with actual content
    let customized = template.replace(/{topic}/g, topic);
    
    // Generate hashtag from topic
    const hashtag = topic.replace(/\s+/g, '').toLowerCase();
    customized = customized.replace(/{hashtag}/g, hashtag);
    
    return customized;
  }
}

export const fallbackGenerators = new FallbackGenerators();
