
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Zap } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'signup' | 'content_created' | 'template_used';
  message: string;
  timestamp: number;
  location?: string;
}

export const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [userCount, setUserCount] = useState(2847);

  // Simulate real-time activity
  useEffect(() => {
    const generateActivity = () => {
      const templates = [
        'Product Launch', 'Tutorial Post', 'Brand Story', 'Educational Content'
      ];
      const locations = [
        'New York', 'London', 'Tokyo', 'San Francisco', 'Berlin', 'Sydney'
      ];
      
      const activities: ActivityItem[] = [
        {
          id: '1',
          type: 'signup',
          message: `Someone from ${locations[Math.floor(Math.random() * locations.length)]} just signed up`,
          timestamp: Date.now() - Math.random() * 300000
        },
        {
          id: '2',
          type: 'content_created',
          message: 'A creator just generated their 50th post this month',
          timestamp: Date.now() - Math.random() * 600000
        },
        {
          id: '3',
          type: 'template_used',
          message: `"${templates[Math.floor(Math.random() * templates.length)]}" template was just used`,
          timestamp: Date.now() - Math.random() * 900000
        }
      ];

      setActivities(activities);
    };

    generateActivity();
    const interval = setInterval(generateActivity, 15000); // Update every 15 seconds

    // Simulate user count growth
    const countInterval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(countInterval);
    };
  }, []);

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'signup': return <Users className="w-4 h-4 text-green-600" />;
      case 'content_created': return <Zap className="w-4 h-4 text-purple-600" />;
      case 'template_used': return <TrendingUp className="w-4 h-4 text-blue-600" />;
    }
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Live Activity</h3>
        <Badge className="bg-green-100 text-green-700 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
          {userCount.toLocaleString()} active users
        </Badge>
      </div>
      
      <div className="space-y-3">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-center gap-3 text-sm">
            {getIcon(activity.type)}
            <span className="text-gray-700 flex-1">{activity.message}</span>
            <span className="text-gray-500 text-xs">{formatTime(activity.timestamp)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
