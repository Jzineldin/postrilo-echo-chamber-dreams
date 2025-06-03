
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Save, RefreshCw } from 'lucide-react';

export const ContentSettingsManager = () => {
  const [settings, setSettings] = useState({
    // Site Settings
    siteName: 'Postrilo',
    siteDescription: 'AI-Powered Content Creation Platform',
    supportEmail: 'support@postrilo.com',
    
    // Feature Flags
    enableVideoTestimonials: true,
    enableLiveActivityFeed: true,
    enableHeatmapTracking: false,
    enableAnalyticsDashboard: true,
    
    // Content Settings
    maxPostsPerMonth: 5,
    enableBrandVoice: true,
    defaultTone: 'Professional',
    enableHashtagSuggestions: true,
    
    // Social Media Settings
    enableInstagramPosting: false,
    enableLinkedInPosting: false,
    enableTwitterPosting: false,
    
    // Analytics Settings
    googleAnalyticsId: '',
    enableConversionTracking: true,
    trackingScript: ''
  });

  const handleSave = () => {
    // Save settings to localStorage or API
    localStorage.setItem('contentSettings', JSON.stringify(settings));
    console.log('Settings saved:', settings);
  };

  const handleReset = () => {
    // Reset to default settings
    const defaultSettings = {
      siteName: 'Postrilo',
      siteDescription: 'AI-Powered Content Creation Platform',
      supportEmail: 'support@postrilo.com',
      enableVideoTestimonials: true,
      enableLiveActivityFeed: true,
      enableHeatmapTracking: false,
      enableAnalyticsDashboard: true,
      maxPostsPerMonth: 5,
      enableBrandVoice: true,
      defaultTone: 'Professional',
      enableHashtagSuggestions: true,
      enableInstagramPosting: false,
      enableLinkedInPosting: false,
      enableTwitterPosting: false,
      googleAnalyticsId: '',
      enableConversionTracking: true,
      trackingScript: ''
    };
    setSettings(defaultSettings);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Content & Site Settings</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Site Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => updateSetting('siteName', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => updateSetting('siteDescription', e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              type="email"
              value={settings.supportEmail}
              onChange={(e) => updateSetting('supportEmail', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Toggles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Video Testimonials</Label>
              <p className="text-sm text-gray-600">Enable video testimonial components</p>
            </div>
            <Switch
              checked={settings.enableVideoTestimonials}
              onCheckedChange={(checked) => updateSetting('enableVideoTestimonials', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Live Activity Feed</Label>
              <p className="text-sm text-gray-600">Show real-time user activity</p>
            </div>
            <Switch
              checked={settings.enableLiveActivityFeed}
              onCheckedChange={(checked) => updateSetting('enableLiveActivityFeed', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Heatmap Tracking</Label>
              <p className="text-sm text-gray-600">Track user click patterns</p>
            </div>
            <Switch
              checked={settings.enableHeatmapTracking}
              onCheckedChange={(checked) => updateSetting('enableHeatmapTracking', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Analytics Dashboard</Label>
              <p className="text-sm text-gray-600">Enable analytics features</p>
            </div>
            <Switch
              checked={settings.enableAnalyticsDashboard}
              onCheckedChange={(checked) => updateSetting('enableAnalyticsDashboard', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="maxPosts">Max Posts Per Month (Free Plan)</Label>
            <Input
              id="maxPosts"
              type="number"
              value={settings.maxPostsPerMonth}
              onChange={(e) => updateSetting('maxPostsPerMonth', parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="defaultTone">Default Content Tone</Label>
            <Input
              id="defaultTone"
              value={settings.defaultTone}
              onChange={(e) => updateSetting('defaultTone', e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Brand Voice Features</Label>
              <p className="text-sm text-gray-600">Enable brand voice customization</p>
            </div>
            <Switch
              checked={settings.enableBrandVoice}
              onCheckedChange={(checked) => updateSetting('enableBrandVoice', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Hashtag Suggestions</Label>
              <p className="text-sm text-gray-600">Show AI-powered hashtag recommendations</p>
            </div>
            <Switch
              checked={settings.enableHashtagSuggestions}
              onCheckedChange={(checked) => updateSetting('enableHashtagSuggestions', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Instagram Posting</Label>
              <p className="text-sm text-gray-600">Enable direct posting to Instagram</p>
            </div>
            <Switch
              checked={settings.enableInstagramPosting}
              onCheckedChange={(checked) => updateSetting('enableInstagramPosting', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>LinkedIn Posting</Label>
              <p className="text-sm text-gray-600">Enable direct posting to LinkedIn</p>
            </div>
            <Switch
              checked={settings.enableLinkedInPosting}
              onCheckedChange={(checked) => updateSetting('enableLinkedInPosting', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Twitter Posting</Label>
              <p className="text-sm text-gray-600">Enable direct posting to Twitter</p>
            </div>
            <Switch
              checked={settings.enableTwitterPosting}
              onCheckedChange={(checked) => updateSetting('enableTwitterPosting', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analytics & Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="gaId">Google Analytics ID</Label>
            <Input
              id="gaId"
              value={settings.googleAnalyticsId}
              onChange={(e) => updateSetting('googleAnalyticsId', e.target.value)}
              placeholder="GA4-XXXXXXXXX-X"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Conversion Tracking</Label>
              <p className="text-sm text-gray-600">Track user conversion events</p>
            </div>
            <Switch
              checked={settings.enableConversionTracking}
              onCheckedChange={(checked) => updateSetting('enableConversionTracking', checked)}
            />
          </div>
          <div>
            <Label htmlFor="trackingScript">Custom Tracking Script</Label>
            <Textarea
              id="trackingScript"
              value={settings.trackingScript}
              onChange={(e) => updateSetting('trackingScript', e.target.value)}
              placeholder="Add custom tracking scripts here"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
