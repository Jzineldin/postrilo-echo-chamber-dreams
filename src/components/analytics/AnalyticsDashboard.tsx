
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useContentAnalytics } from '@/hooks/useContentAnalytics';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Eye, 
  Heart, 
  Share2, 
  RefreshCw,
  Target,
  Award,
  Activity
} from 'lucide-react';

export const AnalyticsDashboard = () => {
  const {
    insights,
    platformPerformance,
    allMetrics,
    isLoading,
    refreshAnalytics,
    getTopPerformingContent
  } = useContentAnalytics();

  const topContent = getTopPerformingContent(3);
  const totalPosts = allMetrics.length;
  const totalEngagement = allMetrics.reduce((sum, m) => sum + m.engagement, 0);
  const totalReach = allMetrics.reduce((sum, m) => sum + m.reach, 0);

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'performance': return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case 'trend': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'recommendation': return <Target className="w-5 h-5 text-purple-600" />;
      default: return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <Button variant="outline" disabled>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Loading...
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Button variant="outline" onClick={refreshAnalytics}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold">{totalPosts}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Engagement</p>
                <p className="text-2xl font-bold">{totalEngagement.toLocaleString()}</p>
              </div>
              <Heart className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reach</p>
                <p className="text-2xl font-bold">{totalReach.toLocaleString()}</p>
              </div>
              <Share2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{insight.title}</h4>
                    {insight.trend && getTrendIcon(insight.trend)}
                    <Badge variant="outline" className="text-xs">
                      {insight.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{insight.description}</p>
                  <p className="text-lg font-semibold text-blue-600">{insight.value}</p>
                  {insight.actionable && (
                    <p className="text-xs text-green-700 mt-1">💡 {insight.actionable}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformPerformance.map((platform) => (
              <div key={platform.platform} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium capitalize">{platform.platform}</h3>
                  <Badge variant={platform.growthRate > 0 ? 'default' : 'secondary'}>
                    {platform.growthRate > 0 ? '+' : ''}{platform.growthRate.toFixed(1)}% growth
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Posts</p>
                    <p className="font-semibold">{platform.totalPosts}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Avg Engagement</p>
                    <p className="font-semibold">{platform.avgEngagement.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Best Type</p>
                    <p className="font-semibold capitalize">{platform.bestPerformingType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Best Tone</p>
                    <p className="font-semibold capitalize">{platform.bestPerformingTone}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Reach Progress</span>
                    <span>{platform.totalReach.toLocaleString()}</span>
                  </div>
                  <Progress value={Math.min((platform.totalReach / 10000) * 100, 100)} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Content */}
      {topContent.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Top Performing Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topContent.map((content, index) => (
                <div key={content.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    <Badge variant={index === 0 ? 'default' : 'secondary'}>
                      #{index + 1}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium capitalize">{content.platform}</span>
                      <Badge variant="outline" className="text-xs">
                        {content.contentType}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {content.tone}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {content.engagement} engagements • {content.reach} reach
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {content.engagement}
                    </div>
                    <div className="text-xs text-gray-500">engagements</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
