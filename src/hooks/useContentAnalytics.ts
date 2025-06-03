
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
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
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return {
    analytics,
    isLoading,
    refreshAnalytics
  };
};
