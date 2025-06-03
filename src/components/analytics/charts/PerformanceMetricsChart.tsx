
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Clock, Zap } from "lucide-react";

interface PerformanceData {
  timestamp: string;
  loadTime: number;
  memoryUsage: number;
  userEngagement: number;
}

interface PerformanceMetricsChartProps {
  data: PerformanceData[];
}

export const PerformanceMetricsChart = ({ data }: PerformanceMetricsChartProps) => {
  const averageLoadTime = data.length > 0 
    ? data.reduce((sum, item) => sum + item.loadTime, 0) / data.length 
    : 0;

  const averageMemory = data.length > 0 
    ? data.reduce((sum, item) => sum + item.memoryUsage, 0) / data.length 
    : 0;

  const averageEngagement = data.length > 0 
    ? data.reduce((sum, item) => sum + item.userEngagement, 0) / data.length 
    : 0;

  return (
    <div className="space-y-4">
      {/* Performance Metrics Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Avg Load Time</p>
                <p className="text-xl font-bold">{averageLoadTime.toFixed(2)}s</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Memory Usage</p>
                <p className="text-xl font-bold">{(averageMemory / 1024 / 1024).toFixed(1)}MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">User Engagement</p>
                <p className="text-xl font-bold">{averageEngagement.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="loadTime" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Load Time (s)"
                />
                <Line 
                  type="monotone" 
                  dataKey="userEngagement" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Engagement (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-gray-500">
              No performance data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
