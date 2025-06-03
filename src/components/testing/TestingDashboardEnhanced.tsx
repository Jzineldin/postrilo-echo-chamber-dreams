
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TestTube, Settings, Activity, CheckSquare } from 'lucide-react';
import { AIProviderSettings } from './AIProviderSettings';
import { ContentGeneratorTester } from './ContentGeneratorTester';
import { IntegrationTestRunner } from './IntegrationTestRunner';
import { AIHealthChecker } from '../debug/AIHealthChecker';
import { AIContentTest } from '../debug/AIContentTest';

export const TestingDashboardEnhanced = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="w-6 h-6" />
            Testing Dashboard
          </CardTitle>
          <p className="text-gray-600">
            Comprehensive testing and monitoring for AI content generation services
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <TestTube className="w-4 h-4" />
            Testing
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            Integration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AIHealthChecker />
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>AI Service</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Content Generation</span>
                    <Badge variant="default">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Testing Suite</span>
                    <Badge variant="default">Ready</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <AIProviderSettings />
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ContentGeneratorTester />
            <AIContentTest />
          </div>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <IntegrationTestRunner />
        </TabsContent>
      </Tabs>
    </div>
  );
};
