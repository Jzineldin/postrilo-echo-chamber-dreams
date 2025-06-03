
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CreditCard, Save, TrendingUp } from 'lucide-react';

interface StatsGridProps {
  stats: {
    contentGenerated: number;
    remainingCredits: number;
    postsSaved: number;
    engagementRate: string;
  };
  subscribed: boolean;
}

export const DashboardStatsGrid = ({ stats, subscribed }: StatsGridProps) => {
  const statCards = [
    {
      title: "Content Generated",
      value: stats.contentGenerated,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Remaining Credits",
      value: stats.remainingCredits,
      icon: CreditCard,
      color: "text-green-600",
      bgColor: "bg-green-50",
      subtitle: subscribed ? "Unlimited" : "Resets monthly"
    },
    {
      title: "Posts Saved",
      value: stats.postsSaved,
      icon: Save,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Engagement Rate",
      value: stats.engagementRate,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.subtitle && (
              <Badge variant="outline" className="mt-1 text-xs">
                {stat.subtitle}
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
