
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phase2IntegrationTest } from '@/components/testing/Phase2IntegrationTest';
import { IntegrationTestRunner } from '@/components/testing/IntegrationTestRunner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestTube, BarChart3, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TestingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button 
            onClick={() => window.history.back()}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Postrilo Testing Dashboard
            </h1>
            <p className="text-gray-600">
              Comprehensive testing suite for development and QA
            </p>
            <Badge className="mt-2 bg-purple-600">
              <TestTube className="w-3 h-3 mr-1" />
              Development Environment
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="phase2" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="phase2" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Phase 2 Integration
            </TabsTrigger>
            <TabsTrigger value="e2e" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              End-to-End Tests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="phase2">
            <Phase2IntegrationTest />
          </TabsContent>

          <TabsContent value="e2e">
            <IntegrationTestRunner />
          </TabsContent>
        </Tabs>

        {/* Testing Guidelines */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Testing Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <h4>Phase 2 Integration Tests</h4>
              <ul>
                <li>Tests all core user experience components and hooks</li>
                <li>Verifies authentication, roles, subscriptions, and analytics</li>
                <li>Identifies configuration and integration issues</li>
                <li>Provides detailed status information for debugging</li>
              </ul>
              
              <h4>End-to-End Tests</h4>
              <ul>
                <li>Tests complete user workflows and scenarios</li>
                <li>Simulates real user interactions with the application</li>
                <li>Validates performance under load conditions</li>
                <li>Tests error recovery and resilience</li>
              </ul>
              
              <h4>Best Practices</h4>
              <ul>
                <li>Run Phase 2 tests first to ensure core functionality</li>
                <li>Address any failed tests before proceeding to E2E testing</li>
                <li>Use warnings to identify areas for improvement</li>
                <li>Test with different user roles and subscription states</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
