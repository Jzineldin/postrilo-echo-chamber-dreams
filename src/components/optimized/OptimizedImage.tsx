
import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  className = "",
  placeholder,
  blurDataURL,
  priority = false,
  onLoad,
  onError,
  fallbackSrc
}: OptimizedImageProps) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { elementRef, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    triggerOnce: true,
    skip: priority // Skip intersection observer for priority images
  });

  const shouldLoad = priority || hasIntersected;

  useEffect(() => {
    if (!shouldLoad) return;

    const img = new Image();
    
    img.onload = () => {
      setCurrentSrc(src);
      setImageState('loaded');
      onLoad?.();
    };
    
    img.onerror = () => {
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        // Try loading fallback
        const fallbackImg = new Image();
        fallbackImg.onload = () => setImageState('loaded');
        fallbackImg.onerror = () => setImageState('error');
        fallbackImg.src = fallbackSrc;
      } else {
        setImageState('error');
      }
      onError?.();
    };
    
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, shouldLoad, fallbackSrc, currentSrc, onLoad, onError]);

  if (imageState === 'error') {
    return (
      <div 
        ref={elementRef}
        className={`bg-gray-200 flex items-center justify-center ${className}`}
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  if (!shouldLoad || imageState === 'loading' || !currentSrc) {
    if (blurDataURL) {
      return (
        <div ref={elementRef} className={className}>
          <img 
            src={blurDataURL}
            alt={alt}
            className={`${className} blur-sm transition-all duration-300`}
          />
        </div>
      );
    }
    
    if (placeholder) {
      return (
        <div ref={elementRef} className={className}>
          <img 
            src={placeholder}
            alt={alt}
            className={`${className} blur-sm transition-all duration-300`}
          />
        </div>
      );
    }
    
    return (
      <div ref={elementRef} className={className}>
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={`${className} animate-fade-in optimized-image`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
};
