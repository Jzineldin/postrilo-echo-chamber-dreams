
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface GenerateButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
  canGenerateMore: boolean;
  customPrompt: string;
  contentType: string;
}

export const GenerateButton = ({
  onGenerate,
  isGenerating,
  canGenerateMore,
  customPrompt,
  contentType
}: GenerateButtonProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
      <CardContent className={`${isMobile ? 'px-4 py-4' : 'pt-4'}`}>
        <Button
          onClick={onGenerate}
          disabled={!customPrompt.trim() || isGenerating || !canGenerateMore}
          className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold ${isMobile ? 'py-6 text-base' : 'py-6 text-lg'}`}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating {contentType === 'video-script' ? 'Script' : 'Content'}...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              Generate {contentType === 'video-script' ? 'Video Script' : 'Content'}
            </>
          )}
        </Button>

        {!canGenerateMore && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-800 font-medium text-center`}>
              You've reached your monthly limit. Upgrade to generate more content.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
