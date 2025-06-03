
export interface ABTestVariant {
  id: string;
  name: string;
  content: string;
  metadata: {
    template: string;
    tone: string;
    hook: string;
    cta: string;
  };
  performance?: {
    impressions: number;
    engagement: number;
    clicks: number;
    shares: number;
  };
}

export interface ABTest {
  id: string;
  topic: string;
  platform: string;
  variants: ABTestVariant[];
  status: 'draft' | 'running' | 'completed';
  winner?: string;
  confidence?: number;
  createdAt: Date;
}

export class ContentABTestingService {
  private static tests: ABTest[] = [];

  static createABTest(
    topic: string, 
    platform: string, 
    variants: Omit<ABTestVariant, 'id'>[]
  ): ABTest {
    const test: ABTest = {
      id: `test_${Date.now()}`,
      topic,
      platform,
      variants: variants.map((variant, index) => ({
        ...variant,
        id: `variant_${index + 1}`
      })),
      status: 'draft',
      createdAt: new Date()
    };

    this.tests.push(test);
    return test;
  }

  static generateVariants(
    topic: string, 
    platform: string, 
    tone: string
  ): Omit<ABTestVariant, 'id'>[] {
    const hooks = [
      'Question Hook: Start with an engaging question',
      'Shock Hook: Share a surprising statistic',
      'Story Hook: Begin with a personal anecdote',
      'Problem Hook: Identify a common pain point'
    ];

    const ctas = [
      'Engagement CTA: Ask for comments and opinions',
      'Save CTA: Encourage users to save the post',
      'Share CTA: Ask users to share with others',
      'Follow CTA: Request follows for more content'
    ];

    return [
      {
        name: 'Hook Variant A',
        content: '',
        metadata: {
          template: 'problem-solution',
          tone,
          hook: hooks[0],
          cta: ctas[0]
        }
      },
      {
        name: 'Hook Variant B',
        content: '',
        metadata: {
          template: 'story-lesson',
          tone,
          hook: hooks[1],
          cta: ctas[1]
        }
      }
    ];
  }

  static getActiveTests(): ABTest[] {
    return this.tests.filter(test => test.status === 'running');
  }

  static getTestById(id: string): ABTest | undefined {
    return this.tests.find(test => test.id === id);
  }

  static analyzeTestResults(testId: string): { winner: string; confidence: number } | null {
    const test = this.getTestById(testId);
    if (!test || test.variants.length < 2) return null;

    // Simple analysis based on engagement rate
    const variantPerformance = test.variants.map(variant => {
      if (!variant.performance) return { id: variant.id, score: 0 };
      
      const engagementRate = variant.performance.engagement / 
        (variant.performance.impressions || 1);
      
      return { id: variant.id, score: engagementRate };
    });

    variantPerformance.sort((a, b) => b.score - a.score);
    
    // Calculate confidence (simplified)
    const winner = variantPerformance[0];
    const runnerUp = variantPerformance[1];
    
    const confidence = winner.score > 0 ? 
      Math.min(95, ((winner.score - runnerUp.score) / winner.score) * 100) : 0;

    return {
      winner: winner.id,
      confidence: Math.round(confidence)
    };
  }

  static getRecommendations(platform: string): string[] {
    const recommendations = [
      'Test different hook styles (question vs statement)',
      'Experiment with CTA placement (beginning vs end)',
      'Try varying content length (short vs detailed)',
      'Test emoji usage vs text-only posts',
      'Compare storytelling vs direct advice format'
    ];

    // Platform-specific recommendations
    if (platform === 'instagram') {
      recommendations.push('Test carousel vs single image posts');
      recommendations.push('Experiment with hashtag quantity (5 vs 15+)');
    } else if (platform === 'linkedin') {
      recommendations.push('Test professional vs casual tone');
      recommendations.push('Compare industry insights vs personal experiences');
    }

    return recommendations.slice(0, 3); // Return top 3 recommendations
  }
}
