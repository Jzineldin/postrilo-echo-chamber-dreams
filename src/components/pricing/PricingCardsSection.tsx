
import { PricingCard } from "@/components/pricing/PricingCard";
import { pricingPlans, PricingPlan } from "@/components/pricing/PricingPlansData";

interface PricingCardsSectionProps {
  currentPlanName: string;
  loading: boolean;
  onPlanSelect: (plan: PricingPlan) => void;
  trackVariantEvent: (action: string, metadata?: any) => void;
  variantId: string;
}

export const PricingCardsSection = ({ 
  currentPlanName, 
  loading, 
  onPlanSelect, 
  trackVariantEvent,
  variantId 
}: PricingCardsSectionProps) => {
  return (
    <section id="plans" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
        {pricingPlans.map((plan, index) => (
          <div key={index} data-pricing-card data-plan={plan.name} className="w-full h-full">
            <PricingCard
              plan={plan}
              currentPlanName={currentPlanName}
              loading={loading}
              onPlanSelect={(selectedPlan) => {
                trackVariantEvent('plan_selected', {
                  plan_name: selectedPlan.name,
                  variant_id: variantId
                });
                onPlanSelect(selectedPlan);
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
