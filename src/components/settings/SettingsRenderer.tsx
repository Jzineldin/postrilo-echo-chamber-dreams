
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccountSettings } from './AccountSettings';
import { BillingSettings } from './BillingSettings';
import { BrandVoiceSettings } from './BrandVoiceSettings';
import { ContentSettings } from './ContentSettings';
import { NotificationSettings } from './NotificationSettings';
import { PrivacySecuritySettings } from './PrivacySecuritySettings';
import { AppearanceSettings } from './AppearanceSettings';

interface SettingsRendererProps {
  activeSection: string;
}

export const SettingsRenderer = ({ activeSection }: SettingsRendererProps) => {
  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'profile':
      case 'account-details':
        return <AccountSettings />;
      case 'subscription':
      case 'upgrade':
        return <BillingSettings />;
      case 'brand-voice':
      case 'content-preferences':
        return <BrandVoiceSettings />;
      case 'content':
        return <ContentSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySecuritySettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'export':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">Export your content and settings data.</p>
                <div className="space-y-3">
                  <Button className="w-full">Export All Content</Button>
                  <Button variant="outline" className="w-full">Export Settings</Button>
                  <Button variant="outline" className="w-full">Export Analytics Data</Button>
                </div>
                <p className="text-sm text-gray-500">
                  Your data will be exported in JSON format and downloaded to your device.
                </p>
              </div>
            </CardContent>
          </Card>
        );
      case 'profile-photo':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Update Profile Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <Button>Choose New Photo</Button>
                <p className="text-sm text-gray-600">
                  Upload a new profile photo. Recommended size: 400x400px
                </p>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">This settings section is coming soon!</p>
            </CardContent>
          </Card>
        );
    }
  };

  return renderSettingsContent();
};
