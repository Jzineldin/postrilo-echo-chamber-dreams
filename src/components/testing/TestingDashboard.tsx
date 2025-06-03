
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestTube, Zap, Activity, Settings, Play, CheckCircle, AlertTriangle } from 'lucide-react';
import { ContentGeneratorTester } from './ContentGeneratorTester';
import { IntegrationTestRunner } from './IntegrationTestRunner';
import { PerformanceMonitor } from './PerformanceMonitor';
import { useContentGenerationTesting } from '@/hooks/useContentGenerationTesting';

export const TestingDashboard = () => {
  const [activeTab, setActiveTab] = useState('unit');
  const { isRunningTests, testResults, runAllTests } = useContentGenerationTesting();

  const overallTestStatus = testResults.length > 0 
    ? testResults.every(result => result.success) ? 'passing' : 'failing'
    : 'pending';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passing':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failing':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <TestTube className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passing':
        return 'bg-green-100 text-green-800';
      case 'failing':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TestTube className="w-6 h-6 text-blue-600" />
              Testing Dashboard
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {getStatusIcon(overallTestStatus)}
                <Badge className={getStatusColor(overallTestStatus)}>
                  {overallTestStatus}
                </Badge>
              </div>
              <Button 
                onClick={runAllTests} 
                disabled={isRunningTests}
                size="sm"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunningTests ? 'Running...' : 'Run All Tests'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {testResults.filter(r => r.success).length}
              </div>
              <div className="text-sm text-gray-600">Tests Passing</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {testResults.filter(r => !r.success).length}
              </div>
              <div className="text-sm text-gray-600">Tests Failing</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {testResults.length}
              </div>
              <div className="text-sm text-gray-600">Total Tests</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="unit" className="flex items-center gap-2">
            <TestTube className="w-4 h-4" />
            Unit Tests
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Integration
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unit" className="space-y-6">
          <ContentGeneratorTester />
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <IntegrationTestRunner />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceMonitor />
        </TabsContent>
      </Tabs>
    </div>
  );
};
