
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface FinalCTASectionProps {
  onGetStarted: () => void;
  user: any;
  isMobile: boolean;
}

export const FinalCTASection = ({ 
  onGetStarted, 
  user, 
  isMobile 
}: FinalCTASectionProps) => {
  return (
    <div className="relative">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-blue-600/10 -z-10" />
      
      <div className="text-center space-y-2 md:space-y-4 safe-area-padding py-4 md:py-6">
        <div className="space-y-2 md:space-y-3 max-w-3xl mx-auto px-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-gray-900 leading-tight">
            Ready to transform your social media?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-body">
            Join thousands of creators who save hours every week with AI-powered content
          </p>
        </div>

        {/* Ultra-compact CTA */}
        <div className="space-y-2 md:space-y-3 max-w-xs mx-auto px-1">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-heading font-semibold touch-friendly"
          >
            {user ? "Go to Dashboard" : "Start Free Today"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          {/* Ultra-compact trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-xs text-gray-600 font-body">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
