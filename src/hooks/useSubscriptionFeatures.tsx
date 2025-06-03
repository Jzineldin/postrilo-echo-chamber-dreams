
import { useUserRole } from "./useUserRole";
import { useSubscription } from "./useSubscription";
import { SubscriptionFeaturesReturn } from "@/types/subscriptionTypes";
import { 
  createFeatureHelpers, 
  getSubscriptionFeatures, 
  getBusinessUserFeatures, 
  isBusinessUser, 
  normalizeSubscriptionTier 
} from "@/utils/subscriptionUtils";

export const useSubscriptionFeatures = (subscription: string = 'free'): SubscriptionFeaturesReturn => {
  const { isAdmin } = useUserRole();
  const { planName, subscriptionTier } = useSubscription();
  
  // Use the subscription from the hook if available, otherwise fall back to the parameter
  const currentSubscription = planName || subscription;
  const currentPlanName = currentSubscription;
  
  // Admin users get access to all features regardless of subscription
  if (isAdmin) {
    const adminFeatures = getBusinessUserFeatures();
    const helpers = createFeatureHelpers(adminFeatures);
    
    return {
      ...adminFeatures,
      currentPlanName,
      ...helpers,
      features: adminFeatures
    };
  }
  
  // Check if this is a business user (either from subscription tier or plan name)
  if (isBusinessUser(subscriptionTier, currentPlanName)) {
    const businessFeatures = getBusinessUserFeatures();
    const helpers = createFeatureHelpers(businessFeatures);
    
    return {
      ...businessFeatures,
      currentPlanName,
      ...helpers,
      features: businessFeatures
    };
  }
  
  // Regular subscription-based features
  const normalizedTier = normalizeSubscriptionTier(currentSubscription);
  const planFeatures = getSubscriptionFeatures(normalizedTier);
  const helpers = createFeatureHelpers(planFeatures);

  return {
    ...planFeatures,
    currentPlanName,
    ...helpers,
    features: planFeatures
  };
};
