
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Lightbulb, MessageSquare, Calendar, BarChart3, Users } from "lucide-react";

interface KeyBenefitsSectionProps {
  isMobile: boolean;
}

export const KeyBenefitsSection = ({ isMobile }: KeyBenefitsSectionProps) => {
  const keyBenefits = [
    {
      icon: Clock,
      title: "Save 5+ hours per week",
      description: "Generate weeks of content in minutes with our AI-powered content engine."
    },
    {
      icon: Lightbulb,
      title: "Smart content suggestions",
      description: "AI analyzes trending topics and your brand voice to suggest high-performing content ideas."
    },
    {
      icon: MessageSquare,
      title: "Consistent brand voice",
      description: "Train custom brand voices that maintain your unique tone across all platforms."
    },
    {
      icon: Calendar,
      title: "Content scheduling made easy",
      description: "Plan and schedule your content across multiple platforms with our built-in scheduler."
    },
    {
      icon: BarChart3,
      title: "Performance analytics",
      description: "Track engagement, optimize content performance, and get actionable insights to grow your audience."
    },
    {
      icon: Users,
      title: "Multi-platform optimization",
      description: "Each post is automatically optimized for platform-specific best practices and character limits."
    }
  ];

  return (
    <div className="relative">
      {/* Enhanced background with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-purple-50/60 -z-10" />
      
      <div className="space-y-2 md:space-y-4 safe-area-padding py-3 md:py-5">
        <div className="text-center space-y-1 md:space-y-2 max-w-3xl mx-auto px-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-gray-900 leading-tight">
            Everything you need for social media success
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-body">
            From content creation to performance tracking - all in one powerful platform
          </p>
        </div>

        {/* Ultra-compact mobile-optimized grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 max-w-5xl mx-auto px-1">
          {keyBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="bg-white border border-gray-200 shadow-sm transition-shadow duration-200 hover:shadow-md h-full">
                <CardHeader className="pb-1.5 text-center space-y-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto shadow-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-sm sm:text-base font-heading font-bold text-gray-900 leading-tight">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-gray-700 leading-relaxed font-body text-xs">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
