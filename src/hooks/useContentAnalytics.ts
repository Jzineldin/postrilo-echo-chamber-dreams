
import { useState, useEffect } from 'react';
import { 
  ContentAnalyticsService, 
  ContentMetrics, 
  AnalyticsInsight, 
  PlatformPerformance 
} from '@/services/analytics/contentAnalyticsService';

export const useContentAnalytics = () => {
  const [insights, setInsights] = useState<AnalyticsInsight[]>([]);
  const [platformPerformance, setPlatformPerformance] = useState<PlatformPerformance[]>([]);
  const [allMetrics, setAllMetrics] = useState<ContentMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAnalytics = () => {
    setIsLoading(true);
    try {
      const newInsights = ContentAnalyticsService.getInsights();
      const newPlatformPerformance = ContentAnalyticsService.getPlatformPerformance();
      const newMetrics = ContentAnalyticsService.getAllMetrics();

      setInsights(newInsights);
      setPlatformPerformance(newPlatformPerformance);
      setAllMetrics(newMetrics);
    } catch (error) {
      console.error('Failed to refresh analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAnalytics();
  }, []);

  const trackContent = (
    contentId: string, 
    platform: string, 
    contentType: string, 
    tone: string, 
    goal: string
  ) => {
    ContentAnalyticsService.trackContent(contentId, platform, contentType, tone, goal);
    refreshAnalytics();
  };

  const updateMetrics = (contentId: string, updates: Partial<ContentMetrics>) => {
    ContentAnalyticsService.updateMetrics(contentId, updates);
    refreshAnalytics();
  };

  const getContentMetrics = (contentId: string): ContentMetrics | undefined => {
    return ContentAnalyticsService.getContentMetrics(contentId);
  };

  const getMetricsByPlatform = (platform: string): ContentMetrics[] => {
    return allMetrics.filter(m => m.platform === platform);
  };

  const getMetricsByDateRange = (startDate: Date, endDate: Date): ContentMetrics[] => {
    return allMetrics.filter(m => 
      m.timestamp >= startDate.getTime() && 
      m.timestamp <= endDate.getTime()
    );
  };

  const getTopPerformingContent = (limit: number = 5): ContentMetrics[] => {
    return allMetrics
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, limit);
  };

  const getEngagementTrend = (days: number = 30): { date: string; engagement: number }[] => {
    const now = new Date();
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    const relevantMetrics = getMetricsByDateRange(startDate, now);
    
    // Group by day
    const dailyEngagement: Record<string, number[]> = {};
    
    relevantMetrics.forEach(metric => {
      const date = new Date(metric.timestamp).toISOString().split('T')[0];
      if (!dailyEngagement[date]) dailyEngagement[date] = [];
      dailyEngagement[date].push(metric.engagement);
    });

    // Calculate average engagement per day
    return Object.entries(dailyEngagement).map(([date, engagements]) => ({
      date,
      engagement: engagements.reduce((sum, eng) => sum + eng, 0) / engagements.length
    })).sort((a, b) => a.date.localeCompare(b.date));
  };

  return {
    insights,
    platformPerformance,
    allMetrics,
    isLoading,
    refreshAnalytics,
    trackContent,
    updateMetrics,
    getContentMetrics,
    getMetricsByPlatform,
    getMetricsByDateRange,
    getTopPerformingContent,
    getEngagementTrend
  };
};
