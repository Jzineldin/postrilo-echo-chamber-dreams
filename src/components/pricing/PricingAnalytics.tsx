
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsEvent {
  event_type: string;
  page_section: string;
  plan_name?: string;
  user_id?: string;
  session_id: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface PricingAnalyticsProps {
  variant?: 'A' | 'B';
}

export const PricingAnalytics = ({ variant = 'A' }: PricingAnalyticsProps) => {
  const { user } = useAuth();
  const [sessionId] = useState(() => crypto.randomUUID());
  const [startTime] = useState(() => Date.now());

  const trackEvent = async (eventType: string, section: string, metadata?: Record<string, any>) => {
    try {
      const event: AnalyticsEvent = {
        event_type: eventType,
        page_section: section,
        user_id: user?.id,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
        metadata: {
          variant,
          user_agent: navigator.userAgent,
          screen_width: window.screen.width,
          screen_height: window.screen.height,
          ...metadata
        }
      };

      // Store in localStorage for offline capability
      const storedEvents = JSON.parse(localStorage.getItem('pricing_analytics') || '[]');
      storedEvents.push(event);
      localStorage.setItem('pricing_analytics', JSON.stringify(storedEvents.slice(-100))); // Keep last 100 events

      console.log('Analytics event tracked:', event);
    } catch (error) {
      console.error('Failed to track analytics event:', error);
    }
  };

  useEffect(() => {
    // Track page view
    trackEvent('page_view', 'pricing_page', {
      referrer: document.referrer,
      landing_time: new Date().toISOString()
    });

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track milestone scroll depths
        if ([25, 50, 75, 90].includes(scrollPercent)) {
          trackEvent('scroll_depth', 'pricing_page', { depth_percent: scrollPercent });
        }
      }
    };

    // Track time on page
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackEvent('time_on_page', 'pricing_page', { 
        seconds_spent: timeSpent,
        max_scroll_depth: maxScroll 
      });
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', trackTimeOnPage);

    // Track plan card interactions
    const observePlanCards = () => {
      const planCards = document.querySelectorAll('[data-pricing-card]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const planName = entry.target.getAttribute('data-plan');
            trackEvent('plan_card_view', 'pricing_cards', { plan_name: planName });
          }
        });
      }, { threshold: 0.5 });

      planCards.forEach(card => observer.observe(card));
      return () => observer.disconnect();
    };

    const cleanup = observePlanCards();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', trackTimeOnPage);
      cleanup();
    };
  }, [sessionId, startTime, variant]);

  // Expose tracking function globally for other components
  useEffect(() => {
    (window as any).trackPricingEvent = trackEvent;
    return () => {
      delete (window as any).trackPricingEvent;
    };
  }, []);

  return null;
};

// Hook for easy analytics tracking in other components
export const usePricingAnalytics = () => {
  const trackEvent = (eventType: string, section: string, metadata?: Record<string, any>) => {
    if ((window as any).trackPricingEvent) {
      (window as any).trackPricingEvent(eventType, section, metadata);
    }
  };

  return { trackEvent };
};
