
import { PricingComparison } from "@/components/pricing/PricingComparison";
import { PricingInteractiveComparison } from "@/components/pricing/PricingInteractiveComparison";
import { PricingTestimonials } from "@/components/pricing/PricingTestimonials";
import { PricingSocialProof } from "@/components/pricing/PricingSocialProof";
import { PricingTrustIndicators } from "@/components/pricing/PricingTrustIndicators";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { PricingCTA } from "@/components/pricing/PricingCTA";

interface PricingSectionsProps {
  user: any;
  onSelectPlan: () => void;
  onCreatorPlanSelect: () => void;
  trackVariantEvent: (action: string, metadata?: any) => void;
  variantId: string;
}

export const PricingSections = ({ 
  user, 
  onSelectPlan, 
  onCreatorPlanSelect, 
  trackVariantEvent,
  variantId 
}: PricingSectionsProps) => {
  return (
    <div className="mobile-section-spacing space-y-12 lg:space-y-16">
      <section id="comparison">
        <PricingComparison />
        <div className="mt-8 lg:mt-12">
          <PricingInteractiveComparison />
        </div>
      </section>

      <section id="testimonials">
        <PricingTestimonials />
        <div className="mt-8 lg:mt-12">
          <PricingSocialProof />
        </div>
      </section>

      <PricingTrustIndicators />

      <section id="faq">
        <PricingFAQ />
      </section>

      <PricingCTA 
        user={user}
        onPlanSelect={() => {
          trackVariantEvent('final_cta_clicked', {
            variant_id: variantId,
            user_authenticated: !!user
          });
          onSelectPlan();
        }}
        onCreatorPlanSelect={() => {
          trackVariantEvent('creator_plan_selected', {
            variant_id: variantId,
            source: 'final_cta'
          });
          onCreatorPlanSelect();
        }}
      />
    </div>
  );
};
