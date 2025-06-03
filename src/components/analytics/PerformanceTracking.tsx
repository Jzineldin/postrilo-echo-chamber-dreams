
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Plus, Edit, TrendingUp, Calendar, Clock } from "lucide-react";

interface PerformanceMetric {
  id: string;
  contentId: string;
  contentTitle: string;
  platform: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  clickThroughRate: number;
  engagementRate: number;
  postDate: string;
  timeOfDay: string;
}

export const PerformanceTracking = () => {
  const { toast } = useToast();
  const [performanceData, setPerformanceData] = useState<PerformanceMetric[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    contentTitle: '',
    platform: '',
    likes: '',
    comments: '',
    shares: '',
    views: '',
    postDate: '',
    timeOfDay: ''
  });

  // Load mock performance data on component mount
  useEffect(() => {
    const mockData: PerformanceMetric[] = [
      {
        id: '1',
        contentId: 'content-1',
        contentTitle: 'Summer Product Launch',
        platform: 'Instagram',
        likes: 234,
        comments: 45,
        shares: 23,
        views: 1200,
        clickThroughRate: 3.2,
        engagementRate: 8.5,
        postDate: '2024-01-15',
        timeOfDay: '10:00'
      },
      {
        id: '2',
        contentId: 'content-2',
        contentTitle: 'Behind the Scenes Video',
        platform: 'TikTok',
        likes: 1200,
        comments: 89,
        shares: 156,
        views: 15000,
        clickThroughRate: 2.8,
        engagementRate: 12.3,
        postDate: '2024-01-12',
        timeOfDay: '18:30'
      },
      {
        id: '3',
        contentId: 'content-3',
        contentTitle: 'Industry Insights Post',
        platform: 'LinkedIn',
        likes: 89,
        comments: 34,
        shares: 67,
        views: 2300,
        clickThroughRate: 4.1,
        engagementRate: 6.7,
        postDate: '2024-01-10',
        timeOfDay: '09:15'
      }
    ];
    setPerformanceData(mockData);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMetric: PerformanceMetric = {
      id: Date.now().toString(),
      contentId: `content-${Date.now()}`,
      contentTitle: formData.contentTitle,
      platform: formData.platform,
      likes: parseInt(formData.likes) || 0,
      comments: parseInt(formData.comments) || 0,
      shares: parseInt(formData.shares) || 0,
      views: parseInt(formData.views) || 0,
      clickThroughRate: 0, // Will be calculated
      engagementRate: 0, // Will be calculated
      postDate: formData.postDate,
      timeOfDay: formData.timeOfDay
    };

    // Calculate engagement rate
    const totalEngagements = newMetric.likes + newMetric.comments + newMetric.shares;
    newMetric.engagementRate = newMetric.views > 0 ? (totalEngagements / newMetric.views) * 100 : 0;
    newMetric.clickThroughRate = Math.random() * 5; // Mock CTR

    setPerformanceData(prev => [...prev, newMetric]);
    setFormData({
      contentTitle: '',
      platform: '',
      likes: '',
      comments: '',
      shares: '',
      views: '',
      postDate: '',
      timeOfDay: ''
    });
    setShowAddForm(false);

    toast({
      title: "Metrics Added",
      description: "Performance metrics have been successfully recorded."
    });
  };

  // Calculate analytics data
  const platformComparison = performanceData.reduce((acc, metric) => {
    const existing = acc.find(item => item.platform === metric.platform);
    if (existing) {
      existing.totalEngagement += metric.likes + metric.comments + metric.shares;
      existing.avgEngagementRate = (existing.avgEngagementRate + metric.engagementRate) / 2;
      existing.count += 1;
    } else {
      acc.push({
        platform: metric.platform,
        totalEngagement: metric.likes + metric.comments + metric.shares,
        avgEngagementRate: metric.engagementRate,
        count: 1
      });
    }
    return acc;
  }, [] as any[]);

  // Best performing times
  const timeAnalysis = performanceData.reduce((acc, metric) => {
    const hour = parseInt(metric.timeOfDay.split(':')[0]);
    const timeSlot = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
    
    const existing = acc.find(item => item.timeSlot === timeSlot);
    if (existing) {
      existing.avgEngagement = (existing.avgEngagement + metric.engagementRate) / 2;
      existing.count += 1;
    } else {
      acc.push({
        timeSlot,
        avgEngagement: metric.engagementRate,
        count: 1
      });
    }
    return acc;
  }, [] as any[]);

  return (
    <div className="space-y-6">
      {/* Add Performance Metrics Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Tracking
            </CardTitle>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Metrics
            </Button>
          </div>
        </CardHeader>
        
        {showAddForm && (
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Content Title</Label>
                  <Input
                    value={formData.contentTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, contentTitle: e.target.value }))}
                    placeholder="Enter content title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={formData.platform} onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Likes</Label>
                  <Input
                    type="number"
                    value={formData.likes}
                    onChange={(e) => setFormData(prev => ({ ...prev, likes: e.target.value }))}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Comments</Label>
                  <Input
                    type="number"
                    value={formData.comments}
                    onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Shares</Label>
                  <Input
                    type="number"
                    value={formData.shares}
                    onChange={(e) => setFormData(prev => ({ ...prev, shares: e.target.value }))}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Views</Label>
                  <Input
                    type="number"
                    value={formData.views}
                    onChange={(e) => setFormData(prev => ({ ...prev, views: e.target.value }))}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Post Date</Label>
                  <Input
                    type="date"
                    value={formData.postDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, postDate: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time of Day</Label>
                  <Input
                    type="time"
                    value={formData.timeOfDay}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeOfDay: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Add Metrics</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Performance Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {performanceData.length > 0 ? 
                  (performanceData.reduce((sum, metric) => sum + metric.engagementRate, 0) / performanceData.length).toFixed(1)
                  : '0'
                }%
              </p>
              <p className="text-sm text-gray-600">Avg Engagement Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {performanceData.reduce((sum, metric) => sum + metric.views, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Views</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {performanceData.reduce((sum, metric) => sum + metric.likes + metric.comments + metric.shares, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Interactions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          {platformComparison.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgEngagementRate" fill="#8884D8" name="Avg Engagement Rate %" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-gray-500">
              Add performance metrics to see platform comparison
            </div>
          )}
        </CardContent>
      </Card>

      {/* Best Performing Times */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Best Performing Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          {timeAnalysis.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {timeAnalysis.map((slot, index) => (
                <div key={slot.timeSlot} className="bg-gray-50 rounded-lg p-4 text-center">
                  <h4 className="font-semibold">{slot.timeSlot}</h4>
                  <p className="text-2xl font-bold text-purple-600">{slot.avgEngagement.toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Avg Engagement</p>
                  <Badge variant="outline" className="mt-2">{slot.count} posts</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-200 flex items-center justify-center text-gray-500">
              Add performance metrics to see timing analysis
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Performance Data */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Performance Data</CardTitle>
        </CardHeader>
        <CardContent>
          {performanceData.length > 0 ? (
            <div className="space-y-4">
              {performanceData.slice(0, 5).map((metric) => (
                <div key={metric.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{metric.contentTitle}</h4>
                    <Badge variant="secondary">{metric.platform}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Engagement Rate</p>
                      <p className="font-semibold">{metric.engagementRate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Views</p>
                      <p className="font-semibold">{metric.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Likes</p>
                      <p className="font-semibold">{metric.likes}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Comments</p>
                      <p className="font-semibold">{metric.comments}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Shares</p>
                      <p className="font-semibold">{metric.shares}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No performance data available. Add metrics to start tracking performance.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
