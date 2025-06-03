
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContentTopicSectionProps {
  customPrompt: string;
  contentType: string;
  onPromptChange: (prompt: string) => void;
  onRandomContentBrief: () => void;
}

export const ContentTopicSection = ({
  customPrompt,
  contentType,
  onPromptChange,
  onRandomContentBrief
}: ContentTopicSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
      <CardHeader className={`${isMobile ? 'pb-3 px-4 pt-4' : 'pb-4'}`}>
        <div className="flex items-center justify-between">
          <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} text-purple-900 font-bold`}>
            🧩 Content Topic
          </CardTitle>
          <Button
            onClick={onRandomContentBrief}
            variant="ghost"
            size="sm"
            className={`text-purple-600 hover:text-purple-700 hover:bg-purple-100 ${isMobile ? 'px-2' : ''}`}
          >
            <Lightbulb className="w-4 h-4 mr-1" />
            {!isMobile && 'Get Ideas'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className={`space-y-4 ${isMobile ? 'px-4 pb-4' : ''}`}>
        <Textarea
          placeholder={
            contentType === 'video-script' 
              ? "Describe your video content... (e.g., 'Create a 60-second script about morning productivity tips for busy professionals')"
              : "Describe what you want to post about... (e.g., 'Announce our new product launch with excitement and include benefits for customers')"
          }
          value={customPrompt}
          onChange={(e) => onPromptChange(e.target.value)}
          className={`resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400 text-base ${isMobile ? 'min-h-24' : 'min-h-28'}`}
        />
      </CardContent>
    </Card>
  );
};
