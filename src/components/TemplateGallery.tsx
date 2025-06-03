
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Twitter, Linkedin, Facebook, Video, FileText, Lightbulb, Rocket, Users, Star } from "lucide-react";

interface TemplateGalleryProps {
  onGetStarted: () => void;
}

export const TemplateGallery = ({ onGetStarted }: TemplateGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templateCategories = [
    { id: 'all', name: 'All Templates', count: 12 },
    { id: 'social-media', name: 'Social Media', count: 6 },
    { id: 'video', name: 'Video Scripts', count: 3 },
    { id: 'educational', name: 'Educational', count: 3 }
  ];

  const templates = [
    {
      id: 1,
      name: 'Product Launch Announcement',
      category: 'social-media',
      description: 'Create buzz for your new product with platform-optimized launch posts',
      platforms: ['instagram', 'twitter', 'linkedin', 'facebook'],
      variables: ['product_name', 'key_features', 'launch_date', 'call_to_action'],
      exampleContent: '🚀 Introducing [Product Name] - the game-changer you\'ve been waiting for!\n\n✨ Key Features:\n• [Feature 1]\n• [Feature 2]\n• [Feature 3]\n\nAvailable [Launch Date]. Get ready to transform your [industry]!\n\n#ProductLaunch #Innovation',
      icon: Rocket,
      color: 'from-blue-500 to-purple-600',
      popularity: 95
    },
    {
      id: 2,
      name: 'Educational Tutorial',
      category: 'educational',
      description: 'Share knowledge with step-by-step tutorials that engage and educate',
      platforms: ['instagram', 'linkedin', 'youtube'],
      variables: ['topic', 'steps', 'difficulty_level', 'duration'],
      exampleContent: '📚 Tutorial: How to [Topic]\n\nHere\'s a step-by-step guide:\n\n1️⃣ [Step 1]\n2️⃣ [Step 2]\n3️⃣ [Step 3]\n\n💡 Pro tip: [Additional insight]\n\nSave this post for later! 🔖',
      icon: Lightbulb,
      color: 'from-green-500 to-blue-500',
      popularity: 88
    },
    {
      id: 3,
      name: 'Behind the Scenes',
      category: 'social-media',
      description: 'Give your audience an authentic look into your process and culture',
      platforms: ['instagram', 'facebook', 'linkedin'],
      variables: ['activity', 'team_member', 'insight', 'company_value'],
      exampleContent: '👀 Behind the scenes at [Company]\n\nToday, [Team Member] is [Activity]. Here\'s what most people don\'t see:\n\n[Insight about the process]\n\nThis is why we believe in [Company Value] ❤️\n\n#BehindTheScenes #TeamWork',
      icon: Users,
      color: 'from-pink-500 to-red-500',
      popularity: 82
    },
    {
      id: 4,
      name: 'Video Script Template',
      category: 'video',
      description: 'Engaging video scripts optimized for different platforms and lengths',
      platforms: ['youtube', 'tiktok', 'instagram'],
      variables: ['hook', 'main_points', 'call_to_action', 'video_length'],
      exampleContent: 'HOOK: [Attention-grabbing opening]\n\nHi everyone! Today we\'re talking about [Topic]\n\nMain Points:\n- [Point 1]\n- [Point 2]\n- [Point 3]\n\nCTA: [Call to action]\n\n[Engagement prompt]',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      popularity: 91
    },
    {
      id: 5,
      name: 'Industry Insights',
      category: 'educational',
      description: 'Share expert insights and trends in your industry',
      platforms: ['linkedin', 'twitter'],
      variables: ['trend', 'impact', 'prediction', 'advice'],
      exampleContent: '📈 Industry Insight: [Trend]\n\nWhat this means for [Industry]:\n\n🔍 Current Impact: [Impact]\n🚀 Future Prediction: [Prediction]\n💡 My Advice: [Advice]\n\nWhat\'s your take? Share below! 👇',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      popularity: 76
    },
    {
      id: 6,
      name: 'Community Question',
      category: 'social-media',
      description: 'Boost engagement with thought-provoking questions for your community',
      platforms: ['instagram', 'facebook', 'linkedin'],
      variables: ['question', 'context', 'options', 'personal_take'],
      exampleContent: '🤔 Community Question:\n\n[Context about the topic]\n\nHere\'s what I want to know: [Question]\n\nOption A: [Option 1]\nOption B: [Option 2]\n\nMy take: [Personal opinion]\n\nWhat do you think? Let me know below! 👇',
      icon: FileText,
      color: 'from-teal-500 to-green-500',
      popularity: 84
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
          Explore our AI-optimized templates. No sign-up required to preview!
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
        {filteredTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{template.popularity}%</span>
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

                {/* Variables */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-gray-500">Variables:</span>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.slice(0, 3).map((variable) => (
                      <Badge key={variable} variant="outline" className="text-xs">
                        {variable.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                    {template.variables.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.variables.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Example Preview */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-xs font-medium text-gray-500 block mb-2">Preview:</span>
                  <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                    {template.exampleContent}
                  </p>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={onGetStarted}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all group-hover:scale-105"
                >
                  Use This Template
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
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
