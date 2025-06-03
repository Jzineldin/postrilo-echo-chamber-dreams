
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

interface StrategicCTAsProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
  user: any;
  variant: "after-hero" | "after-features" | "after-demo" | "urgency";
}

export const StrategicCTAs = ({ onGetStarted, onTryDemo, user, variant }: StrategicCTAsProps) => {
  if (variant === "after-hero") {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-white text-lg mb-4 font-semibold">
            Join 10,000+ creators who save 10+ hours per week
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100 font-bold"
            >
              {user ? "Go to Dashboard" : "Start Free Today"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={onTryDemo}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-700"
            >
              Try Live Demo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "after-features") {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to 10x your content creation speed?
          </h3>
          <p className="text-gray-600 mb-6">
            Stop spending hours on content. Start creating like a pro in minutes.
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {user ? "Go to Dashboard" : "Get Started Free"}
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "after-demo") {
    return (
      <div className="py-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-lg text-gray-700 mb-4 font-medium">
            Liked what you saw? Create your first post in under 2 minutes
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-4"
          >
            {user ? "Start Creating Now" : "Sign Up Free"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "urgency") {
    return (
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-6">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-yellow-300" />
            <p className="text-white font-bold">Limited Time: Free Plan Includes Premium Templates</p>
            <Zap className="w-5 h-5 text-yellow-300" />
          </div>
          <p className="text-orange-100 text-sm mb-4">
            Start today and get access to our full template library • No credit card required
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 font-bold"
          >
            Claim Free Access Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
