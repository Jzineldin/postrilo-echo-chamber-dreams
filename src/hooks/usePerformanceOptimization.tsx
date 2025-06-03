
import { useCallback, useRef } from 'react';

interface UsePerformanceOptimizationOptions {
  enableDebounce?: boolean;
  enableThrottle?: boolean;
  defaultDebounceDelay?: number;
  defaultThrottleDelay?: number;
}

export const usePerformanceOptimization = (options: UsePerformanceOptimizationOptions = {}) => {
  const {
    enableDebounce = true,
    enableThrottle = true,
    defaultDebounceDelay = 300,
    defaultThrottleDelay = 100
  } = options;

  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const throttleRefs = useRef<Map<string, number>>(new Map());

  const debounce = useCallback((
    func: Function,
    delay: number = defaultDebounceDelay,
    key: string = 'default'
  ) => {
    if (!enableDebounce) return func;

    return (...args: any[]) => {
      const existingTimeout = timeoutRefs.current.get(key);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      const timeout = setTimeout(() => {
        func(...args);
        timeoutRefs.current.delete(key);
      }, delay);

      timeoutRefs.current.set(key, timeout);
    };
  }, [enableDebounce, defaultDebounceDelay]);

  const throttle = useCallback((
    func: Function,
    delay: number = defaultThrottleDelay,
    key: string = 'default'
  ) => {
    if (!enableThrottle) return func;

    return (...args: any[]) => {
      const lastExecution = throttleRefs.current.get(key) || 0;
      const now = Date.now();

      if (now - lastExecution >= delay) {
        func(...args);
        throttleRefs.current.set(key, now);
      }
    };
  }, [enableThrottle, defaultThrottleDelay]);

  const cleanup = useCallback(() => {
    // Clear all pending timeouts
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current.clear();
    throttleRefs.current.clear();
  }, []);

  return {
    debounce,
    throttle,
    cleanup
  };
};
