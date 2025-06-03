
import React from "react";
import { Play } from "lucide-react";
import { platforms } from "../constants/demoData";

interface GenerationStepProps {
  isGenerating: boolean;
  selectedPlatform: string;
}

export const GenerationStep = ({ isGenerating, selectedPlatform }: GenerationStepProps) => {
  return (
    <div className="text-center space-y-6">
      {isGenerating ? (
        <>
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto relative">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 animate-pulse opacity-20"></div>
          </div>
          <div className="space-y-3">
            <p className="font-medium text-lg">AI is crafting your content...</p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                <span>Analyzing {platforms.find(p => p.id === selectedPlatform)?.name} best practices</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <span>Generating engaging hooks and CTAs</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span>Optimizing hashtags and formatting</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
            <Play className="w-10 h-10 text-white" />
          </div>
          <p className="font-medium text-lg">Ready to generate your content?</p>
          <p className="text-gray-600">Our AI will create platform-specific content optimized for engagement</p>
        </div>
      )}
    </div>
  );
};
