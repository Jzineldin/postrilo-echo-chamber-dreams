
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useContentAnalytics } from '@/hooks/useContentAnalytics';
import { BarChart3, TrendingUp, Eye, Heart } from 'lucide-react';

interface AnalyticsSummaryCardProps {
  onViewDetails?: () => void;
}

export const AnalyticsSummaryCard = ({ onViewDetails }: AnalyticsSummaryCardProps) => {
  const { insights, allMetrics, isLoading } = useContentAnalytics();

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-24 bg-gray-200 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  const totalPosts = allMetrics.length;
  const totalEngagement = allMetrics.reduce((sum, m) => sum + m.engagement, 0);
  const avgEngagement = totalPosts > 0 ? totalEngagement / totalPosts : 0;
  const topInsight = insights.find(i => i.type === 'performance') || insights[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Analytics Summary
          </span>
          {onViewDetails && (
            <Button variant="outline" size="sm" onClick={onViewDetails}>
              View Details
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {totalPosts === 0 ? (
          <div className="text-center py-4">
            <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">No content tracked yet</p>
            <p className="text-xs text-gray-500">Start creating content to see analytics</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold">{totalPosts}</div>
                <div className="text-xs text-gray-600">Posts</div>
              </div>
              <div>
                <div className="text-lg font-bold">{totalEngagement.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Total Engagement</div>
              </div>
              <div>
                <div className="text-lg font-bold">{avgEngagement.toFixed(1)}</div>
                <div className="text-xs text-gray-600">Avg Engagement</div>
              </div>
            </div>

            {/* Top Insight */}
            {topInsight && (
              <div className="border-t pt-4">
                <div className="flex items-start gap-2">
                  {topInsight.type === 'performance' ? (
                    <Heart className="w-4 h-4 text-red-500 mt-0.5" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{topInsight.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {topInsight.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{topInsight.description}</p>
                    <p className="text-sm font-semibold text-blue-600 mt-1">
                      {topInsight.value}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
