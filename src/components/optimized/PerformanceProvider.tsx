
import React, { createContext, useContext, useState, useCallback } from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  category: 'loading' | 'runtime' | 'memory' | 'user';
  timestamp: number;
}

interface PerformanceContextType {
  metrics: PerformanceMetric[];
  addMetric: (name: string, value: number, category: PerformanceMetric['category']) => void;
  clearMetrics: () => void;
  getMetricsByCategory: (category: PerformanceMetric['category']) => PerformanceMetric[];
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

interface PerformanceProviderProps {
  children: React.ReactNode;
  maxMetrics?: number;
  enableMetrics?: boolean;
  enableOptimizations?: boolean;
}

export const PerformanceProvider = ({ 
  children, 
  maxMetrics = 100,
  enableMetrics = false,
  enableOptimizations = true
}: PerformanceProviderProps) => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);

  const addMetric = useCallback((
    name: string, 
    value: number, 
    category: PerformanceMetric['category']
  ) => {
    if (!enableMetrics) return;
    
    const metric: PerformanceMetric = {
      name,
      value,
      category,
      timestamp: Date.now()
    };

    setMetrics(prev => [metric, ...prev].slice(0, maxMetrics));
  }, [maxMetrics, enableMetrics]);

  const clearMetrics = useCallback(() => {
    setMetrics([]);
  }, []);

  const getMetricsByCategory = useCallback((category: PerformanceMetric['category']) => {
    return metrics.filter(metric => metric.category === category);
  }, [metrics]);

  return (
    <PerformanceContext.Provider value={{
      metrics,
      addMetric,
      clearMetrics,
      getMetricsByCategory
    }}>
      {children}
    </PerformanceContext.Provider>
  );
};
