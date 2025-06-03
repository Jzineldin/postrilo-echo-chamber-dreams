
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Sparkles, 
  Target, 
  BookOpen,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target: string;
  icon: React.ComponentType<any>;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Postrilo!',
    description: 'Let\'s take a quick tour to help you get started with creating amazing content.',
    target: '.dashboard-welcome',
    icon: Sparkles,
    position: 'bottom'
  },
  {
    id: 'create-content',
    title: 'Create Your First Post',
    description: 'Click here to start generating content with our AI-powered tools.',
    target: '.create-content-button',
    icon: Target,
    position: 'bottom'
  },
  {
    id: 'content-library',
    title: 'Your Content Library',
    description: 'All your created content is saved here for easy access and management.',
    target: '.content-library-link',
    icon: BookOpen,
    position: 'bottom'
  },
  {
    id: 'settings',
    title: 'Settings & Profile',
    description: 'Manage your account, subscription, and preferences from here.',
    target: '.settings-link',
    icon: Settings,
    position: 'left'
  }
];

interface OnboardingTourProps {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingTour = ({ isVisible, onComplete, onSkip }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightElement, setHighlightElement] = useState<HTMLElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isVisible && currentStep < onboardingSteps.length) {
      const targetElement = document.querySelector(onboardingSteps[currentStep].target) as HTMLElement;
      setHighlightElement(targetElement);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.style.position = 'relative';
        targetElement.style.zIndex = '1001';
        targetElement.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.3)';
        targetElement.style.borderRadius = '8px';
      }
    }

    return () => {
      if (highlightElement) {
        highlightElement.style.boxShadow = '';
        highlightElement.style.zIndex = '';
      }
    };
  }, [currentStep, isVisible]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    toast({
      title: "Tour Complete!",
      description: "You're all set to start creating amazing content.",
    });
    onComplete();
  };

  const handleSkip = () => {
    onSkip();
  };

  if (!isVisible || currentStep >= onboardingSteps.length) {
    return null;
  }

  const step = onboardingSteps[currentStep];
  const IconComponent = step.icon;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-1000" />
      
      {/* Tour Card */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1001">
        <Card className="w-96 bg-white shadow-2xl border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <IconComponent className="w-5 h-5 text-purple-600" />
                <Badge variant="outline" className="text-xs">
                  {currentStep + 1} of {onboardingSteps.length}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>

            <div className="flex justify-between items-center mt-6">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleSkip}
                >
                  Skip Tour
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-1"
                >
                  {currentStep === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < onboardingSteps.length - 1 && <ArrowRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
