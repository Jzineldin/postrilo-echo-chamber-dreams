
import { useCallback } from 'react';

export const useSettingsNavigation = () => {
  const navigateToSection = useCallback((section: string) => {
    console.log(`Navigating to settings section: ${section}`);
    // For now, just log the navigation - can be expanded later
  }, []);

  return {
    navigateToSection,
  };
};
