
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { centralizedAIService } from '@/services/centralizedAIService';
import { Bot, CheckCircle2, Zap, TestTube, Loader2 } from 'lucide-react';

export const AISettings = () => {
  const { toast } = useToast();
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const testAIConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('idle');

    try {
      const response = await centralizedAIService.generateContent({
        prompt: "Respond with 'AI connection successful!' to confirm the integration is working.",
        maxTokens: 50,
        temperature: 0.1
      });

      if (response.content && !response.error) {
        setConnectionStatus('success');
        toast({
          title: "Connection Successful!",
          description: "Centralized AI integration is working correctly."
        });
      } else {
        throw new Error(response.error || "Empty response from AI service");
      }
    } catch (error) {
      setConnectionStatus('error');
      console.error('Connection test failed:', error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Unable to connect to AI service.",
        variant: "destructive"
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            Centralized AI Service
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Configuration Status */}
          <div className="flex items-center gap-2 p-4 rounded-lg border bg-green-50 border-green-200">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <span className="text-green-700 font-medium">Centralized AI Active</span>
              <p className="text-green-600 text-sm">No API key configuration required from users</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Zap className="w-3 h-3 mr-1" />
              OpenAI GPT
            </Badge>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Available Features</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900">Content Generation</h4>
                <p className="text-blue-700 text-sm">AI-powered content creation for all platforms</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900">Content Optimization</h4>
                <p className="text-purple-700 text-sm">Smart suggestions to improve engagement</p>
              </div>
              <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                <h4 className="font-medium text-pink-900">Hashtag Generation</h4>
                <p className="text-pink-700 text-sm">Relevant hashtags for maximum reach</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900">Brand Stories</h4>
                <p className="text-green-700 text-sm">Compelling brand narratives and stories</p>
              </div>
            </div>
          </div>

          {/* Test Connection */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Service Test</h3>
            <Button 
              onClick={testAIConnection} 
              disabled={isTestingConnection}
              variant="outline"
              className="w-full"
            >
              {isTestingConnection ? <Loader2 className="w-4 h-4 animate-spin" /> : <TestTube className="w-4 h-4" />}
              Test AI Connection
            </Button>

            {/* Connection Status */}
            {connectionStatus !== 'idle' && (
              <div className={`p-3 rounded-lg ${
                connectionStatus === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {connectionStatus === 'success' 
                  ? '✅ Connection successful! Centralized AI service is working perfectly.'
                  : '❌ Connection failed. Please check the service status and try again.'
                }
              </div>
            )}
          </div>

          {/* Information */}
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">How It Works</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• All AI requests are processed through our secure backend</li>
              <li>• Users don't need to provide their own API keys</li>
              <li>• Content generation is fast and reliable</li>
              <li>• All AI features work seamlessly across the platform</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
