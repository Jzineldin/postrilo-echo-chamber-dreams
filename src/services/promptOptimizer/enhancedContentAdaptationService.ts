
export class EnhancedContentAdaptationService {
  private static platformAdaptationStrategies = {
    twitter: {
      characterLimit: 280,
      adaptations: {
        shorten: (content: string) => this.createTwitterThread(content),
        addHashtags: (content: string) => this.addTwitterHashtags(content),
        addEngagement: (content: string) => this.addTwitterEngagement(content)
      },
      format: 'concise, thread-friendly, hashtag-optimized'
    },
    instagram: {
      characterLimit: 2200,
      adaptations: {
        storytelling: (content: string) => this.addInstagramStorytelling(content),
        addHashtags: (content: string) => this.addInstagramHashtags(content),
        addVisualCues: (content: string) => this.addInstagramVisualCues(content)
      },
      format: 'visual-focused, story-driven, hashtag-rich'
    },
    linkedin: {
      characterLimit: 3000,
      adaptations: {
        professionalize: (content: string) => this.addLinkedInProfessionalism(content),
        addCredibility: (content: string) => this.addLinkedInCredibility(content),
        addNetworking: (content: string) => this.addLinkedInNetworking(content)
      },
      format: 'professional, insightful, networking-focused'
    },
    facebook: {
      characterLimit: 63206,
      adaptations: {
        community: (content: string) => this.addFacebookCommunity(content),
        personal: (content: string) => this.addFacebookPersonal(content),
        discussion: (content: string) => this.addFacebookDiscussion(content)
      },
      format: 'community-focused, conversational, discussion-driving'
    },
    tiktok: {
      characterLimit: 150,
      adaptations: {
        trending: (content: string) => this.addTikTokTrending(content),
        viral: (content: string) => this.addTikTokViral(content),
        engagement: (content: string) => this.addTikTokEngagement(content)
      },
      format: 'trendy, viral-optimized, engagement-focused'
    },
    youtube: {
      characterLimit: 5000,
      adaptations: {
        seo: (content: string) => this.addYouTubeSEO(content),
        educational: (content: string) => this.addYouTubeEducational(content),
        subscribe: (content: string) => this.addYouTubeSubscribe(content)
      },
      format: 'SEO-optimized, educational, subscription-focused'
    }
  };

  static adaptContentForPlatform(content: string, fromPlatform: string, toPlatform: string, tone: string = 'casual', goal: string = 'engagement'): string {
    const strategy = this.platformAdaptationStrategies[toPlatform as keyof typeof this.platformAdaptationStrategies];
    if (!strategy) return content;

    let adaptedContent = content;

    // Apply character limit constraints
    if (adaptedContent.length > strategy.characterLimit) {
      adaptedContent = this.truncateIntelligently(adaptedContent, strategy.characterLimit);
    }

    // Apply platform-specific adaptations
    Object.values(strategy.adaptations).forEach(adaptation => {
      adaptedContent = adaptation(adaptedContent);
    });

    return adaptedContent;
  }

  private static createTwitterThread(content: string): string {
    if (content.length <= 250) return content;
    
    const sentences = content.split('. ');
    const threads = [];
    let currentThread = '';
    
    sentences.forEach(sentence => {
      if ((currentThread + sentence).length < 250) {
        currentThread += sentence + '. ';
      } else {
        threads.push(currentThread.trim());
        currentThread = sentence + '. ';
      }
    });
    
    if (currentThread) threads.push(currentThread.trim());
    
    return threads.map((thread, index) => 
      index === 0 ? `${thread} 🧵` : `${index + 1}/ ${thread}`
    ).join('\n\n');
  }

  private static addTwitterHashtags(content: string): string {
    const relevantHashtags = this.extractTopicsForHashtags(content);
    return `${content}\n\n${relevantHashtags.slice(0, 2).map(tag => `#${tag}`).join(' ')}`;
  }

  private static addTwitterEngagement(content: string): string {
    const engagementPrompts = [
      'What\'s your take on this?',
      'Agree or disagree?',
      'Share your experience 👇',
      'Thoughts?'
    ];
    const prompt = engagementPrompts[Math.floor(Math.random() * engagementPrompts.length)];
    return `${content}\n\n${prompt}`;
  }

  private static addInstagramStorytelling(content: string): string {
    const storyStarters = [
      '✨ Here\'s the thing...',
      '📖 Let me tell you a story...',
      '💭 Can we talk about this?',
      '🎯 Real talk:'
    ];
    const starter = storyStarters[Math.floor(Math.random() * storyStarters.length)];
    return `${starter}\n\n${content}`;
  }

  private static addInstagramHashtags(content: string): string {
    const topics = this.extractTopicsForHashtags(content);
    const generalHashtags = ['content', 'socialmedia', 'tips', 'motivation', 'lifestyle'];
    const allHashtags = [...topics, ...generalHashtags].slice(0, 15);
    return `${content}\n\n${allHashtags.map(tag => `#${tag}`).join(' ')}`;
  }

  private static addInstagramVisualCues(content: string): string {
    const visualEmojis = ['📸', '✨', '💫', '🎯', '💡', '🔥', '💪', '🌟'];
    const randomEmoji = visualEmojis[Math.floor(Math.random() * visualEmojis.length)];
    return `${randomEmoji} ${content}`;
  }

  private static addLinkedInProfessionalism(content: string): string {
    const professionalStarters = [
      'Professional insight:',
      'Industry perspective:',
      'Key learning:',
      'Strategic thinking:'
    ];
    const starter = professionalStarters[Math.floor(Math.random() * professionalStarters.length)];
    return `${starter}\n\n${content}\n\nWhat's your experience with this approach?`;
  }

  private static addLinkedInCredibility(content: string): string {
    return `${content}\n\n💼 Based on [X years] of industry experience, this approach consistently delivers results.`;
  }

  private static addLinkedInNetworking(content: string): string {
    return `${content}\n\n🤝 Would love to hear from others in the industry - what strategies have worked for you?`;
  }

  private static addFacebookCommunity(content: string): string {
    return `Hey everyone! 👋\n\n${content}\n\nWhat do you all think? Let's discuss in the comments! 💬`;
  }

  private static addFacebookPersonal(content: string): string {
    const personalStarters = [
      'I\'ve been thinking about this lately...',
      'Wanted to share something with you all...',
      'This has been on my mind...'
    ];
    const starter = personalStarters[Math.floor(Math.random() * personalStarters.length)];
    return `${starter}\n\n${content}`;
  }

  private static addFacebookDiscussion(content: string): string {
    return `${content}\n\n👥 I'd love to start a discussion about this - what are your thoughts and experiences?`;
  }

  private static addTikTokTrending(content: string): string {
    const trendyElements = ['✨', '🔥', '💯', '🎯', '💡'];
    const element = trendyElements[Math.floor(Math.random() * trendyElements.length)];
    return `${element} ${content.split('\n')[0]} ${element}`;
  }

  private static addTikTokViral(content: string): string {
    const viralPhrases = ['This is it!', 'Wait for it...', 'Mind blown 🤯', 'Plot twist:'];
    const phrase = viralPhrases[Math.floor(Math.random() * viralPhrases.length)];
    return `${phrase} ${content}`;
  }

  private static addTikTokEngagement(content: string): string {
    const engagements = ['Drop a 🔥 if you agree!', 'Comment YES if this helped!', 'Save this! 📌', 'Share with someone who needs this!'];
    const engagement = engagements[Math.floor(Math.random() * engagements.length)];
    return `${content}\n\n${engagement}`;
  }

  private static addYouTubeSEO(content: string): string {
    return `🎬 In this content: ${content}\n\n🔍 Keywords: [relevant search terms]`;
  }

  private static addYouTubeEducational(content: string): string {
    return `📚 Educational content:\n\n${content}\n\n⏰ Timestamps:\n00:00 - Introduction\n02:00 - Main content\n05:00 - Conclusion`;
  }

  private static addYouTubeSubscribe(content: string): string {
    return `${content}\n\n🔔 Subscribe for more content like this! Hit that notification bell to never miss an update!`;
  }

  private static extractTopicsForHashtags(content: string): string[] {
    const words = content.toLowerCase().split(/\s+/);
    const relevantWords = words.filter(word => 
      word.length > 3 && 
      !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'].includes(word)
    );
    return relevantWords.slice(0, 10).map(word => word.replace(/[^a-zA-Z0-9]/g, ''));
  }

  private static truncateIntelligently(content: string, limit: number): string {
    if (content.length <= limit) return content;
    
    const truncated = content.substring(0, limit - 3);
    const lastSentence = truncated.lastIndexOf('.');
    
    if (lastSentence > limit * 0.7) {
      return truncated.substring(0, lastSentence + 1);
    }
    
    return truncated + '...';
  }
}
