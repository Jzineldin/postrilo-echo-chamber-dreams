
import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/loading/ErrorBoundary';
import { ViewportLoader } from './ViewportLoader';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyComponentBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  enableViewportLoading?: boolean;
  className?: string;
  rootMargin?: string;
}

export const LazyComponentBoundary = ({
  children,
  fallback,
  errorFallback,
  enableViewportLoading = true,
  className = '',
  rootMargin = '100px'
}: LazyComponentBoundaryProps) => {
  const defaultFallback = (
    <div className={`space-y-4 animate-pulse ${className}`}>
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-32 w-full" />
    </div>
  );

  const content = (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );

  if (enableViewportLoading) {
    return (
      <ViewportLoader
        fallback={fallback || defaultFallback}
        rootMargin={rootMargin}
        className={className}
      >
        {content}
      </ViewportLoader>
    );
  }

  return content;
};
