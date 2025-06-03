
import { Badge } from "@/components/ui/badge";
import { BarChart3, Crown } from "lucide-react";

export const AnalyticsHeader = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-2">
        <BarChart3 className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Crown className="w-3 h-3 mr-1" />
          Premium
        </Badge>
      </div>
      <p className="text-gray-600">Deep insights into your content performance and optimization opportunities</p>
    </div>
  );
};
