
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Sparkles, Zap, Target, Users, ArrowRight } from 'lucide-react';

interface InteractiveDemoLauncherProps {
  onLaunchDemo: () => void;
  className?: string;
}

export const InteractiveDemoLauncher = ({ 
  onLaunchDemo, 
  className = "" 
}: InteractiveDemoLauncherProps) => {
  const demoFeatures = [
    {
      icon: Zap,
      title: "Real-time Generation",
      description: "Watch AI create content as you type"
    },
    {
      icon: Target,
      title: "Platform Optimization", 
      description: "See how content adapts to each platform"
    },
    {
      icon: Users,
      title: "Multi-platform Support",
      description: "Test across 6 major social platforms"
    }
  ];

  return (
    <Card className={`border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 ${className}`}>
      <CardContent className="p-6 space-y-4">
        <div className="text-center space-y-2">
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Interactive Demo
          </Badge>
          <h3 className="text-xl font-semibold text-gray-900">
            See AI Content Creation in Action
          </h3>
          <p className="text-gray-600">
            Experience how our AI generates platform-optimized content in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {demoFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center p-3 bg-white/60 rounded-lg">
                <Icon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm text-gray-900">{feature.title}</h4>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <Button 
          onClick={onLaunchDemo}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Launch Interactive Demo
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            No signup required
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            2-minute experience
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Real AI generation
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
