
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Crown } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'beginner' | 'marketing' | 'engagement' | 'advanced';
  tier: 'free' | 'pro';
  popular?: boolean;
}

const SIMPLIFIED_TEMPLATES: Template[] = [
  // Beginner-friendly templates
  {
    id: "basic-post",
    name: "Simple Post",
    description: "Perfect for getting started",
    icon: "📝",
    category: "beginner",
    tier: "free",
    popular: true
  },
  {
    id: "quote-inspiration",
    name: "Motivational Quote",
    description: "Inspiring and shareable content",
    icon: "💭",
    category: "beginner",
    tier: "free"
  },
  
  // Marketing templates
  {
    id: "product-launch",
    name: "Product Announcement",
    description: "Launch new products effectively",
    icon: "🚀",
    category: "marketing",
    tier: "pro"
  },
  {
    id: "brand-story",
    name: "Brand Story",
    description: "Share your company's journey",
    icon: "📖",
    category: "marketing",
    tier: "free"
  },
  
  // Engagement templates
  {
    id: "community-post",
    name: "Community Builder",
    description: "Boost interaction and engagement",
    icon: "👥",
    category: "engagement",
    tier: "pro",
    popular: true
  },
  {
    id: "behind-the-scenes",
    name: "Behind the Scenes",
    description: "Show your authentic side",
    icon: "🎬",
    category: "engagement",
    tier: "pro"
  },
  
  // Advanced templates
  {
    id: "tutorial-post",
    name: "How-to Guide",
    description: "Educational step-by-step content",
    icon: "🎓",
    category: "advanced",
    tier: "pro"
  },
  {
    id: "educational-carousel",
    name: "Multi-slide Content",
    description: "Complex educational content",
    icon: "📚",
    category: "advanced",
    tier: "pro"
  }
];

const categoryConfig = {
  beginner: {
    title: "Getting Started",
    description: "Perfect for first-time users",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700"
  },
  marketing: {
    title: "Marketing & Sales",
    description: "Drive business results",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700"
  },
  engagement: {
    title: "Build Community",
    description: "Increase interaction",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700"
  },
  advanced: {
    title: "Advanced Content",
    description: "For experienced creators",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700"
  }
};

interface SimplifiedTemplateSelectorProps {
  activeTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  isPro?: boolean;
}

export const SimplifiedTemplateSelector = ({ 
  activeTemplate, 
  onTemplateSelect,
  isPro = false 
}: SimplifiedTemplateSelectorProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('beginner');
  
  const categories = Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>;
  const currentCategoryTemplates = SIMPLIFIED_TEMPLATES.filter(
    template => template.category === activeCategory
  );

  const availableTemplates = currentCategoryTemplates.filter(
    template => isPro || template.tier === 'free'
  );
  
  const restrictedTemplates = currentCategoryTemplates.filter(
    template => !isPro && template.tier === 'pro'
  );

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Choose a Template
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {categories.map((category) => {
            const config = categoryConfig[category];
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  activeCategory === category
                    ? config.color + ' shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{config.title}</div>
                <div className="text-xs text-gray-600 mt-1">{config.description}</div>
              </button>
            );
          })}
        </div>

        {/* Available Templates */}
        <div className="space-y-2">
          {availableTemplates.map((template) => (
            <Button
              key={template.id}
              variant={activeTemplate === template.id ? "secondary" : "ghost"}
              className={`w-full justify-start text-left h-auto p-3 transition-all ${
                activeTemplate === template.id 
                  ? "bg-blue-100 hover:bg-blue-200 border border-blue-300" 
                  : ""
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              <div className="flex items-center gap-3 w-full">
                <span className="text-lg">{template.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{template.name}</span>
                    {template.popular && (
                      <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{template.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>

        {/* Upgrade Prompt for Pro Templates */}
        {restrictedTemplates.length > 0 && !isPro && (
          <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-900">Unlock Pro Templates</h4>
              <Crown className="w-4 h-4 text-purple-600" />
            </div>
            
            <div className="space-y-2 mb-3">
              {restrictedTemplates.slice(0, 2).map((template) => (
                <div
                  key={template.id}
                  className="flex items-center gap-2 p-2 bg-white/60 rounded border opacity-75"
                >
                  <span className="text-sm">{template.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-xs">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.description}</div>
                  </div>
                </div>
              ))}
              {restrictedTemplates.length > 2 && (
                <div className="text-xs text-gray-500 text-center py-1">
                  +{restrictedTemplates.length - 2} more templates
                </div>
              )}
            </div>
            
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Crown className="w-3 h-3 mr-1" />
              Upgrade to Pro
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
