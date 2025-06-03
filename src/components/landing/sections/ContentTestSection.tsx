
import React from "react";
import { MobileResponsiveContainer, MobileStack } from "@/components/mobile/MobileResponsiveContainer";
import { LazyComponentBoundary } from "@/components/optimized/LazyComponentBoundary";
import { FormValidation } from "@/components/FormValidation";

interface ContentTestSectionProps {
  onFormDemo: (data: any) => void;
  isMobile: boolean;
}

export const ContentTestSection = ({ onFormDemo, isMobile }: ContentTestSectionProps) => {
  return (
    <MobileResponsiveContainer padding={isMobile ? "sm" : "default"}>
      <div className={`${isMobile ? 'py-8' : 'py-12'}`}>
        <LazyComponentBoundary rootMargin="600px">
          <MobileStack spacing="sm">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className={`font-heading font-bold text-gray-900 leading-tight ${
                isMobile ? 'text-xl' : 'text-2xl md:text-3xl'
              }`}>
                Test with your own content ideas
              </h2>
              <p className={`text-gray-600 leading-relaxed font-body mt-2 ${
                isMobile ? 'text-sm px-2' : 'text-base md:text-lg'
              }`}>
                Enter your topic and see how our AI creates engaging content
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <FormValidation onSubmit={onFormDemo} />
            </div>
          </MobileStack>
        </LazyComponentBoundary>
      </div>
    </MobileResponsiveContainer>
  );
};
