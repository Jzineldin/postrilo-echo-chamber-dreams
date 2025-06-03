
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DistributionData {
  goal?: string;
  tone?: string;
  count: number;
  percentage: number;
}

interface ContentDistributionStatsProps {
  goalDistribution: DistributionData[];
  toneDistribution: DistributionData[];
}

const COLORS = ['#8884D8', '#82CA9D', '#FFC658', '#FF7300', '#00C49F', '#FFBB28'];

export const ContentDistributionStats = ({ goalDistribution, toneDistribution }: ContentDistributionStatsProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Goals Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {goalDistribution.length > 0 ? (
            <div className="space-y-4">
              {goalDistribution.map((goal, index) => (
                <div key={goal.goal} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium">{goal.goal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{goal.count}</span>
                    <span className="text-sm text-gray-500">({goal.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-200 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tone Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {toneDistribution.length > 0 ? (
            <div className="space-y-4">
              {toneDistribution.map((tone, index) => (
                <div key={tone.tone} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium">{tone.tone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{tone.count}</span>
                    <span className="text-sm text-gray-500">({tone.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-200 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
