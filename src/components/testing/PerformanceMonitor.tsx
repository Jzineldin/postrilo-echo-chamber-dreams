
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BarChart3, Activity, Clock, Zap } from 'lucide-react';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'poor';
  target: number;
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // Get basic performance metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const newMetrics: PerformanceMetric[] = [];

      if (navigation) {
        newMetrics.push({
          name: 'Page Load Time',
          value: Math.round(navigation.loadEventEnd - navigation.fetchStart),
          unit: 'ms',
          status: (navigation.loadEventEnd - navigation.fetchStart) < 2000 ? 'good' : 'warning',
          target: 2000
        });

        newMetrics.push({
          name: 'DOM Content Loaded',
          value: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
          unit: 'ms',
          status: (navigation.domContentLoadedEventEnd - navigation.fetchStart) < 1500 ? 'good' : 'warning',
          target: 1500
        });
      }

      // Check if performance.memory is available (Chrome only)
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        newMetrics.push({
          name: 'Memory Usage',
          value: Math.round(memory.usedJSHeapSize / 1024 / 1024),
          unit: 'MB',
          status: memory.usedJSHeapSize < 50 * 1024 * 1024 ? 'good' : 'warning',
          target: 50
        });
      }

      setMetrics(newMetrics);
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const startMonitoring = () => {
    setIsMonitoring(true);
    console.log('🔍 Performance monitoring started');
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    console.log('⏹️ Performance monitoring stopped');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Performance Monitor
          </span>
          <div className="flex items-center gap-2">
            <Badge variant={isMonitoring ? "default" : "secondary"}>
              {isMonitoring ? "Monitoring" : "Stopped"}
            </Badge>
            <Button
              onClick={isMonitoring ? stopMonitoring : startMonitoring}
              size="sm"
              variant={isMonitoring ? "destructive" : "default"}
            >
              {isMonitoring ? "Stop" : "Start"}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {metrics.length > 0 ? (
          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {metric.value} {metric.unit}
                    </span>
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={Math.min((metric.value / metric.target) * 100, 100)} 
                  className="w-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Start monitoring to see performance metrics</p>
            <p className="text-xs mt-1">Note: Some metrics may not be available in all browsers</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
