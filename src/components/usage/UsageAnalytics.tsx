
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react';
import { EnhancedContentStorage } from '@/services/enhancedContentStorage';

interface UsageStats {
  dailyUsage: { date: string; count: number }[];
  totalThisWeek: number;
  totalThisMonth: number;
  averagePerDay: number;
  platformBreakdown: { platform: string; count: number }[];
}

export const UsageAnalytics = () => {
  const [stats, setStats] = useState<UsageStats | null>(null);

  useEffect(() => {
    const calculateStats = () => {
      const allContent = EnhancedContentStorage.getAllContent();
      
      // Calculate daily usage for the last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const dailyUsage = last7Days.map(date => ({
        date,
        count: allContent.filter(item => 
          item.createdAt.startsWith(date)
        ).length
      }));

      // Calculate weekly and monthly totals
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const totalThisWeek = allContent.filter(item => 
        new Date(item.createdAt) >= weekAgo
      ).length;

      const totalThisMonth = allContent.filter(item => 
        new Date(item.createdAt) >= monthAgo
      ).length;

      const averagePerDay = totalThisWeek / 7;

      // Platform breakdown
      const platformCounts = allContent.reduce((acc, item) => {
        acc[item.platform] = (acc[item.platform] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const platformBreakdown = Object.entries(platformCounts)
        .map(([platform, count]) => ({ platform, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setStats({
        dailyUsage,
        totalThisWeek,
        totalThisMonth,
        averagePerDay,
        platformBreakdown
      });
    };

    calculateStats();
  }, []);

  if (!stats) return null;

  const maxDailyCount = Math.max(...stats.dailyUsage.map(d => d.count));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Usage Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.totalThisWeek}</div>
              <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3" />
                This Week
              </div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.totalThisMonth}</div>
              <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" />
                This Month
              </div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.averagePerDay.toFixed(1)}</div>
              <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                <Target className="w-3 h-3" />
                Daily Avg
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Daily Usage (Last 7 Days)</h4>
            <div className="space-y-2">
              {stats.dailyUsage.map((day, index) => (
                <div key={day.date} className="flex items-center gap-3">
                  <div className="text-xs text-gray-500 w-16">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex-1">
                    <Progress 
                      value={maxDailyCount > 0 ? (day.count / maxDailyCount) * 100 : 0} 
                      className="h-2" 
                    />
                  </div>
                  <div className="text-xs font-medium text-gray-700 w-8 text-right">
                    {day.count}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {stats.platformBreakdown.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Top Platforms</h4>
              <div className="space-y-2">
                {stats.platformBreakdown.map((platform, index) => (
                  <div key={platform.platform} className="flex items-center gap-3">
                    <div className="text-xs text-gray-600 w-20 capitalize">
                      {platform.platform}
                    </div>
                    <div className="flex-1">
                      <Progress 
                        value={stats.totalThisMonth > 0 ? (platform.count / stats.totalThisMonth) * 100 : 0} 
                        className="h-2" 
                      />
                    </div>
                    <div className="text-xs font-medium text-gray-700 w-8 text-right">
                      {platform.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
