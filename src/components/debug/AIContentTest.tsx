
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Play, CheckCircle, AlertTriangle } from 'lucide-react';
import { coreAIService } from '@/services/ai/coreAIService';

interface TestResult {
  success: boolean;
  content?: string;
  error?: string;
  duration?: number;
}

export const AIContentTest = () => {
  const [prompt, setPrompt] = useState('Generate a social media post about sustainable living');
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const runTest = async () => {
    if (!prompt.trim()) return;

    setIsRunning(true);
    setTestResult(null);
    const startTime = Date.now();

    try {
      const result = await coreAIService.callAI(prompt);
      const duration = Date.now() - startTime;

      setTestResult({
        success: !result.error,
        content: result.content,
        error: result.error,
        duration
      });
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="w-5 h-5" />
          AI Content Generation Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Test Prompt</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt to test AI content generation..."
            className="min-h-[100px]"
          />
        </div>

        <Button
          onClick={runTest}
          disabled={isRunning || !prompt.trim()}
          className="w-full"
        >
          {isRunning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Running Test...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Test
            </>
          )}
        </Button>

        {testResult && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {testResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                )}
                <span className="font-medium">
                  {testResult.success ? 'Test Passed' : 'Test Failed'}
                </span>
              </div>
              {testResult.duration && (
                <Badge variant="outline">
                  {testResult.duration}ms
                </Badge>
              )}
            </div>

            {testResult.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">
                  <strong>Error:</strong> {testResult.error}
                </p>
              </div>
            )}

            {testResult.content && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-sm font-medium mb-2">Generated Content:</p>
                <div className="text-sm text-gray-700 whitespace-pre-wrap">
                  {testResult.content}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
