
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, BookOpen, Settings, TrendingUp, Users, Calendar } from "lucide-react";

interface DashboardCardsProps {
  isMobile: boolean;
  onTabChange?: (tab: string) => void;
}

export const DashboardCards = ({ isMobile, onTabChange }: DashboardCardsProps) => {
  const handleCreateContent = () => {
    console.log('Navigate to content creation');
    if (onTabChange) {
      onTabChange('create');
    } else {
      // Fallback to hash navigation
      window.location.hash = 'create';
    }
  };

  const handleViewLibrary = () => {
    console.log('Navigate to content library');
    if (onTabChange) {
      onTabChange('library');
    } else {
      // Fallback to hash navigation - for now go to dashboard since library doesn't exist yet
      window.location.hash = 'dashboard';
    }
  };

  const handleSettings = () => {
    console.log('Navigate to settings');
    if (onTabChange) {
      onTabChange('settings');
    } else {
      // Fallback to hash navigation
      window.location.hash = 'settings';
    }
  };

  const handleContentCalendar = () => {
    console.log('Navigate to content calendar/scheduler');
    if (onTabChange) {
      onTabChange('scheduler');
    } else {
      // Fallback to hash navigation
      window.location.hash = 'scheduler';
    }
  };

  return (
    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
      {/* Welcome Card */}
      <Card className="dashboard-welcome bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
        <CardHeader>
          <CardTitle className="text-xl">Welcome to Postrilo! 🚀</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Ready to create amazing content with AI assistance?</p>
          <Button 
            className="create-content-button bg-white text-purple-600 hover:bg-gray-100 font-semibold"
            onClick={handleCreateContent}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Create Content
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Posts Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">0</div>
              <div className="text-sm text-gray-600">Templates Used</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Library */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Content Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">
            Access all your created content and templates
          </p>
          <Button 
            variant="outline" 
            className="content-library-link w-full"
            onClick={handleViewLibrary}
          >
            View Library
          </Button>
        </CardContent>
      </Card>

      {/* Community & Settings */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-600" />
            Community & Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="ghost" 
            className="settings-link w-full justify-start text-sm"
            onClick={handleSettings}
          >
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sm"
            onClick={handleContentCalendar}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Content Calendar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
