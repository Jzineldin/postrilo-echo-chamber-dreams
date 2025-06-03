
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HashtagResearch } from "@/components/HashtagResearch";
import { AnalyticsPanel } from "@/components/AnalyticsPanel";
import { BrandVoiceManager } from "@/components/BrandVoiceManager";
import { CompactContentGenerator } from "./CompactContentGenerator";
import { MultiStepContentGenerator } from "./MultiStepContentGenerator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Layout, List } from "lucide-react";

interface ContentGeneratorTabsWrapperProps {
  hasHashtagResearch: boolean;
  hasAnalytics: boolean;
  hasTeamCollaboration: boolean;
  canGenerateMore: boolean;
  postsRemaining: number;
  onHashtagsGenerated: (hashtags: string[]) => void;
}

export const ContentGeneratorTabsWrapper = ({
  hasHashtagResearch,
  hasAnalytics,
  hasTeamCollaboration,
  canGenerateMore,
  postsRemaining,
  onHashtagsGenerated
}: ContentGeneratorTabsWrapperProps) => {
  const [viewMode, setViewMode] = useState<"single" | "multi">("multi");

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-1 flex gap-1">
          <Button
            onClick={() => setViewMode("multi")}
            variant={viewMode === "multi" ? "default" : "ghost"}
            size="sm"
            className="flex items-center gap-2"
          >
            <List className="w-4 h-4" />
            Step-by-Step
          </Button>
          <Button
            onClick={() => setViewMode("single")}
            variant={viewMode === "single" ? "default" : "ghost"}
            size="sm"
            className="flex items-center gap-2"
          >
            <Layout className="w-4 h-4" />
            All-in-One
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content-generator" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border-white/20">
          <TabsTrigger value="content-generator">Content Generator</TabsTrigger>
          {hasHashtagResearch && <TabsTrigger value="hashtag-research">Hashtag Research</TabsTrigger>}
          {hasAnalytics && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
          {hasTeamCollaboration && <TabsTrigger value="brand-voice">Brand Voice</TabsTrigger>}
        </TabsList>

        <TabsContent value="content-generator" className="mt-6">
          {viewMode === "multi" ? (
            <MultiStepContentGenerator 
              canGenerateMore={canGenerateMore}
              postsRemaining={postsRemaining}
            />
          ) : (
            <CompactContentGenerator 
              canGenerateMore={canGenerateMore}
              postsRemaining={postsRemaining}
            />
          )}
        </TabsContent>

        {hasHashtagResearch && (
          <TabsContent value="hashtag-research" className="mt-6">
            <HashtagResearch onHashtagsGenerated={onHashtagsGenerated} />
          </TabsContent>
        )}

        {hasAnalytics && (
          <TabsContent value="analytics" className="mt-6">
            <AnalyticsPanel />
          </TabsContent>
        )}

        {hasTeamCollaboration && (
          <TabsContent value="brand-voice" className="mt-6">
            <BrandVoiceManager />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
