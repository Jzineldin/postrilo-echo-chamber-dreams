
import React from "react";
import { MobileResponsiveContainer } from "@/components/mobile/MobileResponsiveContainer";
import { LazyComponentBoundary } from "@/components/optimized/LazyComponentBoundary";
import { OptimizedPlatformExamples } from "@/components/PerformanceOptimizations";

interface PlatformExamplesSectionProps {
  isMobile: boolean;
}

export const PlatformExamplesSection = ({ isMobile }: PlatformExamplesSectionProps) => {
  return (
    <MobileResponsiveContainer padding={isMobile ? "sm" : "default"}>
      <div className={`${isMobile ? 'py-8' : 'py-12'}`}>
        <LazyComponentBoundary rootMargin="700px">
          <OptimizedPlatformExamples />
        </LazyComponentBoundary>
      </div>
    </MobileResponsiveContainer>
  );
};
