
import React from 'react';
import { MobileOptimizedButton } from './MobileOptimizedButton';
import { RotateCcw, AlertCircle } from 'lucide-react';

interface MobileRetryButtonProps {
  onRetry: () => void;
  isRetrying: boolean;
  retryCount: number;
}

export const MobileRetryButton = ({
  onRetry,
  isRetrying,
  retryCount
}: MobileRetryButtonProps) => {
  const getRetryText = () => {
    if (retryCount === 0) return 'Try Again';
    if (retryCount === 1) return 'Retry';
    return `Retry (${retryCount})`;
  };

  return (
    <MobileOptimizedButton
      onClick={onRetry}
      disabled={isRetrying}
      variant="outline"
      size="lg"
      icon={isRetrying ? undefined : (retryCount > 2 ? AlertCircle : RotateCcw)}
      loading={isRetrying}
      className="border-orange-300 hover:bg-orange-50 text-orange-700"
      fullWidth
    >
      {isRetrying ? 'Retrying...' : getRetryText()}
    </MobileOptimizedButton>
  );
};
