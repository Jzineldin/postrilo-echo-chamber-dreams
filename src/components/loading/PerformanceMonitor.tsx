
import { useEffect, useCallback, useRef } from 'react';

interface PerformanceMonitorProps {
  onMetric?: (metric: string, value: number) => void;
}

export const PerformanceMonitor = ({ onMetric }: PerformanceMonitorProps) => {
  const observerRef = useRef<PerformanceObserver | null>(null);
  const lastMemoryCheck = useRef<number>(0);

  const handleMetric = useCallback((metric: string, value: number) => {
    onMetric?.(metric, value);
  }, [onMetric]);

  useEffect(() => {
    // Clean up any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          const pageLoadTime = navEntry.loadEventEnd - navEntry.startTime;
          if (pageLoadTime > 0) {
            handleMetric('page_load_time', pageLoadTime);
          }
        }
        
        if (entry.entryType === 'paint') {
          handleMetric(entry.name.replace('-', '_'), entry.startTime);
        }
      }
    });

    observer.observe({ entryTypes: ['navigation', 'paint'] });
    observerRef.current = observer;

    // Monitor memory usage with throttling (only once every 5 seconds)
    const checkMemory = () => {
      const now = Date.now();
      if (now - lastMemoryCheck.current > 5000 && 'memory' in performance) {
        lastMemoryCheck.current = now;
        const memoryInfo = (performance as any).memory;
        if (memoryInfo) {
          handleMetric('memory_used', memoryInfo.usedJSHeapSize);
          handleMetric('memory_limit', memoryInfo.jsHeapSizeLimit);
        }
      }
    };

    // Check memory initially
    checkMemory();

    // Set up interval for memory checks
    const memoryInterval = setInterval(checkMemory, 5000);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearInterval(memoryInterval);
    };
  }, [handleMetric]);

  return null;
};
