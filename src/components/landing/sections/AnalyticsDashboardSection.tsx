
import React from 'react';
import { DropoffAnalytics } from '@/components/analytics/DropoffAnalytics';
import { HeatmapTracker } from '@/components/analytics/HeatmapTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react';

export const AnalyticsDashboardSection = () => {
  const stats = [
    {
      icon: Users,
      label: 'Active Users',
      value: '2,847',
      change: '+12%',
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      label: 'Conversion Rate',
      value: '18.4%',
      change: '+2.3%',
      color: 'text-green-600'
    },
    {
      icon: BarChart3,
      label: 'Content Generated',
      value: '45.2k',
      change: '+28%',
      color: 'text-purple-600'
    },
    {
      icon: Zap,
      label: 'User Engagement',
      value: '94%',
      change: '+5.1%',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <HeatmapTracker enabled={true} sampleRate={0.1} />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            Real-Time Analytics
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Data-driven content optimization
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track performance, understand your audience, and optimize your content strategy
          </p>
        </div>

        {/* Live Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium mt-1">{stat.change}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Dropoff Analytics */}
        <div className="max-w-4xl mx-auto">
          <DropoffAnalytics />
        </div>

        {/* Performance Insights */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Posts with emojis</span>
                  <span className="font-semibold text-green-600">+47% engagement</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Video content</span>
                  <span className="font-semibold text-green-600">+62% reach</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Question-based posts</span>
                  <span className="font-semibold text-green-600">+34% comments</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Educational content</span>
                  <span className="font-semibold text-green-600">+89% saves</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optimal Posting Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Monday 9-11 AM</span>
                  <Badge className="bg-green-100 text-green-700">Peak</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Wednesday 2-4 PM</span>
                  <Badge className="bg-green-100 text-green-700">Peak</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Friday 6-8 PM</span>
                  <Badge className="bg-yellow-100 text-yellow-700">Good</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Weekend mornings</span>
                  <Badge className="bg-red-100 text-red-700">Avoid</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
