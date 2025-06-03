
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Bell, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NotificationSectionProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const NotificationSection = ({ isExpanded = false, onToggle }: NotificationSectionProps) => {
  const isMobile = useIsMobile();
  
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    pushNotifications: false,
    weeklyDigest: true,
    socialMentions: true
  });

  const notificationContent = (
    <div className={`${isMobile ? 'space-y-6' : 'space-y-4'}`}>
      <div className={`flex items-center justify-between ${isMobile ? 'py-2' : ''}`}>
        <div className={isMobile ? 'flex-1' : ''}>
          <p className="font-medium">Email Updates</p>
          <p className="text-sm text-gray-600">Receive updates about your content and account</p>
        </div>
        <Switch
          checked={notifications.emailUpdates}
          onCheckedChange={(checked) => setNotifications({...notifications, emailUpdates: checked})}
        />
      </div>
      
      <div className={`flex items-center justify-between ${isMobile ? 'py-2' : ''}`}>
        <div className={isMobile ? 'flex-1' : ''}>
          <p className="font-medium">Push Notifications</p>
          <p className="text-sm text-gray-600">Get notified about important events</p>
        </div>
        <Switch
          checked={notifications.pushNotifications}
          onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
        />
      </div>
      
      <div className={`flex items-center justify-between ${isMobile ? 'py-2' : ''}`}>
        <div className={isMobile ? 'flex-1' : ''}>
          <p className="font-medium">Weekly Digest</p>
          <p className="text-sm text-gray-600">Summary of your content performance</p>
        </div>
        <Switch
          checked={notifications.weeklyDigest}
          onCheckedChange={(checked) => setNotifications({...notifications, weeklyDigest: checked})}
        />
      </div>
      
      <div className={`flex items-center justify-between ${isMobile ? 'py-2' : ''}`}>
        <div className={isMobile ? 'flex-1' : ''}>
          <p className="font-medium">Social Mentions</p>
          <p className="text-sm text-gray-600">Notifications when your brand is mentioned</p>
        </div>
        <Switch
          checked={notifications.socialMentions}
          onCheckedChange={(checked) => setNotifications({...notifications, socialMentions: checked})}
        />
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
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              {notificationContent}
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
          <Bell className="w-5 h-5" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notificationContent}
      </CardContent>
    </Card>
  );
};
