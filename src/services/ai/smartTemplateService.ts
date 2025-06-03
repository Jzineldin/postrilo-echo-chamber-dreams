
export interface SmartTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  structure: string;
  hooks: string[];
  ctas: string[];
  platforms: string[];
  tones: string[];
  successRate: number;
  avgEngagement: number;
  prompt: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  metrics?: string;
  contentType: string;
}

export class SmartTemplateService {
  private static templates: SmartTemplate[] = [
    {
      id: 'problem-solution',
      name: 'Problem-Solution',
      category: 'engagement',
      description: 'Identify a problem and present your solution',
      structure: 'Hook → Problem → Agitation → Solution → CTA',
      hooks: ['Are you tired of...?', 'Stop struggling with...', 'The biggest mistake people make...'],
      ctas: ['Try this today', 'Comment below if you agree', 'Save this for later'],
      platforms: ['instagram', 'linkedin', 'facebook'],
      tones: ['professional', 'casual', 'educational'],
      successRate: 87,
      avgEngagement: 4.2,
      prompt: 'Create a problem-solution post that identifies a common pain point and offers a clear solution',
      difficulty: 'intermediate',
      metrics: '3x higher engagement',
      contentType: 'post'
    },
    {
      id: 'story-lesson',
      name: 'Story with Lesson',
      category: 'inspiration',
      description: 'Share a personal story with a valuable lesson',
      structure: 'Story Setup → Challenge → Resolution → Lesson → CTA',
      hooks: ['Last week something happened...', 'I used to believe...', 'Three years ago I made a mistake...'],
      ctas: ['What would you have done?', 'Share your story below', 'Tag someone who needs this'],
      platforms: ['instagram', 'linkedin', 'facebook', 'twitter'],
      tones: ['inspirational', 'casual', 'authentic'],
      successRate: 91,
      avgEngagement: 5.1,
      prompt: 'Tell a compelling personal story that teaches a valuable lesson to your audience',
      difficulty: 'advanced',
      metrics: '5x more shares',
      contentType: 'post'
    },
    {
      id: 'list-tips',
      name: 'List of Tips',
      category: 'educational',
      description: 'Actionable tips in an easy-to-digest format',
      structure: 'Hook → Tip 1 → Tip 2 → Tip 3 → Summary → CTA',
      hooks: ['5 things I wish I knew...', 'Here are the secrets to...', 'Stop doing these mistakes...'],
      ctas: ['Which tip will you try first?', 'Save this post', 'Follow for more tips'],
      platforms: ['instagram', 'linkedin', 'twitter'],
      tones: ['educational', 'professional', 'casual'],
      successRate: 83,
      avgEngagement: 3.8,
      prompt: 'Create a list of 3-5 actionable tips that provide immediate value to your audience',
      difficulty: 'beginner',
      metrics: '2x more saves',
      contentType: 'post'
    },
    {
      id: 'behind-scenes',
      name: 'Behind the Scenes',
      category: 'authentic',
      description: 'Show the real process behind your work',
      structure: 'Hook → Process Reveal → Challenges → Reality Check → CTA',
      hooks: ['What actually happens behind the scenes...', 'The reality of...', 'Nobody talks about...'],
      ctas: ['What surprised you most?', 'Share your behind-the-scenes', 'Follow for real content'],
      platforms: ['instagram', 'tiktok', 'youtube', 'linkedin'],
      tones: ['authentic', 'casual', 'honest'],
      successRate: 88,
      avgEngagement: 4.7,
      prompt: 'Reveal the authentic behind-the-scenes process, including challenges and real moments',
      difficulty: 'intermediate',
      metrics: '4x more engagement',
      contentType: 'video'
    }
  ];

  static getAllTemplates(): SmartTemplate[] {
    return this.templates;
  }

  static getTemplatesByPlatform(platform: string): SmartTemplate[] {
    return this.templates.filter(template => 
      template.platforms.includes(platform)
    );
  }

  static getTemplatesByTone(tone: string): SmartTemplate[] {
    return this.templates.filter(template => 
      template.tones.includes(tone)
    );
  }

  static getTemplate(id: string): SmartTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  static getOptimalTemplate(platform: string, tone: string, goal: string): SmartTemplate {
    let candidates = this.templates.filter(template => 
      template.platforms.includes(platform) && 
      template.tones.includes(tone)
    );

    if (candidates.length === 0) {
      candidates = this.templates.filter(template => 
        template.platforms.includes(platform)
      );
    }

    if (candidates.length === 0) {
      candidates = this.templates;
    }

    const scoredTemplates = candidates.map(template => ({
      template,
      score: (template.successRate * 0.6) + (template.avgEngagement * 0.4 * 20)
    }));

    scoredTemplates.sort((a, b) => b.score - a.score);
    
    return scoredTemplates[0].template;
  }

  static generateTemplatePrompt(template: SmartTemplate, topic: string, platform: string): string {
    const randomHook = template.hooks[Math.floor(Math.random() * template.hooks.length)];
    const randomCTA = template.ctas[Math.floor(Math.random() * template.ctas.length)];

    return `Using the "${template.name}" template, create content about: ${topic}

TEMPLATE STRUCTURE: ${template.structure}
SUGGESTED HOOK: ${randomHook}
SUGGESTED CTA: ${randomCTA}
PLATFORM: ${platform}

${template.prompt}

Focus on ${template.category.toLowerCase()} and ensure the content follows the proven structure for maximum engagement.`;
  }

  static searchTemplates(query: string): SmartTemplate[] {
    const lowercaseQuery = query.toLowerCase();
    return this.templates.filter(template => 
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.description.toLowerCase().includes(lowercaseQuery) ||
      template.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  static getCategories(): string[] {
    return [...new Set(this.templates.map(template => template.category))];
  }

  static getPopularTemplates(): SmartTemplate[] {
    return this.templates
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 6);
  }
}
