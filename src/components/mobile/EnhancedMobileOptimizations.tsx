
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface EnhancedMobileOptimizationsProps {
  children: React.ReactNode;
}

export const EnhancedMobileOptimizations = ({ children }: EnhancedMobileOptimizationsProps) => {
  const isMobile = useIsMobile();
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  // Add mobile-specific CSS classes
  useEffect(() => {
    if (isMobile) {
      document.body.classList.add('mobile-optimized');
      
      // Prevent zoom on input focus (iOS)
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        );
      }
    } else {
      document.body.classList.remove('mobile-optimized');
    }

    return () => {
      document.body.classList.remove('mobile-optimized');
    };
  }, [isMobile]);

  return (
    <div className={cn(
      'mobile-container',
      isMobile && 'mobile-layout',
      viewport.width < 480 && 'extra-small-screen'
    )}>
      {children}
    </div>
  );
};

// Hook for enhanced mobile detection
export const useEnhancedMobile = () => {
  const isMobile = useIsMobile();
  const [touchDevice, setTouchDevice] = useState(false);
  const [screenSize, setScreenSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('lg');

  useEffect(() => {
    setTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('xs');
      else if (width < 768) setScreenSize('sm');
      else if (width < 1024) setScreenSize('md');
      else setScreenSize('lg');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return {
    isMobile,
    touchDevice,
    screenSize,
    isExtraSmall: screenSize === 'xs',
    isSmall: screenSize === 'sm',
    isMedium: screenSize === 'md',
    isLarge: screenSize === 'lg'
  };
};
