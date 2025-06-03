
import React from "react";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppLayout } from "@/components/AppLayout";
import { AppTabContent } from "@/components/AppTabContent";
import { LandingPageContainer } from "@/components/landing/LandingPageContainer";
import { AuthPage } from "@/components/AuthPage";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { DashboardSkeleton } from "@/components/ui/LoadingStates";
import { useOfflineDetection } from "@/hooks/useOfflineDetection";
import { Badge } from "@/components/ui/badge";
import { WifiOff } from "lucide-react";

const Index = () => {
  const {
    activeTab,
    user,
    loading,
    handleAuth,
    handleAuthSuccess,
    handleLogout,
    handleTabChange
  } = useAppNavigation();

  const { isOnline } = useOfflineDetection();

  console.log("Index page rendering:", { activeTab, user: !!user, loading });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  // Show auth page if on auth route
  if (activeTab === "auth") {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
          <AuthPage
            onAuthSuccess={handleAuthSuccess}
            onBackToHome={() => handleTabChange("home")}
          />
        </div>
      </ErrorBoundary>
    );
  }

  // Show landing page for unauthenticated users or when on home tab
  if (!user || activeTab === "home") {
    return (
      <ErrorBoundary>
        <LandingPageContainer
          onGetStarted={() => {
            console.log("Index: onGetStarted called, calling handleAuth");
            handleAuth();
          }}
          onTryDemo={() => {
            console.log("Index: onTryDemo called, calling handleTabChange('create')");
            handleTabChange("create");
          }}
        />
      </ErrorBoundary>
    );
  }

  // Show authenticated app with single navigation
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
        {/* Offline indicator */}
        {!isOnline && (
          <div className="bg-orange-100 border-b border-orange-200 px-4 py-2">
            <div className="flex items-center justify-center gap-2 text-orange-800">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm">You're currently offline. Some features may not work properly.</span>
            </div>
          </div>
        )}
        
        <ErrorBoundary>
          <AppLayout
            activeTab={activeTab}
            user={user}
            onTabChange={handleTabChange}
            onLogout={handleLogout}
          >
            <AppTabContent
              user={user}
              onTabChange={handleTabChange}
            />
          </AppLayout>
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
