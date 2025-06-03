
import React from "react";
import { Badge } from "@/components/ui/badge";
import { platforms, demoContent } from "../constants/demoData";

interface ResultDisplayProps {
  selectedPlatform: string;
  typingText: string;
}

export const ResultDisplay = ({ selectedPlatform, typingText }: ResultDisplayProps) => {
  const platform = platforms.find(p => p.id === selectedPlatform);
  const Icon = platform?.icon;
  
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border shadow-sm max-h-80 overflow-y-auto">
        <div className="flex items-center gap-2 p-4 border-b bg-gray-50">
          {Icon && <Icon className="w-5 h-5" style={{ color: selectedPlatform === 'instagram' ? '#E4405F' : selectedPlatform === 'twitter' ? '#1DA1F2' : selectedPlatform === 'linkedin' ? '#0077B5' : '#000' }} />}
          <span className="font-medium">{platform?.name} Post</span>
          <Badge className="bg-green-100 text-green-700 ml-auto">✅ Optimized</Badge>
        </div>
        <div className="p-4">
          <div className="text-sm whitespace-pre-line leading-relaxed font-mono">
            {typingText}
            {typingText.length < demoContent[selectedPlatform as keyof typeof demoContent].length && (
              <span className="animate-pulse">|</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="font-medium text-blue-900">Engagement Score</p>
          <p className="text-2xl font-bold text-blue-600">94%</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="font-medium text-green-900">Readability</p>
          <p className="text-2xl font-bold text-green-600">A+</p>
        </div>
      </div>
    </div>
  );
};
