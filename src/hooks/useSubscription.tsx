
import { useState, useEffect, useContext, createContext } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface SubscriptionContextType {
  subscribed: boolean;
  subscriptionTier: string;
  planName: string;
  monthlyPostsLimit: number;
  subscriptionEnd: string | null;
  postsUsedThisMonth: number;
  loading: boolean;
  error: string | null;
  checkSubscription: () => Promise<void>;
  createCheckout: (planName: string) => Promise<void>;
  openCustomerPortal: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState('free');
  const [planName, setPlanName] = useState('Free');
  const [monthlyPostsLimit, setMonthlyPostsLimit] = useState(5);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [postsUsedThisMonth, setPostsUsedThisMonth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user, session } = useAuth();
  const { toast } = useToast();

  const checkSubscription = async () => {
    if (!user || !session) {
      console.log('No user or session available for subscription check');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Checking subscription for user:', user.email);
      
      // Check if this is a special business user first
      const businessEmails = ['sofia_reuterving@hotmail.com', 'thomas_janssen@mailrez.com', 'jzineldin96@gmail.com'];
      
      if (businessEmails.includes(user.email)) {
        console.log('Business user detected:', user.email);
        setSubscribed(true);
        setSubscriptionTier('business');
        setPlanName('Business');
        setMonthlyPostsLimit(999999);
        setSubscriptionEnd(null);
        setPostsUsedThisMonth(0);
        setLoading(false);
        return;
      }
      
      // Try to check subscription via edge function with better error handling
      try {
        const { data, error: functionError } = await supabase.functions.invoke('check-subscription', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (functionError) {
          throw new Error(`Function error: ${functionError.message}`);
        }

        console.log('Subscription check result:', data);
        setSubscribed(data.subscribed || false);
        setSubscriptionTier(data.subscription_tier || 'free');
        setPlanName(data.plan_name || 'Free');
        setMonthlyPostsLimit(data.monthly_posts_limit || 5);
        setSubscriptionEnd(data.subscription_end);

        // Get current usage from database
        const { data: subscriberData, error: dbError } = await supabase
          .from('subscribers')
          .select('posts_used_this_month')
          .eq('email', user.email)
          .single();
        
        if (dbError && dbError.code !== 'PGRST116') {
          console.warn('Could not fetch usage data:', dbError);
        }
        
        setPostsUsedThisMonth(subscriberData?.posts_used_this_month || 0);
      } catch (functionError) {
        console.error('Edge function failed, falling back to basic plan:', functionError);
        
        // Fallback: Set to free plan if function fails
        setSubscribed(false);
        setSubscriptionTier('free');
        setPlanName('Free');
        setMonthlyPostsLimit(5);
        setSubscriptionEnd(null);
        setPostsUsedThisMonth(0);
        
        // Check if this is a business user even if the function fails
        if (businessEmails.includes(user.email)) {
          console.log('Granting business access despite function failure for:', user.email);
          setSubscribed(true);
          setSubscriptionTier('business');
          setPlanName('Business');
          setMonthlyPostsLimit(999999);
          setSubscriptionEnd(null);
          setPostsUsedThisMonth(0);
        }
        
        setError('Unable to verify subscription status, using basic access');
      }
    } catch (error) {
      console.error('Subscription check failed completely:', error);
      setError('Failed to check subscription status');
      
      // Emergency fallback for business users
      const businessEmails = ['sofia_reuterving@hotmail.com', 'thomas_janssen@mailrez.com', 'jzineldin96@gmail.com'];
      if (user && businessEmails.includes(user.email)) {
        console.log('Emergency business access for:', user.email);
        setSubscribed(true);
        setSubscriptionTier('business');
        setPlanName('Business');
        setMonthlyPostsLimit(999999);
        setSubscriptionEnd(null);
        setPostsUsedThisMonth(0);
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async (planName: string) => {
    if (!user || !session) return;
    
    try {
      console.log('Creating checkout for plan:', planName);
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planName },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      console.log('Checkout URL received:', data.url);
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session",
        variant: "destructive"
      });
    }
  };

  const openCustomerPortal = async () => {
    if (!user || !session) return;
    
    try {
      console.log('Opening customer portal for user:', user.email);
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      console.log('Portal URL received:', data.url);
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open customer portal",
        variant: "destructive"
      });
    }
  };

  // Check subscription when user changes
  useEffect(() => {
    if (user && session) {
      checkSubscription();
    } else {
      // Reset state when user logs out
      setSubscribed(false);
      setSubscriptionTier('free');
      setPlanName('Free');
      setMonthlyPostsLimit(5);
      setSubscriptionEnd(null);
      setPostsUsedThisMonth(0);
      setError(null);
    }
  }, [user, session]);

  // Auto-refresh subscription status periodically (but less frequently to reduce errors)
  useEffect(() => {
    if (!user || !session) return;

    const interval = setInterval(() => {
      checkSubscription();
    }, 300000); // Check every 5 minutes instead of 1 minute

    return () => clearInterval(interval);
  }, [user, session]);

  const value = {
    subscribed,
    subscriptionTier,
    planName,
    monthlyPostsLimit,
    subscriptionEnd,
    postsUsedThisMonth,
    loading,
    error,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
