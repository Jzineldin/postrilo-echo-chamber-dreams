
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Sparkles, 
  ArrowRight,
  Wand2,
  BookOpen,
  Target,
  Users
} from 'lucide-react';

interface OnboardingModalProps {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingModal = ({ isVisible, onComplete, onSkip }: OnboardingModalProps) => {
  if (!isVisible) return null;

  const features = [
    {
      icon: Wand2,
      title: 'AI Content Generation',
      description: 'Create engaging posts, stories, and video scripts with our advanced AI'
    },
    {
      icon: Target,
      title: 'Platform Optimization',
      description: 'Content automatically optimized for Instagram, Twitter, LinkedIn and more'
    },
    {
      icon: BookOpen,
      title: 'Smart Templates',
      description: 'Use pre-built templates for different content types and industries'
    },
    {
      icon: Users,
      title: 'Brand Voice',
      description: 'Maintain consistent tone and style across all your content'
    }
  ];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        {/* Modal */}
        <Card className="w-full max-w-2xl bg-white shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-purple-600">
                Welcome to Postrilo
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSkip}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Create Amazing Content with AI
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Transform your social media presence with intelligent content generation
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Getting Started Steps */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">Quick Start Guide:</h3>
              <ol className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-medium">1</span>
                  Choose your platform (Instagram, Twitter, LinkedIn, etc.)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-medium">2</span>
                  Describe what content you want to create
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-medium">3</span>
                  Set your tone and goals
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-medium">4</span>
                  Generate and customize your content
                </li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onSkip}
                className="flex-1"
              >
                Skip for now
              </Button>
              <Button
                onClick={onComplete}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Start Creating
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
