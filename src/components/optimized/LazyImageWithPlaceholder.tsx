
import React, { useState, useCallback } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useImagePreloader } from '@/hooks/useImagePreloader';

interface LazyImageWithPlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImageWithPlaceholder = ({
  src,
  alt,
  className = '',
  placeholder = '/placeholder.svg',
  blurDataURL,
  priority = false,
  onLoad,
  onError
}: LazyImageWithPlaceholderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { elementRef, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
    skip: priority
  });

  const { isImageLoaded } = useImagePreloader(
    hasIntersected || priority ? [src] : [],
    { priority }
  );

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  const shouldLoadImage = priority || hasIntersected;
  const showImage = shouldLoadImage && (isImageLoaded || imageLoaded) && !imageError;

  return (
    <div ref={elementRef} className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {blurDataURL && !showImage && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}

      {/* Fallback placeholder */}
      {!blurDataURL && !showImage && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}

      {/* Actual image */}
      {shouldLoadImage && (
        <img
          src={imageError ? placeholder : src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            showImage ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
        />
      )}
    </div>
  );
};
