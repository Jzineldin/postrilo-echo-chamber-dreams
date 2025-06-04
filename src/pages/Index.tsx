
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

const Index = () => {
  const { isInitialized, isLoading, error } = useAppInitializer();
  const { 
    activeTab, 
    user, 
    loading: authLoading, 
    handleAuth, 
    handleAuthSuccess, 
    handleLogout, 
    handleTabChange 
  } = useAppNavigation();

  // Show loading while initializing or authenticating
  if (isLoading || authLoading || !isInitialized) {
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
      // Show demo mode for non-authenticated users
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
      return <ContentGenerator />;
    
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
      return <BrandVoiceManager />;
    
    case "scheduler":
      if (!user) {
        handleAuth();
        return <AppLoading />;
      }
      return <ContentScheduler />;
    
    case "settings":
      if (!user) {
        handleAuth();
        return <AppLoading />;
      }
      return <SettingsPanel />;
    
    case "pricing":
      return <PricingPage onSelectPlan={handleSelectPlan} />;
    
    case "help":
      return <HelpSupportPage />;
    
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
