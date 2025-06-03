
import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ViewportLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  onVisible?: () => void;
  onHidden?: () => void;
}

export const ViewportLoader = ({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
  onVisible,
  onHidden
}: ViewportLoaderProps) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { elementRef, isIntersecting, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce: false
  });

  useEffect(() => {
    if (isIntersecting && !hasLoaded) {
      setHasLoaded(true);
      onVisible?.();
    } else if (!isIntersecting && hasLoaded) {
      onHidden?.();
    }
  }, [isIntersecting, hasLoaded, onVisible, onHidden]);

  return (
    <div ref={elementRef} className={className}>
      {hasIntersected && hasLoaded ? children : fallback}
    </div>
  );
};
