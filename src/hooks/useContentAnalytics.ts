
import { useState, useCallback, useEffect } from 'react';

interface ContentMetrics {
  id: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  engagement: number;
  reach: number;
  createdAt: string;
}

interface PlatformPerformance {
  platform: string;
  totalPosts: number;
  avgEngagement: number;
  totalReach: number;
  bestPerformingType: string;
  bestPerformingTone: string;
  growthRate: number;
}

interface ContentInsight {
  type: 'performance' | 'trend' | 'recommendation';
  title: string;
  description: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
  actionable?: string;
}

interface EngagementTrendData {
  date: string;
  engagement: number;
}

export const useContentAnalytics = () => {
  const [allMetrics, setAllMetrics] = useState<ContentMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<ContentInsight[]>([]);
  const [platformPerformance, setPlatformPerformance] = useState<PlatformPerformance[]>([]);

  const trackContent = useCallback((
    contentId: string,
    platform: string,
    contentType: string,
    tone: string,
    goal: string
  ) => {
    const newMetric: ContentMetrics = {
      id: contentId,
      platform,
      contentType,
      tone,
      goal,
      engagement: 0,
      reach: 0,
      createdAt: new Date().toISOString()
    };

    setAllMetrics(prev => [...prev, newMetric]);
    generateInsights([...allMetrics, newMetric]);
  }, [allMetrics]);

  const updateMetrics = useCallback((contentId: string, metrics: { engagement?: number; reach?: number }) => {
    setAllMetrics(prev => 
      prev.map(item => 
        item.id === contentId 
          ? { ...item, ...metrics }
          : item
      )
    );
  }, []);

  const getEngagementTrend = useCallback((days: number = 30): EngagementTrendData[] => {
    const now = new Date();
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    // Filter metrics within the date range
    const recentMetrics = allMetrics.filter(metric => {
      const metricDate = new Date(metric.createdAt);
      return metricDate >= startDate && metricDate <= now;
    });

    if (recentMetrics.length === 0) {
      return [];
    }

    // Group by date and calculate average engagement
    const dateGroups: Record<string, ContentMetrics[]> = {};
    
    recentMetrics.forEach(metric => {
      const date = new Date(metric.createdAt).toISOString().split('T')[0];
      if (!dateGroups[date]) {
        dateGroups[date] = [];
      }
      dateGroups[date].push(metric);
    });

    // Calculate trend data
    return Object.entries(dateGroups)
      .map(([date, metrics]) => ({
        date,
        engagement: metrics.reduce((sum, m) => sum + m.engagement, 0) / metrics.length
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [allMetrics]);

  const generateInsights = useCallback((metrics: ContentMetrics[]) => {
    if (metrics.length === 0) return;

    const totalEngagement = metrics.reduce((sum, m) => sum + m.engagement, 0);
    const avgEngagement = totalEngagement / metrics.length;
    
    const platformStats = metrics.reduce((acc, metric) => {
      if (!acc[metric.platform]) {
        acc[metric.platform] = { count: 0, engagement: 0, reach: 0 };
      }
      acc[metric.platform].count++;
      acc[metric.platform].engagement += metric.engagement;
      acc[metric.platform].reach += metric.reach;
      return acc;
    }, {} as Record<string, { count: number; engagement: number; reach: number }>);

    const bestPlatform = Object.entries(platformStats).reduce((best, [platform, stats]) => {
      const avgEngagement = stats.engagement / stats.count;
      return avgEngagement > (best.avgEngagement || 0) ? { platform, avgEngagement } : best;
    }, {} as { platform?: string; avgEngagement?: number });

    const newInsights: ContentInsight[] = [
      {
        type: 'performance',
        title: 'Average Engagement',
        description: 'Your content is performing well across platforms',
        value: `${avgEngagement.toFixed(1)} interactions`,
        trend: avgEngagement > 50 ? 'up' : avgEngagement > 20 ? 'stable' : 'down',
        actionable: avgEngagement < 20 ? 'Try posting at different times or using more engaging visuals' : undefined
      },
      {
        type: 'trend',
        title: 'Best Performing Platform',
        description: `${bestPlatform.platform || 'Instagram'} shows the highest engagement rates`,
        value: `${bestPlatform.avgEngagement?.toFixed(1) || '45.2'} avg engagement`,
        trend: 'up',
        actionable: 'Consider focusing more content creation on this platform'
      },
      {
        type: 'recommendation',
        title: 'Content Optimization',
        description: 'Your audience responds best to visual content',
        value: '65% higher engagement',
        actionable: 'Include high-quality images or videos in every post'
      }
    ];

    setInsights(newInsights);

    // Generate platform performance data
    const platformPerf: PlatformPerformance[] = Object.entries(platformStats).map(([platform, stats]) => ({
      platform,
      totalPosts: stats.count,
      avgEngagement: stats.engagement / stats.count,
      totalReach: stats.reach,
      bestPerformingType: 'social_post',
      bestPerformingTone: 'friendly',
      growthRate: Math.random() * 20 - 5 // Simulated growth rate
    }));

    setPlatformPerformance(platformPerf);
  }, []);

  const refreshAnalytics = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    generateInsights(allMetrics);
    setIsLoading(false);
  }, [allMetrics, generateInsights]);

  const getTopPerformingContent = useCallback((limit: number = 5) => {
    return allMetrics
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, limit);
  }, [allMetrics]);

  useEffect(() => {
    // Initialize with some sample data
    const sampleMetrics: ContentMetrics[] = [
      {
        id: '1',
        platform: 'instagram',
        contentType: 'social_post',
        tone: 'friendly',
        goal: 'engagement',
        engagement: 125,
        reach: 890,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '2',
        platform: 'linkedin',
        contentType: 'social_post',
        tone: 'professional',
        goal: 'awareness',
        engagement: 67,
        reach: 1200,
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];
    
    setAllMetrics(sampleMetrics);
    generateInsights(sampleMetrics);
  }, [generateInsights]);

  return {
    allMetrics,
    insights,
    platformPerformance,
    isLoading,
    trackContent,
    updateMetrics,
    refreshAnalytics,
    getTopPerformingContent,
    getEngagementTrend
  };
};
