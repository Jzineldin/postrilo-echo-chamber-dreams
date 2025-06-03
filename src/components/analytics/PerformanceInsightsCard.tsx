
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useContentAnalytics } from '@/hooks/useContentAnalytics';
import { TrendingUp, Target, Lightbulb, AlertCircle } from 'lucide-react';

export const PerformanceInsightsCard = () => {
  const { insights, allMetrics } = useContentAnalytics();

  if (allMetrics.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Lightbulb className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Start creating content to see insights</p>
        </CardContent>
      </Card>
    );
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'performance': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'recommendation': return <Target className="w-4 h-4 text-green-500" />;
      case 'trend': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default: return <Lightbulb className="w-4 h-4 text-gray-500" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'performance': return 'bg-blue-50 border-blue-200';
      case 'recommendation': return 'bg-green-50 border-green-200';
      case 'trend': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Performance Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.slice(0, 3).map((insight, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}
          >
            <div className="flex items-start gap-3">
              {getInsightIcon(insight.type)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {insight.type}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                <div className="text-sm font-semibold text-blue-600">
                  {insight.value}
                </div>
                {insight.actionable && (
                  <p className="text-xs text-green-700 mt-1">
                    💡 {insight.actionable}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
