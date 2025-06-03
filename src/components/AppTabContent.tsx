
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Dashboard } from "./Dashboard";
import { ContentLibrary } from "./ContentLibrary";
import { ContentScheduler } from "./ContentScheduler";
import { AnalyticsDashboard } from "./analytics/AnalyticsDashboard";
import { BrandVoiceManager } from "./BrandVoiceManager";
import { SettingsHub } from "./settings/SettingsHub";
import { HelpSupportPage } from "./HelpSupportPage";
import { PricingPage } from "./PricingPage";
import UnifiedContentGenerator from "./UnifiedContentGenerator";

interface AppTabContentProps {
  user: any;
  onTabChange: (tab: string) => void;
}

export const AppTabContent = ({ user, onTabChange }: AppTabContentProps) => {
  console.log("AppTabContent rendering:", { currentTab: "dashboard", user: !!user });

  const handleNavigateToSection = (section: string) => {
    console.log("Navigating to section:", section);
    // Handle navigation to different settings sections
  };

  const handleSelectPlan = () => {
    console.log("Plan selection triggered");
    // Handle plan selection
  };

  return (
    <>
      <TabsContent value="dashboard" className="mt-0">
        <Dashboard user={user} onNavigateToTab={onTabChange} />
      </TabsContent>

      <TabsContent value="create" className="mt-0">
        <UnifiedContentGenerator />
      </TabsContent>

      <TabsContent value="library" className="mt-0">
        <ContentLibrary />
      </TabsContent>

      <TabsContent value="scheduler" className="mt-0">
        <ContentScheduler />
      </TabsContent>

      <TabsContent value="analytics" className="mt-0">
        <AnalyticsDashboard />
      </TabsContent>

      <TabsContent value="brand-voice" className="mt-0">
        <BrandVoiceManager />
      </TabsContent>

      <TabsContent value="settings" className="mt-0">
        <SettingsHub user={user} onNavigateToSection={handleNavigateToSection} />
      </TabsContent>

      <TabsContent value="help" className="mt-0">
        <HelpSupportPage />
      </TabsContent>

      <TabsContent value="pricing" className="mt-0">
        <PricingPage onSelectPlan={handleSelectPlan} />
      </TabsContent>
    </>
  );
};
