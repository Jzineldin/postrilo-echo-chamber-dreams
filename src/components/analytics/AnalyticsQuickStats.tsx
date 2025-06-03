
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Calendar, Users, TrendingUp } from "lucide-react";

interface AnalyticsQuickStatsProps {
  dashboardData: {
    totalGenerated: number;
    thisMonth: number;
    topPlatform: string;
    avgEngagement: number;
  };
}

export const AnalyticsQuickStats = ({ dashboardData }: AnalyticsQuickStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Generated</p>
              <p className="text-xl font-bold text-gray-900">{dashboardData.totalGenerated}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-xl font-bold text-gray-900">{dashboardData.thisMonth}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Top Platform</p>
              <p className="text-xl font-bold text-gray-900">{dashboardData.topPlatform}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Engagement</p>
              <p className="text-xl font-bold text-gray-900">{dashboardData.avgEngagement}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
