
import { useState, useEffect } from 'react';

interface UseImagePreloaderOptions {
  priority?: boolean;
  timeout?: number;
}

export const useImagePreloader = (
  urls: string[],
  options: UseImagePreloaderOptions = {}
) => {
  const { priority = false, timeout = 10000 } = options;
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (urls.length === 0) return;

    setIsLoading(true);
    setLoadedImages([]);
    setErrors([]);

    const loadImage = (url: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const timeoutId = setTimeout(() => {
          reject(new Error(`Image load timeout: ${url}`));
        }, timeout);

        img.onload = () => {
          clearTimeout(timeoutId);
          resolve(url);
        };

        img.onerror = () => {
          clearTimeout(timeoutId);
          reject(new Error(`Failed to load image: ${url}`));
        };

        if (priority) {
          img.loading = 'eager';
        }

        img.src = url;
      });
    };

    const loadAllImages = async () => {
      const results = await Promise.allSettled(
        urls.map(url => loadImage(url))
      );

      const loaded: string[] = [];
      const failed: string[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          loaded.push(result.value);
        } else {
          failed.push(urls[index]);
        }
      });

      setLoadedImages(loaded);
      setErrors(failed);
      setIsLoading(false);
    };

    loadAllImages();
  }, [urls, priority, timeout]);

  const isImageLoaded = (url: string) => loadedImages.includes(url);

  return {
    loadedImages,
    isLoading,
    errors,
    isImageLoaded
  };
};
