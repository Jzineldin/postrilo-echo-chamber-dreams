
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Plus, Wand2, Send, BarChart3 } from "lucide-react";

interface HowItWorksSectionProps {
  onGetStarted: () => void;
  user: any;
  isMobile: boolean;
}

export const HowItWorksSection = ({ 
  onGetStarted, 
  user, 
  isMobile 
}: HowItWorksSectionProps) => {
  const steps = [
    {
      icon: Plus,
      title: "Connect your accounts",
      description: "Link your social media profiles in seconds"
    },
    {
      icon: Wand2,
      title: "Describe your content",
      description: "Tell our AI what you want to create"
    },
    {
      icon: Send,
      title: "Generate & schedule",
      description: "Get optimized content for all platforms instantly"
    },
    {
      icon: BarChart3,
      title: "Track performance",
      description: "Monitor engagement and optimize your strategy"
    }
  ];

  return (
    <div className="relative">
      {/* Enhanced background with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-purple-50/50 -z-10" />
      
      <div className="space-y-2 md:space-y-4 safe-area-padding py-3 md:py-5">
        <div className="text-center space-y-1 md:space-y-2 max-w-3xl mx-auto px-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-gray-900 leading-tight">
            Get started in 4 simple steps
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-body">
            From setup to your first post in under 5 minutes
          </p>
        </div>

        {/* Ultra-compact mobile-optimized steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 max-w-5xl mx-auto px-1">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="bg-white border border-gray-200 shadow-sm transition-shadow duration-200 hover:shadow-md h-full">
                <CardContent className="p-2.5 md:p-4 text-center space-y-1.5 md:space-y-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto shadow-sm">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-semibold text-gray-900 text-sm leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-body text-xs">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Ultra-compact CTA */}
        <div className="text-center pt-2 md:pt-3 px-1">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-heading font-semibold touch-friendly"
          >
            {user ? "Go to Dashboard" : "Start Creating Content"}
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
