import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, Play, CheckCircle, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { centralizedAIService } from '@/services/centralizedAIService';
import { UnifiedContentGenerationService } from '@/services/content/unifiedContentGenerationService';

interface IntegrationTest {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  progress: number;
  duration?: number;
  errorDetails?: string;
  successDetails?: string;
}

export const IntegrationTestRunner = () => {
  const [tests, setTests] = useState<IntegrationTest[]>([
    {
      id: '1',
      name: 'Enhanced Content Generation Pipeline',
      description: 'Test complete content generation with retries and fallbacks',
      status: 'pending',
      progress: 0
    },
    {
      id: '2',
      name: 'Multi-Platform Content Optimization',
      description: 'Generate and optimize content for multiple platforms',
      status: 'pending',
      progress: 0
    },
    {
      id: '3',
      name: 'Robust Error Recovery',
      description: 'Test graceful handling of various error scenarios',
      status: 'pending',
      progress: 0
    },
    {
      id: '4',
      name: 'Performance Under Load',
      description: 'Test concurrent requests with optimized queuing',
      status: 'pending',
      progress: 0
    },
    {
      id: '5',
      name: 'Content Optimization Services',
      description: 'Test content analysis and improvement features',
      status: 'pending',
      progress: 0
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const updateTestStatus = (testId: string, updates: Partial<IntegrationTest>) => {
    setTests(prev => prev.map(test => 
      test.id === testId ? { ...test, ...updates } : test
    ));
  };

  const runEnhancedContentGenerationTest = async (): Promise<boolean> => {
    try {
      updateTestStatus('1', { progress: 20, status: 'running' });
      
      // Test enhanced generation with retry logic
      const testContent = await centralizedAIService.generateContent({
        prompt: 'Create a professional post about productivity tips',
        type: 'content',
        platforms: ['linkedin'],
        temperature: 0.7,
        maxTokens: 300
      });
      
      updateTestStatus('1', { progress: 50 });
      
      if (!testContent.content && testContent.error) {
        throw new Error(`Enhanced generation failed: ${testContent.error}`);
      }
      
      // Test fallback scenario with empty prompt
      updateTestStatus('1', { progress: 75 });
      const fallbackTest = await centralizedAIService.generateContent({
        prompt: '',
        type: 'content',
        platforms: ['instagram']
      });
      
      // Should have fallback content even with empty prompt
      if (!fallbackTest.content) {
        throw new Error('Fallback generation failed completely');
      }
      
      updateTestStatus('1', { 
        progress: 100,
        status: 'passed',
        successDetails: `Generated ${testContent.content?.length || 0} chars content, fallback system working`
      });
      return true;
    } catch (error) {
      updateTestStatus('1', { 
        status: 'failed', 
        progress: 100,
        errorDetails: error instanceof Error ? error.message : 'Enhanced generation test failed'
      });
      return false;
    }
  };

  const runMultiPlatformOptimizationTest = async (): Promise<boolean> => {
    try {
      updateTestStatus('2', { status: 'running', progress: 25 });
      
      const platforms = ['instagram', 'twitter', 'linkedin'];
      const results = [];
      
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        updateTestStatus('2', { progress: 25 + (i * 20) });
        
        const content = await centralizedAIService.generateContent({
          prompt: `Test content about technology trends for ${platform}`,
          type: 'content',
          platforms: [platform]
        });
        
        if (content.content) {
          // Test optimization
          const optimization = await centralizedAIService.optimizeContent({
            content: content.content,
            platform: platform,
            objective: 'engagement'
          });
          
          results.push({ 
            platform, 
            success: true, 
            contentLength: content.content.length,
            optimizations: optimization.length
          });
        } else {
          results.push({ platform, success: false, error: content.error });
        }
      }
      
      updateTestStatus('2', { progress: 90 });
      
      const successCount = results.filter(r => r.success).length;
      if (successCount >= 2) {
        updateTestStatus('2', { 
          status: 'passed', 
          progress: 100,
          successDetails: `${successCount}/3 platforms successful with optimization`
        });
        return true;
      } else {
        throw new Error(`Only ${successCount}/3 platforms succeeded in optimization test`);
      }
    } catch (error) {
      updateTestStatus('2', { 
        status: 'failed', 
        progress: 100,
        errorDetails: error instanceof Error ? error.message : 'Multi-platform optimization failed'
      });
      return false;
    }
  };

  const runRobustErrorRecoveryTest = async (): Promise<boolean> => {
    try {
      updateTestStatus('3', { status: 'running', progress: 25 });
      
      // Test multiple error scenarios
      const errorTests = [
        { prompt: '', description: 'empty prompt' },
        { prompt: 'x'.repeat(10000), description: 'extremely long prompt' },
        { prompt: 'Normal content request', description: 'normal request' }
      ];
      
      let recoveryCount = 0;
      
      for (let i = 0; i < errorTests.length; i++) {
        updateTestStatus('3', { progress: 25 + (i * 25) });
        
        const test = errorTests[i];
        const result = await centralizedAIService.generateContent({
          prompt: test.prompt,
          type: 'content'
        });
        
        // Should either succeed or provide meaningful fallback
        if (result.content || (result.error && result.error.length > 0)) {
          recoveryCount++;
        }
      }
      
      if (recoveryCount >= 2) {
        updateTestStatus('3', { 
          status: 'passed', 
          progress: 100,
          successDetails: `${recoveryCount}/3 error scenarios handled gracefully`
        });
        return true;
      } else {
        throw new Error(`Only ${recoveryCount}/3 error scenarios handled properly`);
      }
    } catch (error) {
      updateTestStatus('3', { 
        status: 'failed', 
        progress: 100,
        errorDetails: error instanceof Error ? error.message : 'Error recovery test failed'
      });
      return false;
    }
  };

  const runPerformanceTest = async (): Promise<boolean> => {
    try {
      updateTestStatus('4', { status: 'running', progress: 25 });
      
      const startTime = Date.now();
      const concurrentRequests = 4;
      
      // Test performance optimizer
      const promises = Array.from({ length: concurrentRequests }, (_, i) => 
        centralizedAIService.generateContent({
          prompt: `Performance test request ${i + 1} about digital marketing`,
          type: 'content',
          maxTokens: 100,
          platforms: ['instagram']
        })
      );
      
      updateTestStatus('4', { progress: 50 });
      
      const results = await Promise.allSettled(promises);
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      updateTestStatus('4', { progress: 75 });
      
      const successfulResults = results.filter(r => 
        r.status === 'fulfilled' && r.value.content
      ).length;
      
      const timeoutThreshold = 20000; // 20 seconds for 4 requests
      
      if (duration < timeoutThreshold && successfulResults >= Math.floor(concurrentRequests * 0.75)) {
        updateTestStatus('4', { 
          status: 'passed', 
          progress: 100,
          successDetails: `${successfulResults}/${concurrentRequests} requests completed in ${duration}ms`
        });
        return true;
      } else {
        throw new Error(`Performance issue: ${duration}ms for ${successfulResults}/${concurrentRequests} requests`);
      }
    } catch (error) {
      updateTestStatus('4', { 
        status: 'failed', 
        progress: 100,
        errorDetails: error instanceof Error ? error.message : 'Performance test failed'
      });
      return false;
    }
  };

  const runContentOptimizationTest = async (): Promise<boolean> => {
    try {
      updateTestStatus('5', { status: 'running', progress: 30 });
      
      const testContent = "This is a test post about social media marketing. It needs optimization.";
      
      // Test content optimization
      const optimizations = await centralizedAIService.optimizeContent({
        content: testContent,
        platform: 'instagram',
        objective: 'engagement'
      });
      
      updateTestStatus('5', { progress: 60 });
      
      // Test content improvement
      const improvedContent = await centralizedAIService.improveContent(
        testContent, 
        ['add call-to-action', 'add hashtags']
      );
      
      updateTestStatus('5', { progress: 90 });
      
      const hasOptimizations = Array.isArray(optimizations);
      const hasImprovement = typeof improvedContent === 'string' && improvedContent.length > testContent.length;
      
      if (hasOptimizations && hasImprovement) {
        updateTestStatus('5', { 
          status: 'passed', 
          progress: 100,
          successDetails: `Generated ${optimizations.length} optimizations, improved content by ${improvedContent.length - testContent.length} chars`
        });
        return true;
      } else {
        throw new Error('Content optimization services not working properly');
      }
    } catch (error) {
      updateTestStatus('5', { 
        status: 'failed', 
        progress: 100,
        errorDetails: error instanceof Error ? error.message : 'Content optimization test failed'
      });
      return false;
    }
  };

  const runEnhancedIntegrationTests = async () => {
    setIsRunning(true);
    
    toast({
      title: "Running Enhanced Integration Tests",
      description: "Testing improved content generation pipeline..."
    });

    // Reset all tests
    setTests(prev => prev.map(test => ({ 
      ...test, 
      status: 'pending' as const, 
      progress: 0, 
      errorDetails: undefined,
      successDetails: undefined
    })));

    const testFunctions = [
      { id: '1', fn: runEnhancedContentGenerationTest },
      { id: '2', fn: runMultiPlatformOptimizationTest },
      { id: '3', fn: runRobustErrorRecoveryTest },
      { id: '4', fn: runPerformanceTest },
      { id: '5', fn: runContentOptimizationTest }
    ];

    let passedCount = 0;
    let failedCount = 0;

    for (const { id, fn } of testFunctions) {
      const startTime = Date.now();
      
      try {
        const success = await fn();
        const duration = (Date.now() - startTime) / 1000;
        
        if (success) {
          passedCount++;
        } else {
          failedCount++;
        }
        
        updateTestStatus(id, { duration });
      } catch (error) {
        failedCount++;
        const duration = (Date.now() - startTime) / 1000;
        updateTestStatus(id, { 
          status: 'failed',
          duration,
          errorDetails: error instanceof Error ? error.message : 'Test execution failed'
        });
      }
    }

    setIsRunning(false);
    
    // Get performance metrics
    const metrics = centralizedAIService.getPerformanceMetrics();
    console.log('📊 Performance Metrics:', metrics);
    
    toast({
      title: "Enhanced Tests Complete",
      description: `${passedCount} passed, ${failedCount} failed. Check console for performance metrics.`,
      variant: failedCount > 0 ? "destructive" : "default"
    });
  };

  const resetTests = () => {
    setTests(prev => prev.map(test => ({ 
      ...test, 
      status: 'pending' as const, 
      progress: 0, 
      errorDetails: undefined,
      successDetails: undefined,
      duration: undefined 
    })));
    
    // Clear performance data
    centralizedAIService.clearPerformanceData();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'running':
        return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Enhanced Integration Tests v2.0
          </span>
          <div className="flex gap-2">
            <Button onClick={resetTests} variant="outline" size="sm" disabled={isRunning}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={runEnhancedIntegrationTests} disabled={isRunning}>
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? 'Running...' : 'Run Enhanced Tests'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tests.map((test) => (
            <div key={test.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <div className="font-medium">{test.name}</div>
                    <div className="text-sm text-gray-600">{test.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {test.duration && (
                    <span className="text-sm text-gray-500">{test.duration.toFixed(1)}s</span>
                  )}
                  <Badge className={getStatusColor(test.status)}>
                    {test.status}
                  </Badge>
                </div>
              </div>
              
              <Progress value={test.progress} className="w-full mb-2" />
              
              {test.successDetails && test.status === 'passed' && (
                <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-700">
                  <strong>Success:</strong> {test.successDetails}
                </div>
              )}
              
              {test.errorDetails && (
                <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-700">
                  <strong>Error:</strong> {test.errorDetails}
                </div>
              )}
            </div>
          ))}
        </div>

        {tests.length === 0 && !isRunning && (
          <div className="text-center py-8 text-gray-500">
            <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Click "Run Enhanced Tests" to start comprehensive testing</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
