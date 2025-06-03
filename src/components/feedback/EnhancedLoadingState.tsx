
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

interface EnhancedLoadingStateProps {
  isLoading: boolean;
  progress?: number;
  message?: string;
  submessage?: string;
  type?: 'default' | 'success' | 'warning' | 'error';
  showProgress?: boolean;
}

export const EnhancedLoadingState = ({
  isLoading,
  progress = 0,
  message = "Loading...",
  submessage,
  type = 'default',
  showProgress = false
}: EnhancedLoadingStateProps) => {
  if (!isLoading) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-purple-600 animate-pulse" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-purple-50 border-purple-200';
    }
  };

  return (
    <Card className={`${getBackgroundColor()} animate-fade-in`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {getIcon()}
            {type === 'default' && (
              <Loader2 className="w-4 h-4 text-purple-400 animate-spin absolute -top-1 -right-1" />
            )}
          </div>
          
          <div className="text-center space-y-2">
            <p className="font-medium text-gray-900">{message}</p>
            {submessage && (
              <p className="text-sm text-gray-600">{submessage}</p>
            )}
          </div>

          {showProgress && (
            <div className="w-full space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-gray-500 text-center">{progress}% complete</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
