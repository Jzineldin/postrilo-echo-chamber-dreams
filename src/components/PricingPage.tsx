
import { Suspense } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { usePlanSelection } from "@/hooks/usePlanSelection";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { PricingCardsSection } from "@/components/pricing/PricingCardsSection";
import { PricingSections } from "@/components/pricing/PricingSections";
import { PricingNavigation } from "@/components/pricing/PricingNavigation";
import { PricingMobileOptimizations } from "@/components/pricing/PricingMobileOptimizations";
import { PricingSkeletonLoader } from "@/components/pricing/PricingSkeletonLoader";
import { PricingAccessibility } from "@/components/pricing/PricingAccessibility";
import { PricingProgressBar } from "@/components/pricing/PricingProgressBar";
import { PricingErrorBoundary } from "@/components/pricing/PricingErrorBoundary";
import { PricingAnalytics } from "@/components/pricing/PricingAnalytics";
import { PricingABTest, pricingPageVariants } from "@/components/pricing/PricingABTest";
import { PricingHeatmap } from "@/components/pricing/PricingHeatmap";
import { PricingConversionTracking } from "@/components/pricing/PricingConversionTracking";
import { pricingPlans } from "@/components/pricing/PricingPlansData";

interface PricingPageProps {
  onSelectPlan: () => void;
}

export const PricingPage = ({ onSelectPlan }: PricingPageProps) => {
  const { loading } = useSubscription();
  const { handlePlanSelection, planName, user } = usePlanSelection({ onSelectPlan });

  const handleCreatorPlanSelect = () => {
    handlePlanSelection(pricingPlans[1]);
  };

  return (
    <PricingErrorBoundary>
      <PricingABTest testName="pricing_page_v1" variants={pricingPageVariants}>
        {(variant, trackVariantEvent) => (
          <>
            {/* Analytics and Tracking Components */}
            <PricingAnalytics variant={variant.id} />
            <PricingConversionTracking />
            <PricingHeatmap />
            
            {/* Enhanced Optimizations */}
            <PricingMobileOptimizations />
            <PricingAccessibility />
            <PricingProgressBar />
            <PricingNavigation />
            
            <Suspense fallback={<PricingSkeletonLoader />}>
              <div className="bg-gradient-to-br from-gray-50 via-white to-purple-50/30 min-h-screen mobile-no-scroll">
                <div className="max-w-7xl mx-auto mobile-section-spacing py-6 sm:py-8 lg:py-12 safe-area-all">
                  <PricingHeader />

                  <PricingCardsSection 
                    currentPlanName={planName}
                    loading={loading}
                    onPlanSelect={handlePlanSelection}
                    trackVariantEvent={trackVariantEvent}
                    variantId={variant.id}
                  />

                  <PricingSections
                    user={user}
                    onSelectPlan={onSelectPlan}
                    onCreatorPlanSelect={handleCreatorPlanSelect}
                    trackVariantEvent={trackVariantEvent}
                    variantId={variant.id}
                  />
                </div>
              </div>
            </Suspense>
          </>
        )}
      </PricingABTest>
    </PricingErrorBoundary>
  );
};
