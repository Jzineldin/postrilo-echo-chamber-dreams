
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { platforms } from "../constants/demoData";
import { useIsMobile } from "@/hooks/use-mobile";

interface PlatformSelectorProps {
  selectedPlatform: string;
  onPlatformSelect: (platformId: string) => void;
}

export const PlatformSelector = ({ selectedPlatform, onPlatformSelect }: PlatformSelectorProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = selectedPlatform === platform.id;
          return (
            <Card 
              key={platform.id} 
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                isSelected ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => onPlatformSelect(platform.id)}
            >
              <CardContent className={`${isMobile ? 'p-3' : 'p-4'} text-center`}>
                <div className={`w-10 h-10 bg-gradient-to-br ${platform.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-medium">{platform.name}</p>
                <p className="text-xs text-gray-500">{platform.audience}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="text-center">
        <Badge variant="outline" className="text-xs">
          ✨ AI optimizes content for each platform's unique algorithm
        </Badge>
      </div>
    </div>
  );
};
