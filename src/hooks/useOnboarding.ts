
import { useState, useEffect } from 'react';

export const useOnboarding = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('onboarding_completed');
    const hasCompleted = completed === 'true';
    setHasCompletedOnboarding(hasCompleted);
    
    // Show onboarding tour if user hasn't completed it
    if (!hasCompleted) {
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setHasCompletedOnboarding(true);
    setShowOnboarding(false);
  };

  const skipOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setHasCompletedOnboarding(true);
    setShowOnboarding(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboarding_completed');
    setHasCompletedOnboarding(false);
    setShowOnboarding(true);
  };

  return {
    hasCompletedOnboarding,
    showOnboarding,
    completeOnboarding,
    skipOnboarding,
    resetOnboarding
  };
};
