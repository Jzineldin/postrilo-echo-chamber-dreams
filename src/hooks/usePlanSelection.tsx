
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { PricingPlan } from "@/components/pricing/PricingPlansData";

interface UsePlanSelectionProps {
  onSelectPlan: () => void;
}

export const usePlanSelection = ({ onSelectPlan }: UsePlanSelectionProps) => {
  const { user } = useAuth();
  const { planName, createCheckout } = useSubscription();

  const handlePlanSelection = async (plan: PricingPlan) => {
    // If user is not logged in, redirect to auth
    if (!user) {
      onSelectPlan();
      return;
    }

    // Check if this is a business user who shouldn't see upgrade options
    const businessEmails = ['sofia_reuterving@hotmail.com', 'thomas_janssen@mailrez.com', 'jzineldin96@gmail.com'];
    if (businessEmails.includes(user.email)) {
      console.log('Business user - no upgrade needed:', user.email);
      return;
    }

    // If it's the free plan or current plan, don't do anything
    if (!plan.stripePlanName || plan.name === planName) {
      return;
    }

    // Create checkout session for paid plans
    await createCheckout(plan.stripePlanName);
  };

  return {
    handlePlanSelection,
    planName,
    user
  };
};
