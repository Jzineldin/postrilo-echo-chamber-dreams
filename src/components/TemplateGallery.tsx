import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TemplateActionButtons } from "@/components/ui/TemplateActionButtons";
import { ArrowRight, Instagram, Twitter, Linkedin, Facebook, Video, FileText, Lightbulb, Rocket, Users, Star } from "lucide-react";
import { TemplateData } from "@/services/templateService";

interface TemplateGalleryProps {
  onGetStarted: () => void;
}

export const TemplateGallery = ({ onGetStarted }: TemplateGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templateCategories = [
    { id: 'all', name: 'All Templates', count: 6 },
    { id: 'social-media', name: 'Social Media', count: 4 },
    { id: 'video', name: 'Video Scripts', count: 1 },
    { id: 'educational', name: 'Educational', count: 1 }
  ];

  const templates: TemplateData[] = [
    {
      id: 'product-launch',
      name: 'Product Launch Announcement',
      category: 'social-media',
      description: 'Create buzz for your new product with platform-optimized launch posts',
      platforms: ['instagram', 'twitter', 'linkedin', 'facebook'],
      variables: ['product_name', 'key_features', 'launch_date', 'call_to_action'],
      exampleContent: {
        instagram: '🚀 Introducing [Product Name] - the game-changer you\'ve been waiting for!\n\n✨ Key Features:\n• [Feature 1]\n• [Feature 2]\n• [Feature 3]\n\nAvailable [Launch Date]. Get ready to transform your [industry]!\n\n#ProductLaunch #Innovation #NewProduct',
        twitter: '🚀 BIG NEWS: [Product Name] is here!\n\n✨ What makes it special:\n• [Feature 1]\n• [Feature 2] \n• [Feature 3]\n\nLaunching [Launch Date] 🗓️\n\n#ProductLaunch #Innovation',
        linkedin: '🚀 Excited to announce the launch of [Product Name]!\n\nAfter months of development, we\'re thrilled to introduce a solution that addresses [key problem]. Here\'s what makes it special:\n\n✨ [Feature 1]\n✨ [Feature 2]\n✨ [Feature 3]\n\nAvailable [Launch Date]. Ready to revolutionize your [industry]?\n\n#ProductLaunch #Innovation #Business'
      },
      icon: '🚀',
      color: 'from-blue-500 to-purple-600',
      popularity: 95,
      rating: 4.8,
      uses: 1250,
      features: ['Hook generation', 'Feature highlights', 'CTA optimization']
    },
    {
      id: 'educational-tutorial',
      name: 'Educational Tutorial',
      category: 'educational',
      description: 'Share knowledge with step-by-step tutorials that engage and educate',
      platforms: ['instagram', 'linkedin', 'youtube'],
      variables: ['topic', 'steps', 'difficulty_level', 'duration'],
      exampleContent: '📚 Tutorial: How to [Topic]\n\nHere\'s a step-by-step guide:\n\n1️⃣ [Step 1]\n2️⃣ [Step 2]\n3️⃣ [Step 3]\n\n💡 Pro tip: [Additional insight]\n\nSave this post for later! 🔖\n\n#Tutorial #Education #HowTo',
      icon: '📚',
      color: 'from-green-500 to-blue-500',
      popularity: 88,
      rating: 4.9,
      uses: 890,
      features: ['Step-by-step format', 'Visual cues', 'Knowledge retention']
    },
    {
      id: 'behind-scenes',
      name: 'Behind the Scenes',
      category: 'social-media',
      description: 'Give your audience an authentic look into your process and culture',
      platforms: ['instagram', 'facebook', 'linkedin'],
      variables: ['activity', 'team_member', 'insight', 'company_value'],
      exampleContent: '👀 Behind the scenes at [Company]\n\nToday, [Team Member] is [Activity]. Here\'s what most people don\'t see:\n\n[Insight about the process]\n\nThis is why we believe in [Company Value] ❤️\n\n#BehindTheScenes #TeamWork #Authentic',
      icon: '🎬',
      color: 'from-pink-500 to-red-500',
      popularity: 82,
      rating: 4.7,
      uses: 2100,
      features: ['Authenticity focus', 'Story structure', 'Engagement hooks']
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'youtube': return <Video className="w-4 h-4" />;
      case 'tiktok': return <Video className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">
          Browse Content Templates
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our AI-optimized templates. Preview examples and start creating instantly!
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {templateCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-xl flex items-center justify-center text-2xl`}>
                  {template.icon}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{template.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                {template.name}
              </CardTitle>
              <p className="text-sm text-gray-600 leading-relaxed">
                {template.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Platform Support */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">Platforms:</span>
                <div className="flex gap-1">
                  {template.platforms.slice(0, 4).map((platform) => (
                    <div key={platform} className="p-1 rounded bg-gray-100">
                      {getPlatformIcon(platform)}
                    </div>
                  ))}
                  {template.platforms.length > 4 && (
                    <span className="text-xs text-gray-500 ml-1">+{template.platforms.length - 4}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              {template.features && (
                <div className="space-y-2">
                  <span className="text-xs font-medium text-gray-500">Key Features:</span>
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{template.uses?.toLocaleString()} uses</span>
                <span>{template.popularity}% success rate</span>
              </div>

              {/* Action Buttons */}
              <TemplateActionButtons
                template={template}
                variant="full"
                className="pt-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4 py-8">
        <h3 className="text-2xl font-bold text-gray-900">
          Ready to create your content?
        </h3>
        <p className="text-gray-600">
          Get started with any template and customize it for your brand
        </p>
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-6 text-lg"
        >
          Start Creating - Free Forever
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
