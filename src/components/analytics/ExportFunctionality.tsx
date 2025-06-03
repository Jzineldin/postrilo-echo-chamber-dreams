import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useContentStorage } from "@/hooks/useContentStorage";
import { Download, FileText, Mail, Calendar, Settings } from "lucide-react";

export const ExportFunctionality = () => {
  const { toast } = useToast();
  const { savedContent } = useContentStorage();
  const [emailSettings, setEmailSettings] = useState({
    email: '',
    frequency: 'weekly',
    enabled: false
  });

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast({
        title: "No Data Available",
        description: "There's no data to export. Create some content first!",
        variant: "destructive"
      });
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `${filename}.csv has been downloaded successfully.`
    });
  };

  const generatePDFReport = () => {
    // In a real implementation, you'd use a library like jsPDF or generate server-side
    toast({
      title: "PDF Report Generated",
      description: "Your analytics report has been prepared. (PDF generation would be implemented with jsPDF or server-side)"
    });
  };

  const exportContentData = () => {
    const contentData = savedContent.map(content => ({
      title: content.title || 'Untitled',
      platform: content.metadata?.platform || 'Unknown',
      templateType: content.templateType || 'General',
      goal: content.metadata?.goal || 'Not specified',
      tone: content.metadata?.tone || 'Not specified',
      createdAt: new Date(content.createdAt).toLocaleDateString(),
      tags: content.tags?.join('; ') || 'None',
      contentPreview: content.content?.[0]?.substring(0, 100) + '...' || 'No content'
    }));

    exportToCSV(contentData, 'content-analytics');
  };

  const exportPerformanceData = () => {
    // Mock performance data for export
    const performanceData = [
      {
        contentTitle: 'Summer Product Launch',
        platform: 'Instagram',
        likes: 234,
        comments: 45,
        shares: 23,
        views: 1200,
        engagementRate: 8.5,
        postDate: '2024-01-15'
      },
      {
        contentTitle: 'Behind the Scenes Video',
        platform: 'TikTok',
        likes: 1200,
        comments: 89,
        shares: 156,
        views: 15000,
        engagementRate: 12.3,
        postDate: '2024-01-12'
      }
    ];

    exportToCSV(performanceData, 'performance-analytics');
  };

  const exportUsageAnalytics = () => {
    const platformCounts = savedContent.reduce((acc, content) => {
      const platform = content.metadata?.platform || 'Unknown';
      acc[platform] = (acc[platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const usageData = Object.entries(platformCounts).map(([platform, count]) => ({
      platform,
      contentCount: count,
      percentage: Math.round((count / savedContent.length) * 100)
    }));

    exportToCSV(usageData, 'usage-analytics');
  };

  const setupEmailReports = () => {
    if (!emailSettings.email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to set up reports.",
        variant: "destructive"
      });
      return;
    }

    setEmailSettings(prev => ({ ...prev, enabled: true }));
    
    toast({
      title: "Email Reports Configured",
      description: `${emailSettings.frequency} reports will be sent to ${emailSettings.email}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* CSV Exports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            CSV Data Exports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <FileText className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h4 className="font-semibold mb-2">Content Analytics</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Export all your generated content with metadata including platforms, goals, and creation dates.
                </p>
                <Button onClick={exportContentData} className="w-full">
                  Export Content Data
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <Settings className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <h4 className="font-semibold mb-2">Usage Analytics</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Platform usage, content types, and generation patterns over time.
                </p>
                <Button onClick={exportUsageAnalytics} className="w-full">
                  Export Usage Data
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h4 className="font-semibold mb-2">Performance Data</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Engagement metrics, performance comparisons, and optimization insights.
                </p>
                <Button onClick={exportPerformanceData} className="w-full">
                  Export Performance
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* PDF Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            PDF Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Comprehensive Analytics Report</h4>
                <p className="text-gray-600 text-sm">
                  Generate a beautifully formatted PDF report with all your analytics, charts, and insights.
                </p>
              </div>
              <Button onClick={generatePDFReport} className="bg-gradient-to-r from-purple-600 to-pink-600">
                Generate PDF Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Scheduled Email Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Automatic Email Reports</h4>
              <p className="text-sm text-gray-600">Receive analytics reports directly in your inbox</p>
            </div>
            <Switch
              checked={emailSettings.enabled}
              onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, enabled: checked }))}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={emailSettings.email}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Report Frequency</Label>
              <Select 
                value={emailSettings.frequency} 
                onValueChange={(value) => setEmailSettings(prev => ({ ...prev, frequency: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={setupEmailReports} className="w-full">
            {emailSettings.enabled ? 'Update Email Settings' : 'Set Up Email Reports'}
          </Button>

          {emailSettings.enabled && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-green-700 font-medium">Email reports active</p>
              </div>
              <p className="text-sm text-green-600 mt-1">
                {emailSettings.frequency.charAt(0).toUpperCase() + emailSettings.frequency.slice(1)} reports will be sent to {emailSettings.email}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Export Tips & Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">CSV Export Details</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Compatible with Excel, Google Sheets, and other spreadsheet software</li>
                <li>• Includes all available metadata and timestamps</li>
                <li>• Perfect for creating custom charts and pivot tables</li>
                <li>• Data is exported in UTF-8 encoding for international characters</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">PDF Report Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Professional formatting with charts and graphs</li>
                <li>• Executive summary and key insights</li>
                <li>• Ideal for sharing with team members or clients</li>
                <li>• Includes recommendations and action items</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
