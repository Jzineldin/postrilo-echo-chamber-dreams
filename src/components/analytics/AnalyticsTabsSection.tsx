
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsageAnalytics } from "./UsageAnalytics";
import { PerformanceTracking } from "./PerformanceTracking";
import { RecommendationEngine } from "./RecommendationEngine";
import { ExportFunctionality } from "./ExportFunctionality";
import { BarChart3, TrendingUp, Target, Download } from "lucide-react";

interface AnalyticsTabsSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AnalyticsTabsSection = ({ activeTab, setActiveTab }: AnalyticsTabsSectionProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="usage" className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Usage
        </TabsTrigger>
        <TabsTrigger value="performance" className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Performance
        </TabsTrigger>
        <TabsTrigger value="recommendations" className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          Recommendations
        </TabsTrigger>
        <TabsTrigger value="export" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </TabsTrigger>
      </TabsList>

      <TabsContent value="usage" className="space-y-6">
        <UsageAnalytics />
      </TabsContent>

      <TabsContent value="performance" className="space-y-6">
        <PerformanceTracking />
      </TabsContent>

      <TabsContent value="recommendations" className="space-y-6">
        <RecommendationEngine />
      </TabsContent>

      <TabsContent value="export" className="space-y-6">
        <ExportFunctionality />
      </TabsContent>
    </Tabs>
  );
};
