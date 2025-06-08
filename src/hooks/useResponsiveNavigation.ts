
import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseResponsiveNavigationOptions {
  debounceMs?: number;
  enableHapticFeedback?: boolean;
}

export const useResponsiveNavigation = (options: UseResponsiveNavigationOptions = {}) => {
  const { debounceMs = 300, enableHapticFeedback = true } = options;
  const [isNavigating, setIsNavigating] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const navigate = useNavigate();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastNavigationRef = useRef<string | null>(null);

  const triggerHapticFeedback = useCallback(() => {
    if (enableHapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(50); // Light haptic feedback
    }
  }, [enableHapticFeedback]);

  const navigateWithDebounce = useCallback((route: string) => {
    // Prevent duplicate navigation to same route
    if (isNavigating || lastNavigationRef.current === route) {
      console.log('Navigation blocked - already navigating or same route:', route);
      return;
    }

    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setIsNavigating(true);
    setPendingRoute(route);
    triggerHapticFeedback();
    lastNavigationRef.current = route;

    debounceTimerRef.current = setTimeout(() => {
      console.log('Executing navigation to:', route);
      navigate(route);
      
      // Reset states after a short delay to prevent rapid re-clicks
      setTimeout(() => {
        setIsNavigating(false);
        setPendingRoute(null);
        lastNavigationRef.current = null;
      }, 100);
    }, debounceMs);
  }, [isNavigating, navigate, debounceMs, triggerHapticFeedback]);

  const cancelNavigation = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    setIsNavigating(false);
    setPendingRoute(null);
    lastNavigationRef.current = null;
  }, []);

  return {
    navigateWithDebounce,
    cancelNavigation,
    isNavigating,
    pendingRoute
  };
};
