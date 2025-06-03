
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
        engagement: Math.floor(Math.random() * 1000) + 100,
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
