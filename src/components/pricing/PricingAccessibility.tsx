
import { useEffect } from "react";

export const PricingAccessibility = () => {
  useEffect(() => {
    // Add ARIA labels for better screen reader support
    const buttons = document.querySelectorAll('button[data-plan]');
    buttons.forEach((button, index) => {
      const planName = button.getAttribute('data-plan');
      button.setAttribute('aria-label', `Select ${planName} plan - Button ${index + 1} of ${buttons.length}`);
      button.setAttribute('role', 'button');
      button.setAttribute('tabindex', '0');
    });

    // Add keyboard navigation for pricing cards
    const cards = document.querySelectorAll('[data-pricing-card]');
    cards.forEach((card, index) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'article');
      card.setAttribute('aria-label', `Pricing plan ${index + 1} of ${cards.length}`);
      
      // Add keyboard event listeners
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const button = card.querySelector('button') as HTMLButtonElement;
          button?.click();
        }
      };
      
      card.addEventListener('keydown', handleKeyDown);
      
      // Cleanup function will be handled by component unmount
    });

    // Improve focus management
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach((element) => {
      element.addEventListener('focus', () => {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });

    // Add high contrast mode detection
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    if (prefersHighContrast.matches) {
      document.body.classList.add('high-contrast');
    }

    prefersHighContrast.addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    });

  }, []);

  return null;
};
