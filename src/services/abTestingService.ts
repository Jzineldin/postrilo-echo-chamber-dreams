
interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  config: Record<string, any>;
}

interface ABTest {
  id: string;
  name: string;
  variants: ABTestVariant[];
  isActive: boolean;
}

class ABTestingService {
  private tests: ABTest[] = [
    {
      id: 'landing-cta-positions',
      name: 'Landing Page CTA Positioning',
      variants: [
        { id: 'control', name: 'Current Layout', weight: 50, config: { showFloatingCTA: true, ctaStyle: 'gradient' } },
        { id: 'minimal', name: 'Minimal CTAs', weight: 25, config: { showFloatingCTA: false, ctaStyle: 'solid' } },
        { id: 'aggressive', name: 'More CTAs', weight: 25, config: { showFloatingCTA: true, ctaStyle: 'animated' } }
      ],
      isActive: true
    },
    {
      id: 'industry-sections',
      name: 'Industry Use Cases Display',
      variants: [
        { id: 'cards', name: 'Card Layout', weight: 50, config: { layout: 'cards' } },
        { id: 'list', name: 'List Layout', weight: 50, config: { layout: 'list' } }
      ],
      isActive: true
    }
  ];

  getVariant(testId: string): ABTestVariant | null {
    const test = this.tests.find(t => t.id === testId && t.isActive);
    if (!test) return null;

    // Check if user already has a variant assigned
    const storedVariant = localStorage.getItem(`ab_${testId}`);
    if (storedVariant) {
      const variant = test.variants.find(v => v.id === storedVariant);
      if (variant) return variant;
    }

    // Assign random variant based on weights
    const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0);
    const random = Math.random() * totalWeight;
    
    let currentWeight = 0;
    for (const variant of test.variants) {
      currentWeight += variant.weight;
      if (random <= currentWeight) {
        localStorage.setItem(`ab_${testId}`, variant.id);
        this.trackEvent('ab_test_assigned', { testId, variantId: variant.id });
        return variant;
      }
    }

    return test.variants[0];
  }

  trackEvent(eventName: string, properties: Record<string, any> = {}) {
    // Enhanced tracking with user session info
    const eventData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...properties
    };

    console.log('AB Test Event:', eventData);
    
    // Store in localStorage for now (could integrate with analytics service later)
    const events = JSON.parse(localStorage.getItem('ab_events') || '[]');
    events.push(eventData);
    localStorage.setItem('ab_events', JSON.stringify(events.slice(-100))); // Keep last 100 events
  }

  trackConversion(testId: string, conversionType: string, value?: number) {
    const variant = this.getVariant(testId);
    if (variant) {
      this.trackEvent('conversion', {
        testId,
        variantId: variant.id,
        conversionType,
        value
      });
    }
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  private getUserId(): string | null {
    return localStorage.getItem('user_id') || null;
  }

  getTestResults(testId: string) {
    const events = JSON.parse(localStorage.getItem('ab_events') || '[]');
    const testEvents = events.filter((e: any) => e.testId === testId);
    
    const variants = testEvents.reduce((acc: any, event: any) => {
      if (!acc[event.variantId]) {
        acc[event.variantId] = { assignments: 0, conversions: 0 };
      }
      
      if (event.event === 'ab_test_assigned') {
        acc[event.variantId].assignments++;
      } else if (event.event === 'conversion') {
        acc[event.variantId].conversions++;
      }
      
      return acc;
    }, {});

    return variants;
  }
}

export const abTestingService = new ABTestingService();
