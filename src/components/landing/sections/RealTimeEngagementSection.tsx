
import React from "react";
import { MobileResponsiveContainer, MobileStack } from "@/components/mobile/MobileResponsiveContainer";
import { LazyComponentBoundary } from "@/components/optimized/LazyComponentBoundary";
import { OptimizedInteractiveFeedback } from "@/components/PerformanceOptimizations";

interface RealTimeEngagementSectionProps {
  isMobile: boolean;
}

export const RealTimeEngagementSection = ({ isMobile }: RealTimeEngagementSectionProps) => {
  return (
    <MobileResponsiveContainer padding={isMobile ? "sm" : "default"}>
      <div className={`${isMobile ? 'py-8' : 'py-12'}`}>
        <LazyComponentBoundary rootMargin="500px">
          <MobileStack spacing="sm">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className={`font-heading font-bold text-gray-900 leading-tight ${
                isMobile ? 'text-xl' : 'text-2xl md:text-3xl'
              }`}>
                See real-time engagement metrics
              </h2>
              <p className={`text-gray-600 leading-relaxed font-body mt-2 ${
                isMobile ? 'text-sm px-2' : 'text-base md:text-lg'
              }`}>
                Watch how your content performs with live analytics and audience interaction
              </p>
            </div>
            <OptimizedInteractiveFeedback />
          </MobileStack>
        </LazyComponentBoundary>
      </div>
    </MobileResponsiveContainer>
  );
};
