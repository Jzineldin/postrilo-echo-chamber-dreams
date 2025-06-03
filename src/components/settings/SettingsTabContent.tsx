
import React from 'react';
import { Settings, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SettingsTabContentProps {
  onNavigateToSection: (section: string) => void;
}

export const SettingsTabContent = ({ onNavigateToSection }: SettingsTabContentProps) => {
  return (
    <>
      <div className="text-center py-6">
        <Settings className="w-12 h-12 mx-auto text-gray-400 mb-2" />
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-gray-600">Manage your account, email, and password</p>
        <Button className="mt-4" onClick={() => onNavigateToSection('account-details')}>
          Edit Account Details
        </Button>
      </div>
    </>
  );
};

export const PreferencesTabContent = ({ onNavigateToSection }: SettingsTabContentProps) => {
  return (
    <div className="text-center py-6">
      <Palette className="w-12 h-12 mx-auto text-gray-400 mb-2" />
      <h3 className="text-lg font-medium">Preferences</h3>
      <p className="text-gray-600">Customize your content creation experience</p>
      <Button className="mt-4" onClick={() => onNavigateToSection('content-preferences')}>
        Edit Content Preferences
      </Button>
    </div>
  );
};
