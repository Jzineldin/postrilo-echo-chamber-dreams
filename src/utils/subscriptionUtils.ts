
import { SubscriptionFeatures, SubscriptionTier, SubscriptionFeaturesReturn } from "@/types/subscriptionTypes";
import { SUBSCRIPTION_FEATURES, BUSINESS_USER_FEATURES } from "@/config/subscriptionConfig";

export const createFeatureHelpers = (features: SubscriptionFeatures): Pick<SubscriptionFeaturesReturn, 'hasAccess' | 'canAccessPlatform' | 'canAccessTemplate' | 'getAvailablePlatforms' | 'getAvailableTemplates'> => {
  return {
    hasAccess: (feature: string) => features[feature as keyof SubscriptionFeatures] as boolean,
    canAccessPlatform: (platformId: string) => features.platforms?.includes(platformId) || false,
    canAccessTemplate: (templateId: string) => features.templates?.includes(templateId) || false,
    getAvailablePlatforms: () => features.platforms || [],
    getAvailableTemplates: () => features.templates || []
  };
};

export const getSubscriptionFeatures = (subscriptionTier: SubscriptionTier): SubscriptionFeatures => {
  return SUBSCRIPTION_FEATURES[subscriptionTier] || SUBSCRIPTION_FEATURES.free;
};

export const getBusinessUserFeatures = (): SubscriptionFeatures => {
  return BUSINESS_USER_FEATURES;
};

export const isBusinessUser = (subscriptionTier?: string, planName?: string): boolean => {
  return subscriptionTier === 'business' || planName === 'Business';
};

export const normalizeSubscriptionTier = (planName?: string): SubscriptionTier => {
  if (!planName) return 'free';
  return planName.toLowerCase() as SubscriptionTier;
};
