
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Play, Instagram, Twitter, Linkedin } from "lucide-react";

interface DemoModeProps {
  onClose: () => void;
}

export const DemoMode = ({ onClose }: DemoModeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const demoSteps = [
    {
      title: "Choose Your Platform",
      description: "Select where you want to publish your content",
      component: "platform-selector"
    },
    {
      title: "Pick a Template",
      description: "Choose from our AI-optimized content templates",
      component: "template-selector"
    },
    {
      title: "Add Your Topic",
      description: "Tell us what you want to create content about",
      component: "topic-input"
    },
    {
      title: "AI Generation",
      description: "Watch our AI create platform-optimized content",
      component: "generation"
    },
    {
      title: "Your Content",
      description: "See the final result with hashtags and optimization",
      component: "result"
    }
  ];

  const demoContent = {
    instagram: `✨ The future of productivity is here! 

🚀 Discover how AI is transforming the way we work and create content. From automating repetitive tasks to generating personalized strategies, artificial intelligence is becoming every professional's secret weapon.

💡 Key benefits you'll love:
• Save 10+ hours per week
• Boost creativity with AI insights  
• Scale your content effortlessly
• Maintain consistent quality

Ready to revolutionize your workflow? The future starts today! 🌟

#ProductivityHacks #AITools #WorkSmarter #ContentCreation #Innovation #DigitalTransformation #TechTrends #Automation`,
    
    twitter: `🚀 The productivity revolution is here!

AI is transforming how we work:
• 10+ hours saved weekly
• Enhanced creativity
• Effortless scaling
• Consistent quality

Ready to revolutionize your workflow? 

#ProductivityHacks #AITools #WorkSmarter`,

    linkedin: `The Future of Work: How AI is Revolutionizing Productivity

As we navigate an increasingly digital workplace, artificial intelligence has emerged as a game-changer for professionals across all industries. 

🎯 Key transformations I'm seeing:

→ Task Automation: Repetitive work is becoming obsolete
→ Creative Enhancement: AI amplifies human creativity rather than replacing it
→ Personalized Strategies: Custom solutions for unique challenges
→ Quality Consistency: Maintaining high standards at scale

The most successful professionals aren't those who fear AI, but those who embrace it as a collaborative tool.

What's your experience with AI in your workflow? I'd love to hear your thoughts in the comments.

#FutureOfWork #ArtificialIntelligence #Productivity #Innovation #DigitalTransformation`
  };

  const handleNextStep = () => {
    if (currentStep === 3) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setShowResult(true);
        setCurrentStep(4);
      }, 3000);
    } else if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600', selected: true },
                { name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-600', selected: false },
                { name: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-800', selected: false }
              ].map((platform) => {
                const Icon = platform.icon;
                return (
                  <Card key={platform.name} className={`cursor-pointer transition-all ${platform.selected ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'}`}>
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm font-medium">{platform.name}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="grid gap-3">
              {[
                { name: 'Product Launch', selected: false },
                { name: 'Educational Content', selected: true },
                { name: 'Behind the Scenes', selected: false },
                { name: 'Industry Insights', selected: false }
              ].map((template) => (
                <Card key={template.name} className={`cursor-pointer transition-all ${template.selected ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'}`}>
                  <CardContent className="p-3">
                    <p className="font-medium">{template.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">Topic:</p>
              <p className="font-medium">"The future of AI in productivity and work"</p>
            </div>
            <div className="text-sm text-gray-500">
              ✨ AI will optimize this content for Instagram's best practices
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            {isGenerating ? (
              <>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">AI is crafting your content...</p>
                  <p className="text-sm text-gray-600">Optimizing for Instagram • Adding emojis • Generating hashtags</p>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <p className="font-medium">Ready to generate your content?</p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="flex items-center gap-2 mb-3">
                <Instagram className="w-5 h-5 text-pink-600" />
                <span className="font-medium">Instagram Post</span>
                <Badge className="bg-green-100 text-green-700">Optimized</Badge>
              </div>
              <div className="text-sm whitespace-pre-line leading-relaxed">
                {demoContent.instagram}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Character count: 487</span>
              <span>Engagement score: 94%</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="w-6 h-6 text-purple-600" />
                Interactive Demo
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">See how Postrilo creates content in real-time</p>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-gray-500">✕</Button>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mt-4">
            {demoSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all ${
                  index <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold">{demoSteps[currentStep]?.title}</h3>
            <p className="text-gray-600 text-sm">{demoSteps[currentStep]?.description}</p>
          </div>

          <div className="min-h-[200px]">
            {renderStepContent()}
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {demoSteps.length}
            </div>
            
            <div className="flex gap-3">
              {currentStep === demoSteps.length - 1 ? (
                <Button onClick={onClose} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleNextStep}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {currentStep === 3 && !isGenerating ? 'Generate Content' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
