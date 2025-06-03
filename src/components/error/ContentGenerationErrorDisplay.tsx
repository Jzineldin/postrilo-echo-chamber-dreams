
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Info, ExternalLink } from 'lucide-react';
import { DetailedAIError } from '@/services/ai/improvedErrorHandling';

interface ContentGenerationErrorDisplayProps {
  error: DetailedAIError;
  onRetry?: () => void;
  onDismiss?: () => void;
  showRetryButton?: boolean;
}

export const ContentGenerationErrorDisplay = ({
  error,
  onRetry,
  onDismiss,
  showRetryButton = true
}: ContentGenerationErrorDisplayProps) => {
  const getErrorIcon = () => {
    switch (error.type) {
      case 'network':
        return <AlertTriangle className="h-4 w-4" />;
      case 'rate_limit':
        return <RefreshCw className="h-4 w-4" />;
      case 'authentication':
        return <AlertTriangle className="h-4 w-4" />;
      case 'quota_exceeded':
        return <ExternalLink className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getErrorVariant = () => {
    switch (error.type) {
      case 'content_blocked':
      case 'authentication':
        return 'destructive' as const;
      case 'rate_limit':
      case 'quota_exceeded':
        return 'default' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <Alert variant={getErrorVariant()}>
          {getErrorIcon()}
          <AlertTitle className="flex items-center justify-between">
            <span>Content Generation Error</span>
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-auto p-1"
              >
                ×
              </Button>
            )}
          </AlertTitle>
          <AlertDescription className="space-y-3">
            <p>{error.userFriendlyMessage}</p>
            
            {error.suggestedAction && (
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium mb-1">Suggested Action:</p>
                <p className="text-sm">{error.suggestedAction}</p>
              </div>
            )}
            
            {error.retryAfter && (
              <p className="text-sm text-muted-foreground">
                You can try again in {Math.ceil(error.retryAfter / 60)} minute(s).
              </p>
            )}
            
            <div className="flex gap-2 pt-2">
              {showRetryButton && error.retryable && onRetry && (
                <Button
                  onClick={onRetry}
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-3 w-3" />
                  Try Again
                </Button>
              )}
              
              {error.type === 'quota_exceeded' && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => window.open('/pricing', '_blank')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  Upgrade Plan
                </Button>
              )}
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
