
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, Plus } from 'lucide-react';

interface DashboardWelcomeHeaderProps {
  user: any;
  subscribed: boolean;
  planName: string;
  canGenerateMore: boolean;
  isMobile: boolean;
  onCreateContent: () => void;
}

export const DashboardWelcomeHeader = ({
  user,
  subscribed,
  planName,
  canGenerateMore,
  isMobile,
  onCreateContent
}: DashboardWelcomeHeaderProps) => {
  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-row items-center justify-between'}`}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back{user?.name ? `, ${user.name}` : ''}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Ready to create amazing content today?
        </p>
      </div>
      
      <div className={`flex items-center gap-3 ${isMobile ? 'justify-center' : ''}`}>
        <Badge 
          variant={subscribed ? "default" : "secondary"}
          className={`${subscribed ? "bg-purple-600" : ""} flex items-center gap-1`}
        >
          {subscribed ? <Crown className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
          {planName}
        </Badge>
        
        <Button 
          variant="default" 
          className="create-content-button"
          onClick={onCreateContent}
          disabled={!canGenerateMore}
        >
          <Plus className="w-4 h-4 mr-1" />
          Create Content
        </Button>
      </div>
    </div>
  );
};
