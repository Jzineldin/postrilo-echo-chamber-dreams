
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { useSubscriptionFeatures } from "@/hooks/useSubscriptionFeatures";
import { useSubscription } from "@/hooks/useSubscription";
import { CustomTemplateConfig } from "./CustomTemplateConfig";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  tier: 'basic' | 'advanced' | 'custom';
}

const ALL_TEMPLATES: Template[] = [
  {
    id: "basic-post",
    name: "Basic Post",
    description: "Simple social media post",
    icon: "📝",
    category: "General",
    tier: "basic"
  },
  {
    id: "quote-inspiration",
    name: "Quote & Inspiration",
    description: "Motivational quotes and inspiring content",
    icon: "💭",
    category: "Inspiration",
    tier: "basic"
  },
  {
    id: "brand-story",
    name: "Brand Story",
    description: "Share your brand's story and values",
    icon: "📖",
    category: "Brand",
    tier: "basic"
  },
  {
    id: "product-launch",
    name: "Product Launch",
    description: "Announce new products or features",
    icon: "🚀",
    category: "Marketing",
    tier: "advanced"
  },
  {
    id: "tutorial-post",
    name: "Tutorial & How-to",
    description: "Educational step-by-step content",
    icon: "🎓",
    category: "Education",
    tier: "advanced"
  },
  {
    id: "behind-the-scenes",
    name: "Behind the Scenes",
    description: "Show your process and team",
    icon: "🎬",
    category: "Authentic",
    tier: "advanced"
  },
  {
    id: "community-post",
    name: "Community Engagement",
    description: "Posts that encourage interaction",
    icon: "👥",
    category: "Engagement",
    tier: "advanced"
  },
  {
    id: "educational-carousel",
    name: "Educational Carousel",
    description: "Multi-slide educational content",
    icon: "📚",
    category: "Education",
    tier: "advanced"
  },
  {
    id: "custom-template-1",
    name: "Custom Template 1",
    description: "Your personalized content template",
    icon: "⚙️",
    category: "Custom",
    tier: "custom"
  },
  {
    id: "custom-template-2",
    name: "Custom Template 2",
    description: "Your personalized content template",
    icon: "🔧",
    category: "Custom",
    tier: "custom"
  },
  {
    id: "custom-template-3",
    name: "Custom Template 3",
    description: "Your personalized content template",
    icon: "🛠️",
    category: "Custom",
    tier: "custom"
  }
];

interface TemplateSelectorProps {
  templates: Template[];
  activeTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export const TemplateSelector = ({ activeTemplate, onTemplateSelect }: TemplateSelectorProps) => {
  const { canAccessTemplate, getAvailableTemplates, currentPlanName } = useSubscriptionFeatures();
  const { createCheckout } = useSubscription();
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [configTemplate, setConfigTemplate] = useState<string>("");
  
  const availableTemplateIds = getAvailableTemplates();
  const availableTemplates = ALL_TEMPLATES.filter(template => 
    availableTemplateIds.includes(template.id)
  );
  const restrictedTemplates = ALL_TEMPLATES.filter(template => 
    !availableTemplateIds.includes(template.id)
  );

  const handleUpgrade = async () => {
    if (currentPlanName === 'Free') {
      await createCheckout('Creator');
    } else {
      await createCheckout('Business');
    }
  };

  const handleCustomTemplateConfig = (templateId: string) => {
    setConfigTemplate(templateId);
    setConfigDialogOpen(true);
  };

  const handleConfigSave = (config: any) => {
    // In a real app, you'd save this to your backend
    console.log('Saving custom template config:', config);
    localStorage.setItem(`custom-template-${configTemplate}`, JSON.stringify(config));
  };

  const isCustomTemplate = (templateId: string) => {
    return templateId.startsWith('custom-template-');
  };

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-lg">Templates</CardTitle>
          <CardDescription>Choose a content type</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Available Templates */}
          {availableTemplates.map((template) => (
            <div key={template.id} className="relative">
              <Button
                variant={activeTemplate === template.id ? "secondary" : "ghost"}
                className={`w-full justify-start text-left h-auto p-3 transition-all hover:scale-[1.02] ${
                  activeTemplate === template.id 
                    ? "bg-blue-100 hover:bg-blue-200 border border-blue-300" 
                    : ""
                }`}
                onClick={() => onTemplateSelect(template.id)}
              >
                <div className="flex items-start gap-3 w-full">
                  <span className="text-lg">{template.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900">{template.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{template.description}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                      {isCustomTemplate(template.id) && (
                        <Badge variant="secondary" className="text-xs">
                          Customizable
                        </Badge>
                      )}
                    </div>
                  </div>
                  {isCustomTemplate(template.id) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCustomTemplateConfig(template.id);
                      }}
                    >
                      <Settings className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </Button>
            </div>
          ))}

          {/* Restricted Templates */}
          {restrictedTemplates.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm text-gray-900">Upgrade for more templates</h4>
                <Badge variant="outline" className="bg-purple-100 text-purple-700 text-xs">
                  {currentPlanName === 'Free' ? 'Creator+' : 'Business'}
                </Badge>
              </div>
              
              {restrictedTemplates.slice(0, 3).map((template) => (
                <div
                  key={template.id}
                  className="flex items-start gap-3 p-2 bg-white rounded border opacity-60 mb-2 last:mb-0"
                >
                  <span className="text-sm">{template.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs text-gray-700">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.description}</div>
                  </div>
                </div>
              ))}
              
              {restrictedTemplates.length > 3 && (
                <div className="text-xs text-gray-500 text-center py-1">
                  +{restrictedTemplates.length - 3} more templates
                </div>
              )}
              
              <Button
                onClick={handleUpgrade}
                size="sm"
                className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-xs"
              >
                Upgrade to unlock all templates
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <CustomTemplateConfig
            templateId={configTemplate}
            onSave={handleConfigSave}
            onClose={() => setConfigDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
