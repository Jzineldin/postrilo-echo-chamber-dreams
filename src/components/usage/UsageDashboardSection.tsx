
import React from 'react';
import { SubscriptionUsageCard } from './SubscriptionUsageCard';
import { UsageAnalytics } from './UsageAnalytics';
import { UsageDashboard } from '../UsageDashboard';

export const UsageDashboardSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <SubscriptionUsageCard />
        <UsageAnalytics />
      </div>
      <UsageDashboard />
    </div>
  );
};
