
import React from "react";
import { MobileContentGeneratorEnhanced } from "./MobileContentGeneratorEnhanced";
import { MobileResponsiveWrapper } from "./MobileResponsiveWrapper";

interface MobileContentGeneratorProps {
  onContentGenerated?: (content: any) => void;
  onGenerationError?: (error: any) => void;
  isGenerating?: boolean;
  canGenerateMore?: boolean;
  postsRemaining?: number;
}

export const MobileContentGenerator = ({
  onContentGenerated,
  onGenerationError,
  isGenerating = false,
  canGenerateMore = true,
  postsRemaining = 0
}: MobileContentGeneratorProps) => {
  return (
    <MobileResponsiveWrapper
      mobileComponent={
        <MobileContentGeneratorEnhanced
          canGenerateMore={canGenerateMore}
          postsRemaining={postsRemaining}
        />
      }
    >
      {/* Fallback for non-mobile */}
      <div className="p-4 text-center text-gray-600">
        Please use the desktop version for the full content generation experience.
      </div>
    </MobileResponsiveWrapper>
  );
};
