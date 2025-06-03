
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, TrendingUp, Users, Heart, Share, Lock } from 'lucide-react';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { useSubscription } from '@/hooks/useSubscription';

export const AnalyticsPanel = () => {
  const { hasAccess, currentPlanName } = useSubscriptionFeatures();
  const { createCheckout } = useSubscription();

  const hasAnalyticsAccess = hasAccess('hasAnalytics');

  const handleUpgrade = async () => {
    await createCheckout('Business');
  };

  if (!hasAnalyticsAccess) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            Analytics & Performance Tips
            <Lock className="w-4 h-4 text-gray-400" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Unlock Advanced Analytics</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get detailed insights on your content performance and AI-powered optimization tips
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
              <div className="bg-gray-50 p-3 rounded border">
                <div className="font-medium text-gray-700">Performance Tracking</div>
                <div className="text-gray-500">Engagement rates, reach metrics</div>
              </div>
              <div className="bg-gray-50 p-3 rounded border">
                <div className="font-medium text-gray-700">Content Analysis</div>
                <div className="text-gray-500">Best performing posts</div>
              </div>
              <div className="bg-gray-50 p-3 rounded border">
                <div className="font-medium text-gray-700">AI Recommendations</div>
                <div className="text-gray-500">Optimization suggestions</div>
              </div>
              <div className="bg-gray-50 p-3 rounded border">
                <div className="font-medium text-gray-700">Competitor Insights</div>
                <div className="text-gray-500">Industry benchmarks</div>
              </div>
            </div>
            
            <Badge variant="outline" className="bg-blue-100 text-blue-700 mb-4">
              Business Plan Feature
            </Badge>
            <Button
              onClick={handleUpgrade}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Upgrade to Business Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart className="w-5 h-5" />
          Analytics & Performance Tips
          <Badge className="bg-blue-100 text-blue-700">Business</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Avg. Engagement</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">8.4%</div>
            <div className="text-xs text-green-600">↗ +2.1% from last month</div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Reach</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">12.5K</div>
            <div className="text-xs text-green-600">↗ +15% from last week</div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Share className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Shares</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">342</div>
            <div className="text-xs text-green-600">↗ +8% from last week</div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Growth Rate</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">24%</div>
            <div className="text-xs text-green-600">↗ +5% from last month</div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            AI Performance Tips
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <span>Posts with questions get 34% more engagement. Try adding "What do you think?" to your next post.</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <span>Your audience is most active between 2-4 PM. Schedule more posts during this time.</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <span>Video content performs 45% better than images for your brand. Consider more video posts.</span>
            </div>
          </div>
        </div>

        {/* Best Performing Content */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Top Performing Posts This Month</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded border">
              <div className="flex-1">
                <div className="font-medium text-sm">"5 Tips for Better Social Media Engagement"</div>
                <div className="text-xs text-gray-600">Posted 3 days ago • Instagram</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">12.8% engagement</div>
                <div className="text-xs text-gray-500">2.1K reach</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded border">
              <div className="flex-1">
                <div className="font-medium text-sm">"Behind the scenes of our latest project"</div>
                <div className="text-xs text-gray-600">Posted 1 week ago • LinkedIn</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">9.4% engagement</div>
                <div className="text-xs text-gray-500">1.8K reach</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
