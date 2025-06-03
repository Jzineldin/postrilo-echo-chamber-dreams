
export interface SubscriptionFeatures {
  monthlyPostsLimit: number;
  platforms: string[];
  templates: string[];
  hasHashtagResearch: boolean;
  hasContentCalendar: boolean;
  hasAnalytics: boolean;
  hasTeamCollaboration: boolean;
  hasCustomTemplates: boolean;
  hasAdvancedBrandVoice: boolean;
  supportLevel: 'community' | 'email' | 'priority';
  hasAdvancedScheduling: boolean;
}

export const PLAN_FEATURES: Record<string, SubscriptionFeatures> = {
  'Free': {
    monthlyPostsLimit: 5,
    platforms: ['twitter', 'facebook'],
    templates: ['basic-post', 'quote-inspiration', 'brand-story'],
    hasHashtagResearch: false,
    hasContentCalendar: false,
    hasAnalytics: false,
    hasTeamCollaboration: false,
    hasCustomTemplates: false,
    hasAdvancedBrandVoice: false,
    supportLevel: 'community',
    hasAdvancedScheduling: false,
  },
  'Creator': {
    monthlyPostsLimit: 50,
    platforms: ['twitter', 'facebook', 'instagram', 'linkedin', 'tiktok', 'youtube'],
    templates: [
      'basic-post', 'quote-inspiration', 'brand-story', 'product-launch', 
      'tutorial-post', 'behind-the-scenes', 'community-post', 'educational-carousel'
    ],
    hasHashtagResearch: true,
    hasContentCalendar: true,
    hasAnalytics: false,
    hasTeamCollaboration: false,
    hasCustomTemplates: false,
    hasAdvancedBrandVoice: false,
    supportLevel: 'email',
    hasAdvancedScheduling: true,
  },
  'Business': {
    monthlyPostsLimit: 999999, // Unlimited
    platforms: ['twitter', 'facebook', 'instagram', 'linkedin', 'tiktok', 'youtube', 'pinterest', 'snapchat', 'reddit'],
    templates: [
      'basic-post', 'quote-inspiration', 'brand-story', 'product-launch', 
      'tutorial-post', 'behind-the-scenes', 'community-post', 'educational-carousel',
      'custom-template-1', 'custom-template-2', 'custom-template-3'
    ],
    hasHashtagResearch: true,
    hasContentCalendar: true,
    hasAnalytics: true,
    hasTeamCollaboration: true,
    hasCustomTemplates: true,
    hasAdvancedBrandVoice: true,
    supportLevel: 'priority',
    hasAdvancedScheduling: true,
  },
};

export const getSubscriptionFeatures = (planName: string): SubscriptionFeatures => {
  return PLAN_FEATURES[planName] || PLAN_FEATURES['Free'];
};

export const hasFeatureAccess = (planName: string, feature: keyof SubscriptionFeatures): boolean => {
  const features = getSubscriptionFeatures(planName);
  return Boolean(features[feature]);
};
