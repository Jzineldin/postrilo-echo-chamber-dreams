
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePerformance } from './PerformanceProvider';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface PerformanceScore {
  score: number;
  category: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  recommendations: string[];
}

export const PerformanceInsights = () => {
  const { metrics } = usePerformance();
  const [insights, setInsights] = useState<PerformanceScore | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (metrics.length === 0) return;

    const calculateScore = (): PerformanceScore => {
      let score = 100;
      const recommendations: string[] = [];

      // Analyze loading metrics
      const pageLoadMetric = metrics.find(m => m.name === 'page_load_time');
      if (pageLoadMetric) {
        if (pageLoadMetric.value > 3000) {
          score -= 30;
          recommendations.push('Page load time is over 3 seconds');
        } else if (pageLoadMetric.value > 1500) {
          score -= 15;
          recommendations.push('Page load time could be improved');
        }
      }

      // Analyze memory usage
      const memoryMetrics = metrics.filter(m => m.name === 'memory_used');
      if (memoryMetrics.length > 0) {
        const latestMemory = memoryMetrics[memoryMetrics.length - 1];
        const memoryMB = latestMemory.value / (1024 * 1024);
        
        if (memoryMB > 50) {
          score -= 20;
          recommendations.push('High memory usage detected');
        } else if (memoryMB > 30) {
          score -= 10;
          recommendations.push('Memory usage is moderate');
        }
      }

      // Determine category
      let category: PerformanceScore['category'];
      if (score >= 90) category = 'excellent';
      else if (score >= 75) category = 'good';
      else if (score >= 50) category = 'needs-improvement';
      else category = 'poor';

      return { score, category, recommendations };
    };

    setInsights(calculateScore());
  }, [metrics]);

  const getScoreColor = (category: PerformanceScore['category']) => {
    switch (category) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getScoreIcon = (category: PerformanceScore['category']) => {
    switch (category) {
      case 'excellent': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'good': return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'needs-improvement': return <TrendingDown className="w-4 h-4 text-yellow-600" />;
      case 'poor': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  if (!insights || !import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 max-w-sm">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          Performance Score: {insights.score}
        </button>
      ) : (
        <Card className="bg-white shadow-lg border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getScoreIcon(insights.category)}
                Performance Insights
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Score</span>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${getScoreColor(insights.category)}`}>
                  {insights.score}
                </span>
                <Badge variant={insights.category === 'excellent' ? 'default' : 'secondary'}>
                  {insights.category.replace('-', ' ')}
                </Badge>
              </div>
            </div>
            
            {insights.recommendations.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">Recommendations:</span>
                <ul className="space-y-1">
                  {insights.recommendations.map((rec, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-xs text-gray-500 pt-2 border-t">
              Metrics collected: {metrics.length}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
