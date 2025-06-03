
import { useState, useEffect } from 'react';

interface ConversionEvent {
  id: string;
  event: string;
  timestamp: number;
  userId?: string;
  metadata?: Record<string, any>;
}

export const useConversionTracking = () => {
  const [conversions, setConversions] = useState<ConversionEvent[]>([]);

  const trackConversion = (eventName: string, metadata?: Record<string, any>) => {
    const conversion: ConversionEvent = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      event: eventName,
      timestamp: Date.now(),
      userId: localStorage.getItem('user_id') || undefined,
      metadata
    };

    console.log('Conversion tracked:', conversion);

    setConversions(prev => {
      const updated = [conversion, ...prev].slice(0, 50); // Keep last 50
      localStorage.setItem('conversion_events', JSON.stringify(updated));
      return updated;
    });

    // Send to analytics service (placeholder) - safely check for gtag
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', eventName, {
          event_category: 'conversion',
          event_label: metadata?.source || 'unknown',
          value: metadata?.value || 1
        });
      } catch (error) {
        console.warn('Google Analytics tracking failed:', error);
      }
    }
  };

  const getConversionRate = (eventName: string, timeframe: number = 24 * 60 * 60 * 1000) => {
    const recent = conversions.filter(c => 
      c.event === eventName && 
      Date.now() - c.timestamp < timeframe
    );
    return recent.length;
  };

  useEffect(() => {
    const stored = localStorage.getItem('conversion_events');
    if (stored) {
      setConversions(JSON.parse(stored));
    }
  }, []);

  return {
    trackConversion,
    getConversionRate,
    conversions
  };
};
