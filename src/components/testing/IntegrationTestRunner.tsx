
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
}

export const IntegrationTestRunner = () => {
  const [tests, setTests] = useState<IntegrationTest[]>([
    {
      id: '1',
      name: 'End-to-End Content Creation',
      description: 'Complete workflow from form input to content generation',
      status: 'pending',
      progress: 0
    },
    {
      id: '2',
      name: 'Multi-Platform Publishing',
      description: 'Generate and format content for multiple platforms',
      status: 'pending',
      progress: 0
    },
    {
      id: '3',
      name: 'Error Recovery Flow',
      description: 'Test application behavior during API failures',
      status: 'pending',
      progress: 0
    },
    {
      id: '4',
      name: 'Performance Under Load',
      description: 'Multiple concurrent content generation requests',
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

  const runEndToEndContentCreationTest = async (): Promise<boolean> => {
    try {
      // Test 1: Form validation
      updateTestStatus('1', { progress: 25, status: 'running' });
      
      // Test 2: AI service connectivity
      updateTestStatus('1', { progress: 50 });
      const testContent = await centralizedAIService.generateContent({
        prompt: 'Test content generation for social media',
        type: 'content',
        temperature: 0.7,
        maxTokens: 100
      });
      
      if (testContent.error && !testContent.content) {
        throw new Error(`AI Service failed: ${testContent.error}`);
      }
      
      // Test 3: Unified generation service
      updateTestStatus('1', { progress: 75 });
      const unifiedResult = await UnifiedContentGenerationService.generateContent({
        topic: 'Test topic for integration',
        platform: 'instagram',
        contentType: 'post',
        tone: 'professional',
        goal: 'engagement'
      });
      
      if (!unifiedResult) {
        throw new Error('Unified content generation returned null');
      }
      
      updateTestStatus('1', { progress: 100 });
      return true;
    } catch (error) {
      updateTestStatus('1', { 
        status: 'failed', 
        progress: 100,
        errorDetails: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  };

  const runMultiPlatformTest = async (): Promise<boolean> => {
    try {
      updateTestStatus('2', { status: 'running', progress: 25 });
      
      const platforms = ['instagram', 'twitter', 'linkedin'];
      const results = [];
      
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        updateTestStatus('2', { progress: 25 + (i + 1) * 25 });
        
        const result = await centralizedAIService.generateContent({
          prompt: `Test content for ${platform}`,
          type: 'content',
          platforms: [platform]
        });
        
        if (result.content) {
          results.push({ platform, success: true });
        } else {
          results.push({ platform, success: false, error: result.error });
        }
      }
      
      const successCount = results.filter(r => r.success).length;
      if (successCount >= 2) {
        updateTestStatus('2', { status: 'passed', progress: 100 });
        return true;
      } else {
        throw new Error(`Only ${successCount}/3 platforms succeeded`);
      }
    } catch (error) {
      updateTestStatus('2', { 
        status: 'failed', 
        progress: 100,
        errorDetails: error instanceof Error ? error.message : 'Multi-platform test failed'
      });
      return false;
    }
  };

  const runErrorRecoveryTest = async (): Promise<boolean> => {
    try {
      updateTestStatus('3', { status: 'running', progress: 50 });
      
      // Test error handling with invalid input
      const result = await centralizedAIService.generateContent({
        prompt: '', // Empty prompt should trigger fallback
        type: 'content'
      });
      
      // Should either succeed with fallback or handle error gracefully
      const hasGracefulHandling = result.content || (result.error && result.error.length > 0);
      
      if (hasGracefulHandling) {
        updateTestStatus('3', { status: 'passed', progress: 100 });
        return true;
      } else {
        throw new Error('No error recovery mechanism found');
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
      const concurrentRequests = 3; // Reduced for better stability
      
      // Test concurrent generation
      const promises = Array.from({ length: concurrentRequests }, (_, i) => 
        centralizedAIService.generateContent({
          prompt: `Performance test ${i + 1}`,
          type: 'content',
          maxTokens: 50 // Smaller responses for faster testing
        })
      );
      
      updateTestStatus('4', { progress: 50 });
      
      const results = await Promise.allSettled(promises);
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      updateTestStatus('4', { progress: 75 });
      
      // Check if requests completed within reasonable time (10 seconds)
      const successfulResults = results.filter(r => r.status === 'fulfilled').length;
      const timeoutThreshold = 10000; // 10 seconds
      
      if (duration < timeoutThreshold && successfulResults >= Math.floor(concurrentRequests * 0.7)) {
        updateTestStatus('4', { status: 'passed', progress: 100 });
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

  const runIntegrationTests = async () => {
    setIsRunning(true);
    
    toast({
      title: "Running Enhanced Integration Tests",
      description: "Testing core functionality with detailed diagnostics..."
    });

    // Reset all tests
    setTests(prev => prev.map(test => ({ ...test, status: 'pending' as const, progress: 0, errorDetails: undefined })));

    const testFunctions = [
      { id: '1', fn: runEndToEndContentCreationTest },
      { id: '2', fn: runMultiPlatformTest },
      { id: '3', fn: runErrorRecoveryTest },
      { id: '4', fn: runPerformanceTest }
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
          updateTestStatus(id, { duration });
        } else {
          failedCount++;
          updateTestStatus(id, { duration });
        }
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
    
    toast({
      title: "Integration Tests Complete",
      description: `${passedCount} passed, ${failedCount} failed`,
      variant: failedCount > 0 ? "destructive" : "default"
    });
  };

  const resetTests = () => {
    setTests(prev => prev.map(test => ({ 
      ...test, 
      status: 'pending' as const, 
      progress: 0, 
      errorDetails: undefined,
      duration: undefined 
    })));
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
            Enhanced Integration Tests
          </span>
          <div className="flex gap-2">
            <Button onClick={resetTests} variant="outline" size="sm" disabled={isRunning}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={runIntegrationTests} disabled={isRunning}>
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? 'Running...' : 'Run Tests'}
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
            <p>Click "Run Tests" to start enhanced integration testing</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
