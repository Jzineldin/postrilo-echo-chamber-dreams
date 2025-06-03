
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Crown, ArrowLeft } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { SettingsOverview } from './SettingsOverview';
import { SettingsTabContent, PreferencesTabContent } from './SettingsTabContent';
import { SettingsRenderer } from './SettingsRenderer';

interface SettingsHubProps {
  user: any;
  onNavigateToSection?: (section: string) => void;
}

export const SettingsHub = ({ user, onNavigateToSection }: SettingsHubProps) => {
  const { subscribed, planName, postsUsedThisMonth, monthlyPostsLimit } = useSubscription();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleNavigation = (section: string) => {
    console.log(`Navigating to settings section: ${section}`);
    setActiveSection(section);
    if (onNavigateToSection) {
      onNavigateToSection(section);
    }
  };

  const handleBackToOverview = () => {
    setActiveSection(null);
  };

  // If a specific section is active, show that section
  if (activeSection) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToOverview}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Settings
          </Button>
        </div>
        <SettingsRenderer activeSection={activeSection} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
        <Badge variant={subscribed ? "default" : "secondary"} className="flex items-center gap-1">
          <Crown className="w-3 h-3" />
          {planName}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <SettingsOverview
            user={user}
            subscribed={subscribed}
            planName={planName}
            postsUsedThisMonth={postsUsedThisMonth}
            monthlyPostsLimit={monthlyPostsLimit}
            onNavigateToSection={handleNavigation}
          />
        </TabsContent>

        <TabsContent value="account">
          <SettingsTabContent onNavigateToSection={handleNavigation} />
        </TabsContent>

        <TabsContent value="preferences">
          <PreferencesTabContent onNavigateToSection={handleNavigation} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
