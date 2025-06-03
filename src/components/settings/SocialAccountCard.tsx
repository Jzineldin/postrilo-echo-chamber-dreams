
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SocialAccount } from '@/hooks/useSocialAccounts';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SocialAccountCardProps {
  account: SocialAccount;
  onConnect: (accountId: string, username: string) => void;
  onDisconnect: (accountId: string) => void;
}

const SocialAccountCard = ({ account, onConnect, onDisconnect }: SocialAccountCardProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [username, setUsername] = useState('');
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleConnect = () => {
    if (!username.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter your username to connect your account.",
        variant: "destructive"
      });
      return;
    }

    // Simulate connection process
    setIsConnecting(true);
    setTimeout(() => {
      onConnect(account.id, username);
      setIsConnecting(false);
      setUsername('');
      toast({
        title: "Account Connected",
        description: `Successfully connected your ${account.name} account.`
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    onDisconnect(account.id);
    toast({
      title: "Account Disconnected",
      description: `Disconnected your ${account.name} account.`
    });
  };

  if (isMobile) {
    return (
      <div className="p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3 mb-3">
          <div className={`text-2xl ${account.color}`}>
            <account.icon />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{account.name}</span>
              {account.isConnected ? (
                <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                  <XCircle className="w-3 h-3 mr-1" />
                  Not Connected
                </Badge>
              )}
            </div>
            {account.isConnected && account.username && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <User className="w-3 h-3" />
                @{account.username}
              </div>
            )}
            {account.isConnected && account.lastSync && (
              <p className="text-xs text-gray-500 mt-1">
                Last synced: {new Date(account.lastSync).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          {!account.isConnected ? (
            <>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12"
                disabled={isConnecting}
              />
              <Button 
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isConnecting ? "Connecting..." : "Connect"}
              </Button>
            </>
          ) : (
            <Button 
              onClick={handleDisconnect}
              variant="outline"
              className="w-full h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Disconnect
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`text-2xl ${account.color}`}>
          <account.icon />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{account.name}</span>
            {account.isConnected ? (
              <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                <XCircle className="w-3 h-3 mr-1" />
                Not Connected
              </Badge>
            )}
          </div>
          {account.isConnected && account.username && (
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <User className="w-3 h-3" />
              @{account.username}
            </div>
          )}
          {account.isConnected && account.lastSync && (
            <p className="text-xs text-gray-500 mt-1">
              Last synced: {new Date(account.lastSync).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {!account.isConnected ? (
          <>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-24 h-8 text-sm"
              disabled={isConnecting}
            />
            <Button 
              onClick={handleConnect}
              size="sm"
              disabled={isConnecting}
              className="min-w-[80px]"
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </>
        ) : (
          <Button 
            onClick={handleDisconnect}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Disconnect
          </Button>
        )}
      </div>
    </div>
  );
};

export default SocialAccountCard;
