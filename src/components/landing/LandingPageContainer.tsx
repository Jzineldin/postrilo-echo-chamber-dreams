
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { ErrorBoundary } from "@/components/loading/ErrorBoundary";
import { PerformanceMonitor } from "@/components/loading/PerformanceMonitor";
import { PerformanceDashboard } from "@/components/loading/PerformanceDashboard";
import { CriticalResourceLoader } from "@/components/optimized/CriticalResourceLoader";
import { HeroSectionSkeleton } from "@/components/loading/SkeletonLoaders";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { useMemoryOptimization } from "@/hooks/useMemoryOptimization";
import { DemoModeView } from "./views/DemoModeView";
import { TemplateGalleryView } from "./views/TemplateGalleryView";
import { LandingPageContent } from "./LandingPageContent";
import { PerformanceProvider } from "@/components/optimized/PerformanceProvider";

interface LandingPageContainerProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
}

export const LandingPageContainer = ({ onGetStarted, onTryDemo }: LandingPageContainerProps) => {
  const [showDemo, setShowDemo] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [criticalResourcesLoaded, setCriticalResourcesLoaded] = useState(false);
  const { user } = useAuth();
  const { cleanup } = useMemoryOptimization({ enableCleanup: true });
  const { 
    notifications, 
    markAsRead, 
    dismiss, 
    clearAll 
  } = useNotifications();

  // Check if we're in development mode
  const isDev = import.meta.env.DEV;

  const handlePerformanceMetric = (metric: string, value: number) => {
    console.log(`Performance metric: ${metric} = ${value}ms`);
  };

  const handleGetStarted = () => {
    console.log("LandingPageContainer: Get Started button clicked, user authenticated:", !!user);
    console.log("Calling onGetStarted prop");
    onGetStarted();
  };

  const handleTryDemo = () => {
    console.log("LandingPageContainer: Try Demo button clicked, user authenticated:", !!user);
    if (user) {
      console.log("User authenticated, navigating to create");
      window.location.hash = '#create';
      window.location.reload();
    } else {
      console.log("User not authenticated, showing demo");
      setShowDemo(true);
    }
  };

  const handleTryTemplate = (templateId: string) => {
    console.log("Try template clicked:", templateId);
    sessionStorage.setItem('selectedTemplate', templateId);
    handleTryDemo();
  };

  const handleBrowseTemplates = () => {
    console.log("Browse templates clicked");
    setShowTemplates(true);
  };

  const handleFormDemo = (data: any) => {
    console.log("Form demo submitted:", data);
    setShowDemo(false);
    handleTryDemo();
  };

  if (showDemo) {
    return <DemoModeView onClose={() => setShowDemo(false)} />;
  }

  if (showTemplates) {
    return (
      <TemplateGalleryView
        onTryTemplate={handleTryTemplate}
        onBack={() => setShowTemplates(false)}
      />
    );
  }

  return (
    <PerformanceProvider enableMetrics={isDev} enableOptimizations={true}>
      <ErrorBoundary>
        <PerformanceMonitor onMetric={handlePerformanceMetric} />
        <PerformanceDashboard isDev={isDev} />
        
        {/* Notification Center */}
        <div className="fixed top-4 right-4 z-50">
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onDismiss={dismiss}
            onClearAll={clearAll}
          />
        </div>
        
        <CriticalResourceLoader
          criticalImages={['/placeholder.svg']}
          onResourcesLoaded={() => setCriticalResourcesLoaded(true)}
          fallback={<HeroSectionSkeleton />}
        >
          <LandingPageContent
            onGetStarted={handleGetStarted}
            onTryDemo={handleTryDemo}
            onBrowseTemplates={handleBrowseTemplates}
            onTryTemplate={handleTryTemplate}
            onFormDemo={handleFormDemo}
            user={user}
          />
        </CriticalResourceLoader>
      </ErrorBoundary>
    </PerformanceProvider>
  );
};
