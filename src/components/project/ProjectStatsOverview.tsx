
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Target, Users } from "lucide-react";

export const ProjectStatsOverview = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600">Active Projects</p>
              <p className="text-xl font-semibold text-blue-900">3</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-green-600">Completed Tasks</p>
              <p className="text-xl font-semibold text-green-900">36</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-sm text-orange-600">In Review</p>
              <p className="text-xl font-semibold text-orange-900">1</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600">Platforms</p>
              <p className="text-xl font-semibold text-purple-900">6</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
