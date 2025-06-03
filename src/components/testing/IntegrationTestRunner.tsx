
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, Play, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IntegrationTest {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  progress: number;
  duration?: number;
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

  const runIntegrationTests = async () => {
    setIsRunning(true);
    
    toast({
      title: "Running Integration Tests",
      description: "Testing end-to-end workflows..."
    });

    // Simulate running tests with progress updates
    for (let i = 0; i < tests.length; i++) {
      setTests(prev => prev.map((test, index) => 
        index === i ? { ...test, status: 'running' as const } : test
      ));

      // Simulate test progress
      for (let progress = 0; progress <= 100; progress += 25) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setTests(prev => prev.map((test, index) => 
          index === i ? { ...test, progress } : test
        ));
      }

      // Set final status (randomly for demo)
      const success = Math.random() > 0.3;
      setTests(prev => prev.map((test, index) => 
        index === i ? { 
          ...test, 
          status: success ? 'passed' as const : 'failed' as const,
          duration: Math.random() * 3 + 1
        } : test
      ));
    }

    setIsRunning(false);
    toast({
      title: "Integration Tests Complete",
      description: "All tests have finished running"
    });
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
            Integration Tests
          </span>
          <Button onClick={runIntegrationTests} disabled={isRunning}>
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Run Integration Tests'}
          </Button>
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
              <Progress value={test.progress} className="w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
