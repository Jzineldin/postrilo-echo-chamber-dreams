
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Share2, ChevronDown } from 'lucide-react';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import SocialAccountCard from './SocialAccountCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface SocialAccountsSectionProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const SocialAccountsSection = ({ isExpanded = false, onToggle }: SocialAccountsSectionProps) => {
  const { accounts, connectAccount, disconnectAccount, getConnectedAccounts } = useSocialAccounts();
  const isMobile = useIsMobile();
  const connectedAccounts = getConnectedAccounts();

  const socialContent = (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Connect your social media accounts to directly post content from templates.
        {connectedAccounts.length > 0 && (
          <span className="block mt-1 text-green-600 font-medium">
            {connectedAccounts.length} account{connectedAccounts.length > 1 ? 's' : ''} connected
          </span>
        )}
      </p>
      <div className="space-y-3">
        {accounts.map((account) => (
          <SocialAccountCard
            key={account.id}
            account={account}
            onConnect={connectAccount}
            onDisconnect={disconnectAccount}
          />
        ))}
      </div>
    </div>
  );

  if (isMobile && onToggle) {
    return (
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-white/50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Connected Social Accounts
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              {socialContent}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Connected Social Accounts
        </CardTitle>
        <p className="text-sm text-gray-600">
          Connect your social media accounts to directly post content from templates.
          {connectedAccounts.length > 0 && (
            <span className="block mt-1 text-green-600 font-medium">
              {connectedAccounts.length} account{connectedAccounts.length > 1 ? 's' : ''} connected
            </span>
          )}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {accounts.map((account) => (
          <SocialAccountCard
            key={account.id}
            account={account}
            onConnect={connectAccount}
            onDisconnect={disconnectAccount}
          />
        ))}
      </CardContent>
    </Card>
  );
};
