
import { useState, useEffect } from 'react';

interface PlatformUsage {
  platform: string;
  count: number;
  percentage: number;
}

interface MonthlyContent {
  month: string;
  count: number;
}

interface DistributionData {
  name: string;
  count: number;
  percentage: number;
}

export const useUsageAnalytics = () => {
  const [platformUsage, setPlatformUsage] = useState<PlatformUsage[]>([]);
  const [contentByMonth, setContentByMonth] = useState<MonthlyContent[]>([]);
  const [goalDistribution, setGoalDistribution] = useState<DistributionData[]>([]);
  const [toneDistribution, setToneDistribution] = useState<DistributionData[]>([]);

  useEffect(() => {
    // Generate sample analytics data
    setPlatformUsage([
      { platform: 'Instagram', count: 15, percentage: 45 },
      { platform: 'LinkedIn', count: 10, percentage: 30 },
      { platform: 'Twitter', count: 8, percentage: 25 }
    ]);

    setContentByMonth([
      { month: 'Jan', count: 8 },
      { month: 'Feb', count: 12 },
      { month: 'Mar', count: 15 },
      { month: 'Apr', count: 18 },
      { month: 'May', count: 22 },
      { month: 'Jun', count: 25 }
    ]);

    setGoalDistribution([
      { name: 'Engagement', count: 20, percentage: 60 },
      { name: 'Awareness', count: 8, percentage: 24 },
      { name: 'Conversion', count: 5, percentage: 16 }
    ]);

    setToneDistribution([
      { name: 'Friendly', count: 18, percentage: 55 },
      { name: 'Professional', count: 10, percentage: 30 },
      { name: 'Casual', count: 5, percentage: 15 }
    ]);
  }, []);

  return {
    platformUsage,
    contentByMonth,
    goalDistribution,
    toneDistribution
  };
};
