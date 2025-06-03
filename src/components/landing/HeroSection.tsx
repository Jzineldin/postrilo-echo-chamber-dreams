
import React from "react";
import { MobileOptimizedHero } from "@/components/mobile/MobileOptimizedHero";
import { ContextualNavigation } from "@/components/navigation/ContextualNavigation";

interface HeroSectionProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
  onBrowseTemplates: () => void;
  user: any;
  isMobile: boolean;
}

export const HeroSection = (props: HeroSectionProps) => {
  const breadcrumbItems = [
    { label: "Home", href: "/", current: true }
  ];

  return (
    <div className="relative">
      <ContextualNavigation
        breadcrumbItems={breadcrumbItems}
        showBreadcrumbs={!props.isMobile}
        className="hidden md:block"
      />
      <MobileOptimizedHero {...props} />
    </div>
  );
};
