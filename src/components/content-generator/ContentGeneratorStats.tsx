
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, Calendar, TrendingUp } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";

interface ContentGeneratorStatsProps {
  postsRemaining: number;
  monthlyPostsLimit: number;
  currentPlanName: string;
  canGenerateMore: boolean;
}

export const ContentGeneratorStats = ({
  postsRemaining,
  monthlyPostsLimit,
  currentPlanName,
  canGenerateMore
}: ContentGeneratorStatsProps) => {
  const { postsUsedThisMonth } = useSubscription();

  // Calculate derived values
  const usagePercentage = monthlyPostsLimit > 0 ? ((monthlyPostsLimit - postsRemaining) / monthlyPostsLimit) * 100 : 0;
  const daysUntilReset = 30 - new Date().getDate(); // Simple calculation for demo
  const usageDisplay = `${monthlyPostsLimit - postsRemaining}/${monthlyPostsLimit} posts used`;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Usage Stats */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Content Generation</h3>
              <Badge variant={canGenerateMore ? "default" : "destructive"}>
                {currentPlanName}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{usageDisplay}</span>
                <span className="font-medium text-gray-900">
                  {monthlyPostsLimit - postsRemaining}/{monthlyPostsLimit} used
                </span>
              </div>
              <Progress 
                value={usagePercentage} 
                className="h-2"
                // @ts-ignore - Progress component accepts className
                indicatorClassName={
                  usagePercentage >= 90 ? "bg-red-500" : 
                  usagePercentage >= 70 ? "bg-yellow-500" : 
                  "bg-blue-500"
                }
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-6 lg:gap-8">
            <div className="text-center">
              <div className="flex items-center gap-1 text-2xl font-bold text-blue-600">
                <TrendingUp className="w-5 h-5" />
                {postsRemaining}
              </div>
              <p className="text-xs text-gray-600">Posts Left</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center gap-1 text-2xl font-bold text-purple-600">
                <Calendar className="w-5 h-5" />
                {daysUntilReset}
              </div>
              <p className="text-xs text-gray-600">Days to Reset</p>
            </div>
          </div>
        </div>

        {/* Warning for low usage */}
        {!canGenerateMore && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              <strong>Limit Reached:</strong> You've used all your monthly posts. 
              Upgrade your plan or wait {daysUntilReset} days for your limit to reset.
            </p>
          </div>
        )}
        
        {postsRemaining <= 2 && canGenerateMore && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700">
              <strong>Almost at limit:</strong> Only {postsRemaining} posts remaining this month.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
