import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MobileOptimizedButton } from './MobileOptimizedButton';
import { 
  Plus, 
  File, 
  Library, 
  Zap, 
  BarChart3, 
  Users 
} from 'lucide-react';

interface MobileQuickActionsProps {
  onAction: (actionId: string) => void;
}

export const MobileQuickActions = ({ onAction }: MobileQuickActionsProps) => {
  const quickActions = [
    {
      id: 'create-post',
      label: 'Create Post',
      icon: Plus,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'browse-templates',
      label: 'Templates',
      icon: File,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'view-library',
      label: 'Library',
      icon: Library,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'quick-generate',
      label: 'Quick Gen',
      icon: Zap,
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      color: 'bg-pink-600 hover:bg-pink-700'
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users,
      color: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ];

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-white/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <MobileOptimizedButton
              key={action.id}
              onClick={() => onAction(action.id)}
              variant="default"
              size="lg"
              icon={action.icon}
              className={`${action.color} text-white`}
              fullWidth
            >
              {action.label}
            </MobileOptimizedButton>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
