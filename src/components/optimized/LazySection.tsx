
import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { LazyComponentLoader } from '@/components/loading/LazyComponentLoader';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  loadingOffset?: string;
}

export const LazySection = ({ 
  children, 
  fallback, 
  className = "",
  loadingOffset = "100px"
}: LazySectionProps) => {
  const { elementRef, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    rootMargin: loadingOffset,
    triggerOnce: true
  });

  return (
    <div ref={elementRef} className={className}>
      {hasIntersected ? (
        <LazyComponentLoader fallback={fallback}>
          {children}
        </LazyComponentLoader>
      ) : (
        fallback || (
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        )
      )}
    </div>
  );
};
