
interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  contentType: string;
  platforms: string[];
  prompt: string;
  variables: string[];
  metrics?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export class EnhancedTemplateService {
  private templates: ContentTemplate[] = [
    // Viral & Engagement Templates
    {
      id: 'viral-hook',
      name: 'Viral Hook Post',
      description: 'Create attention-grabbing posts that stop the scroll',
      category: 'engagement',
      contentType: 'post',
      platforms: ['twitter', 'instagram', 'tiktok'],
      prompt: 'Create a viral hook post about {{topic}} that immediately grabs attention. Start with a provocative question, shocking statement, or compelling hook. Make it {{tone}} and optimized for {{platform}}.',
      variables: ['topic', 'tone', 'platform'],
      metrics: '3x higher engagement rate',
      difficulty: 'intermediate'
    },
    {
      id: 'controversy-take',
      name: 'Controversial Take',
      description: 'Opinion posts that spark healthy debate',
      category: 'engagement',
      contentType: 'post',
      platforms: ['twitter', 'linkedin'],
      prompt: 'Create a controversial but reasonable take about {{topic}}. Present a unique perspective that challenges conventional thinking in {{tone}} tone. Include supporting points.',
      variables: ['topic', 'tone'],
      metrics: '5x more comments',
      difficulty: 'advanced'
    },
    {
      id: 'trend-hijack',
      name: 'Trend Hijacking',
      description: 'Capitalize on current trends and memes',
      category: 'viral',
      contentType: 'post',
      platforms: ['twitter', 'instagram', 'tiktok'],
      prompt: 'Create content about {{topic}} that cleverly incorporates the current trend {{trend}}. Make it {{tone}} and relevant to your audience.',
      variables: ['topic', 'trend', 'tone'],
      metrics: '4x more shares',
      difficulty: 'intermediate'
    },

    // Educational Templates
    {
      id: 'tutorial-carousel',
      name: 'Tutorial Carousel',
      description: 'Step-by-step educational content',
      category: 'education',
      contentType: 'carousel',
      platforms: ['instagram', 'linkedin'],
      prompt: 'Create a tutorial carousel about {{topic}}. Break down into 5-7 slides with clear steps, tips, and actionable advice in {{tone}} tone.',
      variables: ['topic', 'tone'],
      metrics: '60% higher saves',
      difficulty: 'beginner'
    },
    {
      id: 'myth-buster',
      name: 'Myth Buster',
      description: 'Debunk common misconceptions',
      category: 'education',
      contentType: 'post',
      platforms: ['linkedin', 'twitter', 'instagram'],
      prompt: 'Create a myth-busting post about {{topic}}. Identify a common misconception and provide the correct information with evidence in {{tone}} tone.',
      variables: ['topic', 'tone'],
      metrics: '2x more engagement',
      difficulty: 'intermediate'
    },
    {
      id: 'tips-thread',
      name: 'Tips Thread',
      description: 'Multi-part tip sharing',
      category: 'education',
      contentType: 'thread',
      platforms: ['twitter', 'instagram'],
      prompt: 'Create a tips thread about {{topic}} with 5-8 actionable tips. Each tip should be practical and immediately implementable. Use {{tone}} tone.',
      variables: ['topic', 'tone'],
      metrics: '3x more bookmarks',
      difficulty: 'beginner'
    },

    // Storytelling Templates
    {
      id: 'story-thread',
      name: 'Story Thread',
      description: 'Multi-part storytelling posts',
      category: 'engagement',
      contentType: 'thread',
      platforms: ['twitter', 'instagram'],
      prompt: 'Create a compelling story thread about {{topic}} in {{tone}} tone. Break it into 3-5 connected posts with cliffhangers between parts.',
      variables: ['topic', 'tone'],
      metrics: '4x higher completion rate',
      difficulty: 'advanced'
    },
    {
      id: 'transformation-story',
      name: 'Transformation Story',
      description: 'Before/after success stories',
      category: 'branding',
      contentType: 'post',
      platforms: ['instagram', 'linkedin', 'facebook'],
      prompt: 'Create a transformation story about {{topic}}. Show the before state, the journey, and the after results. Make it {{tone}} and inspiring.',
      variables: ['topic', 'tone'],
      metrics: '50% more leads',
      difficulty: 'intermediate'
    },

    // Brand Content Templates
    {
      id: 'behind-scenes',
      name: 'Behind the Scenes',
      description: 'Authentic brand storytelling',
      category: 'branding',
      contentType: 'post',
      platforms: ['instagram', 'facebook', 'linkedin'],
      prompt: 'Create behind-the-scenes content about {{topic}}. Show the human side, process, or journey in {{tone}} tone. Make it authentic and relatable.',
      variables: ['topic', 'tone'],
      metrics: '40% better brand recall',
      difficulty: 'beginner'
    },
    {
      id: 'product-launch',
      name: 'Product Launch',
      description: 'Announcement and promotion posts',
      category: 'promotion',
      contentType: 'post',
      platforms: ['twitter', 'instagram', 'linkedin', 'facebook'],
      prompt: 'Create a product launch post for {{topic}}. Highlight key benefits, create excitement, and include strong CTA. Use {{tone}} tone and generate FOMO.',
      variables: ['topic', 'tone'],
      metrics: '6x more conversions',
      difficulty: 'intermediate'
    },
    {
      id: 'social-proof',
      name: 'Social Proof Showcase',
      description: 'Customer testimonials and reviews',
      category: 'promotion',
      contentType: 'post',
      platforms: ['instagram', 'linkedin', 'facebook'],
      prompt: 'Create social proof content about {{topic}}. Showcase customer success, testimonials, or user-generated content in {{tone}} tone.',
      variables: ['topic', 'tone'],
      metrics: '70% higher trust score',
      difficulty: 'beginner'
    },

    // Video Script Templates
    {
      id: 'tiktok-trend',
      name: 'TikTok Trend Script',
      description: 'Scripts that leverage current trends',
      category: 'viral',
      contentType: 'video-script',
      platforms: ['tiktok'],
      prompt: 'Create a TikTok script about {{topic}} that follows trending formats. Include hook (0-3s), main content (3-45s), and CTA (45-60s). Make it {{tone}} and trend-friendly.',
      variables: ['topic', 'tone'],
      metrics: '8x more views',
      difficulty: 'advanced'
    },
    {
      id: 'explainer-video',
      name: 'Explainer Video',
      description: 'Educational video scripts',
      category: 'education',
      contentType: 'video-script',
      platforms: ['youtube', 'instagram', 'linkedin'],
      prompt: 'Create an explainer video script about {{topic}}. Structure: intro hook, problem, solution, examples, and call-to-action. Keep it {{tone}} and educational.',
      variables: ['topic', 'tone'],
      metrics: '90% completion rate',
      difficulty: 'intermediate'
    },
    {
      id: 'testimonial-video',
      name: 'Testimonial Video Script',
      description: 'Customer success video scripts',
      category: 'promotion',
      contentType: 'video-script',
      platforms: ['youtube', 'instagram', 'linkedin'],
      prompt: 'Create a testimonial video script about {{topic}}. Focus on customer journey, problem solved, and results achieved. Use {{tone}} tone.',
      variables: ['topic', 'tone'],
      metrics: '80% higher conversion',
      difficulty: 'beginner'
    },

    // Interactive Content Templates
    {
      id: 'question-poll',
      name: 'Question & Poll',
      description: 'Interactive engagement posts',
      category: 'engagement',
      contentType: 'post',
      platforms: ['twitter', 'instagram', 'facebook', 'linkedin'],
      prompt: 'Create an engaging question or poll post about {{topic}}. Ask thought-provoking questions that encourage comments and discussions in {{tone}} tone.',
      variables: ['topic', 'tone'],
      metrics: '5x more interactions',
      difficulty: 'beginner'
    },
    {
      id: 'this-or-that',
      name: 'This or That',
      description: 'Choice-based engagement content',
      category: 'engagement',
      contentType: 'post',
      platforms: ['instagram', 'twitter', 'facebook'],
      prompt: 'Create a "this or that" post about {{topic}}. Present two options related to your niche and ask followers to choose. Make it {{tone}} and engaging.',
      variables: ['topic', 'tone'],
      metrics: '3x more story interactions',
      difficulty: 'beginner'
    }
  ];

  getTemplatesByCategory(category: string): ContentTemplate[] {
    return this.templates.filter(template => template.category === category);
  }

  getTemplatesByPlatform(platform: string): ContentTemplate[] {
    return this.templates.filter(template => template.platforms.includes(platform));
  }

  getTemplatesByContentType(contentType: string): ContentTemplate[] {
    return this.templates.filter(template => template.contentType === contentType);
  }

  getTemplatesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): ContentTemplate[] {
    return this.templates.filter(template => template.difficulty === difficulty);
  }

  getAllTemplates(): ContentTemplate[] {
    return this.templates;
  }

  getTemplate(id: string): ContentTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  getCategories(): string[] {
    return [...new Set(this.templates.map(template => template.category))];
  }

  getPopularTemplates(): ContentTemplate[] {
    // Return templates with high engagement metrics
    return this.templates
      .filter(t => t.metrics)
      .sort((a, b) => {
        const aMetric = parseInt(a.metrics?.match(/\d+/)?.[0] || '0');
        const bMetric = parseInt(b.metrics?.match(/\d+/)?.[0] || '0');
        return bMetric - aMetric;
      })
      .slice(0, 6);
  }

  interpolateTemplate(template: ContentTemplate, variables: Record<string, string>): string {
    let prompt = template.prompt;
    template.variables.forEach(variable => {
      const value = variables[variable] || `[${variable}]`;
      prompt = prompt.replace(new RegExp(`{{${variable}}}`, 'g'), value);
    });
    return prompt;
  }

  searchTemplates(query: string): ContentTemplate[] {
    const lowercaseQuery = query.toLowerCase();
    return this.templates.filter(template => 
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.description.toLowerCase().includes(lowercaseQuery) ||
      template.category.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const enhancedTemplateService = new EnhancedTemplateService();
