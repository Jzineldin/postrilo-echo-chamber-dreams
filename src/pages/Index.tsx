
import { useState, useEffect } from "react";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useAppInitializer } from "@/hooks/useAppInitializer";
import { LandingPage } from "@/components/LandingPage";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { AuthPage } from "@/components/AuthPage";
import { AppLoading } from "@/components/AppLoading";
import { PricingPage } from "@/components/PricingPage";
import { HelpSupportPage } from "@/components/HelpSupportPage";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import ContentGenerator from "@/components/ContentGenerator";
import { BrandVoiceManager } from "@/components/BrandVoiceManager";
import { ContentScheduler } from "@/components/ContentScheduler";
import { SettingsPanel } from "@/components/SettingsPanel";
import { ContentLibrary } from "@/components/ContentLibrary";
import { ContentGeneratorErrorBoundary } from "@/components/error/ContentGeneratorErrorBoundary";
import { UniversalHeader } from "@/components/navigation/UniversalHeader";
import { BreadcrumbNavigation } from "@/components/navigation/BreadcrumbNavigation";

const Index = () => {
  const { isInitialized, isLoading, error } = useAppInitializer();
  const { 
    activeTab, 
    user, 
    loading: authLoading, 
    isNavigating,
    handleAuth, 
    handleAuthSuccess, 
    handleLogout, 
    handleTabChange 
  } = useAppNavigation();

  // Show loading while initializing or authenticating
  if (isLoading || authLoading || !isInitialized || isNavigating) {
    return <AppLoading />;
  }

  // Show error state if initialization failed
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Startup Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const handleGetStarted = () => {
    console.log("Get Started clicked - user authenticated:", !!user);
    if (user) {
      handleTabChange("dashboard");
    } else {
      handleAuth();
    }
  };

  const handleTryDemo = () => {
    console.log("Try Demo clicked - user authenticated:", !!user);
    if (user) {
      handleTabChange("create");
    } else {
      handleTabChange("demo");
    }
  };

  const handleBackToHome = () => {
    handleTabChange("home");
  };

  const handleSelectPlan = () => {
    console.log("Plan selected - redirecting to signup/dashboard");
    if (user) {
      handleTabChange("dashboard");
    } else {
      handleAuth();
    }
  };

  const handleBackToDashboard = () => {
    handleTabChange("dashboard");
  };

  // Render based on active tab
  switch (activeTab) {
    case "auth":
      return (
        <AuthPage 
          onAuthSuccess={handleAuthSuccess} 
          onBackToHome={handleBackToHome}
        />
      );
    
    case "dashboard":
      if (!user) {
        handleAuth();
        return <AppLoading />;
      }
      return <Dashboard onTabChange={handleTabChange} />;
    
    case "create":
      if (!user) {
        handleAuth();
        return <AppLoading />;
      }
      return (
        <ContentGeneratorErrorBoundary>
          <ContentGenerator />
        </ContentGeneratorErrorBoundary>
      );
    
    case "library":
      if (!user) {
        handleAuth();
        return <AppLoading />;
      }
      return (
        <div className="min-h-screen bg-gray-50">
          <BreadcrumbNavigation />
          <UniversalHeader 
            title="Content Library"
            currentPage="Manage all your saved content in one place"
            onBack={handleBackToDashboard}
          />
          <ContentLibrary />
        </div>
      );
    
    case "analytics":
      if (!user) {
        handleAuth();
        return <AppLoading />;
      }
      return <AnalyticsDashboard />;
    
    case "brand-voice":
      if (!user) {
        handleAuth();
        return <AppLoading />;
      }
      return (
        <div className="min-h-screen bg-gray-50">
          <BreadcrumbNavigation />
          <UniversalHeader 
            title="Brand Voice Manager"
            currentPage="Define and manage your brand's voice and tone"
            onBack={handleBackToDashboard}
          />
          <div className="max-w-7xl mx-auto px-4 py-6">
            <BrandVoiceManager />
          </div>
        </div>
      );
    
    case "scheduler":
      if (!user) {
        handleAuth();
        return <AppLoading />;
      }
      return (
        <div className="min-h-screen bg-gray-50">
          <BreadcrumbNavigation />
          <UniversalHeader 
            title="Content Scheduler"
            currentPage="Schedule and manage your content posts"
            onBack={handleBackToDashboard}
          />
          <div className="max-w-7xl mx-auto px-4 py-6">
            <ContentScheduler />
          </div>
        </div>
      );
    
    case "settings":
      if (!user) {
        handleAuth();
        return <AppLoading />;
      }
      return <SettingsPanel />;
    
    case "pricing":
      return (
        <div className="min-h-screen bg-gray-50">
          <BreadcrumbNavigation />
          <UniversalHeader 
            title="Pricing Plans"
            currentPage="Choose the perfect plan for your needs"
            onBack={handleBackToHome}
          />
          <div className="max-w-7xl mx-auto px-4 py-6">
            <PricingPage onSelectPlan={handleSelectPlan} />
          </div>
        </div>
      );
    
    case "help":
      return (
        <div className="min-h-screen bg-gray-50">
          <BreadcrumbNavigation />
          <UniversalHeader 
            title="Help & Support"
            currentPage="Get help and find answers to common questions"
            onBack={user ? handleBackToDashboard : handleBackToHome}
          />
          <div className="max-w-7xl mx-auto px-4 py-6">
            <HelpSupportPage />
          </div>
        </div>
      );
    
    default:
      return (
        <LandingPage
          onGetStarted={handleGetStarted}
          onTryDemo={handleTryDemo}
        />
      );
  }
};

export default Index;
