
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { SocialMediaService } from '@/services/socialMediaService';
import { useToast } from '@/hooks/use-toast';
import { Settings, ExternalLink, Key, CheckCircle, AlertCircle } from 'lucide-react';

interface PlatformConfig {
  id: string;
  name: string;
  description: string;
  developerUrl: string;
  requiredFields: string[];
  instructions: string[];
}

const PLATFORM_CONFIGS: PlatformConfig[] = [
  {
    id: 'twitter',
    name: 'Twitter/X',
    description: 'Post tweets and threads directly from Postrilo',
    developerUrl: 'https://developer.twitter.com/en/portal/dashboard',
    requiredFields: ['Client ID', 'Client Secret'],
    instructions: [
      'Create a new project in Twitter Developer Portal',
      'Enable OAuth 2.0 with PKCE',
      'Add your redirect URI in app settings',
      'Copy the Client ID and Client Secret'
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Share posts and articles to your LinkedIn profile',
    developerUrl: 'https://www.linkedin.com/developers/apps',
    requiredFields: ['Client ID', 'Client Secret'],
    instructions: [
      'Create a LinkedIn app in Developer Portal',
      'Request "Sign In with LinkedIn" and "Share on LinkedIn" products',
      'Add your redirect URI in OAuth 2.0 settings',
      'Copy the Client ID and Client Secret'
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Post to Facebook pages and groups',
    developerUrl: 'https://developers.facebook.com/apps/',
    requiredFields: ['App ID', 'App Secret'],
    instructions: [
      'Create a Facebook app in Meta for Developers',
      'Add Facebook Login product to your app',
      'Configure Valid OAuth Redirect URIs',
      'Copy the App ID and App Secret'
    ]
  }
];

export const SocialMediaAPIConfig = () => {
  const [configs, setConfigs] = useState<Record<string, { clientId: string; clientSecret: string }>>({});
  const [isConnecting, setIsConnecting] = useState<Record<string, boolean>>({});
  const [connectionStatus, setConnectionStatus] = useState<Record<string, 'connected' | 'disconnected' | 'error'>>({});
  const { toast } = useToast();

  const updateConfig = (platformId: string, field: 'clientId' | 'clientSecret', value: string) => {
    setConfigs(prev => ({
      ...prev,
      [platformId]: {
        ...prev[platformId],
        [field]: value
      }
    }));
  };

  const handleConnect = async (platformId: string) => {
    const config = configs[platformId];
    if (!config?.clientId || !config?.clientSecret) {
      toast({
        title: 'Missing Credentials',
        description: 'Please provide both Client ID and Client Secret',
        variant: 'destructive'
      });
      return;
    }

    setIsConnecting(prev => ({ ...prev, [platformId]: true }));

    try {
      // Save API configuration
      const configResult = await SocialMediaService.configureAPI(platformId, {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        redirectUri: `${window.location.origin}/oauth/callback`
      });

      if (!configResult.success) {
        throw new Error(configResult.error);
      }

      // Initiate OAuth flow
      const oauthResult = await SocialMediaService.initiateOAuth(platformId, {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        redirectUri: `${window.location.origin}/oauth/callback`
      });

      // Open OAuth URL in new window
      const popup = window.open(
        oauthResult.authUrl,
        `oauth_${platformId}`,
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      // Listen for OAuth completion
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'oauth_success' && event.data.platform === platformId) {
          setConnectionStatus(prev => ({ ...prev, [platformId]: 'connected' }));
          toast({
            title: 'Connected Successfully',
            description: `Your ${PLATFORM_CONFIGS.find(p => p.id === platformId)?.name} account is now connected.`
          });
          popup?.close();
          window.removeEventListener('message', handleMessage);
        } else if (event.data.type === 'oauth_error' && event.data.platform === platformId) {
          setConnectionStatus(prev => ({ ...prev, [platformId]: 'error' }));
          toast({
            title: 'Connection Failed',
            description: event.data.error || 'Failed to connect your account.',
            variant: 'destructive'
          });
          popup?.close();
          window.removeEventListener('message', handleMessage);
        }
      };

      window.addEventListener('message', handleMessage);

      // Handle popup closed manually
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          setIsConnecting(prev => ({ ...prev, [platformId]: false }));
        }
      }, 1000);

    } catch (error) {
      toast({
        title: 'Connection Error',
        description: error instanceof Error ? error.message : 'Failed to initiate connection',
        variant: 'destructive'
      });
      setConnectionStatus(prev => ({ ...prev, [platformId]: 'error' }));
    } finally {
      setIsConnecting(prev => ({ ...prev, [platformId]: false }));
    }
  };

  const handleDisconnect = (platformId: string) => {
    SocialMediaService.disconnectPlatform(platformId);
    setConnectionStatus(prev => ({ ...prev, [platformId]: 'disconnected' }));
    toast({
      title: 'Disconnected',
      description: `Your ${PLATFORM_CONFIGS.find(p => p.id === platformId)?.name} account has been disconnected.`
    });
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Key className="h-4 w-4" />
        <AlertDescription>
          Configure your social media app credentials to enable direct posting. You'll need to create developer apps 
          for each platform and provide the API keys below.
        </AlertDescription>
      </Alert>

      {PLATFORM_CONFIGS.map((platform) => {
        const config = configs[platform.id] || { clientId: '', clientSecret: '' };
        const isConnected = connectionStatus[platform.id] === 'connected';
        const hasError = connectionStatus[platform.id] === 'error';
        const connecting = isConnecting[platform.id];

        return (
          <Card key={platform.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  {platform.name}
                  {isConnected && (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  )}
                  {hasError && (
                    <Badge variant="destructive">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Error
                    </Badge>
                  )}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={platform.developerUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Developer Portal
                  </a>
                </Button>
              </CardTitle>
              <p className="text-sm text-gray-600">{platform.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Setup Instructions:</h4>
                <ol className="text-sm text-gray-700 space-y-1">
                  {platform.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2">{index + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${platform.id}-clientId`}>
                    {platform.requiredFields[0]}
                  </Label>
                  <Input
                    id={`${platform.id}-clientId`}
                    type="text"
                    value={config.clientId}
                    onChange={(e) => updateConfig(platform.id, 'clientId', e.target.value)}
                    placeholder="Enter your client ID"
                    disabled={connecting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${platform.id}-clientSecret`}>
                    {platform.requiredFields[1]}
                  </Label>
                  <Input
                    id={`${platform.id}-clientSecret`}
                    type="password"
                    value={config.clientSecret}
                    onChange={(e) => updateConfig(platform.id, 'clientSecret', e.target.value)}
                    placeholder="Enter your client secret"
                    disabled={connecting}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                {!isConnected ? (
                  <Button
                    onClick={() => handleConnect(platform.id)}
                    disabled={!config.clientId || !config.clientSecret || connecting}
                    className="flex items-center gap-2"
                  >
                    {connecting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Key className="w-4 h-4" />
                        Connect Account
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleDisconnect(platform.id)}
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    Disconnect
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
