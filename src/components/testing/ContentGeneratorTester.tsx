
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestTube, Play, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { useContentGenerationTesting } from '@/hooks/useContentGenerationTesting';

export const ContentGeneratorTester = () => {
  const { isRunningTests, testResults, runAllTests, runBasicGenerationTest, runProviderConnectivityTest } = useContentGenerationTesting();

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-red-600" />
    );
  };

  const getStatusColor = (success: boolean) => {
    return success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const runIndividualTest = async (testType: 'connectivity' | 'generation') => {
    if (testType === 'connectivity') {
      await runProviderConnectivityTest();
    } else {
      await runBasicGenerationTest();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TestTube className="w-5 h-5" />
            Content Generator Tests
          </span>
          <Button onClick={runAllTests} disabled={isRunningTests}>
            <Play className="w-4 h-4 mr-2" />
            {isRunningTests ? 'Running...' : 'Run All Tests'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <TestTube className="w-4 h-4 text-gray-400" />
              <div>
                <div className="font-medium">Provider Connectivity</div>
                <div className="text-sm text-gray-600">Test AI service connection</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => runIndividualTest('connectivity')}
                disabled={isRunningTests}
              >
                Test
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <TestTube className="w-4 h-4 text-gray-400" />
              <div>
                <div className="font-medium">Content Generation</div>
                <div className="text-sm text-gray-600">Test basic content creation</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => runIndividualTest('generation')}
                disabled={isRunningTests}
              >
                Test
              </Button>
            </div>
          </div>

          {testResults.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-medium">Test Results:</h4>
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.success)}
                    <span className="text-sm">Test {index + 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{result.duration}ms</span>
                    <Badge className={getStatusColor(result.success)}>
                      {result.success ? 'Passed' : 'Failed'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
