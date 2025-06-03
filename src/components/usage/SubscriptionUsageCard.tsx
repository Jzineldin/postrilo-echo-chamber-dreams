
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, TrendingUp, Calendar, AlertTriangle, RefreshCw } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { UsageProgressBar } from './UsageProgressBar';

export const SubscriptionUsageCard = () => {
  const { 
    subscribed, 
    planName, 
    monthlyPostsLimit, 
    postsUsedThisMonth,
    subscriptionEnd,
    loading,
    error,
    checkSubscription,
    createCheckout,
    openCustomerPortal
  } = useSubscription();

  const postsRemaining = Math.max(0, monthlyPostsLimit - postsUsedThisMonth);
  const isNearLimit = postsUsedThisMonth >= monthlyPostsLimit * 0.8;
  const isAtLimit = postsUsedThisMonth >= monthlyPostsLimit;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {subscribed ? <Crown className="w-5 h-5 text-purple-600" /> : <Zap className="w-5 h-5 text-blue-600" />}
            Subscription Usage
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              variant={subscribed ? "default" : "secondary"}
              className={subscribed ? "bg-purple-600" : ""}
            >
              {planName}
            </Badge>
            {error && (
              <Button
                variant="ghost"
                size="sm"
                onClick={checkSubscription}
                disabled={loading}
                className="p-1"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-700 font-medium text-sm mb-2">
              <AlertTriangle className="w-4 h-4" />
              Connection Issue
            </div>
            <p className="text-xs text-yellow-600 mb-3">
              {error}. You can still use the app with basic access.
            </p>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-100"
              onClick={checkSubscription}
              disabled={loading}
            >
              {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : null}
              Retry Connection
            </Button>
          </div>
        )}

        <UsageProgressBar
          used={postsUsedThisMonth}
          total={monthlyPostsLimit}
          label="Posts Generated This Month"
          showWarning={!subscribed && !error}
        />

        {subscriptionEnd && (
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 p-3 rounded-lg">
            <Calendar className="w-4 h-4" />
            <span>Renews on {formatDate(subscriptionEnd)}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/60 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{postsRemaining}</div>
            <div className="text-xs text-gray-600">Posts Left</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{Math.round((postsUsedThisMonth / monthlyPostsLimit) * 100)}%</div>
            <div className="text-xs text-gray-600">Usage</div>
          </div>
        </div>

        {isAtLimit && !subscribed && !error && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-red-700 font-medium text-sm mb-2">
              <TrendingUp className="w-4 h-4" />
              Monthly Limit Reached
            </div>
            <p className="text-xs text-red-600 mb-3">
              You've used all {monthlyPostsLimit} posts for this month. Upgrade to continue creating content.
            </p>
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
              onClick={() => createCheckout('Creator')}
            >
              <Crown className="w-4 h-4 mr-1" />
              Upgrade Now
            </Button>
          </div>
        )}

        {isNearLimit && !isAtLimit && !subscribed && !error && (
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-amber-700 font-medium text-sm mb-2">
              <TrendingUp className="w-4 h-4" />
              Approaching Limit
            </div>
            <p className="text-xs text-amber-600 mb-3">
              You've used {postsUsedThisMonth} of {monthlyPostsLimit} posts. Consider upgrading for unlimited access.
            </p>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => createCheckout('Creator')}
            >
              View Plans
            </Button>
          </div>
        )}

        {subscribed && !error && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-green-700 font-medium text-sm mb-2">
              <Crown className="w-4 h-4" />
              Premium Active
            </div>
            <p className="text-xs text-green-600 mb-3">
              Enjoying unlimited content generation and premium features.
            </p>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full border-green-300 text-green-700 hover:bg-green-100"
              onClick={openCustomerPortal}
            >
              Manage Subscription
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
