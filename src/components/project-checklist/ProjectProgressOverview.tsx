
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProjectProgressOverviewProps {
  completedTasks: number;
  totalTasks: number;
  completionPercentage: number;
}

export const ProjectProgressOverview = ({ 
  completedTasks, 
  totalTasks, 
  completionPercentage 
}: ProjectProgressOverviewProps) => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-blue-900">Overall Progress</h3>
            <span className="text-2xl font-bold text-blue-900">{Math.round(completionPercentage)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
          <div className="flex justify-between text-sm text-blue-700">
            <span>{completedTasks} of {totalTasks} tasks completed</span>
            <span>{totalTasks - completedTasks} remaining</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
