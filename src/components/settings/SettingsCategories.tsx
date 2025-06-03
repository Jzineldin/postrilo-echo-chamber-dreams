
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Crown, Bell, Shield, Palette, ChevronRight } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

interface SettingsCategoriesProps {
  onNavigateToSection: (section: string) => void;
}

export const SettingsCategories = ({ onNavigateToSection }: SettingsCategoriesProps) => {
  const { subscribed } = useSubscription();

  const settingsCategories = [
    {
      id: 'profile',
      title: 'Profile Settings',
      description: 'Manage your personal information and preferences',
      icon: User,
      status: 'Complete',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'subscription',
      title: 'Subscription & Billing',
      description: 'View your plan details and manage billing',
      icon: Crown,
      status: subscribed ? 'Premium' : 'Free Plan',
      statusColor: subscribed ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Control how and when you receive notifications',
      icon: Bell,
      status: 'Configured',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Manage your privacy settings and account security',
      icon: Shield,
      status: 'Secure',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Customize the look and feel of your dashboard',
      icon: Palette,
      status: 'Default',
      statusColor: 'bg-gray-100 text-gray-800'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Settings Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {settingsCategories.map((category, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-auto py-3"
              onClick={() => onNavigateToSection(category.id)}
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <category.icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{category.title}</p>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={category.statusColor}>
                    {category.status}
                  </Badge>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
