
import { useEffect } from "react";

export const PricingMobileOptimizations = () => {
  useEffect(() => {
    // Optimize viewport for mobile pricing page
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Preload critical fonts for better performance
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontPreload.as = 'style';
    document.head.appendChild(fontPreload);

    // Optimize scroll performance
    document.body.style.scrollBehavior = 'smooth';
    document.body.style.overscrollBehavior = 'none';

    return () => {
      // Cleanup
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
      document.body.style.scrollBehavior = '';
      document.body.style.overscrollBehavior = '';
    };
  }, []);

  return null;
};
