
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface MobileErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  title?: string;
}

export const MobileErrorDisplay = ({
  error,
  onRetry,
  title = "Something went wrong"
}: MobileErrorDisplayProps) => {
  return (
    <Card className="border-red-200 bg-red-50 mx-4">
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-red-500" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-red-800">{title}</h3>
            <p className="text-red-700 text-sm leading-relaxed">{error}</p>
          </div>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
