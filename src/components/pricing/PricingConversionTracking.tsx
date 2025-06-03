
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { usePricingAnalytics } from "./PricingAnalytics";

interface ConversionFunnel {
  page_view: number;
  plan_card_view: number;
  plan_card_hover: number;
  cta_click: number;
  checkout_start: number;
  checkout_complete: number;
}

export const PricingConversionTracking = () => {
  const { user } = useAuth();
  const { subscribed, planName } = useSubscription();
  const { trackEvent } = usePricingAnalytics();

  useEffect(() => {
    // Track conversion funnel steps
    const trackConversionStep = (step: keyof ConversionFunnel, metadata?: any) => {
      trackEvent('conversion_funnel', step, metadata);
      
      // Update funnel data in localStorage
      const funnelData: ConversionFunnel = JSON.parse(
        localStorage.getItem('conversion_funnel') || 
        '{"page_view":0,"plan_card_view":0,"plan_card_hover":0,"cta_click":0,"checkout_start":0,"checkout_complete":0}'
      );
      
      funnelData[step]++;
      localStorage.setItem('conversion_funnel', JSON.stringify(funnelData));
    };

    // Track plan card interactions
    const setupPlanCardTracking = () => {
      const planCards = document.querySelectorAll('[data-pricing-card]');
      
      planCards.forEach(card => {
        const planName = card.getAttribute('data-plan');
        
        // Track hover events
        card.addEventListener('mouseenter', () => {
          trackConversionStep('plan_card_hover', { plan_name: planName });
        });

        // Track CTA clicks
        const ctaButton = card.querySelector('button');
        if (ctaButton) {
          ctaButton.addEventListener('click', () => {
            trackConversionStep('cta_click', { plan_name: planName });
            
            // Track checkout start for paid plans
            if (planName !== 'Free') {
              setTimeout(() => {
                trackConversionStep('checkout_start', { plan_name: planName });
              }, 1000);
            }
          });
        }
      });
    };

    // Setup tracking after component mount
    setTimeout(setupPlanCardTracking, 1000);

    // Track successful conversions
    if (subscribed && planName !== 'Free') {
      trackConversionStep('checkout_complete', { 
        plan_name: planName,
        user_id: user?.id 
      });
    }

  }, [subscribed, planName, user]);

  // Track exit intent
  useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        trackEvent('exit_intent', 'pricing_page', {
          scroll_position: window.scrollY,
          time_on_page: Date.now()
        });
      }
    };

    document.addEventListener('mouseleave', handleExitIntent);
    return () => document.removeEventListener('mouseleave', handleExitIntent);
  }, [trackEvent]);

  // Track form abandonment
  useEffect(() => {
    const trackFormAbandonment = () => {
      const hasStartedSignup = localStorage.getItem('signup_started');
      const hasCompletedSignup = user?.id;
      
      if (hasStartedSignup && !hasCompletedSignup) {
        trackEvent('form_abandonment', 'signup_form', {
          stage: 'incomplete'
        });
      }
    };

    // Check for abandonment on page focus
    window.addEventListener('focus', trackFormAbandonment);
    return () => window.removeEventListener('focus', trackFormAbandonment);
  }, [user, trackEvent]);

  return null;
};

// Hook to get conversion metrics
export const useConversionMetrics = () => {
  const getFunnelData = (): ConversionFunnel => {
    return JSON.parse(
      localStorage.getItem('conversion_funnel') || 
      '{"page_view":0,"plan_card_view":0,"plan_card_hover":0,"cta_click":0,"checkout_start":0,"checkout_complete":0}'
    );
  };

  const getConversionRate = (): number => {
    const funnel = getFunnelData();
    return funnel.page_view > 0 ? (funnel.checkout_complete / funnel.page_view) * 100 : 0;
  };

  const getFunnelDropoffs = (): Record<string, number> => {
    const funnel = getFunnelData();
    return {
      'view_to_hover': funnel.page_view > 0 ? ((funnel.page_view - funnel.plan_card_hover) / funnel.page_view) * 100 : 0,
      'hover_to_click': funnel.plan_card_hover > 0 ? ((funnel.plan_card_hover - funnel.cta_click) / funnel.plan_card_hover) * 100 : 0,
      'click_to_checkout': funnel.cta_click > 0 ? ((funnel.cta_click - funnel.checkout_start) / funnel.cta_click) * 100 : 0,
      'checkout_to_complete': funnel.checkout_start > 0 ? ((funnel.checkout_start - funnel.checkout_complete) / funnel.checkout_start) * 100 : 0
    };
  };

  return {
    getFunnelData,
    getConversionRate,
    getFunnelDropoffs
  };
};
