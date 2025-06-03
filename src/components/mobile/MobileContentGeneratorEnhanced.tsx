import React from 'react';
import { ResponsiveContentGenerator } from '@/components/content-generator/ResponsiveContentGenerator';
import { APP_CONFIG } from '@/config/app';
import { ContentGeneratorProps } from '@/types/unifiedContentGeneration';

interface MobileContentGeneratorEnhancedProps extends ContentGeneratorProps {
  // Keep existing props for backward compatibility
}

export const MobileContentGeneratorEnhanced = ({
  canGenerateMore = true,
  postsRemaining = APP_CONFIG.defaultPostLimit,
  onContentGenerated,
  onGenerationError,
  showHeader = true,
  className = ''
}: MobileContentGeneratorEnhancedProps) => {
  return (
    <ResponsiveContentGenerator
      canGenerateMore={canGenerateMore}
      postsRemaining={postsRemaining}
      onContentGenerated={onContentGenerated}
      onGenerationError={onGenerationError}
      showHeader={showHeader}
      className={className}
    />
  );
};
