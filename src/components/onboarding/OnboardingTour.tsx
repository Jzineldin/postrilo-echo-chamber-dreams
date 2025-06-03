
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface OnboardingTourProps {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingTour = ({ isVisible, onComplete, onSkip }: OnboardingTourProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Welcome to Postrilo!
            </CardTitle>
            <Badge variant="secondary">Step 1 of 3</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold">Create Amazing Content</h3>
                <p className="text-gray-600">Generate social media posts, video scripts, and more with AI assistance</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold">Multi-Platform Optimization</h3>
                <p className="text-gray-600">Content optimized for Instagram, Twitter, LinkedIn, and more</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold">Schedule & Manage</h3>
                <p className="text-gray-600">Plan your content calendar and track performance</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button onClick={onSkip} variant="outline" className="flex-1">
              Skip Tour
            </Button>
            <Button onClick={onComplete} className="flex-1">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
