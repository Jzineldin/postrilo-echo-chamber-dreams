
import React, { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileTouchOptimizationProps {
  children: React.ReactNode;
  enableFastClick?: boolean;
  preventZoom?: boolean;
  optimizeScrolling?: boolean;
}

export const MobileTouchOptimization = ({
  children,
  enableFastClick = true,
  preventZoom = true,
  optimizeScrolling = true
}: MobileTouchOptimizationProps) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    // Prevent zoom on double tap
    if (preventZoom) {
      let lastTouchEnd = 0;
      const preventZoomHandler = (e: TouchEvent) => {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      };

      document.addEventListener('touchend', preventZoomHandler, { passive: false });
      
      return () => {
        document.removeEventListener('touchend', preventZoomHandler);
      };
    }
  }, [isMobile, preventZoom]);

  useEffect(() => {
    if (!isMobile || !optimizeScrolling) return;

    // Optimize scrolling performance
    const optimizeScroll = () => {
      (document.body.style as any).webkitOverflowScrolling = 'touch';
      document.body.style.overscrollBehavior = 'contain';
    };

    optimizeScroll();
  }, [isMobile, optimizeScrolling]);

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div 
      className="mobile-touch-optimized"
      style={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {children}
    </div>
  );
};
