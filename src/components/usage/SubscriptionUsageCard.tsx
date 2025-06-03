
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/hooks/useSubscription';
import { Crown, Zap, TrendingUp } from 'lucide-react';

export const SubscriptionUsageCard = () => {
  const { 
    subscribed, 
    planName, 
    postsUsedThisMonth, 
    monthlyPostsLimit,
    billingPeriodEnd 
  } = useSubscription();

  const usagePercentage = (postsUsedThisMonth / monthlyPostsLimit) * 100;
  const remainingPosts = monthlyPostsLimit - postsUsedThisMonth;

  return (
    <Card className={subscribed ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {subscribed ? <Crown className="h-5 w-5 text-purple-600" /> : <Zap className="h-5 w-5 text-blue-600" />}
            {planName} Plan
          </CardTitle>
          <Badge variant={subscribed ? "default" : "secondary"} className={subscribed ? "bg-purple-600" : ""}>
            {subscribed ? "Pro" : "Free"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Usage Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Content Generated This Month</span>
              <span className="text-gray-600">
                {postsUsedThisMonth} / {subscribed ? "Unlimited" : monthlyPostsLimit}
              </span>
            </div>
            {!subscribed && (
              <Progress 
                value={usagePercentage} 
                className={`h-2 ${usagePercentage > 80 ? 'bg-red-100' : 'bg-blue-100'}`}
              />
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{postsUsedThisMonth}</div>
              <div className="text-xs text-gray-600">Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {subscribed ? "∞" : remainingPosts}
              </div>
              <div className="text-xs text-gray-600">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {subscribed ? "Pro" : "Free"}
              </div>
              <div className="text-xs text-gray-600">Tier</div>
            </div>
          </div>

          {/* Action Button */}
          {!subscribed && remainingPosts <= 2 && (
            <div className="pt-3 border-t">
              <div className="text-sm text-amber-700 mb-2 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Running low on credits
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
          )}

          {/* Billing Info */}
          {subscribed && billingPeriodEnd && (
            <div className="text-xs text-gray-600 text-center pt-2 border-t">
              Next billing: {new Date(billingPeriodEnd).toLocaleDateString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
