
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Play, ArrowRight } from 'lucide-react';

export const GettingStartedGuide = () => {
  const steps = [
    {
      title: "Create Your First Post",
      description: "Use our AI-powered content generator to create engaging social media posts",
      completed: true,
      action: "Go to Create",
      icon: "✨"
    },
    {
      title: "Set Up Your Brand Voice",
      description: "Define your brand's tone and personality for consistent content",
      completed: false,
      action: "Configure Brand Voice",
      icon: "🎯"
    },
    {
      title: "Schedule Your Content",
      description: "Plan and schedule posts across multiple platforms",
      completed: false,
      action: "Open Scheduler",
      icon: "📅"
    },
    {
      title: "Track Performance",
      description: "Monitor engagement and optimize your content strategy",
      completed: false,
      action: "View Analytics",
      icon: "📊"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Getting Started with Postrilo</h2>
        <p className="text-gray-600">Follow these steps to make the most of your content creation journey</p>
      </div>

      <div className="grid gap-4">
        {steps.map((step, index) => (
          <Card key={index} className={`transition-all ${step.completed ? 'bg-green-50 border-green-200' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">{step.icon}</span>
                  <span>Step {index + 1}: {step.title}</span>
                  {step.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
                </CardTitle>
                {step.completed && <Badge variant="secondary" className="bg-green-100 text-green-700">Complete</Badge>}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 mb-4">{step.description}</p>
              {!step.completed && (
                <Button variant="outline" className="w-full sm:w-auto">
                  {step.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Play className="w-8 h-8 text-blue-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900">Watch Our Tutorial</h3>
              <p className="text-blue-700">Get a quick overview of Postrilo's features in under 5 minutes</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Watch Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
