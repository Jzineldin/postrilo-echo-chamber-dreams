
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface OnboardingModalProps {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingModal = ({ isVisible, onComplete, onSkip }: OnboardingModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="absolute right-2 top-2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
          <div className="flex justify-center mb-4">
            <div className="bg-purple-600 p-3 rounded-full">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl text-purple-900">
            Welcome to Postrilo! 🎉
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-gray-700">
            <p className="mb-4">
              Ready to create amazing content? Let's get you started with a quick tour!
            </p>
            
            <div className="space-y-2 mb-6">
              <Badge variant="outline" className="bg-white text-purple-700 border-purple-200">
                ✨ AI-Powered Content Generation
              </Badge>
              <Badge variant="outline" className="bg-white text-blue-700 border-blue-200">
                📊 Analytics & Insights
              </Badge>
              <Badge variant="outline" className="bg-white text-green-700 border-green-200">
                🎯 Multi-Platform Publishing
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onSkip} className="flex-1">
              Skip Tour
            </Button>
            <Button onClick={onComplete} className="flex-1 bg-purple-600 hover:bg-purple-700">
              Start Tour
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
