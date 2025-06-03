
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  BarChart3, 
  Zap,
  Crown,
  TrendingUp,
  AlertCircle
} from "lucide-react";

interface StatsGridProps {
  user: any;
  isMobile: boolean;
}

export const StatsGrid = ({ user, isMobile }: StatsGridProps) => {
  // Safely access user data with fallbacks
  const subscription = user?.subscription || "free";
  const contentGenerated = user?.contentGenerated || 24;
  const remainingCredits = subscription === "free" ? Math.max(0, 10 - contentGenerated) : "∞";
  
  const stats = [
    {
      title: "Content Generated",
      value: contentGenerated.toString(),
      limit: subscription === "free" ? `/ 10 this month` : "Unlimited",
      icon: FileText,
      color: "text-blue-600",
      alert: subscription === "free" && contentGenerated >= 8
    },
    {
      title: "Remaining Credits",
      value: remainingCredits.toString(),
      change: subscription === "free" ? "Resets monthly" : "Unlimited",
      icon: Zap,
      color: "text-purple-600",
      alert: subscription === "free" && contentGenerated >= 8
    },
    {
      title: "Posts Saved",
      value: user?.savedPosts?.toString() || "18",
      change: "In your library",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Engagement Rate",
      value: user?.engagementRate || "8.5%",
      change: "+2.3%",
      icon: TrendingUp,
      color: "text-pink-600"
    }
  ];

  return (
    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'} gap-${isMobile ? '4' : '6'}`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-white/60 backdrop-blur-sm border-white/20 relative overflow-hidden">
            {stat.alert && (
              <div className="absolute top-2 right-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
              </div>
            )}
            <CardContent className={`p-${isMobile ? '4' : '6'}`}>
              {isMobile ? (
                <div className="text-center">
                  <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <p className="text-xs text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  {stat.limit && (
                    <p className="text-xs text-gray-500">{stat.limit}</p>
                  )}
                  {stat.change && (
                    <p className={`text-xs ${stat.alert ? 'text-amber-600' : 'text-green-600'}`}>
                      {stat.change}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      {stat.limit && (
                        <p className="text-sm text-gray-500">{stat.limit}</p>
                      )}
                      {stat.change && (
                        <p className={`text-sm ${stat.alert ? 'text-amber-600' : 'text-green-600'}`}>
                          {stat.change}
                        </p>
                      )}
                    </div>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
