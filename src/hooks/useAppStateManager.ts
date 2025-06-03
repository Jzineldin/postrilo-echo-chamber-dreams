
import { useState, useEffect } from 'react';

export interface AppState {
  user: any;
  canGenerateMore: boolean;
  postsRemaining: number;
  monthlyLimit: number;
  postsUsedThisMonth: number;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
}

export const useAppStateManager = () => {
  const [appState, setAppState] = useState<AppState>({
    user: null,
    canGenerateMore: true,
    postsRemaining: 5,
    monthlyLimit: 5,
    postsUsedThisMonth: 0,
    subscriptionTier: 'free'
  });

  useEffect(() => {
    // Load app state from localStorage or API
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setAppState(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse saved app state:', error);
      }
    }
  }, []);

  const updateUser = (user: any) => {
    setAppState(prev => {
      const newState = { ...prev, user };
      localStorage.setItem('appState', JSON.stringify(newState));
      return newState;
    });
  };

  const decrementPostsRemaining = () => {
    setAppState(prev => {
      const newPostsUsed = prev.postsUsedThisMonth + 1;
      const newPostsRemaining = Math.max(0, prev.monthlyLimit - newPostsUsed);
      const newState = {
        ...prev,
        postsUsedThisMonth: newPostsUsed,
        postsRemaining: newPostsRemaining,
        canGenerateMore: newPostsRemaining > 0
      };
      localStorage.setItem('appState', JSON.stringify(newState));
      return newState;
    });
  };

  const updateSubscription = (tier: 'free' | 'pro' | 'enterprise') => {
    const limits = {
      free: 5,
      pro: 100,
      enterprise: 1000
    };

    setAppState(prev => {
      const newLimit = limits[tier];
      const newPostsRemaining = Math.max(0, newLimit - prev.postsUsedThisMonth);
      const newState = {
        ...prev,
        subscriptionTier: tier,
        monthlyLimit: newLimit,
        postsRemaining: newPostsRemaining,
        canGenerateMore: newPostsRemaining > 0
      };
      localStorage.setItem('appState', JSON.stringify(newState));
      return newState;
    });
  };

  const resetMonthlyUsage = () => {
    setAppState(prev => {
      const newState = {
        ...prev,
        postsUsedThisMonth: 0,
        postsRemaining: prev.monthlyLimit,
        canGenerateMore: true
      };
      localStorage.setItem('appState', JSON.stringify(newState));
      return newState;
    });
  };

  return {
    ...appState,
    updateUser,
    decrementPostsRemaining,
    updateSubscription,
    resetMonthlyUsage
  };
};
