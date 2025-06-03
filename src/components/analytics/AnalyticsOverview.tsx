
import { AnalyticsSummaryCard } from './AnalyticsSummaryCard';
import { PerformanceInsightsCard } from './PerformanceInsightsCard';
import { ContentTrendsChart } from './ContentTrendsChart';
import { AnalyticsTabsSection } from './AnalyticsTabsSection';
import { useState } from 'react';

export const AnalyticsOverview = () => {
  const [activeTab, setActiveTab] = useState('usage');

  return (
    <div className="space-y-6">
      {/* Quick Overview Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        <AnalyticsSummaryCard />
        <PerformanceInsightsCard />
        <div className="lg:col-span-1">
          <ContentTrendsChart />
        </div>
      </div>

      {/* Detailed Analytics Tabs */}
      <AnalyticsTabsSection activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
