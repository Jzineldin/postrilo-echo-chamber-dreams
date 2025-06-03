
import { useState, useEffect } from 'react';
import { ContentABTestingService, ABTest, ABTestVariant } from '@/services/ai/contentABTestingService';

export const useABTest = (topic: string, platform: string) => {
  const [activeTest, setActiveTest] = useState<ABTest | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ABTestVariant | null>(null);
  const [testResults, setTestResults] = useState<any>(null);

  useEffect(() => {
    // Check if there's an active test for this topic/platform combination
    const activeTests = ContentABTestingService.getActiveTests();
    const relevantTest = activeTests.find(test => 
      test.topic.toLowerCase().includes(topic.toLowerCase()) && 
      test.platform === platform
    );
    
    if (relevantTest) {
      setActiveTest(relevantTest);
      // Select a random variant for testing
      const randomVariant = relevantTest.variants[
        Math.floor(Math.random() * relevantTest.variants.length)
      ];
      setSelectedVariant(randomVariant);
    }
  }, [topic, platform]);

  const createNewTest = (tone: string) => {
    const variants = ContentABTestingService.generateVariants(topic, platform, tone);
    const newTest = ContentABTestingService.createABTest(topic, platform, variants);
    setActiveTest(newTest);
    setSelectedVariant(newTest.variants[0]);
    return newTest;
  };

  const trackPerformance = (variantId: string, metrics: {
    impressions?: number;
    engagement?: number;
    clicks?: number;
    shares?: number;
  }) => {
    if (activeTest) {
      const variant = activeTest.variants.find(v => v.id === variantId);
      if (variant) {
        variant.performance = {
          impressions: (variant.performance?.impressions || 0) + (metrics.impressions || 0),
          engagement: (variant.performance?.engagement || 0) + (metrics.engagement || 0),
          clicks: (variant.performance?.clicks || 0) + (metrics.clicks || 0),
          shares: (variant.performance?.shares || 0) + (metrics.shares || 0)
        };
      }
    }
  };

  const analyzeResults = () => {
    if (activeTest) {
      const results = ContentABTestingService.analyzeTestResults(activeTest.id);
      setTestResults(results);
      return results;
    }
    return null;
  };

  const getRecommendations = () => {
    return ContentABTestingService.getRecommendations(platform);
  };

  return {
    activeTest,
    selectedVariant,
    testResults,
    createNewTest,
    trackPerformance,
    analyzeResults,
    getRecommendations
  };
};
