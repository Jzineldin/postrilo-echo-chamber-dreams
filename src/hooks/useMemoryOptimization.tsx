
import { useEffect, useRef } from 'react';

interface UseMemoryOptimizationOptions {
  enableCleanup?: boolean;
  cleanupInterval?: number;
}

export const useMemoryOptimization = (options: UseMemoryOptimizationOptions = {}) => {
  const { enableCleanup = true, cleanupInterval = 30000 } = options;
  const cleanupRefs = useRef<Set<() => void>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enableCleanup) return;

    // Set up periodic cleanup
    intervalRef.current = setInterval(() => {
      // Force garbage collection hint (if available)
      if ('gc' in window && typeof (window as any).gc === 'function') {
        try {
          (window as any).gc();
        } catch (e) {
          // Ignore errors - gc() might not be available
        }
      }

      // Run registered cleanup functions
      cleanupRefs.current.forEach(cleanup => {
        try {
          cleanup();
        } catch (e) {
          console.warn('Memory cleanup function failed:', e);
        }
      });
    }, cleanupInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enableCleanup, cleanupInterval]);

  const registerCleanup = (cleanupFn: () => void) => {
    cleanupRefs.current.add(cleanupFn);
    
    // Return unregister function
    return () => {
      cleanupRefs.current.delete(cleanupFn);
    };
  };

  const cleanup = () => {
    cleanupRefs.current.forEach(cleanupFn => {
      try {
        cleanupFn();
      } catch (e) {
        console.warn('Manual cleanup function failed:', e);
      }
    });
    cleanupRefs.current.clear();
  };

  return {
    registerCleanup,
    cleanup
  };
};
