
import { useState, useEffect } from 'react';

export interface ContentAnalytics {
  totalPosts: number;
  totalEngagement: number;
  averageEngagementRate: number;
  topPlatform: string;
  monthlyGrowth: number;
  weeklyPosts: number[];
  platformDistribution: { platform: string; count: number; percentage: number }[];
  recentPerformance: { date: string; engagement: number; posts: number }[];
}

export interface ContentMetric {
  id: string;
  platform: string;
  contentType: string;
  tone: string;
  engagement: number;
  reach: number;
  timestamp: number;
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

export const useContentAnalytics = () => {
  const [analytics, setAnalytics] = useState<ContentAnalytics>({
    totalPosts: 0,
    totalEngagement: 0,
    averageEngagementRate: 0,
    topPlatform: 'Instagram',
    monthlyGrowth: 0,
    weeklyPosts: [0, 0, 0, 0, 0, 0, 0],
    platformDistribution: [],
    recentPerformance: []
  });
  
  const [allMetrics, setAllMetrics] = useState<ContentMetric[]>([]);
  const [insights, setInsights] = useState<AnalyticsInsight[]>([]);
  const [platformPerformance, setPlatformPerformance] = useState<PlatformPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      const mockMetrics: ContentMetric[] = [
        {
          id: '1',
          platform: 'instagram',
          contentType: 'post',
          tone: 'casual',
          engagement: 450,
          reach: 1200,
          timestamp: Date.now() - 86400000
        },
        {
          id: '2',
          platform: 'twitter',
          contentType: 'tweet',
          tone: 'professional',
          engagement: 320,
          reach: 800,
          timestamp: Date.now() - 172800000
        },
        {
          id: '3',
          platform: 'linkedin',
          contentType: 'post',
          tone: 'professional',
          engagement: 680,
          reach: 1500,
          timestamp: Date.now() - 259200000
        }
      ];

      const mockInsights: AnalyticsInsight[] = [
        {
          type: 'performance',
          title: 'Top Performing Platform',
          description: 'LinkedIn shows highest engagement rates',
          value: '680 avg engagement',
          trend: 'up',
          actionable: 'Focus more content on LinkedIn'
        },
        {
          type: 'trend',
          title: 'Engagement Growth',
          description: 'Weekly engagement increased',
          value: '+15.2%',
          change: 15.2,
          trend: 'up'
        },
        {
          type: 'recommendation',
          title: 'Best Content Type',
          description: 'Professional tone performs best',
          value: 'Professional posts',
          actionable: 'Try more professional tone content'
        }
      ];

      const mockPlatformPerformance: PlatformPerformance[] = [
        {
          platform: 'instagram',
          totalPosts: 12,
          avgEngagement: 425.5,
          bestPerformingType: 'post',
          bestPerformingTone: 'casual',
          totalReach: 15600,
          growthRate: 12.5
        },
        {
          platform: 'twitter',
          totalPosts: 8,
          avgEngagement: 310.2,
          bestPerformingType: 'tweet',
          bestPerformingTone: 'professional',
          totalReach: 8900,
          growthRate: 8.3
        },
        {
          platform: 'linkedin',
          totalPosts: 5,
          avgEngagement: 650.8,
          bestPerformingType: 'post',
          bestPerformingTone: 'professional',
          totalReach: 12400,
          growthRate: 23.1
        }
      ];

      setAllMetrics(mockMetrics);
      setInsights(mockInsights);
      setPlatformPerformance(mockPlatformPerformance);
      
      setAnalytics({
        totalPosts: 156,
        totalEngagement: 12450,
        averageEngagementRate: 4.2,
        topPlatform: 'Instagram',
        monthlyGrowth: 23.5,
        weeklyPosts: [12, 15, 8, 20, 18, 14, 16],
        platformDistribution: [
          { platform: 'Instagram', count: 65, percentage: 41.7 },
          { platform: 'Twitter', count: 42, percentage: 26.9 },
          { platform: 'LinkedIn', count: 28, percentage: 17.9 },
          { platform: 'Facebook', count: 21, percentage: 13.5 }
        ],
        recentPerformance: [
          { date: '2024-01-01', engagement: 450, posts: 3 },
          { date: '2024-01-02', engagement: 320, posts: 2 },
          { date: '2024-01-03', engagement: 680, posts: 4 },
          { date: '2024-01-04', engagement: 520, posts: 3 },
          { date: '2024-01-05', engagement: 750, posts: 5 }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const refreshAnalytics = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const getTopPerformingContent = (limit: number = 5) => {
    return allMetrics
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, limit);
  };

  const getEngagementTrend = (days: number = 30) => {
    const trendData = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Simulate engagement data
      const engagement = Math.random() * 500 + 200;
      
      trendData.push({
        date: date.toISOString(),
        engagement: parseFloat(engagement.toFixed(1))
      });
    }
    
    return trendData;
  };

  const trackContent = (contentId: string, platform: string, contentType: string, tone: string, goal: string) => {
    const newMetric: ContentMetric = {
      id: contentId,
      platform,
      contentType,
      tone,
      engagement: 0,
      reach: 0,
      timestamp: Date.now()
    };
    
    setAllMetrics(prev => [...prev, newMetric]);
  };

  const updateMetrics = (contentId: string, updates: Partial<ContentMetric>) => {
    setAllMetrics(prev => 
      prev.map(metric => 
        metric.id === contentId 
          ? { ...metric, ...updates }
          : metric
      )
    );
  };

  return {
    analytics,
    insights,
    platformPerformance,
    allMetrics,
    isLoading,
    refreshAnalytics,
    getTopPerformingContent,
    getEngagementTrend,
    trackContent,
    updateMetrics
  };
};
