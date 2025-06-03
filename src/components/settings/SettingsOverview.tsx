
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, User } from 'lucide-react';
import { SettingsQuickActions } from './SettingsQuickActions';
import { SettingsCategories } from './SettingsCategories';

interface SettingsOverviewProps {
  user: any;
  subscribed: boolean;
  planName: string;
  postsUsedThisMonth: number;
  monthlyPostsLimit: number;
  onNavigateToSection: (section: string) => void;
}

export const SettingsOverview = ({ 
  user, 
  subscribed, 
  planName, 
  postsUsedThisMonth, 
  monthlyPostsLimit, 
  onNavigateToSection 
}: SettingsOverviewProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            Account Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900">{user?.email || 'user@example.com'}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Subscription</p>
              <p className="text-gray-900">{subscribed ? 'Premium Plan' : 'Free Plan'}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Credits Used</p>
              <p className="text-gray-900">{postsUsedThisMonth} / {subscribed ? 'Unlimited' : monthlyPostsLimit}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <SettingsQuickActions 
        subscribed={subscribed}
        onNavigateToSection={onNavigateToSection}
      />

      <SettingsCategories onNavigateToSection={onNavigateToSection} />
    </div>
  );
};
