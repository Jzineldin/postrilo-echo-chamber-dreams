
import { useEffect } from 'react';

interface ResourcePreloaderProps {
  images?: string[];
  fonts?: string[];
  scripts?: string[];
}

export const ResourcePreloader = ({ images = [], fonts = [], scripts = [] }: ResourcePreloaderProps) => {
  useEffect(() => {
    // Preload critical images
    images.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload fonts
    fonts.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = href;
      document.head.appendChild(link);
    });

    // Preload scripts
    scripts.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup preload links if component unmounts
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (
          images.includes(link.getAttribute('href') || '') ||
          fonts.includes(link.getAttribute('href') || '') ||
          scripts.includes(link.getAttribute('href') || '')
        ) {
          link.remove();
        }
      });
    };
  }, [images, fonts, scripts]);

  return null;
};
