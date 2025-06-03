
import { useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

interface ABTestVariant {
  id: 'A' | 'B';
  name: string;
  weight: number;
  component: ReactNode;
}

interface PricingABTestProps {
  testName: string;
  variants: ABTestVariant[];
  children: (variant: ABTestVariant, trackEvent: (action: string, metadata?: any) => void) => ReactNode;
}

export const PricingABTest = ({ testName, variants, children }: PricingABTestProps) => {
  const { user } = useAuth();
  const [selectedVariant, setSelectedVariant] = useState<ABTestVariant | null>(null);
  const [sessionId] = useState(() => crypto.randomUUID());

  // Deterministic variant selection based on user ID or session
  useEffect(() => {
    const determineVariant = () => {
      const identifier = user?.id || sessionId;
      const hash = Array.from(identifier).reduce((acc, char) => {
        return ((acc << 5) - acc + char.charCodeAt(0)) & 0xffffffff;
      }, 0);
      
      const normalizedHash = Math.abs(hash) / 0xffffffff;
      
      let cumulativeWeight = 0;
      for (const variant of variants) {
        cumulativeWeight += variant.weight;
        if (normalizedHash <= cumulativeWeight) {
          return variant;
        }
      }
      
      return variants[0]; // Fallback
    };

    const variant = determineVariant();
    setSelectedVariant(variant);

    // Track variant assignment
    trackVariantEvent('variant_assigned', {
      test_name: testName,
      variant_id: variant.id,
      variant_name: variant.name,
      user_id: user?.id,
      session_id: sessionId
    });

  }, [user?.id, sessionId, testName, variants]);

  const trackVariantEvent = (action: string, metadata?: any) => {
    try {
      const event = {
        timestamp: new Date().toISOString(),
        test_name: testName,
        variant_id: selectedVariant?.id,
        action,
        user_id: user?.id,
        session_id: sessionId,
        ...metadata
      };

      // Store AB test events separately
      const storedTests = JSON.parse(localStorage.getItem('ab_test_events') || '[]');
      storedTests.push(event);
      localStorage.setItem('ab_test_events', JSON.stringify(storedTests.slice(-50)));

      console.log('AB Test event:', event);
    } catch (error) {
      console.error('Failed to track AB test event:', error);
    }
  };

  if (!selectedVariant) {
    return null; // Loading state
  }

  return (
    <>
      {children(selectedVariant, trackVariantEvent)}
    </>
  );
};

// Predefined test variants for pricing page
export const pricingPageVariants: ABTestVariant[] = [
  {
    id: 'A',
    name: 'Original',
    weight: 0.5,
    component: null
  },
  {
    id: 'B',
    name: 'Enhanced CTA',
    weight: 0.5,
    component: null
  }
];
