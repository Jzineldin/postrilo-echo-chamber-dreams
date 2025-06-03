
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Key, Zap } from 'lucide-react';
import { aiProviderManager } from '@/services/ai/aiProviderManager';
import { useToast } from '@/hooks/use-toast';

export const AIProviderSettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [useMockMode, setUseMockMode] = useState(true);
  const { toast } = useToast();
  
  const providerStatus = aiProviderManager.getProviderStatus();

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
    toast({
      title: "Provider Changed",
      description: `Switched to ${enabled ? 'Mock' : 'OpenAI'} provider`,
    });
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
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Current Provider</Label>
              <p className="text-sm text-gray-600">{providerStatus.provider}</p>
            </div>
            <Badge variant={providerStatus.initialized ? "default" : "secondary"}>
              {providerStatus.initialized ? "Active" : "Inactive"}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="mock-mode"
              checked={useMockMode}
              onCheckedChange={handleToggleMockMode}
            />
            <Label htmlFor="mock-mode">Use Mock AI (for testing)</Label>
          </div>

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
        </CardContent>
      </Card>
    </div>
  );
};
