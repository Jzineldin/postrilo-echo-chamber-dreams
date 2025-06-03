import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentTypeSelector } from "./components/ContentTypeSelector";
import { TopicInput } from "./components/TopicInput";
import { EnhancedPlatformSelector, EnhancedGenerationStep, EnhancedResultDisplay } from "./components/EnhancedDemoComponents";
import { demoContent } from "./constants/demoData";
import { cn } from "@/lib/utils";

interface EnhancedDemoModeProps {
  onClose: () => void;
}

export const EnhancedDemoMode = ({ onClose }: EnhancedDemoModeProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedTemplate, setSelectedTemplate] = useState("social-media-post");
  const [selectedTopic, setSelectedTopic] = useState("productivity tips");
  const [isGenerating, setIsGenerating] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Check if user came from template gallery
  useEffect(() => {
    const selectedTemplateFromGallery = sessionStorage.getItem('selectedTemplate');
    if (selectedTemplateFromGallery) {
      const templateMap: Record<string, string> = {
        'product-launch': 'social-media-post',
        'educational-tutorial': 'educational-post',
        'behind-scenes': 'behind-scenes',
        'video-script': 'video-script'
      };
      
      const mappedTemplate = templateMap[selectedTemplateFromGallery] || 'social-media-post';
      setSelectedTemplate(mappedTemplate);
      setCurrentStep(4);
      sessionStorage.removeItem('selectedTemplate');
    }
  }, []);

  // Enhanced typing animation effect
  useEffect(() => {
    if (currentStep === 4 && showResult) {
      const content = demoContent[selectedPlatform as keyof typeof demoContent];
      let index = 0;
      setTypingText('');
      setIsComplete(false);
      
      const timer = setInterval(() => {
        if (index < content.length) {
          setTypingText(content.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(timer);
        }
      }, 20);

      return () => clearInterval(timer);
    }
  }, [currentStep, showResult, selectedPlatform]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowResult(false);
    setIsComplete(false);
    
    // Simulate generation process with realistic timing
    setTimeout(() => {
      setShowResult(true);
    }, 3000);
    
    setTimeout(() => {
      setIsGenerating(false);
    }, 3500);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleGenerate();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowResult(false);
      setIsGenerating(false);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Choose Your Platform";
      case 2: return "Select Content Type";
      case 3: return "Pick Your Topic";
      case 4: return "Generate Content";
      default: return "AI Content Generator";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Select the social media platform where you want to publish";
      case 2: return "Choose the type of content you want to create";
      case 3: return "Tell us what you want to create content about";
      case 4: return "Watch as AI creates engaging content for your audience";
      default: return "";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">{getStepTitle()}</h2>
            <p className="text-gray-600">{getStepDescription()}</p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    step <= currentStep 
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 w-12" 
                      : "bg-gray-200 w-8"
                  )}
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">
                Step {currentStep} of 4
              </span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="p-3 rounded-full hover:bg-white/80"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Enhanced Content */}
        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Steps */}
            <div className="space-y-6">
              {currentStep === 1 && (
                <EnhancedPlatformSelector
                  selectedPlatform={selectedPlatform}
                  onPlatformSelect={setSelectedPlatform}
                />
              )}
              
              {currentStep === 2 && (
                <ContentTypeSelector
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={setSelectedTemplate}
                />
              )}
              
              {currentStep === 3 && (
                <TopicInput
                  selectedTopic={selectedTopic}
                  selectedPlatform={selectedPlatform}
                  selectedTemplate={selectedTemplate}
                  onTopicChange={setSelectedTopic}
                />
              )}
              
              {currentStep === 4 && (
                <EnhancedGenerationStep
                  isGenerating={isGenerating}
                  selectedPlatform={selectedPlatform}
                />
              )}
            </div>

            {/* Right Side - Preview/Result */}
            <div className="space-y-6">
              {showResult ? (
                <EnhancedResultDisplay
                  selectedPlatform={selectedPlatform}
                  typingText={typingText}
                  isComplete={isComplete}
                />
              ) : (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 h-96 flex items-center justify-center border-2 border-dashed border-gray-200">
                  <div className="text-center space-y-3">
                    <div className="text-4xl">✨</div>
                    <p className="text-gray-500 text-center max-w-xs">
                      Complete the steps to see your AI-generated content preview
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50/50">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6"
          >
            Previous
          </Button>
          
          <div className="text-sm text-gray-600 font-medium">
            {currentStep === 4 && isGenerating ? "Generating..." : `Step ${currentStep} of 4`}
          </div>
          
          <Button
            onClick={nextStep}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6"
          >
            {currentStep === 4 ? (isGenerating ? "Generating..." : "Generate Content") : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};
