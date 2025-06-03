
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MonthData {
  month: string;
  count: number;
}

interface GenerationActivityChartProps {
  contentByMonth: MonthData[];
}

export const GenerationActivityChart = ({ contentByMonth }: GenerationActivityChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generation Activity Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        {contentByMonth.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={contentByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884D8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-300 flex items-center justify-center text-gray-500">
            No data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};
