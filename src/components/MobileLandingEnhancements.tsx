
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, CheckCircle, FileText, Sparkles } from "lucide-react";

interface MobileLandingEnhancementsProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
  onBrowseTemplates: () => void;
  user: any;
}

export const MobileLandingEnhancements = ({ 
  onGetStarted, 
  onTryDemo, 
  onBrowseTemplates,
  user 
}: MobileLandingEnhancementsProps) => {
  const handleScrollToExamples = () => {
    document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile-Optimized Hero Section */}
      <div className="text-center space-y-6 md:space-y-8 px-4 md:px-0">
        <div className="space-y-4 md:space-y-6">
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 font-heading animate-pulse">
            ✨ AI-Powered Content Creation Platform
          </Badge>
          
          {/* Mobile-responsive heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-gray-900 leading-tight px-2 md:px-0">
            Create a month's worth of{" "}
            <span className="gradient-text block sm:inline">
              branded content
            </span>{" "}
            in minutes
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-body px-4 md:px-0">
            AI that understands your brand voice, schedules your content, and tracks performance across all platforms
          </p>
        </div>

        {/* Mobile-optimized CTA buttons */}
        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center px-4 md:px-0">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-10 py-6 sm:py-8 text-lg sm:text-xl rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-heading font-semibold min-h-[56px] touch-friendly"
          >
            {user ? "Go to Dashboard" : "Get Started Free"}
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
          </Button>
          
          <Button 
            onClick={onTryDemo}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-2 border-purple-200 hover:border-purple-300 px-6 sm:px-10 py-6 sm:py-8 text-lg sm:text-xl rounded-xl hover:bg-purple-50 transition-all duration-300 font-heading font-medium group min-h-[56px] touch-friendly"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 transition-transform" />
            {user ? "Try Content Generator" : "Interactive Demo"}
          </Button>
        </div>

        {/* Mobile-optimized quick access buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center pt-2 sm:pt-4 px-4 md:px-0">
          <Button 
            variant="ghost" 
            onClick={onBrowseTemplates}
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-all min-h-[44px] touch-friendly"
          >
            <FileText className="w-4 h-4 mr-2" />
            Browse Templates
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleScrollToExamples}
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-all min-h-[44px] touch-friendly"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            See Examples
          </Button>
        </div>

        {/* Mobile-optimized trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500 pt-4 font-body px-4 md:px-0">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Setup in 2 minutes</span>
          </div>
        </div>
      </div>
    </>
  );
};
