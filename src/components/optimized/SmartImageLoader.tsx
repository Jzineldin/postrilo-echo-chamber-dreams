
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useAdvancedPerformance } from '@/hooks/useAdvancedPerformance';
import { OptimizedImage } from './OptimizedImage';
import { Skeleton } from '@/components/ui/skeleton';

interface SmartImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'skeleton';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const SmartImageLoader = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes,
  quality = 75,
  placeholder = 'skeleton',
  blurDataURL,
  onLoad,
  onError
}: SmartImageLoaderProps) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [optimizedSrc, setOptimizedSrc] = useState<string>(src);
  const imgRef = useRef<HTMLImageElement>(null);
  const loadStartTime = useRef<number>(0);

  const { connectionType, smartPrefetch } = useAdvancedPerformance();
  const { elementRef, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
    skip: priority
  });

  // Optimize image source based on connection and device
  useEffect(() => {
    const optimizeImageSrc = () => {
      let optimized = src;
      
      // Add quality parameter based on connection
      if (connectionType === 'slow-2g' || connectionType === '2g') {
        // Lower quality for slow connections
        optimized = addQualityParam(src, Math.max(quality - 30, 20));
      } else if (connectionType === '4g' || connectionType === '5g') {
        // Higher quality for fast connections
        optimized = addQualityParam(src, Math.min(quality + 10, 95));
      } else {
        optimized = addQualityParam(src, quality);
      }

      // Add responsive sizing if supported
      if (sizes && 'srcset' in document.createElement('img')) {
        // Could add srcset generation logic here
      }

      setOptimizedSrc(optimized);
    };

    optimizeImageSrc();
  }, [src, quality, connectionType, sizes]);

  // Smart prefetching for high-priority images
  useEffect(() => {
    if (priority && optimizedSrc) {
      smartPrefetch(optimizedSrc, 'high');
    }
  }, [priority, optimizedSrc, smartPrefetch]);

  const addQualityParam = (url: string, q: number): string => {
    // Simple quality parameter addition - would need to be adapted for actual CDN
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}q=${q}`;
  };

  const handleImageLoad = useCallback(() => {
    const loadTime = Date.now() - loadStartTime.current;
    setImageState('loaded');
    onLoad?.();
    
    // Track loading performance
    if (loadStartTime.current > 0) {
      console.log(`Image loaded in ${loadTime}ms: ${src}`);
    }
  }, [onLoad, src]);

  const handleImageError = useCallback(() => {
    setImageState('error');
    onError?.();
  }, [onError]);

  const shouldLoad = priority || hasIntersected;

  useEffect(() => {
    if (shouldLoad) {
      loadStartTime.current = Date.now();
    }
  }, [shouldLoad]);

  if (imageState === 'error') {
    return (
      <div 
        ref={elementRef}
        className={`bg-gray-200 flex items-center justify-center ${className}`}
      >
        <span className="text-gray-400 text-sm">Failed to load image</span>
      </div>
    );
  }

  if (!shouldLoad || imageState === 'loading') {
    if (placeholder === 'blur' && blurDataURL) {
      return (
        <div ref={elementRef} className={`relative overflow-hidden ${className}`}>
          <img 
            src={blurDataURL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
            aria-hidden="true"
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
    <OptimizedImage
      src={optimizedSrc}
      alt={alt}
      className={className}
      priority={priority}
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  );
};
