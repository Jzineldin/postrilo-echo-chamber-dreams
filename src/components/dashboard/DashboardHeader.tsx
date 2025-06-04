
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, Plus } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

interface DashboardHeaderProps {
  onTabChange?: (tab: string) => void;
}

export const DashboardHeader = ({ onTabChange }: DashboardHeaderProps) => {
  const { subscribed, planName } = useSubscription();

  const handleCreateContent = () => {
    console.log('Navigate to content creation');
    if (onTabChange) {
      onTabChange('create');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Ready to create amazing content today?
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Badge 
          variant={subscribed ? "default" : "secondary"}
          className={`${subscribed ? "bg-purple-600" : ""} flex items-center gap-1`}
        >
          {subscribed ? <Crown className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
          {planName}
        </Badge>
        <Button 
          variant="default" 
          className="create-content-button !text-white"
          onClick={handleCreateContent}
        >
          <Plus className="w-4 h-4 mr-1" />
          Create Content
        </Button>
      </div>
    </div>
  );
};
