
import { useCallback } from 'react';

export const usePerformanceOptimization = () => {
  const debounce = useCallback((func: Function, wait: number, key: string) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  }, []);

  const measurePerformance = useCallback((label: string, fn: Function) => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${label}: ${end - start}ms`);
    return result;
  }, []);

  return {
    debounce,
    measurePerformance,
  };
};
