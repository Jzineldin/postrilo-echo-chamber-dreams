
import React from "react";
import { QuickActions } from "./QuickActions";
import { UsageAnalytics } from "../usage/UsageAnalytics";
import { ContentTip } from "./ContentTip";
import { RecentContent } from "./RecentContent";

interface DashboardMainContentProps {
  user: any;
  isMobile: boolean;
  onCreateContent: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const DashboardMainContent = ({
  user,
  isMobile,
  onCreateContent,
  onNavigateToTab
}: DashboardMainContentProps) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Quick Actions */}
      <div className="lg:col-span-2 space-y-6">
        <QuickActions 
          user={user} 
          isMobile={isMobile} 
          onCreateContent={onCreateContent}
          onNavigateToTab={onNavigateToTab}
        />
        <UsageAnalytics />
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <ContentTip isMobile={isMobile} />
        <RecentContent isMobile={isMobile} />
      </div>
    </div>
  );
};
