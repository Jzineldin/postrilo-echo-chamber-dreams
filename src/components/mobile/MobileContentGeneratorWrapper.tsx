
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ContentGenerationErrorBoundary } from "@/components/error/ContentGenerationErrorBoundary";
import { MobileContentGeneratorEnhanced } from "./MobileContentGeneratorEnhanced";

interface MobileContentGeneratorWrapperProps {
  canGenerateMore?: boolean;
  postsRemaining?: number;
}

export const MobileContentGeneratorWrapper = ({
  canGenerateMore = true,
  postsRemaining = 5
}: MobileContentGeneratorWrapperProps) => {
  const isMobile = useIsMobile();

  // Only render mobile version for actual mobile devices
  if (!isMobile) {
    return null;
  }

  return (
    <ContentGenerationErrorBoundary
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Content Generator Unavailable</h2>
            <p className="text-gray-600 mb-4">We're experiencing technical difficulties with content generation. Please try again in a few moments.</p>
          </div>
        </div>
      }
    >
      <MobileContentGeneratorEnhanced
        canGenerateMore={canGenerateMore}
        postsRemaining={postsRemaining}
      />
    </ContentGenerationErrorBoundary>
  );
};
