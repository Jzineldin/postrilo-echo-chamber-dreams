
import { ContentFormData } from '@/types/contentGeneration';

interface MockGenerationResult {
  text: string;
  hashtags: string[];
}

export class EnhancedMockAIService {
  private static platformTemplates = {
    instagram: {
      post: [
        "🌟 {topic}! Ready to transform your {tone} game? Here's what you need to know...",
        "✨ Exploring {topic} and why it's a game-changer for your {goal}!",
        "💫 {topic} isn't just a trend - it's a lifestyle. Here's how to master it:",
        "🚀 Level up with {topic}! Your journey to {goal} starts here."
      ],
      hashtags: ['#motivation', '#success', '#growth', '#inspiration', '#lifestyle', '#goals']
    },
    twitter: {
      post: [
        "Just thinking about {topic} and how it can transform your {tone} perspective 🧠✨",
        "Hot take: {topic} is the key to {goal}. Here's why 🔥",
        "PSA: {topic} will change how you approach {goal} forever 💯",
        "Breaking: {topic} experts reveal the secret to {goal} 🚨"
      ],
      hashtags: ['#thoughts', '#mindset', '#growth', '#tips', '#thread']
    },
    linkedin: {
      post: [
        "Professional insights on {topic}: Three key strategies that have proven effective for {goal}...",
        "After analyzing {topic} trends, here's what successful professionals are doing for {goal}:",
        "Leadership lesson: How {topic} can accelerate your {goal} in today's market.",
        "Industry spotlight: Why {topic} is becoming essential for {goal} success."
      ],
      hashtags: ['#professional', '#strategy', '#business', '#leadership', '#growth']
    },
    facebook: {
      post: [
        "Friends, let's talk about {topic}! I've been exploring how it impacts {goal}...",
        "Community question: How has {topic} helped you with {goal}? Share your experience!",
        "Sharing some thoughts on {topic} and why it matters for {goal}.",
        "Weekend wisdom: {topic} insights that could change your approach to {goal}."
      ],
      hashtags: ['#community', '#sharing', '#discussion', '#tips', '#life']
    },
    tiktok: {
      post: [
        "POV: You discover {topic} and it changes your {goal} game forever 🤯",
        "Tell me you're into {topic} without telling me you're into {topic} ✨",
        "Rating {topic} strategies for {goal}: Let's see what works! 📊",
        "This {topic} hack for {goal} is about to blow your mind 🤯"
      ],
      hashtags: ['#fyp', '#viral', '#hack', '#tips', '#trending']
    },
    youtube: {
      post: [
        "Welcome back! Today we're diving deep into {topic} and how it can revolutionize your {goal}...",
        "In this video, I'll share everything I've learned about {topic} for {goal}. Let's get started!",
        "Hey everyone! Excited to talk about {topic} today - this could be a game-changer for your {goal}.",
        "What's up, {goal} enthusiasts! Today's topic: {topic} and why it matters more than you think."
      ],
      hashtags: ['#youtube', '#tutorial', '#guide', '#tips', '#education']
    }
  };

  private static toneModifiers = {
    professional: {
      prefix: '',
      style: 'formal',
      emojis: ['💼', '📈', '🎯', '✅']
    },
    casual: {
      prefix: 'Hey! ',
      style: 'conversational',
      emojis: ['😊', '👋', '💪', '🌟']
    },
    humorous: {
      prefix: 'Okay, real talk: ',
      style: 'funny',
      emojis: ['😂', '🤪', '😅', '🎉']
    },
    inspirational: {
      prefix: '',
      style: 'motivational',
      emojis: ['🚀', '💫', '⭐', '🌈']
    },
    educational: {
      prefix: 'Did you know? ',
      style: 'informative',
      emojis: ['📚', '🧠', '💡', '🔍']
    },
    conversational: {
      prefix: 'Let\'s chat about ',
      style: 'friendly',
      emojis: ['💬', '🤝', '😊', '👥']
    }
  };

  private static goalKeywords = {
    engagement: ['connect', 'engage', 'share', 'discuss', 'join'],
    'brand-awareness': ['discover', 'explore', 'learn', 'recognize', 'remember'],
    'lead-generation': ['sign up', 'download', 'subscribe', 'contact', 'get started'],
    sales: ['buy', 'purchase', 'order', 'shop', 'get yours']
  };

  static async generateContent(prompt: string, formData: ContentFormData): Promise<MockGenerationResult> {
    // Simulate realistic generation delay
    await this.simulateDelay(1500, 3000);

    const platform = formData.platform;
    const templates = this.platformTemplates[platform]?.post || this.platformTemplates.instagram.post;
    const hashtags = this.platformTemplates[platform]?.hashtags || this.platformTemplates.instagram.hashtags;
    
    // Select random template
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Apply tone modifications
    const toneModifier = this.toneModifiers[formData.tone];
    let content = template
      .replace(/{topic}/g, formData.topic)
      .replace(/{tone}/g, formData.tone)
      .replace(/{goal}/g, formData.goal.replace('-', ' '));

    // Add tone-specific prefix
    if (toneModifier.prefix && formData.tone !== 'professional') {
      content = toneModifier.prefix + content;
    }

    // Add key points if provided
    if (formData.keyPoints) {
      content += `\n\nKey insights:\n${formData.keyPoints}`;
    }

    // Add goal-specific call to action
    const goalKeywords = this.goalKeywords[formData.goal as keyof typeof this.goalKeywords];
    if (goalKeywords) {
      const keyword = goalKeywords[Math.floor(Math.random() * goalKeywords.length)];
      content += `\n\nReady to ${keyword}? Let's make it happen!`;
    }

    // Apply emoji usage
    if (formData.emojiUsage) {
      const emojis = toneModifier.emojis;
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      content += ` ${emoji}`;
    }

    // Apply short sentences if requested
    if (formData.shortSentences) {
      content = content.replace(/[.!?]\s+/g, '.\n');
    }

    // Platform-specific optimizations
    content = this.applyPlatformOptimizations(content, platform);

    return {
      text: content,
      hashtags: formData.hashtagDensity ? this.generateHashtags(formData, hashtags) : []
    };
  }

  private static applyPlatformOptimizations(content: string, platform: string): string {
    switch (platform) {
      case 'twitter':
        // Ensure content fits Twitter's character limit
        if (content.length > 250) {
          content = content.substring(0, 247) + '...';
        }
        break;
      case 'linkedin':
        // Add professional formatting
        content = content.replace(/\n\n/g, '\n\n• ');
        break;
      case 'instagram':
        // Add line breaks for readability
        content = content.replace(/[.!?]\s+/g, '.\n\n');
        break;
    }
    return content;
  }

  private static generateHashtags(formData: ContentFormData, baseHashtags: string[]): string[] {
    const topicHashtags = this.generateTopicHashtags(formData.topic);
    const toneHashtags = this.generateToneHashtags(formData.tone);
    const goalHashtags = this.generateGoalHashtags(formData.goal);
    
    const allHashtags = [...baseHashtags, ...topicHashtags, ...toneHashtags, ...goalHashtags];
    
    // Remove duplicates and return 5-8 hashtags
    const uniqueHashtags = [...new Set(allHashtags)];
    const count = Math.floor(Math.random() * 4) + 5; // 5-8 hashtags
    
    return uniqueHashtags.slice(0, count);
  }

  private static generateTopicHashtags(topic: string): string[] {
    const words = topic.toLowerCase().split(' ');
    return words
      .filter(word => word.length > 3)
      .slice(0, 3)
      .map(word => `#${word}`);
  }

  private static generateToneHashtags(tone: string): string[] {
    const toneHashtags: Record<string, string[]> = {
      professional: ['#business', '#career'],
      casual: ['#lifestyle', '#daily'],
      humorous: ['#funny', '#meme'],
      inspirational: ['#motivation', '#inspire'],
      educational: ['#learn', '#knowledge'],
      conversational: ['#chat', '#discussion']
    };
    return toneHashtags[tone] || [];
  }

  private static generateGoalHashtags(goal: string): string[] {
    const goalHashtags: Record<string, string[]> = {
      engagement: ['#engage', '#community'],
      'brand-awareness': ['#brand', '#awareness'],
      'lead-generation': ['#leads', '#business'],
      sales: ['#sales', '#buy']
    };
    return goalHashtags[goal] || [];
  }

  private static async simulateDelay(min: number, max: number): Promise<void> {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}
