
import React from "react";
import { Card } from "@/components/ui/card";
import { Palette, Target, Calendar, BarChart3, TrendingUp, Shield } from "lucide-react";

interface AppFeaturesSectionProps {
  isMobile: boolean;
}

export const AppFeaturesSection = ({ isMobile }: AppFeaturesSectionProps) => {
  const appFeatures = [
    {
      icon: Palette,
      title: "Custom Brand Voices",
      description: "Create multiple brand personalities for different audiences and content types"
    },
    {
      icon: Target,
      title: "Content Templates",
      description: "Pre-built templates for tutorials, product launches, behind-the-scenes, and more"
    },
    {
      icon: Calendar,
      title: "Smart Scheduler",
      description: "AI suggests optimal posting times based on your audience engagement patterns"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track performance metrics and get insights to improve your content strategy"
    },
    {
      icon: TrendingUp,
      title: "Trend Analysis",
      description: "Stay ahead with AI-powered trend detection and content opportunity alerts"
    },
    {
      icon: Shield,
      title: "Brand Safety",
      description: "Built-in content moderation ensures your brand voice stays consistent and appropriate"
    }
  ];

  return (
    <div className="relative">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-purple-50/40 to-pink-50/70 -z-10" />
      
      <div className="space-y-8 md:space-y-12 safe-area-padding py-12 md:py-16">
        <div className="text-center space-y-4 max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900 leading-tight">
            Powerful features built for creators
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-body">
            Advanced tools that adapt to your workflow and grow with your brand
          </p>
        </div>

        {/* Enhanced mobile-first responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4">
          {appFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-white border border-gray-200 shadow-sm transition-shadow duration-200 hover:shadow-md p-6 h-full">
                <div className="flex flex-col items-start gap-4 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="space-y-3 flex-grow">
                    <h3 className="font-heading font-semibold text-gray-900 text-lg leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-body text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
