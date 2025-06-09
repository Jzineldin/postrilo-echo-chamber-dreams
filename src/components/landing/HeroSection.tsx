
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, Target, Play, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroSectionProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
  onBrowseTemplates: () => void;
  user: any;
  isMobile: boolean;
}

export const HeroSection = ({
  onGetStarted,
  onTryDemo,
  onBrowseTemplates,
  user,
  isMobile
}: HeroSectionProps) => {
  const handleGetStarted = () => {
    console.log("HeroSection: Get Started clicked");
    onGetStarted();
  };

  const handleTryDemo = () => {
    console.log("HeroSection: Try Demo clicked");
    onTryDemo();
  };

  const handleBrowseTemplates = () => {
    console.log("HeroSection: Browse Templates clicked");
    onBrowseTemplates();
  };

  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white py-20 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJtIDYwIDAgdiA2MCBoIC02MCB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYyMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Content Creation</span>
          </div>
          
          <h1 className={`font-bold text-white mb-6 ${isMobile ? 'text-4xl' : 'text-6xl'}`}>
            Create Engaging Content
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              with AI Magic
            </span>
          </h1>
          
          <p className={`text-purple-100 max-w-2xl mx-auto mb-8 ${isMobile ? 'text-lg' : 'text-xl'}`}>
            Generate high-converting social media posts, articles, and marketing copy 
            tailored to your brand in seconds. No more writer's block.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`flex gap-4 justify-center mb-12 ${isMobile ? 'flex-col items-center' : 'flex-row'}`}>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-2 border-orange-400 font-bold px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            {user ? (
              <>
                <Target className="w-5 h-5 mr-2" />
                Go to Dashboard
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Get Started Free
              </>
            )}
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={handleTryDemo}
            className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-purple-700 font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            Try Demo
          </Button>
          
          <Button
            size="lg"
            variant="ghost"
            onClick={handleBrowseTemplates}
            className="bg-purple-800/40 backdrop-blur-sm border-2 border-purple-300 text-white hover:bg-purple-700 hover:border-purple-200 font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <FileText className="w-5 h-5 mr-2" />
            Browse Templates
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Feature highlights */}
        <div className={`grid gap-6 text-purple-100 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>AI-Powered Generation</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <span>Platform Optimized</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <span>Instant Results</span>
          </div>
        </div>
      </div>
    </section>
  );
};
