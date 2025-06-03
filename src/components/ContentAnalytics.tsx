
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useContentStorage } from "@/hooks/useContentStorage";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, FileText, Calendar, Tag } from "lucide-react";

export const ContentAnalytics = () => {
  const { savedContent } = useContentStorage();
  const [analytics, setAnalytics] = useState({
    totalContent: 0,
    templateUsage: [] as any[],
    contentByMonth: [] as any[],
    mostUsedTags: [] as any[]
  });

  useEffect(() => {
    if (savedContent.length === 0) return;

    // Template usage analytics
    const templateCounts = savedContent.reduce((acc, content) => {
      acc[content.templateType] = (acc[content.templateType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const templateUsage = Object.entries(templateCounts).map(([template, count]) => ({
      template: template.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      count
    }));

    // Content by month
    const monthCounts = savedContent.reduce((acc, content) => {
      const month = new Date(content.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const contentByMonth = Object.entries(monthCounts)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6); // Last 6 months

    // Most used tags
    const tagCounts = savedContent.reduce((acc, content) => {
      content.tags?.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const mostUsedTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    setAnalytics({
      totalContent: savedContent.length,
      templateUsage,
      contentByMonth,
      mostUsedTags
    });
  }, [savedContent]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Analytics</h2>
        <p className="text-gray-600">Insights into your content creation patterns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Content</p>
                <p className="text-2xl font-bold">{analytics.totalContent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Most Popular</p>
                <p className="text-lg font-semibold">
                  {analytics.templateUsage[0]?.template || 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">
                  {analytics.contentByMonth[analytics.contentByMonth.length - 1]?.count || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Tag className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Unique Tags</p>
                <p className="text-2xl font-bold">{analytics.mostUsedTags.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Template Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Template Usage</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.templateUsage.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.templateUsage}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ template, percent }) => `${template} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analytics.templateUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Creation Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Content Creation Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.contentByMonth.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.contentByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Tags */}
      {analytics.mostUsedTags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Most Used Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analytics.mostUsedTags.map(({ tag, count }) => (
                <Badge key={tag} variant="outline" className="flex items-center gap-1">
                  {tag} <span className="text-xs">({count})</span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
