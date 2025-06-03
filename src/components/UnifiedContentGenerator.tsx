
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Wand2, Layout, Smartphone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSubscription } from "@/hooks/useSubscription";
import { MultiStepContentGenerator } from "./MultiStepContentGenerator";
import { UnifiedContentGenerator as UnifiedContentGeneratorComponent } from "./content-generator/UnifiedContentGenerator";
import { MobileContentGeneratorEnhanced } from "./mobile/MobileContentGeneratorEnhanced";
import { ContentGenerationProvider } from "@/contexts/ContentGenerationContext";
import { AppStateProvider } from "@/contexts/AppStateContext";

const UnifiedContentGenerator = () => {
  const { postsUsedThisMonth, monthlyPostsLimit } = useSubscription();
  const isMobile = useIsMobile();
  const [activeMode, setActiveMode] = useState("guided");

  const postsRemaining = Math.max(0, monthlyPostsLimit - postsUsedThisMonth);
  const canGenerateMore = postsRemaining > 0;

  return (
    <AppStateProvider>
      <ContentGenerationProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-4">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      {isMobile ? <Smartphone className="w-6 h-6" /> : <Layout className="w-6 h-6" />}
                      Content Generator
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      {isMobile ? "Mobile-optimized content creation" : "Create engaging content with AI-powered assistance"}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {postsRemaining} posts remaining
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Content Generation Interface */}
            {isMobile ? (
              // Mobile-optimized single interface
              <MobileContentGeneratorEnhanced
                canGenerateMore={canGenerateMore}
                postsRemaining={postsRemaining}
              />
            ) : (
              // Desktop experience with full feature set
              <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="guided" className="flex items-center gap-2">
                    <Wand2 className="w-4 h-4" />
                    Guided Creation
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="flex items-center gap-2">
                    <Layout className="w-4 h-4" />
                    All-in-One
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="guided" className="mt-6">
                  <MultiStepContentGenerator 
                    canGenerateMore={canGenerateMore}
                    postsRemaining={postsRemaining}
                  />
                </TabsContent>

                <TabsContent value="advanced" className="mt-6">
                  <UnifiedContentGeneratorComponent />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </ContentGenerationProvider>
    </AppStateProvider>
  );
};

export default UnifiedContentGenerator;
