
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Share2, CheckCircle, AlertCircle, Settings, ExternalLink, Key } from 'lucide-react';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { SocialMediaAPIConfig } from './SocialMediaAPIConfig';
import SocialAccountCard from './SocialAccountCard';
import { useToast } from '@/hooks/use-toast';

export const SocialAccountsSettings = () => {
  const { accounts, connectAccount, disconnectAccount, getConnectedAccounts } = useSocialAccounts();
  const { toast } = useToast();
  const connectedAccounts = getConnectedAccounts();

  const handleTestConnection = (platformId: string) => {
    const account = accounts.find(acc => acc.id === platformId);
    if (account?.isConnected) {
      toast({
        title: "Connection Test",
        description: `${account.name} connection is working properly.`,
        variant: "default"
      });
    } else {
      toast({
        title: "Connection Test Failed",
        description: `Please connect your ${account?.name} account first.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Social Media Accounts
          </CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Connect your social media accounts to publish content directly from Postrilo
            </p>
            <Badge variant={connectedAccounts.length > 0 ? "default" : "secondary"} className="ml-2">
              {connectedAccounts.length} Connected
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {connectedAccounts.length === 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No social media accounts connected. Configure your API credentials and connect your accounts to start publishing content directly.
              </AlertDescription>
            </Alert>
          )}
          {connectedAccounts.length > 0 && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Great! You have {connectedAccounts.length} account{connectedAccounts.length > 1 ? 's' : ''} connected. 
                You can now publish content directly to your social media platforms.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Tabbed Interface */}
      <Tabs defaultValue="api-config" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="api-config" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            API Configuration
          </TabsTrigger>
          <TabsTrigger value="accounts" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Connected Accounts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api-config" className="space-y-6">
          <SocialMediaAPIConfig />
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleTestConnection('twitter')}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Test All Connections
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="flex items-center gap-2"
                >
                  <a href="https://docs.postrilo.com/social-media-setup" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Setup Guide
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Individual Account Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Platforms</CardTitle>
              <p className="text-sm text-gray-600">
                Connect to your favorite social media platforms (requires API configuration first)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="relative">
                  <SocialAccountCard
                    account={account}
                    onConnect={connectAccount}
                    onDisconnect={disconnectAccount}
                  />
                  {account.isConnected && (
                    <div className="mt-2 flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleTestConnection(account.id)}
                        className="text-xs"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Test Connection
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-xs"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Profile
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Connection Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connection Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <p><strong>Step 1:</strong> Configure API credentials in the "API Configuration" tab</p>
                <p><strong>Step 2:</strong> Click "Connect Account" for each platform you want to use</p>
                <p><strong>Step 3:</strong> Authorize Postrilo in the popup window</p>
                <p><strong>Step 4:</strong> Test your connections to ensure they're working</p>
                <p><strong>Step 5:</strong> Start creating and publishing content directly from Postrilo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
