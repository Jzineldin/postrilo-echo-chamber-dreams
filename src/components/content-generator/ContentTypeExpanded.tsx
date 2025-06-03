
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Video, 
  Image, 
  Zap, 
  Calendar, 
  BookOpen,
  TrendingUp,
  Users
} from "lucide-react";

interface ContentType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'easy' | 'medium' | 'advanced';
  platforms: string[];
  estimatedTime: string;
  engagementPotential: 'low' | 'medium' | 'high' | 'viral';
}

interface ContentTypeExpandedProps {
  selectedPlatforms: string[];
  onContentTypeSelect: (contentType: string) => void;
  selectedContentType?: string;
}

export const ContentTypeExpanded = ({ 
  selectedPlatforms, 
  onContentTypeSelect,
  selectedContentType 
}: ContentTypeExpandedProps) => {
  const contentTypes: ContentType[] = [
    {
      id: 'post',
      name: 'Social Media Post',
      description: 'Single engaging post optimized for your platform',
      icon: MessageSquare,
      difficulty: 'easy',
      platforms: ['twitter', 'instagram', 'facebook', 'linkedin'],
      estimatedTime: '2 min',
      engagementPotential: 'medium'
    },
    {
      id: 'thread',
      name: 'Thread/Series',
      description: 'Multi-part connected posts that tell a story',
      icon: Zap,
      difficulty: 'medium',
      platforms: ['twitter', 'instagram'],
      estimatedTime: '5 min',
      engagementPotential: 'high'
    },
    {
      id: 'carousel',
      name: 'Carousel/Slideshow',
      description: 'Multi-slide visual content with steps or tips',
      icon: Image,
      difficulty: 'medium',
      platforms: ['instagram', 'linkedin'],
      estimatedTime: '7 min',
      engagementPotential: 'high'
    },
    {
      id: 'video-script',
      name: 'Video Script',
      description: 'Engaging scripts for video content creation',
      icon: Video,
      difficulty: 'advanced',
      platforms: ['tiktok', 'youtube', 'instagram'],
      estimatedTime: '10 min',
      engagementPotential: 'viral'
    },
    {
      id: 'story',
      name: 'Story Content',
      description: 'Short-form content for stories and temporary posts',
      icon: Calendar,
      difficulty: 'easy',
      platforms: ['instagram', 'facebook'],
      estimatedTime: '3 min',
      engagementPotential: 'medium'
    },
    {
      id: 'tutorial',
      name: 'Tutorial/How-to',
      description: 'Educational content that teaches something valuable',
      icon: BookOpen,
      difficulty: 'medium',
      platforms: ['youtube', 'instagram', 'linkedin', 'tiktok'],
      estimatedTime: '8 min',
      engagementPotential: 'high'
    },
    {
      id: 'viral-hook',
      name: 'Viral Hook',
      description: 'Attention-grabbing content designed to go viral',
      icon: TrendingUp,
      difficulty: 'advanced',
      platforms: ['tiktok', 'twitter', 'instagram'],
      estimatedTime: '5 min',
      engagementPotential: 'viral'
    },
    {
      id: 'community',
      name: 'Community Post',
      description: 'Interactive content that builds community engagement',
      icon: Users,
      difficulty: 'easy',
      platforms: ['facebook', 'linkedin', 'instagram'],
      estimatedTime: '4 min',
      engagementPotential: 'high'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEngagementColor = (potential: string) => {
    switch (potential) {
      case 'low': return 'bg-gray-100 text-gray-600';
      case 'medium': return 'bg-blue-100 text-blue-600';
      case 'high': return 'bg-purple-100 text-purple-600';
      case 'viral': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredContentTypes = selectedPlatforms.length > 0
    ? contentTypes.filter(type => 
        type.platforms.some(platform => selectedPlatforms.includes(platform))
      )
    : contentTypes;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Types</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {filteredContentTypes.map(type => {
            const Icon = type.icon;
            const isSelected = selectedContentType === type.id;
            
            return (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => onContentTypeSelect(type.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-gray-600" />
                      <div>
                        <h3 className="font-semibold">{type.name}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                        <div className="mt-2 flex gap-2 flex-wrap">
                          <Badge className={getDifficultyColor(type.difficulty)}>
                            {type.difficulty}
                          </Badge>
                          <Badge className={getEngagementColor(type.engagementPotential)}>
                            {type.engagementPotential} engagement
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            ~{type.estimatedTime}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={isSelected ? "default" : "outline"}
                    >
                      {isSelected ? "Selected" : "Select"}
                    </Button>
                  </div>
                  <div className="mt-3">
                    <div className="flex gap-1 flex-wrap">
                      {type.platforms.map(platform => (
                        <Badge 
                          key={platform} 
                          variant="secondary" 
                          className={`text-xs ${
                            selectedPlatforms.includes(platform) 
                              ? 'bg-blue-100 text-blue-700' 
                              : ''
                          }`}
                        >
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
