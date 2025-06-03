
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings, Key, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { aiProviderManager } from '@/services/ai/aiProviderManager';
import { useToast } from '@/hooks/use-toast';
import { useContentGenerationTesting } from '@/hooks/useContentGenerationTesting';

export const AIProviderConfig = () => {
  const [apiKey, setApiKey] = useState('');
  const [useMockMode, setUseMockMode] = useState(true);
  const [providerStatus, setProviderStatus] = useState(aiProviderManager.getProviderStatus());
  const { toast } = useToast();
  const { isRunningTests, testResults, runAllTests } = useContentGenerationTesting();

  useEffect(() => {
    const status = aiProviderManager.getProviderStatus();
    setProviderStatus(status);
    setUseMockMode(status.provider === 'Mock');
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }

    try {
      aiProviderManager.initializeOpenAI(apiKey);
      setApiKey('');
      setProviderStatus(aiProviderManager.getProviderStatus());
      toast({
        title: "API Key Saved",
        description: "OpenAI API key has been configured successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API key",
        variant: "destructive"
      });
    }
  };

  const handleToggleMockMode = (enabled: boolean) => {
    setUseMockMode(enabled);
    aiProviderManager.setMockMode(enabled);
    setProviderStatus(aiProviderManager.getProviderStatus());
    toast({
      title: "Provider Changed",
      description: `Switched to ${enabled ? 'Mock' : 'OpenAI'} provider`,
    });
  };

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-red-600" />
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            AI Provider Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Provider Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label className="text-sm font-medium">Current Provider</Label>
              <p className="text-sm text-gray-600">{providerStatus.provider}</p>
            </div>
            <Badge variant={providerStatus.initialized ? "default" : "secondary"}>
              {providerStatus.initialized ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Mock Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="mock-mode"
              checked={useMockMode}
              onCheckedChange={handleToggleMockMode}
            />
            <Label htmlFor="mock-mode">Use Mock AI (for testing)</Label>
          </div>

          {/* OpenAI Configuration */}
          {!useMockMode && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">OpenAI API Key</Label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="flex-1"
                />
                <Button onClick={handleSaveApiKey}>
                  <Key className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                API key status: {providerStatus.apiKeySet ? "✅ Configured" : "❌ Not set"}
              </p>
            </div>
          )}

          {/* Testing Section */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">System Tests</h4>
              <Button 
                onClick={runAllTests} 
                disabled={isRunningTests}
                variant="outline"
                size="sm"
              >
                <Zap className="w-4 h-4 mr-2" />
                {isRunningTests ? 'Testing...' : 'Run Tests'}
              </Button>
            </div>

            {testResults.length > 0 && (
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.success)}
                      <span className="text-sm">
                        Test {index + 1}: {result.success ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{result.duration}ms</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status Alerts */}
          {!providerStatus.initialized && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                AI provider is not properly configured. Content generation may not work as expected.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
