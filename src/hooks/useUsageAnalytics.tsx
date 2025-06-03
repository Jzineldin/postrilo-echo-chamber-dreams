
import { useState, useEffect } from "react";
import { useContentStorage } from "@/hooks/useContentStorage";

export const useUsageAnalytics = () => {
  const { savedContent } = useContentStorage();
  const [analytics, setAnalytics] = useState({
    platformUsage: [] as any[],
    contentByMonth: [] as any[],
    goalDistribution: [] as any[],
    toneDistribution: [] as any[]
  });

  useEffect(() => {
    if (savedContent.length === 0) return;

    // Platform usage analytics
    const platformCounts = savedContent.reduce((acc, content) => {
      const platform = content.metadata?.platform || 'Unknown';
      acc[platform] = (acc[platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const platformUsage = Object.entries(platformCounts).map(([platform, count]) => ({
      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
      count,
      percentage: Math.round((count / savedContent.length) * 100)
    }));

    // Content by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthCounts = savedContent
      .filter(content => new Date(content.createdAt) >= sixMonthsAgo)
      .reduce((acc, content) => {
        const month = new Date(content.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const contentByMonth = Object.entries(monthCounts)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

    // Goal distribution
    const goalCounts = savedContent.reduce((acc, content) => {
      const goal = content.metadata?.goal || 'Not specified';
      acc[goal] = (acc[goal] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const goalDistribution = Object.entries(goalCounts).map(([goal, count]) => ({
      goal: goal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      count,
      percentage: Math.round((count / savedContent.length) * 100)
    }));

    // Tone distribution
    const toneCounts = savedContent.reduce((acc, content) => {
      const tone = content.metadata?.tone || 'Not specified';
      acc[tone] = (acc[tone] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const toneDistribution = Object.entries(toneCounts).map(([tone, count]) => ({
      tone: tone.charAt(0).toUpperCase() + tone.slice(1),
      count,
      percentage: Math.round((count / savedContent.length) * 100)
    }));

    setAnalytics({
      platformUsage,
      contentByMonth,
      goalDistribution,
      toneDistribution
    });
  }, [savedContent]);

  return analytics;
};
