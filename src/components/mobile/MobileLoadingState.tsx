
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

interface MobileLoadingStateProps {
  isGenerating: boolean;
  loadingMessage?: string;
}

export const MobileLoadingState = ({ 
  isGenerating, 
  loadingMessage = "Creating your content..." 
}: MobileLoadingStateProps) => {
  if (!isGenerating) {
    return null;
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
            <Loader2 className="w-4 h-4 text-blue-400 animate-spin absolute -top-1 -right-1" />
          </div>
          <div className="space-y-2">
            <p className="text-blue-800 font-medium">{loadingMessage}</p>
            <p className="text-blue-600 text-sm">This usually takes 10-15 seconds</p>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
