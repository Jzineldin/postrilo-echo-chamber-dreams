
export type SubscriptionTier = 'free' | 'starter' | 'creator' | 'premium' | 'enterprise';

export interface SubscriptionFeatures {
  hasAdvancedScheduling: boolean;
  hasAnalytics: boolean;
  hasPrioritySupport: boolean;
  hasUnlimitedGeneration: boolean;
  hasAdvancedAI: boolean;
  hasBrandVoice: boolean;
  hasTeamCollaboration: boolean;
  hasCustomTemplates: boolean;
  hasAPIAccess: boolean;
  hasWhiteLabel: boolean;
  hasHashtagResearch: boolean;
  hasContentCalendar: boolean;
  hasAdvancedBrandVoice: boolean;
  maxContentPerMonth: number;
  maxBrandVoices: number;
  maxTeamMembers: number;
  platforms?: string[];
  templates?: string[];
}

export interface SubscriptionFeaturesReturn extends SubscriptionFeatures {
  currentPlanName: string;
  hasAccess: (feature: string) => boolean;
  canAccessPlatform: (platformId: string) => boolean;
  canAccessTemplate: (templateId: string) => boolean;
  getAvailablePlatforms: () => string[];
  getAvailableTemplates: () => string[];
  features: SubscriptionFeatures;
}
