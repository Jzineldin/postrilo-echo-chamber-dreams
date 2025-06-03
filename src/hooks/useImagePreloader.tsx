
import { useEffect, useState, useCallback } from 'react';

interface UseImagePreloaderOptions {
  priority?: boolean;
  timeout?: number;
}

export const useImagePreloader = (
  imageUrls: string[],
  options: UseImagePreloaderOptions = {}
) => {
  const { priority = false, timeout = 10000 } = options;
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const preloadImage = useCallback((url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const timeoutId = setTimeout(() => {
        img.onload = null;
        img.onerror = null;
        reject(new Error(`Image load timeout: ${url}`));
      }, timeout);

      img.onload = () => {
        clearTimeout(timeoutId);
        setLoadedImages(prev => new Set(prev).add(url));
        resolve();
      };

      img.onerror = () => {
        clearTimeout(timeoutId);
        setFailedImages(prev => new Set(prev).add(url));
        reject(new Error(`Failed to load image: ${url}`));
      };

      // Set priority loading attributes
      if (priority) {
        img.loading = 'eager';
        img.decoding = 'sync';
      } else {
        img.loading = 'lazy';
        img.decoding = 'async';
      }

      img.src = url;
    });
  }, [timeout, priority]);

  const preloadImages = useCallback(async () => {
    if (imageUrls.length === 0) return;

    setIsLoading(true);
    
    try {
      if (priority) {
        // Load priority images sequentially
        for (const url of imageUrls) {
          try {
            await preloadImage(url);
          } catch (error) {
            console.warn('Failed to preload priority image:', error);
          }
        }
      } else {
        // Load non-priority images in parallel
        const promises = imageUrls.map(url => 
          preloadImage(url).catch(error => {
            console.warn('Failed to preload image:', error);
          })
        );
        await Promise.allSettled(promises);
      }
    } finally {
      setIsLoading(false);
    }
  }, [imageUrls, preloadImage, priority]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  const isImageLoaded = useCallback((url: string) => {
    return loadedImages.has(url);
  }, [loadedImages]);

  const isImageFailed = useCallback((url: string) => {
    return failedImages.has(url);
  }, [failedImages]);

  return {
    loadedImages: Array.from(loadedImages),
    failedImages: Array.from(failedImages),
    isLoading,
    isImageLoaded,
    isImageFailed,
    preloadImages
  };
};
