
import React, { useEffect, useState } from 'react';
import { useImagePreloader } from '@/hooks/useImagePreloader';

interface CriticalResourceLoaderProps {
  children: React.ReactNode;
  criticalImages?: string[];
  criticalFonts?: string[];
  criticalCss?: string[];
  onResourcesLoaded?: () => void;
  fallback?: React.ReactNode;
}

export const CriticalResourceLoader = ({
  children,
  criticalImages = [],
  criticalFonts = [],
  criticalCss = [],
  onResourcesLoaded,
  fallback
}: CriticalResourceLoaderProps) => {
  const [resourcesLoaded, setResourcesLoaded] = useState(false);
  const { isLoading: imagesLoading, loadedImages } = useImagePreloader(criticalImages, { 
    priority: true 
  });

  useEffect(() => {
    const loadCriticalResources = async () => {
      // Preload critical CSS
      criticalCss.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        link.onload = () => {
          // Convert preload to actual stylesheet
          link.rel = 'stylesheet';
        };
        document.head.appendChild(link);
      });

      // Preload critical fonts
      criticalFonts.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = href;
        document.head.appendChild(link);
      });
    };

    loadCriticalResources();
  }, [criticalCss, criticalFonts]);

  useEffect(() => {
    // Check if all critical resources are loaded
    const allImagesLoaded = criticalImages.length === 0 || loadedImages.length === criticalImages.length;
    
    if (!imagesLoading && allImagesLoaded && !resourcesLoaded) {
      setResourcesLoaded(true);
      onResourcesLoaded?.();
    }
  }, [imagesLoading, loadedImages.length, criticalImages.length, resourcesLoaded, onResourcesLoaded]);

  if (!resourcesLoaded && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
