import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, TrendingUp, Zap } from "lucide-react";

interface ExpandedTemplateGalleryProps {
  onTryTemplate: (template: any) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ExpandedTemplateGallery = ({ 
  onTryTemplate, 
  selectedCategory, 
  onCategoryChange 
}: ExpandedTemplateGalleryProps) => {
  
  const templates = [
    {
      id: "product-launch",
      name: "Product Launch Announcement",
      category: "marketing",
      description: "Create buzz around your new product launch with engaging copy",
      platforms: ["Instagram", "LinkedIn", "Twitter"],
      rating: 4.8,
      uses: 1250,
      features: ["Hook generation", "Feature highlights", "CTA optimization"],
      preview: "🚀 Introducing our game-changing new product! After months of development..."
    },
    {
      id: "educational-content",
      name: "Educational Tutorial",
      category: "education",
      description: "Break down complex topics into digestible, engaging content",
      platforms: ["LinkedIn", "Instagram", "YouTube"],
      rating: 4.9,
      uses: 890,
      features: ["Step-by-step format", "Visual cues", "Knowledge retention"],
      preview: "Today, let's dive into the fundamentals of... Here's what you'll learn:"
    },
    {
      id: "behind-scenes",
      name: "Behind the Scenes",
      category: "personal",
      description: "Share authentic moments that build connection with your audience",
      platforms: ["Instagram", "TikTok", "LinkedIn"],
      rating: 4.7,
      uses: 2100,
      features: ["Authenticity focus", "Story structure", "Engagement hooks"],
      preview: "Here's what really happened behind the scenes today..."
    }
  ];

  const categories = [
    { id: "all", name: "All Templates", icon: Zap },
    { id: "marketing", name: "Marketing", icon: TrendingUp },
    { id: "education", name: "Education", icon: Users },
    { id: "personal", name: "Personal Brand", icon: Star }
  ];

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className="flex items-center gap-2"
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{template.rating}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Platform badges */}
              <div className="flex flex-wrap gap-1">
                {template.platforms.map((platform) => (
                  <Badge key={platform} variant="secondary" className="text-xs">
                    {platform}
                  </Badge>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 italic">"{template.preview}"</p>
              </div>

              {/* Stats and CTA */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {template.uses.toLocaleString()} uses
                  </span>
                </div>
                <Button 
                  onClick={() => onTryTemplate(template)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Try Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
