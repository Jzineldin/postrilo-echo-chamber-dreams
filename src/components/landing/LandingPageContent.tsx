
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Target, BarChart3, Zap, Star, User, LogIn, Play } from "lucide-react";
import { HeroSection } from "./HeroSection";
import { AppFeaturesSection } from "./AppFeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { KeyBenefitsSection } from "./KeyBenefitsSection";
import { FAQSection } from "./FAQSection";
import { FinalCTASection } from "./FinalCTASection";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

interface LandingPageContentProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
  onBrowseTemplates: () => void;
  onTryTemplate: (templateId: string) => void;
  onFormDemo: (data: any) => void;
  user: any;
}

export const LandingPageContent = ({
  onGetStarted,
  onTryDemo,
  onBrowseTemplates,
  onTryTemplate,
  onFormDemo,
  user
}: LandingPageContentProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const templates = [
    {
      id: "product-launch",
      name: "Product Launch",
      category: "Social Media",
      rating: 4.9,
      platforms: ["Instagram", "LinkedIn", "Twitter"],
      description: "Perfect for announcing new products with engaging copy",
      preview: "🚀 Exciting news! We're thrilled to announce the launch of our revolutionary new product that's about to change everything..."
    },
    {
      id: "educational-content",
      name: "Educational Tutorial",
      category: "Educational",
      rating: 4.7,
      platforms: ["LinkedIn", "YouTube", "Blog"],
      description: "Share knowledge and establish thought leadership",
      preview: "📚 Did you know? Here are 5 essential tips that will transform your understanding of this topic..."
    },
    {
      id: "behind-scenes",
      name: "Behind the Scenes",
      category: "Social Media",
      rating: 4.6,
      platforms: ["Instagram", "TikTok", "Facebook"],
      description: "Humanize your brand with authentic storytelling",
      preview: "👀 Take a peek behind the curtain! Here's what really goes into creating something special..."
    }
  ];

  const handleGetStarted = () => {
    console.log("LandingPageContent: Get Started clicked, user:", !!user);
    onGetStarted();
  };

  const handleTryDemo = () => {
    console.log("LandingPageContent: Try Demo clicked, user:", !!user);
    onTryDemo();
  };

  const handleBrowseTemplates = () => {
    console.log("LandingPageContent: Browse Templates clicked");
    onBrowseTemplates();
  };

  const handlePreviewTemplate = (template: any) => {
    console.log("Preview template:", template.id);
    setSelectedTemplate(template.id);
    toast({
      title: "Template Preview",
      description: template.preview,
    });
  };

  const handleUseTemplate = (templateId: string) => {
    console.log("Use template:", templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      // Store template data for use in content generator
      sessionStorage.setItem('selectedTemplate', JSON.stringify({
        templateId,
        templateName: template.name,
        templateCategory: template.category,
        templateDescription: template.description,
        templatePreview: template.preview
      }));
      
      toast({
        title: "Template Selected",
        description: `Using "${template.name}" template for content creation.`,
      });
      
      onTryTemplate(templateId);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Header with Login */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Postrilo
          </div>
          
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGetStarted}
                  className="flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleGetStarted}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <User className="w-4 h-4" />
                  Get Started
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  console.log("Header Go to Dashboard clicked");
                  window.location.hash = '#dashboard';
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Target className="w-4 h-4" />
                Go to Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content with top padding for fixed header */}
      <div className="pt-16">
        <HeroSection 
          onGetStarted={handleGetStarted}
          onTryDemo={handleTryDemo}
          onBrowseTemplates={handleBrowseTemplates}
          user={user}
          isMobile={isMobile}
        />

        {/* Quick Template Preview Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Start with Proven Templates
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from our collection of high-performing content templates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-purple-100 text-purple-800 text-xs">
                        {template.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{template.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handlePreviewTemplate(template)}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        onClick={() => handleUseTemplate(template.id)}
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                onClick={handleBrowseTemplates}
                className="flex items-center gap-2"
              >
                Browse All Templates
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Continue with other sections */}
        <AppFeaturesSection isMobile={isMobile} />
        <HowItWorksSection 
          onGetStarted={handleGetStarted}
          user={user}
          isMobile={isMobile}
        />
        <KeyBenefitsSection isMobile={isMobile} />
        <FAQSection isMobile={isMobile} />
        <FinalCTASection 
          onGetStarted={handleGetStarted}
          user={user}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};
