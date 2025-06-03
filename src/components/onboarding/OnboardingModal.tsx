
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, Calendar, BarChart } from 'lucide-react';

interface OnboardingModalProps {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingModal = ({ isVisible, onComplete, onSkip }: OnboardingModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Sparkles className="w-8 h-8 text-purple-600" />
            Welcome to Postrilo!
          </CardTitle>
          <p className="text-gray-600">Your AI-powered content creation platform</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <Wand2 className="w-8 h-8 text-purple-600 mx-auto" />
              <h3 className="font-semibold text-sm">Create</h3>
              <p className="text-xs text-gray-600">AI content generation</p>
            </div>
            <div className="space-y-2">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto" />
              <h3 className="font-semibold text-sm">Schedule</h3>
              <p className="text-xs text-gray-600">Plan your posts</p>
            </div>
            <div className="space-y-2">
              <BarChart className="w-8 h-8 text-green-600 mx-auto" />
              <h3 className="font-semibold text-sm">Analyze</h3>
              <p className="text-xs text-gray-600">Track performance</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={onSkip} variant="outline" className="flex-1">
              Skip
            </Button>
            <Button onClick={onComplete} className="flex-1">
              Start Creating
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
