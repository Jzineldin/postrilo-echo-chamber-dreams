
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';
import { UniversalHeader } from '../navigation/UniversalHeader';

export const AnalyticsDashboard = () => {
  const handleBack = () => {
    window.location.hash = 'dashboard';
  };

  const stats = [
    {
      title: "Total Posts Generated",
      value: "24",
      change: "+12%",
      icon: BarChart3
    },
    {
      title: "Engagement Rate",
      value: "8.3%",
      change: "+2.1%",
      icon: TrendingUp
    },
    {
      title: "Reach",
      value: "2.4K",
      change: "+18%",
      icon: Users
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversalHeader 
        title="Analytics Dashboard"
        currentPage="View your content performance and insights"
        onBack={handleBack}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Analytics Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Detailed analytics and insights are currently under development. You'll soon be able to track:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>Content performance across platforms</li>
              <li>Engagement metrics and trends</li>
              <li>Best performing content types</li>
              <li>Audience insights and demographics</li>
              <li>ROI tracking and conversion metrics</li>
            </ul>
            <Button onClick={handleBack}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
