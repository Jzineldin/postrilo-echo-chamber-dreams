
import { useState, useCallback } from 'react';
import { unifiedAIService } from '@/services/ai/unifiedAIService';
import { aiProviderManager } from '@/services/ai/aiProviderManager';
import { ContentFormData } from '@/types/contentGeneration';
import { useToast } from '@/hooks/use-toast';

interface TestResult {
  success: boolean;
  duration: number;
  error?: string;
  fallbackUsed?: boolean;
}

export const useContentGenerationTesting = () => {
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const { toast } = useToast();

  const runBasicGenerationTest = useCallback(async (): Promise<TestResult> => {
    const startTime = Date.now();
    
    try {
      const testFormData: ContentFormData = {
        topic: 'AI testing content generation',
        platform: 'instagram',
        contentType: 'post',
        tone: 'professional',
        goal: 'engagement',
        emojiUsage: false,
        hashtagDensity: false,
        shortSentences: false,
        keyPoints: '',
        useCache: false
      };

      const result = await unifiedAIService.generateFromFormData(testFormData);
      const duration = Date.now() - startTime;

      return {
        success: true,
        duration,
        fallbackUsed: false // Default to false since GeneratedContentResult doesn't have this property
      };
    } catch (error) {
      return {
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }, []);

  const runProviderConnectivityTest = useCallback(async (): Promise<TestResult> => {
    const startTime = Date.now();
    
    try {
      const status = aiProviderManager.getProviderStatus();
      const duration = Date.now() - startTime;

      return {
        success: status.initialized && status.apiKeySet,
        duration,
        error: status.initialized ? undefined : 'Provider not properly initialized'
      };
    } catch (error) {
      return {
        success: false,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Connectivity test failed'
      };
    }
  }, []);

  const runAllTests = useCallback(async () => {
    setIsRunningTests(true);
    const results: TestResult[] = [];

    toast({
      title: "Running Tests",
      description: "Testing core content generation features..."
    });

    // Test 1: Provider connectivity
    const connectivityResult = await runProviderConnectivityTest();
    results.push(connectivityResult);

    // Test 2: Basic generation
    const generationResult = await runBasicGenerationTest();
    results.push(generationResult);

    setTestResults(results);
    setIsRunningTests(false);

    const successCount = results.filter(r => r.success).length;
    toast({
      title: `Tests Complete`,
      description: `${successCount}/${results.length} tests passed`,
      variant: successCount === results.length ? "default" : "destructive"
    });
  }, [runBasicGenerationTest, runProviderConnectivityTest, toast]);

  return {
    isRunningTests,
    testResults,
    runAllTests,
    runBasicGenerationTest,
    runProviderConnectivityTest
  };
};
