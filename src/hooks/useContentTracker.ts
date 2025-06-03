
import { useContentAnalytics } from './useContentAnalytics';
import { useCallback } from 'react';

interface ContentTrackingData {
  contentId: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  topic: string;
}

export const useContentTracker = () => {
  const { trackContent, updateMetrics } = useContentAnalytics();

  const trackContentGeneration = useCallback((data: ContentTrackingData) => {
    trackContent(data.contentId, data.platform, data.contentType, data.tone, data.goal);
    
    // Simulate initial metrics (in real app, these would come from actual platform APIs)
    setTimeout(() => {
      const simulatedMetrics = {
        impressions: Math.floor(Math.random() * 1000) + 100,
        engagement: Math.floor(Math.random() * 100) + 10,
        clicks: Math.floor(Math.random() * 50) + 5,
        shares: Math.floor(Math.random() * 20) + 1,
        saves: Math.floor(Math.random() * 15) + 1,
        comments: Math.floor(Math.random() * 10) + 1,
        reach: Math.floor(Math.random() * 800) + 200
      };
      
      updateMetrics(data.contentId, simulatedMetrics);
    }, 2000);
  }, [trackContent, updateMetrics]);

  const updateContentPerformance = useCallback((contentId: string, metrics: any) => {
    updateMetrics(contentId, metrics);
  }, [updateMetrics]);

  return {
    trackContentGeneration,
    updateContentPerformance
  };
};
