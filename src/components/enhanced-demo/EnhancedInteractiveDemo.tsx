import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Play, Instagram, Twitter, Linkedin, Wand2, RefreshCw, Copy, Check } from "lucide-react";
import { MobileResponsiveContainer, MobileStack } from "@/components/mobile/MobileResponsiveContainer";
import { MobileEnhancedButton, MobileEnhancedCard } from "@/components/mobile/MobileEnhancedComponents";

interface EnhancedInteractiveDemoProps {
  onClose: () => void;
}

export const EnhancedInteractiveDemo = ({ onClose }: EnhancedInteractiveDemoProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [selectedTemplate, setSelectedTemplate] = useState('educational');
  const [topic, setTopic] = useState('The future of AI in productivity and work');
  const [copied, setCopied] = useState(false);

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

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600', description: 'Visual storytelling' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-600', description: 'Quick updates' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-800', description: 'Professional content' }
  ];

  const templates = [
    { id: 'educational', name: 'Educational Content', emoji: '📚', description: 'Teach your audience something new' },
    { id: 'behind-scenes', name: 'Behind the Scenes', emoji: '👀', description: 'Show your authentic process' },
    { id: 'industry-insights', name: 'Industry Insights', emoji: '💡', description: 'Share expert knowledge' },
    { id: 'product-launch', name: 'Product Launch', emoji: '🚀', description: 'Announce new products' }
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

  const handleCopyContent = () => {
    navigator.clipboard.writeText(demoContent[selectedPlatform as keyof typeof demoContent]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid gap-4">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatform === platform.id;
                return (
                  <div 
                    key={platform.id} 
                    className={`cursor-pointer transition-all p-2 rounded-lg border ${isSelected ? 'ring-2 ring-purple-500 bg-purple-50 border-purple-200' : 'hover:bg-gray-50 border-gray-200'}`}
                    onClick={() => setSelectedPlatform(platform.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{platform.name}</p>
                        <p className="text-sm text-gray-600">{platform.description}</p>
                      </div>
                      {isSelected && (
                        <Check className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="grid gap-3">
              {templates.map((template) => {
                const isSelected = selectedTemplate === template.id;
                return (
                  <div 
                    key={template.id} 
                    className={`cursor-pointer transition-all p-2 rounded-lg border ${isSelected ? 'ring-2 ring-purple-500 bg-purple-50 border-purple-200' : 'hover:bg-gray-50 border-gray-200'}`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl flex-shrink-0">{template.emoji}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{template.name}</p>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      {isSelected && (
                        <Check className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                What would you like to create content about?
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                rows={3}
                placeholder="Enter your topic or idea..."
              />
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center gap-2 text-purple-700 font-medium mb-2">
                <Wand2 className="w-4 h-4" />
                AI Optimization Preview
              </div>
              <div className="text-sm text-purple-600">
                ✨ Will optimize for {platforms.find(p => p.id === selectedPlatform)?.name}'s best practices<br/>
                📊 Add relevant hashtags and engagement triggers<br/>
                🎯 Match your selected template style
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            {isGenerating ? (
              <>
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                </div>
                <div className="space-y-3">
                  <p className="font-semibold text-lg">AI is crafting your content...</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>✨ Analyzing your topic</p>
                    <p>🎯 Optimizing for {platforms.find(p => p.id === selectedPlatform)?.name}</p>
                    <p>📝 Generating engaging copy</p>
                    <p>🏷️ Adding relevant hashtags</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-10 h-10 text-white" />
                </div>
                <p className="font-semibold text-lg">Ready to generate your content?</p>
                <p className="text-gray-600">Our AI will create platform-optimized content in seconds</p>
              </div>
            )}
          </div>
        );

      case 4:
        const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);
        const Icon = selectedPlatformData?.icon || Instagram;
        
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm max-h-80 overflow-y-auto">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                <div className={`w-8 h-8 bg-gradient-to-br ${selectedPlatformData?.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">{selectedPlatformData?.name} Post</span>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Optimized
                </Badge>
              </div>
              <div className="text-sm whitespace-pre-line leading-relaxed text-gray-800">
                {demoContent[selectedPlatform as keyof typeof demoContent]}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-4">
              <div className="flex gap-6">
                <span className="text-gray-600">
                  <span className="font-medium">Characters:</span> {demoContent[selectedPlatform as keyof typeof demoContent].length}
                </span>
                <span className="text-green-600">
                  <span className="font-medium">Engagement Score:</span> 94%
                </span>
              </div>
              <Button
                onClick={handleCopyContent}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <MobileResponsiveContainer variant="default" className="max-h-[90vh] overflow-hidden">
        <Card className="w-full bg-white shadow-2xl">
          <CardHeader className="pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  Interactive Demo
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">See how Postrilo creates content in real-time</p>
              </div>
              <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                ✕
              </Button>
            </div>
            
            {/* Enhanced Progress indicator */}
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-2">
                {demoSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      index <= currentStep ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900">{demoSteps[currentStep]?.title}</h3>
                <p className="text-gray-600 text-sm">{demoSteps[currentStep]?.description}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <div className="min-h-[300px]">
              {renderStepContent()}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500 font-medium">
                Step {currentStep + 1} of {demoSteps.length}
              </div>
              
              <div className="flex gap-3">
                {currentStep > 0 && currentStep < 4 && (
                  <Button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    Back
                  </Button>
                )}
                
                {currentStep === demoSteps.length - 1 ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setCurrentStep(0);
                        setIsGenerating(false);
                        setShowResult(false);
                      }}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Try Again
                    </Button>
                    <MobileEnhancedButton
                      onClick={onClose}
                      variant="primary"
                      className="flex items-center gap-2"
                    >
                      Get Started Free
                      <ArrowRight className="w-4 h-4" />
                    </MobileEnhancedButton>
                  </div>
                ) : (
                  <MobileEnhancedButton
                    onClick={handleNextStep}
                    disabled={isGenerating}
                    variant="primary"
                    className="flex items-center gap-2"
                  >
                    {currentStep === 3 && !isGenerating ? (
                      <>
                        <Wand2 className="w-4 h-4" />
                        Generate Content
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </MobileEnhancedButton>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </MobileResponsiveContainer>
    </div>
  );
};
