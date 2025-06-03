
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { HeroSection } from "../HeroSection";
import { KeyBenefitsSection } from "../KeyBenefitsSection";
import { HowItWorksSection } from "../HowItWorksSection";
import { AppFeaturesSection } from "../AppFeaturesSection";
import { InteractiveDemoSection } from "./InteractiveDemoSection";
import { PlatformExamplesSection } from "./PlatformExamplesSection";
import { RealTimeEngagementSection } from "./RealTimeEngagementSection";
import { ContentTestSection } from "./ContentTestSection";
import { FAQSection } from "../FAQSection";
import { FinalCTASection } from "../FinalCTASection";
import { FloatingCTA } from "../FloatingCTA";
import { IndustryUseCases } from "../IndustryUseCases";
import { StrategicCTAs } from "../StrategicCTAs";
import { SocialProofSection } from "./SocialProofSection";
import { AnalyticsDashboardSection } from "./AnalyticsDashboardSection";
import { EnhancedMobileOptimizations } from "@/components/mobile/EnhancedMobileOptimizations";
import { useConversionTracking } from "@/hooks/useConversionTracking";

interface LandingPageSectionsProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
  onBrowseTemplates: () => void;
  onTryTemplate: (templateId: string) => void;
  onFormDemo: (data: any) => void;
  user: any;
}

export const LandingPageSections = ({
  onGetStarted,
  onTryDemo,
  onBrowseTemplates,
  onTryTemplate,
  onFormDemo,
  user
}: LandingPageSectionsProps) => {
  const isMobile = useIsMobile();
  const { trackConversion: trackUserConversion } = useConversionTracking();

  const handleGetStarted = () => {
    trackUserConversion('cta_signup_click', { source: 'landing_page' });
    onGetStarted();
  };

  const handleTryDemo = () => {
    trackUserConversion('cta_demo_click', { source: 'landing_page' });
    onTryDemo();
  };

  const handleBrowseTemplates = () => {
    trackUserConversion('browse_templates_click', { source: 'landing_page' });
    onBrowseTemplates();
  };

  return (
    <EnhancedMobileOptimizations>
      <div className="relative">
        {/* Floating CTA for mobile */}
        <FloatingCTA onGetStarted={handleGetStarted} user={user} />
        
        {/* Hero Section */}
        <HeroSection
          onGetStarted={handleGetStarted}
          onTryDemo={handleTryDemo}
          onBrowseTemplates={handleBrowseTemplates}
          user={user}
          isMobile={isMobile}
        />

        {/* Strategic CTA after hero */}
        <StrategicCTAs
          onGetStarted={handleGetStarted}
          onTryDemo={handleTryDemo}
          user={user}
          variant="after-hero"
        />

        {/* Key Benefits */}
        <KeyBenefitsSection isMobile={isMobile} />

        {/* Industry Use Cases */}
        <IndustryUseCases />

        {/* Strategic CTA after features */}
        <StrategicCTAs
          onGetStarted={handleGetStarted}
          onTryDemo={handleTryDemo}
          user={user}
          variant="after-features"
        />

        {/* How It Works */}
        <HowItWorksSection 
          onGetStarted={handleGetStarted}
          user={user}
          isMobile={isMobile}
        />

        {/* App Features */}
        <AppFeaturesSection isMobile={isMobile} />

        {/* Interactive Demo */}
        <InteractiveDemoSection 
          onTryDemo={handleTryDemo}
          isMobile={isMobile}
        />

        {/* Strategic CTA after demo */}
        <StrategicCTAs
          onGetStarted={handleGetStarted}
          onTryDemo={handleTryDemo}
          user={user}
          variant="after-demo"
        />

        {/* Platform Examples */}
        <PlatformExamplesSection isMobile={isMobile} />

        {/* Real-time Engagement */}
        <RealTimeEngagementSection isMobile={isMobile} />

        {/* Social Proof Section */}
        <SocialProofSection />

        {/* Analytics Dashboard Section */}
        <AnalyticsDashboardSection />

        {/* Content Test */}
        <ContentTestSection 
          onFormDemo={onFormDemo}
          isMobile={isMobile}
        />

        {/* Urgency CTA */}
        <StrategicCTAs
          onGetStarted={handleGetStarted}
          onTryDemo={handleTryDemo}
          user={user}
          variant="urgency"
        />

        {/* FAQ */}
        <FAQSection isMobile={isMobile} />

        {/* Final CTA */}
        <FinalCTASection
          onGetStarted={handleGetStarted}
          user={user}
          isMobile={isMobile}
        />
      </div>
    </EnhancedMobileOptimizations>
  );
};
