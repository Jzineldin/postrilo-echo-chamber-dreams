import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Eye, MoreHorizontal, Edit } from 'lucide-react';

interface RecentContentProps {
  isMobile: boolean;
  onTabChange?: (tab: string) => void;
}

export const RecentContent = ({ isMobile, onTabChange }: RecentContentProps) => {
  const recentContent = [
    {
      id: 1,
      title: "5 Tips for Better Social Media Engagement",
      platform: "LinkedIn",
      type: "Post",
      createdAt: "2 hours ago",
      status: "Published",
      engagement: 45
    },
    {
      id: 2,
      title: "Behind the Scenes: Our Daily Workflow",
      platform: "Instagram",
      type: "Story",
      createdAt: "1 day ago",
      status: "Scheduled",
      engagement: 0
    },
    {
      id: 3,
      title: "Quick Tutorial: Content Creation Tips",
      platform: "TikTok",
      type: "Video",
      createdAt: "3 days ago",
      status: "Draft",
      engagement: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-700';
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      case 'Draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return 'bg-blue-50 text-blue-700';
      case 'Instagram': return 'bg-pink-50 text-pink-700';
      case 'TikTok': return 'bg-purple-50 text-purple-700';
      case 'Twitter': return 'bg-sky-50 text-sky-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const handleViewAll = () => {
    console.log('Navigate to content library');
    if (onTabChange) {
      onTabChange('library');
    } else {
      // For now, keep them on dashboard since library doesn't exist yet
      window.location.hash = 'dashboard';
    }
  };

  const handleContentClick = (contentId: number) => {
    console.log('Edit content:', contentId);
    // For now, navigate to content creation
    if (onTabChange) {
      onTabChange('create');
    } else {
      window.location.hash = 'create';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Recent Content</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs" onClick={handleViewAll}>
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {recentContent.map((content) => (
            <div 
              key={content.id} 
              className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleContentClick(content.id)}
            >
              <div className="flex-shrink-0">
                <FileText className="h-4 w-4 text-gray-600 mt-1" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {content.title}
                </h4>
                
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={`text-xs ${getPlatformColor(content.platform)}`}>
                    {content.platform}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(content.status)}`}>
                    {content.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {content.createdAt}
                  </div>
                  {content.engagement > 0 && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {content.engagement} interactions
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleContentClick(content.id);
                }}
              >
                <Edit className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
