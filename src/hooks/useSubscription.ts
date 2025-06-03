
import { useState, useEffect } from 'react';

export interface SubscriptionData {
  subscribed: boolean;
  planName: string;
  postsUsedThisMonth: number;
  monthlyPostsLimit: number;
  billingPeriodEnd?: string;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    subscribed: false,
    planName: 'Free',
    postsUsedThisMonth: 0,
    monthlyPostsLimit: 5,
    subscriptionTier: 'free'
  });

  useEffect(() => {
    // Load subscription data from localStorage or API
    const savedSubscription = localStorage.getItem('subscription');
    if (savedSubscription) {
      try {
        const parsed = JSON.parse(savedSubscription);
        setSubscription(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse subscription data:', error);
      }
    }
  }, []);

  const updateSubscription = (newData: Partial<SubscriptionData>) => {
    setSubscription(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('subscription', JSON.stringify(updated));
      return updated;
    });
  };

  const incrementUsage = () => {
    setSubscription(prev => {
      const updated = {
        ...prev,
        postsUsedThisMonth: prev.postsUsedThisMonth + 1
      };
      localStorage.setItem('subscription', JSON.stringify(updated));
      return updated;
    });
  };

  const resetMonthlyUsage = () => {
    setSubscription(prev => {
      const updated = {
        ...prev,
        postsUsedThisMonth: 0
      };
      localStorage.setItem('subscription', JSON.stringify(updated));
      return updated;
    });
  };

  return {
    ...subscription,
    updateSubscription,
    incrementUsage,
    resetMonthlyUsage
  };
};
