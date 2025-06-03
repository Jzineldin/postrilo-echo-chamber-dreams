
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Loader2, Sparkles, Zap, Target } from 'lucide-react';
import { MobileEnhancedCard, MobileEnhancedButton } from '@/components/mobile/MobileEnhancedComponents';
import { cn } from '@/lib/utils';

interface EnhancedPlatformSelectorProps {
  selectedPlatform: string;
  onPlatformSelect: (platform: string) => void;
}

export const EnhancedPlatformSelector = ({ 
  selectedPlatform, 
  onPlatformSelect 
}: EnhancedPlatformSelectorProps) => {
  const platforms = [
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: '📸', 
      description: 'Visual storytelling with engaging captions',
      color: 'from-pink-500 to-purple-600',
      audience: '2B+ users'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: '💼', 
      description: 'Professional networking and thought leadership',
      color: 'from-blue-600 to-blue-700',
      audience: '900M+ professionals'
    },
    { 
      id: 'twitter', 
      name: 'Twitter/X', 
      icon: '🐦', 
      description: 'Real-time conversations and trending topics',
      color: 'from-sky-500 to-blue-600',
      audience: '500M+ users'
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: '👥', 
      description: 'Community building and social engagement',
      color: 'from-blue-600 to-indigo-600',
      audience: '3B+ users'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Choose Your Platform</h3>
        <p className="text-sm text-gray-600">Select where you want to share your content</p>
      </div>
      
      <div className="grid gap-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatform === platform.id;
          return (
            <Card 
              key={platform.id}
              className={cn(
                "cursor-pointer transition-all duration-300 hover:shadow-lg group",
                isSelected 
                  ? "ring-2 ring-purple-500 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50" 
                  : "hover:bg-gray-50 hover:scale-[1.02]"
              )}
              onClick={() => onPlatformSelect(platform.id)}
            >
              <CardContent className="p-4 flex items-center space-x-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-to-r",
                  platform.color
                )}>
                  {platform.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{platform.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      {platform.audience}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {platform.description}
                  </p>
                </div>
                {isSelected && (
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

interface EnhancedGenerationStepProps {
  isGenerating: boolean;
  selectedPlatform: string;
  onGenerate?: () => void;
}

export const EnhancedGenerationStep = ({ 
  isGenerating, 
  selectedPlatform,
  onGenerate 
}: EnhancedGenerationStepProps) => {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 300);
      
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isGenerating]);

  const generationSteps = [
    { label: 'Analyzing your topic', icon: Target, delay: 0 },
    { label: 'Optimizing for platform', icon: Zap, delay: 1000 },
    { label: 'Generating engaging content', icon: Sparkles, delay: 2000 }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {isGenerating ? 'Creating Your Content' : 'Ready to Generate'}
        </h3>
        <p className="text-sm text-gray-600">
          {isGenerating 
            ? `AI is crafting the perfect ${selectedPlatform} content for you...`
            : 'Click generate to create your AI-powered content'
          }
        </p>
      </div>

      {isGenerating ? (
        <div className="space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="space-y-3">
            {generationSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = progress > (index * 33);
              const isComplete = progress > ((index + 1) * 33);
              
              return (
                <div 
                  key={step.label}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-all duration-500",
                    isActive ? "bg-purple-50" : "bg-gray-50"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    isComplete 
                      ? "bg-green-500 text-white" 
                      : isActive 
                        ? "bg-purple-500 text-white" 
                        : "bg-gray-300 text-gray-600"
                  )}>
                    {isComplete ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : isActive ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm font-medium transition-colors",
                    isActive ? "text-gray-900" : "text-gray-600"
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <MobileEnhancedButton
            variant="primary"
            size="lg"
            onClick={onGenerate}
            className="px-8"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Content
          </MobileEnhancedButton>
        </div>
      )}
    </div>
  );
};

interface EnhancedResultDisplayProps {
  selectedPlatform: string;
  typingText: string;
  isComplete?: boolean;
}

export const EnhancedResultDisplay = ({ 
  selectedPlatform, 
  typingText,
  isComplete = false 
}: EnhancedResultDisplayProps) => {
  const platformConfig = {
    instagram: { bg: 'from-pink-50 to-purple-50', icon: '📸', name: 'Instagram' },
    linkedin: { bg: 'from-blue-50 to-indigo-50', icon: '💼', name: 'LinkedIn' },
    twitter: { bg: 'from-sky-50 to-blue-50', icon: '🐦', name: 'Twitter/X' },
    facebook: { bg: 'from-blue-50 to-indigo-50', icon: '👥', name: 'Facebook' }
  };

  const config = platformConfig[selectedPlatform as keyof typeof platformConfig] || platformConfig.instagram;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 justify-center">
        <div className="text-2xl">{config.icon}</div>
        <h4 className="font-semibold text-gray-900">{config.name} Content</h4>
        {isComplete && (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Generated
          </Badge>
        )}
      </div>
      
      <MobileEnhancedCard className={cn("bg-gradient-to-br", config.bg)}>
        <div className="min-h-[200px] max-h-[400px] overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-medium">
              {typingText}
              {!isComplete && (
                <span className="animate-pulse">|</span>
              )}
            </pre>
          </div>
        </div>
        
        {isComplete && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-white/50">
            <MobileEnhancedButton
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(typingText)}
            >
              Copy Content
            </MobileEnhancedButton>
            <MobileEnhancedButton
              variant="outline"
              size="sm"
              onClick={() => window.open(`https://${selectedPlatform}.com`, '_blank')}
            >
              Post to {config.name}
            </MobileEnhancedButton>
          </div>
        )}
      </MobileEnhancedCard>
    </div>
  );
};
