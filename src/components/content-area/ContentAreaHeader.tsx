
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface ContentAreaHeaderProps {
  onBackToTemplates?: () => void;
  selectedPlatform?: string;
}

export const ContentAreaHeader = ({ 
  onBackToTemplates, 
  selectedPlatform 
}: ContentAreaHeaderProps) => {
  const getPlatformName = (platformId: string) => {
    const platformNames: Record<string, string> = {
      twitter: "Twitter/X",
      instagram: "Instagram",
      facebook: "Facebook",
      linkedin: "LinkedIn",
      tiktok: "TikTok",
      pinterest: "Pinterest"
    };
    return platformNames[platformId] || platformId;
  };

  if (!onBackToTemplates && !selectedPlatform) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      {onBackToTemplates && (
        <Button 
          onClick={onBackToTemplates} 
          variant="ghost" 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Templates
        </Button>
      )}
      
      {selectedPlatform && (
        <Badge variant="secondary" className="ml-auto">
          Creating for {getPlatformName(selectedPlatform)}
        </Badge>
      )}
    </div>
  );
};
