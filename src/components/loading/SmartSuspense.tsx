
import React, { Suspense, useState, useEffect } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { Skeleton } from '@/components/ui/skeleton';

interface SmartSuspenseProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minLoadingTime?: number;
  maxLoadingTime?: number;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
  onError?: (error: Error) => void;
}

export const SmartSuspense = ({
  children,
  fallback,
  minLoadingTime = 0,
  maxLoadingTime = 10000,
  onLoadingStart,
  onLoadingEnd,
  onError
}: SmartSuspenseProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    if (isLoading) {
      onLoadingStart?.();
      
      const timeoutId = setTimeout(() => {
        setHasTimedOut(true);
        onError?.(new Error('Component loading timed out'));
      }, maxLoadingTime);

      return () => {
        clearTimeout(timeoutId);
        onLoadingEnd?.();
      };
    }
  }, [isLoading, maxLoadingTime, onLoadingStart, onLoadingEnd, onError]);

  const defaultFallback = (
    <div className="space-y-4 animate-pulse">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-32 w-full" />
    </div>
  );

  const timeoutFallback = (
    <div className="text-center py-8">
      <p className="text-gray-500">Component is taking longer than expected to load.</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-2 text-blue-600 hover:underline"
      >
        Refresh page
      </button>
    </div>
  );

  if (hasTimedOut) {
    return timeoutFallback;
  }

  return (
    <ErrorBoundary onError={onError}>
      <Suspense 
        fallback={
          <div className="min-loading-time" style={{ minHeight: minLoadingTime ? '100px' : 'auto' }}>
            {fallback || defaultFallback}
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
