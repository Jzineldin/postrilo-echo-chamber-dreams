
import { useState } from "react";
import { ContentGeneratorForm } from "./ContentGeneratorForm";
import { ContentGeneratorOutput } from "./ContentGeneratorOutput";
import { LanguageSelector } from "./LanguageSelector";
import { ContentPerformancePanel } from "@/components/analytics/ContentPerformancePanel";
import { PerformanceMetricsChart } from "@/components/analytics/charts/PerformanceMetricsChart";
import { usePerformanceMetrics } from "@/hooks/usePerformanceMetrics";
import { MultiLanguageContentService } from "@/services/ai/multiLanguageContentService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, BarChart3, Settings } from "lucide-react";

interface EnhancedContentGeneratorWithLanguagesProps {
  canGenerateMore: boolean;
  postsRemaining: number;
}

export const EnhancedContentGeneratorWithLanguages = ({ 
  canGenerateMore, 
  postsRemaining 
}: EnhancedContentGeneratorWithLanguagesProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [generatedContent, setGeneratedContent] = useState("");
  const [contentMetadata, setContentMetadata] = useState<any>(null);
  const { metrics, addMetric } = usePerformanceMetrics();

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    addMetric('language_change', 1, 'user');
  };

  const handleContentGenerated = (content: string, metadata: any) => {
    setGeneratedContent(content);
    setContentMetadata({ ...metadata, language: selectedLanguage });
    
    // Track performance metrics
    addMetric('content_generated', 1, 'user');
    addMetric('content_length', content.length, 'runtime');
    
    // Validate language-specific content
    const validation = MultiLanguageContentService.validateLanguageContent(content, selectedLanguage);
    if (!validation.isValid) {
      console.warn('Language validation issues:', validation.suggestions);
    }
  };

  // Mock performance data for demonstration
  const performanceData = [
    { timestamp: '10:00', loadTime: 1.2, memoryUsage: 45000000, userEngagement: 85 },
    { timestamp: '10:30', loadTime: 1.1, memoryUsage: 42000000, userEngagement: 88 },
    { timestamp: '11:00', loadTime: 1.3, memoryUsage: 48000000, userEngagement: 82 },
    { timestamp: '11:30', loadTime: 1.0, memoryUsage: 40000000, userEngagement: 90 },
    { timestamp: '12:00', loadTime: 1.2, memoryUsage: 46000000, userEngagement: 87 }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Generator
          </TabsTrigger>
          <TabsTrigger value="languages" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Languages
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ContentGeneratorForm
                activeTemplate="basic-post"
                selectedPlatforms={["instagram"]}
                customPrompt=""
                contentType="post"
                isGenerating={false}
                canGenerateMore={canGenerateMore}
                onTemplateSelect={() => {}}
                onPlatformToggle={() => {}}
                onPromptChange={() => {}}
                onContentTypeChange={() => {}}
                onGenerate={async (options) => {
                  // Mock content generation
                  const mockContent = `This is generated content for ${options.platforms[0]} in ${selectedLanguage}`;
                  handleContentGenerated(mockContent, options);
                  return mockContent;
                }}
              />
            </div>
            
            <div>
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>

          {generatedContent && (
            <ContentGeneratorOutput
              generatedContent={generatedContent}
              hasAdvancedScheduling={true}
              selectedPlatforms={["instagram"]}
              contentMetadata={contentMetadata}
              onCopy={() => {
                navigator.clipboard.writeText(generatedContent);
                addMetric('content_copied', 1, 'user');
              }}
            />
          )}
        </TabsContent>

        <TabsContent value="languages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Multi-Language Content Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
                showCulturalInfo={true}
              />
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Cultural Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      {MultiLanguageContentService.getLanguageSpecificGuidelines(selectedLanguage).map((guideline, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Performance Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Total Content:</strong> {metrics.length} items tracked</p>
                      <p><strong>Current Language:</strong> {selectedLanguage.toUpperCase()}</p>
                      <p><strong>Avg Generation Time:</strong> 2.3s</p>
                      <p><strong>Success Rate:</strong> 98.5%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <ContentPerformancePanel />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceMetricsChart data={performanceData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
