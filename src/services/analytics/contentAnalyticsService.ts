
export interface ContentMetrics {
  id: string;
  contentId: string;
  platform: string;
  impressions: number;
  engagement: number;
  clicks: number;
  shares: number;
  saves: number;
  comments: number;
  reach: number;
  timestamp: number;
  contentType: string;
  tone: string;
  goal: string;
}

export interface AnalyticsInsight {
  type: 'performance' | 'trend' | 'recommendation';
  title: string;
  description: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  actionable?: string;
}

export interface PlatformPerformance {
  platform: string;
  totalPosts: number;
  avgEngagement: number;
  bestPerformingType: string;
  bestPerformingTone: string;
  totalReach: number;
  growthRate: number;
}

export class ContentAnalyticsService {
  private static metrics: ContentMetrics[] = [];

  static trackContent(contentId: string, platform: string, contentType: string, tone: string, goal: string): void {
    const metrics: ContentMetrics = {
      id: `metrics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      contentId,
      platform,
      impressions: 0,
      engagement: 0,
      clicks: 0,
      shares: 0,
      saves: 0,
      comments: 0,
      reach: 0,
      timestamp: Date.now(),
      contentType,
      tone,
      goal
    };

    this.metrics.push(metrics);
    this.saveToStorage();
  }

  static updateMetrics(contentId: string, updates: Partial<ContentMetrics>): void {
    const index = this.metrics.findIndex(m => m.contentId === contentId);
    if (index !== -1) {
      this.metrics[index] = { ...this.metrics[index], ...updates };
      this.saveToStorage();
    }
  }

  static getContentMetrics(contentId: string): ContentMetrics | undefined {
    return this.metrics.find(m => m.contentId === contentId);
  }

  static getAllMetrics(): ContentMetrics[] {
    this.loadFromStorage();
    return this.metrics;
  }

  static getPlatformPerformance(): PlatformPerformance[] {
    const platforms = [...new Set(this.metrics.map(m => m.platform))];
    
    return platforms.map(platform => {
      const platformMetrics = this.metrics.filter(m => m.platform === platform);
      const totalPosts = platformMetrics.length;
      const avgEngagement = platformMetrics.reduce((sum, m) => sum + m.engagement, 0) / totalPosts || 0;
      const totalReach = platformMetrics.reduce((sum, m) => sum + m.reach, 0);
      
      // Find best performing content type and tone
      const typePerformance = this.groupAndAverage(platformMetrics, 'contentType', 'engagement');
      const tonePerformance = this.groupAndAverage(platformMetrics, 'tone', 'engagement');
      
      const bestPerformingType = typePerformance.sort((a, b) => b.avgValue - a.avgValue)[0]?.key || 'post';
      const bestPerformingTone = tonePerformance.sort((a, b) => b.avgValue - a.avgValue)[0]?.key || 'casual';

      // Calculate growth rate (simplified)
      const growthRate = this.calculateGrowthRate(platformMetrics);

      return {
        platform,
        totalPosts,
        avgEngagement,
        bestPerformingType,
        bestPerformingTone,
        totalReach,
        growthRate
      };
    });
  }

  static getInsights(): AnalyticsInsight[] {
    const insights: AnalyticsInsight[] = [];
    const metrics = this.getAllMetrics();

    if (metrics.length === 0) {
      return [{
        type: 'recommendation',
        title: 'Start Creating Content',
        description: 'Begin generating content to see analytics and insights',
        value: 'No data yet',
        actionable: 'Create your first post to start tracking performance'
      }];
    }

    // Performance insights
    const avgEngagement = metrics.reduce((sum, m) => sum + m.engagement, 0) / metrics.length;
    const topPerformer = metrics.sort((a, b) => b.engagement - a.engagement)[0];

    insights.push({
      type: 'performance',
      title: 'Average Engagement',
      description: 'Overall engagement across all content',
      value: avgEngagement.toFixed(1),
      trend: avgEngagement > 100 ? 'up' : avgEngagement > 50 ? 'stable' : 'down'
    });

    if (topPerformer) {
      insights.push({
        type: 'performance',
        title: 'Top Performing Content',
        description: `${topPerformer.platform} ${topPerformer.contentType}`,
        value: `${topPerformer.engagement} engagements`,
        actionable: `Try more ${topPerformer.tone} content on ${topPerformer.platform}`
      });
    }

    // Platform insights
    const platformPerformance = this.getPlatformPerformance();
    const bestPlatform = platformPerformance.sort((a, b) => b.avgEngagement - a.avgEngagement)[0];

    if (bestPlatform) {
      insights.push({
        type: 'recommendation',
        title: 'Best Platform',
        description: `${bestPlatform.platform} shows highest engagement`,
        value: `${bestPlatform.avgEngagement.toFixed(1)} avg engagement`,
        actionable: `Focus more content creation on ${bestPlatform.platform}`
      });
    }

    // Trend insights
    const recentMetrics = metrics.filter(m => Date.now() - m.timestamp < 7 * 24 * 60 * 60 * 1000);
    const recentAvgEngagement = recentMetrics.reduce((sum, m) => sum + m.engagement, 0) / recentMetrics.length || 0;
    const change = ((recentAvgEngagement - avgEngagement) / avgEngagement) * 100;

    if (recentMetrics.length > 0) {
      insights.push({
        type: 'trend',
        title: 'Weekly Performance',
        description: 'Engagement trend over the last 7 days',
        value: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`,
        change,
        trend: change > 5 ? 'up' : change < -5 ? 'down' : 'stable'
      });
    }

    return insights;
  }

  private static groupAndAverage(metrics: ContentMetrics[], groupBy: keyof ContentMetrics, avgField: keyof ContentMetrics) {
    const groups = metrics.reduce((acc, metric) => {
      const key = metric[groupBy] as string;
      if (!acc[key]) acc[key] = [];
      acc[key].push(metric[avgField] as number);
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(groups).map(([key, values]) => ({
      key,
      avgValue: values.reduce((sum, val) => sum + val, 0) / values.length
    }));
  }

  private static calculateGrowthRate(metrics: ContentMetrics[]): number {
    if (metrics.length < 2) return 0;
    
    const sorted = metrics.sort((a, b) => a.timestamp - b.timestamp);
    const oldAvg = sorted.slice(0, Math.floor(sorted.length / 2))
      .reduce((sum, m) => sum + m.engagement, 0) / Math.floor(sorted.length / 2) || 1;
    const newAvg = sorted.slice(Math.floor(sorted.length / 2))
      .reduce((sum, m) => sum + m.engagement, 0) / Math.ceil(sorted.length / 2) || 0;
    
    return ((newAvg - oldAvg) / oldAvg) * 100;
  }

  private static saveToStorage(): void {
    try {
      localStorage.setItem('contentAnalytics', JSON.stringify(this.metrics));
    } catch (error) {
      console.warn('Failed to save analytics to storage:', error);
    }
  }

  private static loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('contentAnalytics');
      if (stored) {
        this.metrics = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load analytics from storage:', error);
      this.metrics = [];
    }
  }
}
