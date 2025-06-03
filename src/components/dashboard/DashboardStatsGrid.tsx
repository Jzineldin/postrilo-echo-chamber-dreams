
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  TrendingUp, 
  Users, 
  BarChart3
} from "lucide-react";

interface StatsData {
  contentGenerated: number;
  remainingCredits: number | string;
  postsSaved: number;
  engagementRate: string;
}

interface DashboardStatsGridProps {
  stats: StatsData;
  subscribed: boolean;
}

export const DashboardStatsGrid = ({ stats, subscribed }: DashboardStatsGridProps) => {
  const statsConfig = [
    {
      title: "Content Generated",
      value: stats.contentGenerated,
      icon: FileText,
      color: "from-blue-50 to-blue-100 border-blue-200",
      iconColor: "text-blue-600",
      textColor: "text-blue-800"
    },
    {
      title: subscribed ? "Unlimited" : "Remaining Credits",
      value: stats.remainingCredits,
      icon: BarChart3,
      color: "from-green-50 to-green-100 border-green-200",
      iconColor: "text-green-600",
      textColor: "text-green-800"
    },
    {
      title: "Posts Saved",
      value: stats.postsSaved,
      icon: FileText,
      color: "from-purple-50 to-purple-100 border-purple-200",
      iconColor: "text-purple-600",
      textColor: "text-purple-800"
    },
    {
      title: "Engagement Rate",
      value: stats.engagementRate,
      icon: TrendingUp,
      color: "from-orange-50 to-orange-100 border-orange-200",
      iconColor: "text-orange-600",
      textColor: "text-orange-800"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={`bg-gradient-to-br ${stat.color}`}>
            <CardContent className="p-4 text-center">
              <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.iconColor}`} />
              <div className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</div>
              <div className={`text-sm ${stat.iconColor}`}>{stat.title}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
