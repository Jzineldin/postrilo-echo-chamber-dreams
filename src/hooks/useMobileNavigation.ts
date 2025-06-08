
import { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useResponsiveNavigation } from './useResponsiveNavigation';

interface SwipeDirection {
  deltaX: number;
  deltaY: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
}

export const useMobileNavigation = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [swipeState, setSwipeState] = useState<SwipeDirection>({
    deltaX: 0,
    deltaY: 0,
    direction: null
  });
  
  const { navigateWithDebounce, isNavigating } = useResponsiveNavigation({
    debounceMs: 200,
    enableHapticFeedback: isMobile
  });

  // Handle swipe gestures for mobile
  const handleSwipe = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (!isMobile) return;

    console.log('Swipe detected:', direction);
    
    switch (direction) {
      case 'right':
        // Swipe right to open menu
        setIsMenuOpen(true);
        break;
      case 'left':
        // Swipe left to close menu
        setIsMenuOpen(false);
        break;
      case 'up':
        // Swipe up for quick actions (future enhancement)
        break;
      case 'down':
        // Swipe down to close overlays
        setIsMenuOpen(false);
        break;
    }
  }, [isMobile]);

  // Enhanced navigation function with mobile optimizations
  const navigateWithMobileOptimizations = useCallback((route: string) => {
    // Close mobile menu when navigating
    if (isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    navigateWithDebounce(route);
  }, [navigateWithDebounce, isMobile, isMenuOpen]);

  // Auto-close menu on outside click for mobile
  useEffect(() => {
    if (!isMobile || !isMenuOpen) return;

    const handleOutsideClick = (event: TouchEvent | MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMobile, isMenuOpen]);

  // Prevent scroll when menu is open on mobile
  useEffect(() => {
    if (isMobile && isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isMenuOpen]);

  return {
    isMobile,
    isMenuOpen,
    setIsMenuOpen,
    isNavigating,
    swipeState,
    setSwipeState,
    handleSwipe,
    navigateWithMobileOptimizations
  };
};
