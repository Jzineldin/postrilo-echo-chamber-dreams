
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface MobileQuickActionsCardProps {
  onQuickAction: (actionId: string) => void;
}

const quickActions: QuickAction[] = [
  { id: 'create-post', title: 'Create Post', icon: '📝', description: 'Start creating' },
  { id: 'browse-templates', title: 'Templates', icon: '📄', description: 'Browse templates' },
  { id: 'view-library', title: 'Library', icon: '📚', description: 'View content' },
  { id: 'analytics', title: 'Analytics', icon: '📊', description: 'See stats' }
];

export const MobileQuickActionsCard = ({ onQuickAction }: MobileQuickActionsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => onQuickAction(action.id)}
            >
              <span className="text-xl">{action.icon}</span>
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-gray-500">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
