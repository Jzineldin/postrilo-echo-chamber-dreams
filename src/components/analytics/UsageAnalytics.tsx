
import { PlatformUsageChart } from "./charts/PlatformUsageChart";
import { GenerationActivityChart } from "./charts/GenerationActivityChart";
import { ContentDistributionStats } from "./charts/ContentDistributionStats";
import { useUsageAnalytics } from "@/hooks/useUsageAnalytics";

export const UsageAnalytics = () => {
  const analytics = useUsageAnalytics();

  return (
    <div className="space-y-6">
      <PlatformUsageChart platformUsage={analytics.platformUsage} />
      <GenerationActivityChart contentByMonth={analytics.contentByMonth} />
      <ContentDistributionStats 
        goalDistribution={analytics.goalDistribution} 
        toneDistribution={analytics.toneDistribution} 
      />
    </div>
  );
};
