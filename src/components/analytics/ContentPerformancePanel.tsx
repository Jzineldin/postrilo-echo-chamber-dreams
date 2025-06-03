
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContentStorage } from "@/hooks/useContentStorage";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Target, Globe, Calendar, Download } from "lucide-react";

export const ContentPerformancePanel = () => {
  const { savedContent } = useContentStorage();
  const [performanceData, setPerformanceData] = useState({
    platformPerformance: [] as any[],
    languagePerformance: [] as any[],
    contentTypePerformance: [] as any[],
    engagementTrends: [] as any[]
  });

  useEffect(() => {
    // Calculate performance metrics from saved content
    const calculateMetrics = () => {
      if (savedContent.length === 0) return;

      // Platform performance (mock engagement data)
      const platformCounts = savedContent.reduce((acc, content) => {
        const platform = content.metadata?.platform || 'Unknown';
        if (!acc[platform]) {
          acc[platform] = { count: 0, totalEngagement: 0 };
        }
        acc[platform].count += 1;
        // Mock engagement based on platform characteristics
        acc[platform].totalEngagement += platform === 'instagram' ? 85 : 
                                        platform === 'linkedin' ? 70 :
                                        platform === 'tiktok' ? 95 : 65;
        return acc;
      }, {} as Record<string, any>);

      const platformPerformance = Object.entries(platformCounts).map(([platform, data]) => ({
        platform: platform.charAt(0).toUpperCase() + platform.slice(1),
        count: data.count,
        avgEngagement: Math.round(data.totalEngagement / data.count),
        reach: data.count * (platform === 'tiktok' ? 1200 : platform === 'instagram' ? 800 : 600)
      }));

      // Language performance
      const languageCounts = savedContent.reduce((acc, content) => {
        const language = content.metadata?.language || 'en';
        if (!acc[language]) {
          acc[language] = { count: 0, engagement: 0 };
        }
        acc[language].count += 1;
        acc[language].engagement += language === 'sv' ? 78 : 
                                   language === 'no' ? 82 :
                                   language === 'da' ? 75 : 
                                   language === 'fi' ? 70 : 65;
        return acc;
      }, {} as Record<string, any>);

      const languagePerformance = Object.entries(languageCounts).map(([lang, data]) => ({
        language: lang.toUpperCase(),
        count: data.count,
        avgEngagement: Math.round(data.engagement / data.count)
      }));

      // Content type performance
      const typeCounts = savedContent.reduce((acc, content) => {
        const type = content.metadata?.contentType || 'post';
        if (!acc[type]) {
          acc[type] = { count: 0, performance: 0 };
        }
        acc[type].count += 1;
        acc[type].performance += type === 'video-script' ? 90 : 75;
        return acc;
      }, {} as Record<string, any>);

      const contentTypePerformance = Object.entries(typeCounts).map(([type, data]) => ({
        type: type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        count: data.count,
        avgPerformance: Math.round(data.performance / data.count)
      }));

      // Engagement trends (last 7 days mock data)
      const engagementTrends = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        engagement: 60 + Math.random() * 30,
        reach: 800 + Math.random() * 400,
        clicks: 20 + Math.random() * 15
      }));

      setPerformanceData({
        platformPerformance,
        languagePerformance,
        contentTypePerformance,
        engagementTrends
      });
    };

    calculateMetrics();
  }, [savedContent]);

  const exportData = () => {
    const exportData = {
      generatedAt: new Date().toISOString(),
      totalContent: savedContent.length,
      ...performanceData
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-analytics-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Performance Analytics</h2>
          <p className="text-gray-600">Track engagement and performance across platforms and languages</p>
        </div>
        <Button onClick={exportData} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Avg Engagement</p>
                    <p className="text-2xl font-bold">
                      {performanceData.platformPerformance.length > 0 
                        ? Math.round(performanceData.platformPerformance.reduce((sum, p) => sum + p.avgEngagement, 0) / performanceData.platformPerformance.length)
                        : 0}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Total Reach</p>
                    <p className="text-2xl font-bold">
                      {performanceData.platformPerformance.reduce((sum, p) => sum + p.reach, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Languages</p>
                    <p className="text-2xl font-bold">{performanceData.languagePerformance.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">This Week</p>
                    <p className="text-2xl font-bold">
                      {savedContent.filter(c => {
                        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                        return new Date(c.createdAt) > weekAgo;
                      }).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Type Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Content Type</CardTitle>
            </CardHeader>
            <CardContent>
              {performanceData.contentTypePerformance.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData.contentTypePerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgPerformance" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-300 flex items-center justify-center text-gray-500">
                  No performance data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              {performanceData.platformPerformance.length > 0 ? (
                <div className="space-y-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData.platformPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="platform" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avgEngagement" fill="#00C49F" name="Avg Engagement %" />
                    </BarChart>
                  </ResponsiveContainer>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {performanceData.platformPerformance.map((platform, index) => (
                      <Card key={platform.platform}>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{platform.platform}</h4>
                              <Badge variant="outline">{platform.count} posts</Badge>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p>Engagement: {platform.avgEngagement}%</p>
                              <p>Reach: {platform.reach.toLocaleString()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-300 flex items-center justify-center text-gray-500">
                  No platform data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="languages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Language</CardTitle>
            </CardHeader>
            <CardContent>
              {performanceData.languagePerformance.length > 0 ? (
                <div className="grid lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={performanceData.languagePerformance}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ language, count }) => `${language} (${count})`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {performanceData.languagePerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="space-y-3">
                    {performanceData.languagePerformance.map((lang, index) => (
                      <div key={lang.language} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-medium">{lang.language}</span>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-medium">{lang.avgEngagement}% engagement</p>
                          <p className="text-gray-500">{lang.count} posts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-300 flex items-center justify-center text-gray-500">
                  No language data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData.engagementTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="engagement" stroke="#0088FE" strokeWidth={2} name="Engagement %" />
                  <Line type="monotone" dataKey="reach" stroke="#00C49F" strokeWidth={2} name="Reach" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
