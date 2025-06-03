
import React, { useEffect } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { useIsMobile } from "@/hooks/use-mobile";
import { SubscriptionUsageCard } from "./usage/SubscriptionUsageCard";
import { OnboardingTour } from "./onboarding/OnboardingTour";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useSystemNotifications } from "./feedback/SystemNotifications";
import { useToast } from "@/hooks/use-toast";
import { DashboardWelcomeHeader } from "./dashboard/DashboardWelcomeHeader";
import { DashboardStatsGrid } from "./dashboard/DashboardStatsGrid";
import { DashboardMainContent } from "./dashboard/DashboardMainContent";

interface DashboardProps {
  user: any;
  onNavigateToTab?: (tab: string) => void;
}

export const Dashboard = ({ user, onNavigateToTab }: DashboardProps) => {
  const { subscribed, planName, postsUsedThisMonth, monthlyPostsLimit } = useSubscription();
  const isMobile = useIsMobile();
  const { showOnboarding, completeOnboarding, skipOnboarding } = useOnboarding();
  const { showSuccess, showError } = useSystemNotifications();
  const { toast } = useToast();

  console.log("Dashboard: Rendering", { 
    user: !!user, 
    isMobile, 
    onNavigateToTab: !!onNavigateToTab,
    postsUsed: postsUsedThisMonth,
    monthlyLimit: monthlyPostsLimit
  });

  // Welcome notification when dashboard loads
  useEffect(() => {
    const timer = setTimeout(() => {
      showSuccess(
        "Welcome to your dashboard!", 
        "Ready to create amazing content? Start with the 'Create Content' button."
      );
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate remaining posts and whether user can generate more
  const postsRemaining = Math.max(0, monthlyPostsLimit - postsUsedThisMonth);
  const canGenerateMore = postsRemaining > 0;

  const handleCreateContent = () => {
    try {
      console.log("Dashboard: Create content clicked", { 
        isMobile, 
        canGenerateMore, 
        postsRemaining,
        hasNavigator: !!onNavigateToTab 
      });
      
      if (!canGenerateMore) {
        toast({
          title: "Post Limit Reached",
          description: "You've reached your monthly post limit. Please upgrade to continue creating content.",
          variant: "destructive"
        });
        return;
      }

      if (onNavigateToTab) {
        console.log("Dashboard: Navigating to create tab via onNavigateToTab");
        onNavigateToTab('create');
      } else {
        console.log("Dashboard: No navigation function provided, using fallback");
        // Fallback navigation method
        window.location.hash = 'create';
      }
    } catch (error) {
      console.error("Dashboard: Error in handleCreateContent", error);
      
      showError(
        "Navigation Error",
        "There was an error navigating to content creation. Please try refreshing the page."
      );
      
      toast({
        title: "Navigation Error",
        description: "Unable to navigate to content creation. Please try again.",
        variant: "destructive"
      });
    }
  };

  const stats = {
    contentGenerated: postsUsedThisMonth,
    remainingCredits: Math.max(0, monthlyPostsLimit - postsUsedThisMonth),
    postsSaved: 12,
    engagementRate: "8.3%"
  };

  return (
    <div className="space-y-6">
      <DashboardWelcomeHeader
        user={user}
        subscribed={subscribed}
        planName={planName}
        canGenerateMore={canGenerateMore}
        isMobile={isMobile}
        onCreateContent={handleCreateContent}
      />

      {/* Usage Overview */}
      <SubscriptionUsageCard />

      {/* Quick Stats */}
      <DashboardStatsGrid 
        stats={stats}
        subscribed={subscribed}
      />

      {/* Main Content Grid */}
      <DashboardMainContent
        user={user}
        isMobile={isMobile}
        onCreateContent={handleCreateContent}
        onNavigateToTab={onNavigateToTab}
      />
      
      {/* Onboarding Tour */}
      <OnboardingTour 
        isVisible={showOnboarding}
        onComplete={completeOnboarding}
        onSkip={skipOnboarding}
      />
    </div>
  );
};
