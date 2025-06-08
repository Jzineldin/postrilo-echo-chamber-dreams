
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, Check, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface OnboardingTourProps {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const tourSteps = [
  {
    id: 'welcome',
    title: 'Welcome to Postrilo',
    description: 'Your AI-powered content creation assistant is ready to help you create amazing social media content.',
    element: '.dashboard-header',
    position: 'bottom'
  },
  {
    id: 'create-button',
    title: 'Create Content',
    description: 'Click here to start generating AI-powered content for your social media platforms.',
    element: '.create-content-button',
    position: 'bottom'
  },
  {
    id: 'stats',
    title: 'Track Your Progress',
    description: 'Monitor your content generation, remaining credits, and engagement metrics.',
    element: '.stats-grid',
    position: 'top'
  },
  {
    id: 'usage',
    title: 'Usage Overview',
    description: 'Keep track of your subscription usage and see when your credits reset.',
    element: '.usage-card',
    position: 'top'
  }
];

export const OnboardingTour = ({ isVisible, onComplete, onSkip }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();

  // Auto-dismiss tour on navigation changes
  useEffect(() => {
    if (isVisible && location.pathname !== '/dashboard') {
      console.log("Dismissing onboarding tour due to navigation change");
      onSkip();
    }
  }, [location.pathname, isVisible, onSkip]);

  // Auto-dismiss tour on route changes via popstate
  useEffect(() => {
    const handleNavigation = () => {
      if (isVisible) {
        console.log("Dismissing onboarding tour due to browser navigation");
        onSkip();
      }
    };

    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [isVisible, onSkip]);

  if (!isVisible) return null;

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTourStep = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/20 z-[100] flex items-center justify-center p-4 pointer-events-none">
      <div className="pointer-events-auto">
        <Card className="max-w-sm w-full bg-white border-purple-200 shadow-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                Step {currentStep + 1} of {tourSteps.length}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSkip}
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentTourStep.title}
              </h3>
              
              <p className="text-sm text-gray-600">
                {currentTourStep.description}
              </p>
              
              <div className="flex gap-2 pt-4">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={handlePrev} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}
                
                <Button 
                  onClick={handleNext} 
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  {currentStep === tourSteps.length - 1 ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Finish
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
              
              <Button variant="ghost" onClick={onSkip} className="text-xs text-gray-500 w-full">
                Skip Tour
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
