
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, BarChart3, Settings, Wand2, Target } from 'lucide-react';

interface QuickActionsProps {
  user: any;
  isMobile: boolean;
  onCreateContent: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const QuickActions = ({ user, isMobile, onCreateContent, onNavigateToTab }: QuickActionsProps) => {
  const handleNavigation = (tab: string) => {
    if (onNavigateToTab) {
      onNavigateToTab(tab);
    } else {
      console.log(`Navigate to ${tab}`);
    }
  };

  const actions = [
    {
      title: "Create Content",
      description: "Generate new social media posts and content",
      icon: Plus,
      color: "bg-gradient-to-r from-purple-600 to-pink-600",
      action: onCreateContent
    },
    {
      title: "Schedule Posts",
      description: "Plan and schedule your content calendar",
      icon: Calendar,
      color: "bg-gradient-to-r from-blue-600 to-cyan-600",
      action: () => handleNavigation('scheduler')
    },
    {
      title: "View Analytics",
      description: "Track performance and engagement",
      icon: BarChart3,
      color: "bg-gradient-to-r from-green-600 to-emerald-600",
      action: () => handleNavigation('analytics')
    },
    {
      title: "Brand Voice",
      description: "Configure your brand personality",
      icon: Target,
      color: "bg-gradient-to-r from-orange-600 to-red-600",
      action: () => handleNavigation('brand-voice')
    },
    {
      title: "AI Settings",
      description: "Customize AI generation preferences",
      icon: Wand2,
      color: "bg-gradient-to-r from-indigo-600 to-purple-600",
      action: () => handleNavigation('settings')
    },
    {
      title: "Account Settings",
      description: "Manage your account and preferences",
      icon: Settings,
      color: "bg-gradient-to-r from-gray-600 to-slate-600",
      action: () => handleNavigation('settings')
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-all"
              onClick={action.action}
            >
              <div className={`p-2 rounded-lg ${action.color} text-white`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-gray-600">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
