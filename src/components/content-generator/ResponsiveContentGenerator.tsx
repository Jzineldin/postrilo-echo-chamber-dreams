
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { OptimizedContentGenerator } from './OptimizedContentGenerator';
import { MobileContentForm } from '@/components/mobile/MobileContentForm';
import { ContentGeneratorProps } from '@/types/unifiedContentGeneration';
import { APP_CONFIG } from '@/config/app';

export const ResponsiveContentGenerator = ({
  canGenerateMore = true,
  postsRemaining = APP_CONFIG.defaultPostLimit,
  onContentGenerated,
  onGenerationError,
  showHeader = true,
  className = ''
}: ContentGeneratorProps) => {
  const isMobile = useIsMobile();
  const { measurePerformance } = usePerformanceOptimization();

  // Measure component rendering performance
  return measurePerformance('ResponsiveContentGenerator Render', () => (
    <div className={`responsive-content-generator ${className}`}>
      {isMobile ? (
        <div className="mobile-optimized">
          <OptimizedContentGenerator
            canGenerateMore={canGenerateMore}
            postsRemaining={postsRemaining}
          />
        </div>
      ) : (
        <div className="desktop-optimized">
          <OptimizedContentGenerator
            canGenerateMore={canGenerateMore}
            postsRemaining={postsRemaining}
          />
        </div>
      )}
    </div>
  )) as JSX.Element;
};
