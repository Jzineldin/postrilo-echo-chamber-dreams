
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Zap, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsQuickActionsProps {
  subscribed: boolean;
  onNavigateToSection: (section: string) => void;
}

export const SettingsQuickActions = ({ subscribed, onNavigateToSection }: SettingsQuickActionsProps) => {
  const { toast } = useToast();

  const quickActions = [
    {
      title: 'Update Profile Photo',
      description: 'Change your profile picture',
      action: () => {
        toast({
          title: "Profile Photo",
          description: "Profile photo update feature coming soon!",
        });
        onNavigateToSection('profile-photo');
      },
      icon: Edit
    },
    {
      title: 'Upgrade Plan',
      description: 'Get more features with Premium',
      action: () => {
        onNavigateToSection('subscription');
      },
      icon: Zap,
      highlight: !subscribed
    },
    {
      title: 'Export Data',
      description: 'Download your content and settings',
      action: () => {
        toast({
          title: "Export Data",
          description: "Preparing your data export...",
        });
        onNavigateToSection('export');
      },
      icon: Check
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant={action.highlight ? "default" : "ghost"}
              className="w-full justify-start h-auto py-3"
              onClick={action.action}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-full ${action.highlight ? 'bg-primary/10' : 'bg-gray-100'} mr-3`}>
                  <action.icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
