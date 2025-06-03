
import { useState, useEffect, useRef } from 'react';

export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  category: 'loading' | 'runtime' | 'memory' | 'user';
  timestamp: number;
  metadata?: Record<string, any>;
}

interface UsePerformanceMetricsOptions {
  enableAutoCollection?: boolean;
  maxMetrics?: number;
}

export const usePerformanceMetrics = (options: UsePerformanceMetricsOptions = {}) => {
  const { enableAutoCollection = true, maxMetrics = 100 } = options;
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const metricsRef = useRef<PerformanceMetric[]>([]);

  // Auto-collect core web vitals and performance metrics
  useEffect(() => {
    if (!enableAutoCollection) return;

    const collectInitialMetrics = () => {
      // Collect navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        addMetric('page_load_time', navigation.loadEventEnd - navigation.loadEventStart, 'loading');
        addMetric('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'loading');
        addMetric('first_contentful_paint', navigation.loadEventEnd - navigation.fetchStart, 'loading');
      }

      // Collect memory usage (if available)
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        addMetric('memory_used', memory.usedJSHeapSize, 'memory');
        addMetric('memory_total', memory.totalJSHeapSize, 'memory');
      }
    };

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      collectInitialMetrics();
    } else {
      window.addEventListener('load', collectInitialMetrics);
      return () => window.removeEventListener('load', collectInitialMetrics);
    }
  }, [enableAutoCollection]);

  const addMetric = (name: string, value: number, category: PerformanceMetric['category'] = 'runtime', metadata?: Record<string, any>) => {
    const metric: PerformanceMetric = {
      id: `${name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      value,
      category,
      timestamp: Date.now(),
      metadata
    };

    setMetrics(prev => {
      const updated = [metric, ...prev].slice(0, maxMetrics);
      metricsRef.current = updated;
      return updated;
    });
  };

  const getMetricsByCategory = (category: PerformanceMetric['category']) => {
    return metrics.filter(metric => metric.category === category);
  };

  const getAverageMetric = (name: string) => {
    const matchingMetrics = metrics.filter(metric => metric.name === name);
    if (matchingMetrics.length === 0) return 0;
    return matchingMetrics.reduce((sum, metric) => sum + metric.value, 0) / matchingMetrics.length;
  };

  const clearMetrics = () => {
    setMetrics([]);
    metricsRef.current = [];
  };

  return {
    metrics,
    addMetric,
    getMetricsByCategory,
    getAverageMetric,
    clearMetrics
  };
};
