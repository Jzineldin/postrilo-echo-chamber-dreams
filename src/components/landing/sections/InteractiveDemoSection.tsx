
import React from "react";
import { MobileResponsiveContainer, MobileStack } from "@/components/mobile/MobileResponsiveContainer";
import { LazyComponentBoundary } from "@/components/optimized/LazyComponentBoundary";
import { DemoSectionSkeleton } from "@/components/loading/SkeletonLoaders";
import { InteractiveDemoLauncher } from "@/components/enhanced-demo/InteractiveDemoLauncher";

interface InteractiveDemoSectionProps {
  onTryDemo: () => void;
  isMobile: boolean;
}

export const InteractiveDemoSection = ({ onTryDemo, isMobile }: InteractiveDemoSectionProps) => {
  return (
    <MobileResponsiveContainer padding={isMobile ? "sm" : "default"}>
      <div className={`${isMobile ? 'py-8' : 'py-12'}`}>
        <LazyComponentBoundary 
          fallback={<DemoSectionSkeleton />}
          rootMargin="400px"
        >
          <MobileStack spacing="lg">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className={`font-heading font-bold text-gray-900 leading-tight ${
                isMobile ? 'text-xl' : 'text-2xl md:text-3xl'
              }`}>
                Try it yourself - no signup required
              </h2>
              <p className={`text-gray-600 leading-relaxed font-body mt-2 ${
                isMobile ? 'text-sm px-2' : 'text-base md:text-lg'
              }`}>
                Experience our AI content generator with this interactive demo
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <InteractiveDemoLauncher 
                onLaunchDemo={onTryDemo}
              />
            </div>
          </MobileStack>
        </LazyComponentBoundary>
      </div>
    </MobileResponsiveContainer>
  );
};
