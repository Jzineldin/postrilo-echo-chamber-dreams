
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Home } from 'lucide-react';

interface DashboardHeaderProps {
  onTabChange?: (tab: string) => void;
}

export const DashboardHeader = ({ onTabChange }: DashboardHeaderProps) => {
  const handleCreateContent = () => {
    console.log('Navigate to content creation');
    if (onTabChange) {
      onTabChange('create');
    }
  };

  const handleGoHome = () => {
    console.log('Navigate to home');
    if (onTabChange) {
      onTabChange('home');
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoHome}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <Home className="w-4 h-4" />
          Home
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your content and track performance</p>
        </div>
      </div>
      
      <Button 
        className="create-content-button bg-purple-600 hover:bg-purple-700 text-white"
        onClick={handleCreateContent}
      >
        <Wand2 className="w-4 h-4 mr-2" />
        Create Content
      </Button>
    </div>
  );
};
