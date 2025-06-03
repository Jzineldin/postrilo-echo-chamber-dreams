
import { useEffect, useCallback, useRef, useState } from 'react';
import { usePerformance } from '@/components/optimized/PerformanceProvider';

interface AdvancedPerformanceOptions {
  enableResourceHints?: boolean;
  enablePrefetching?: boolean;
  enablePreloading?: boolean;
  criticalResourceTimeout?: number;
}

export const useAdvancedPerformance = (options: AdvancedPerformanceOptions = {}) => {
  const {
    enableResourceHints = true,
    enablePrefetching = true,
    enablePreloading = true,
    criticalResourceTimeout = 5000
  } = options;

  const { addMetric } = usePerformance();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>('unknown');
  const prefetchedUrls = useRef<Set<string>>(new Set());

  // Monitor network status
  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    const updateConnectionType = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown');
        addMetric('connection_type', connection.downlink || 0, 'runtime');
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', updateConnectionType);
      updateConnectionType();
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        connection.removeEventListener('change', updateConnectionType);
      }
    };
  }, [addMetric]);

  // Intelligent prefetching based on connection quality
  const smartPrefetch = useCallback((url: string, priority: 'high' | 'low' = 'low') => {
    if (!enablePrefetching || !isOnline || prefetchedUrls.current.has(url)) return;

    // Skip prefetching on slow connections for low priority resources
    if (priority === 'low' && (connectionType === 'slow-2g' || connectionType === '2g')) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'fetch';
    
    // Add timeout for critical resources
    if (priority === 'high') {
      const timeout = setTimeout(() => {
        link.remove();
        addMetric('prefetch_timeout', criticalResourceTimeout, 'loading');
      }, criticalResourceTimeout);
      
      link.onload = () => {
        clearTimeout(timeout);
        addMetric('prefetch_success', Date.now(), 'loading');
      };
    }

    document.head.appendChild(link);
    prefetchedUrls.current.add(url);
  }, [enablePrefetching, isOnline, connectionType, criticalResourceTimeout, addMetric]);

  // Smart preloading for critical resources
  const smartPreload = useCallback((resources: Array<{url: string, as: string, type?: string}>) => {
    if (!enablePreloading || !isOnline) return;

    resources.forEach(({ url, as, type }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = as;
      if (type) link.type = type;
      
      link.onload = () => addMetric(`preload_${as}`, Date.now(), 'loading');
      link.onerror = () => addMetric(`preload_error_${as}`, Date.now(), 'loading');
      
      document.head.appendChild(link);
    });
  }, [enablePreloading, isOnline, addMetric]);

  // Resource hints for better performance
  const addResourceHints = useCallback((domains: string[]) => {
    if (!enableResourceHints) return;

    domains.forEach(domain => {
      // DNS prefetch
      const dnsLink = document.createElement('link');
      dnsLink.rel = 'dns-prefetch';
      dnsLink.href = `//${domain}`;
      document.head.appendChild(dnsLink);

      // Preconnect for critical domains
      const preconnectLink = document.createElement('link');
      preconnectLink.rel = 'preconnect';
      preconnectLink.href = `//${domain}`;
      document.head.appendChild(preconnectLink);
    });
  }, [enableResourceHints]);

  // Performance budget monitoring
  const checkPerformanceBudget = useCallback(() => {
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory;
      const memoryUsage = memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit;
      
      if (memoryUsage > 0.8) {
        addMetric('memory_budget_exceeded', memoryUsage * 100, 'memory');
        return false;
      }
    }
    return true;
  }, [addMetric]);

  return {
    isOnline,
    connectionType,
    smartPrefetch,
    smartPreload,
    addResourceHints,
    checkPerformanceBudget
  };
};
