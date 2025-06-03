
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, Target, Activity } from 'lucide-react';

export const UsageAnalytics = () => {
  const analyticsData = {
    weeklyGeneration: [
      { day: 'Mon', count: 3 },
      { day: 'Tue', count: 5 },
      { day: 'Wed', count: 2 },
      { day: 'Thu', count: 7 },
      { day: 'Fri', count: 4 },
      { day: 'Sat', count: 1 },
      { day: 'Sun', count: 3 }
    ],
    topPlatforms: [
      { name: 'Instagram', percentage: 45, count: 12 },
      { name: 'LinkedIn', percentage: 30, count: 8 },
      { name: 'Twitter', percentage: 25, count: 5 }
    ],
    contentTypes: [
      { name: 'Social Posts', percentage: 60, count: 15 },
      { name: 'Video Scripts', percentage: 25, count: 6 },
      { name: 'Blog Ideas', percentage: 15, count: 4 }
    ]
  };

  const maxWeeklyCount = Math.max(...analyticsData.weeklyGeneration.map(d => d.count));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Usage Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weekly Activity */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            This Week's Activity
          </h4>
          <div className="grid grid-cols-7 gap-2">
            {analyticsData.weeklyGeneration.map((day) => (
              <div key={day.day} className="text-center">
                <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                <div className="bg-blue-100 rounded-lg p-2 relative">
                  <div 
                    className="bg-blue-600 rounded-sm"
                    style={{
                      height: `${Math.max((day.count / maxWeeklyCount) * 20, 2)}px`,
                      width: '100%'
                    }}
                  />
                </div>
                <div className="text-xs font-medium mt-1">{day.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Distribution */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Platform Distribution
          </h4>
          <div className="space-y-3">
            {analyticsData.topPlatforms.map((platform) => (
              <div key={platform.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{platform.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {platform.count} posts
                  </Badge>
                </div>
                <Progress value={platform.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Types */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Content Types
          </h4>
          <div className="space-y-3">
            {analyticsData.contentTypes.map((type) => (
              <div key={type.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{type.name}</span>
                  <span className="text-gray-600">{type.percentage}%</span>
                </div>
                <Progress value={type.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
