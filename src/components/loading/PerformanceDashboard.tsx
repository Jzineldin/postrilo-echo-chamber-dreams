import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PerformanceMonitor } from './PerformanceMonitor';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  unit?: string;
}

export const PerformanceDashboard = ({ isDev = false }: { isDev?: boolean }) => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isVisible, setIsVisible] = useState(isDev);

  const handleMetric = useCallback((name: string, value: number) => {
    setMetrics(prev => {
      // Prevent duplicate metrics for the same name within a short time window
      const now = Date.now();
      const recentMetric = prev.find(m => 
        m.name === name && 
        now - m.timestamp < 1000 // Within 1 second
      );
      
      if (recentMetric) {
        return prev; // Skip duplicate
      }

      const newMetric = {
        name,
        value,
        timestamp: now,
        unit: name.includes('time') ? 'ms' : name.includes('memory') ? 'MB' : ''
      };

      // Keep only the last 10 metrics
      return [...prev.slice(-9), newMetric];
    });
  }, []);

  const formatValue = (metric: PerformanceMetric) => {
    if (metric.unit === 'MB') {
      return `${(metric.value / 1024 / 1024).toFixed(1)} MB`;
    }
    if (metric.unit === 'ms') {
      return `${metric.value.toFixed(0)} ms`;
    }
    return metric.value.toString();
  };

  const getMetricStatus = (metric: PerformanceMetric) => {
    if (metric.name === 'page_load_time') {
      if (metric.value < 1000) return 'success';
      if (metric.value < 3000) return 'warning';
      return 'error';
    }
    return 'default';
  };

  if (!isVisible) return null;

  return (
    <>
      <PerformanceMonitor onMetric={handleMetric} />
      
      {/* Performance indicator for development */}
      <div className="fixed bottom-4 right-4 z-50 max-w-xs">
        <Card className="bg-black/90 text-white text-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              Performance
              <button 
                onClick={() => setIsVisible(false)}
                className="text-white/60 hover:text-white"
              >
                ×
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {metrics.slice(-5).map((metric, index) => (
              <div key={`${metric.name}-${metric.timestamp}-${index}`} className="flex justify-between items-center">
                <span className="text-white/80 capitalize">
                  {metric.name.replace('_', ' ')}
                </span>
                <Badge 
                  variant={getMetricStatus(metric) as any}
                  className="text-xs"
                >
                  {formatValue(metric)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
