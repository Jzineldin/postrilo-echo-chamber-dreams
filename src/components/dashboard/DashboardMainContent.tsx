
import React from 'react';
import { QuickActions } from './QuickActions';
import { ContentTip } from './ContentTip';
import { UsageAnalytics } from '../usage/UsageAnalytics';

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
    <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-3'}`}>
      {/* Main Content Area */}
      <div className={isMobile ? 'space-y-6' : 'lg:col-span-2 space-y-6'}>
        <QuickActions
          user={user}
          isMobile={isMobile}
          onCreateContent={onCreateContent}
          onNavigateToTab={onNavigateToTab}
        />
        
        <UsageAnalytics />
      </div>
      
      {/* Sidebar Content */}
      <div className="space-y-6">
        <ContentTip isMobile={isMobile} />
      </div>
    </div>
  );
};
