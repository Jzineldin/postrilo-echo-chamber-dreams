
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { multiProviderAIService } from '@/services/multiProviderAIService';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Zap, Crown, BarChart3, RefreshCw, TestTube, CheckCircle2, AlertCircle } from 'lucide-react';

export const UsageDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [usage, setUsage] = useState<Record<string, number>>({});
  const [subscription, setSubscription] = useState<any>({ plan: 'free', status: 'active' });
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, 'success' | 'error' | 'pending'>>({});

  const loadData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const [usageData, subscriptionData] = await Promise.all([
        multiProviderAIService.getUserUsage(),
        multiProviderAIService.getUserSubscription()
      ]);
      
      setUsage(usageData);
      setSubscription(subscriptionData);
    } catch (error) {
      console.error('Failed to load usage data:', error);
    } finally {
      setLoading(false);
    }
  };

  const testAIProviders = async () => {
    if (!user) return;

    setTesting(true);
    setTestResults({ gemini: 'pending', groq: 'pending', openai: 'pending' });

    const providers: Array<'gemini' | 'groq' | 'openai'> = ['gemini', 'groq'];
    const isPro = subscription.plan === 'pro' && subscription.status === 'active';
    if (isPro) providers.push('openai');

    for (const provider of providers) {
      try {
        console.log(`Testing ${provider} provider...`);
        const response = await multiProviderAIService.generateContent({
          prompt: `Test message: Respond with "✅ ${provider.toUpperCase()} is working correctly!" to confirm the connection.`,
          preferredProvider: provider,
          type: 'content'
        });

        if (response.content && !response.error) {
          setTestResults(prev => ({ ...prev, [provider]: 'success' }));
          console.log(`${provider} test successful:`, response.content);
        } else {
          setTestResults(prev => ({ ...prev, [provider]: 'error' }));
          console.error(`${provider} test failed:`, response.error);
        }
      } catch (error) {
        setTestResults(prev => ({ ...prev, [provider]: 'error' }));
        console.error(`${provider} test error:`, error);
      }
    }

    setTesting(false);
    
    // Reload usage after testing
    loadData();
    
    toast({
      title: "AI Provider Test Complete",
      description: "Check the results below to see which providers are working.",
    });
  };

  useEffect(() => {
    loadData();
  }, [user]);

  if (!user) {
    return null;
  }

  const isPro = subscription.plan === 'pro' && subscription.status === 'active';
  const dailyLimit = 10;
  const geminiUsage = usage.gemini || 0;
  const groqUsage = usage.groq || 0;
  const openaiUsage = usage.openai || 0;
  const totalFreeUsage = geminiUsage + groqUsage;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Usage Dashboard</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isPro ? "default" : "secondary"} className="flex items-center gap-1">
            {isPro ? <Crown className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
            {isPro ? 'Pro Plan' : 'Free Plan'}
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadData}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* AI Provider Test Section */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TestTube className="w-4 h-4 text-blue-600" />
            Test AI Providers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-blue-700">
            Test all available AI providers to ensure they're working correctly with your API keys.
          </p>
          
          <Button 
            onClick={testAIProviders}
            disabled={testing}
            variant="outline"
            size="sm"
            className="w-full"
          >
            {testing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Testing Providers...
              </>
            ) : (
              <>
                <TestTube className="w-4 h-4 mr-2" />
                Test All AI Providers
              </>
            )}
          </Button>

          {Object.keys(testResults).length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-blue-900">Test Results:</h4>
              {Object.entries(testResults).map(([provider, status]) => (
                <div key={provider} className="flex items-center gap-2 text-sm">
                  {status === 'success' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                  {status === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
                  {status === 'pending' && <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />}
                  <span className="capitalize font-medium">{provider}:</span>
                  <span className={`${
                    status === 'success' ? 'text-green-600' : 
                    status === 'error' ? 'text-red-600' : 
                    'text-blue-600'
                  }`}>
                    {status === 'success' ? 'Working ✅' : 
                     status === 'error' ? 'Failed ❌' : 
                     'Testing...'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!isPro && (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  Gemini (Free)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Today's usage</span>
                    <span className="font-medium">{geminiUsage}/{dailyLimit}</span>
                  </div>
                  <Progress 
                    value={(geminiUsage / dailyLimit) * 100} 
                    className="h-2"
                  />
                  {geminiUsage >= dailyLimit && (
                    <p className="text-xs text-amber-600">Daily limit reached</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  Groq (Free)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Today's usage</span>
                    <span className="font-medium">{groqUsage}/{dailyLimit}</span>
                  </div>
                  <Progress 
                    value={(groqUsage / dailyLimit) * 100} 
                    className="h-2"
                  />
                  {groqUsage >= dailyLimit && (
                    <p className="text-xs text-amber-600">Daily limit reached</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Free Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Combined usage</span>
                    <span className="font-medium">{totalFreeUsage}/{dailyLimit * 2}</span>
                  </div>
                  <Progress 
                    value={(totalFreeUsage / (dailyLimit * 2)) * 100} 
                    className="h-2"
                  />
                  {totalFreeUsage >= (dailyLimit * 2) && (
                    <div className="text-xs text-amber-600 space-y-1">
                      <p>All free providers exhausted</p>
                      <Button size="sm" className="w-full">
                        Upgrade to Pro
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {isPro && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                GPT-4 (Pro)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Today's usage</span>
                  <span className="font-medium">{openaiUsage}</span>
                </div>
                <p className="text-xs text-green-600">Unlimited usage</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {!isPro && totalFreeUsage >= (dailyLimit * 2) && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-amber-800">Daily Limit Reached</h4>
                <p className="text-sm text-amber-700">
                  You've used all your free AI generations for today. Upgrade to Pro for unlimited access to GPT-4.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
