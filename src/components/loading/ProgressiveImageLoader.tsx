
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ProgressiveImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const ProgressiveImageLoader = ({
  src,
  alt,
  className = "",
  placeholder,
  onLoad,
  onError
}: ProgressiveImageLoaderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
      onLoad?.();
    };
    
    img.onerror = () => {
      setImageError(true);
      onError?.();
    };
    
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  if (imageError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  if (!imageLoaded || !imageSrc) {
    return placeholder ? (
      <img 
        src={placeholder} 
        alt={alt} 
        className={`${className} blur-sm transition-all duration-300`}
      />
    ) : (
      <Skeleton className={className} />
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} animate-fade-in optimized-image`}
      loading="lazy"
      decoding="async"
    />
  );
};
