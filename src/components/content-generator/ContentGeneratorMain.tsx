
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLoadingState } from "@/hooks/useLoadingState";
import { useNotifications } from "@/hooks/useNotifications";
import { useSubscriptionFeatures } from "@/hooks/useSubscriptionFeatures";
import { useIsMobile } from "@/hooks/use-mobile";
import { centralizedAIService } from "@/services/centralizedAIService";
import { enhancedTemplateService } from "@/services/ai/enhancedTemplateService";
import { platformOptimizationService } from "@/services/ai/platformOptimizationService";
import { retryService } from "@/services/retryService";
import { ContentGeneratorForm } from "./ContentGeneratorForm";
import { ContentGenerationOptions } from "./FormStateManager";
import { ContentGeneratorOutput } from "./ContentGeneratorOutput";
import { ContentHistoryModal } from "./ContentHistoryModal";
import { EnhancedTemplateSelector } from "./EnhancedTemplateSelector";
import { ContentStylePresets } from "./ContentStylePresets";
import { ContentTypeExpanded } from "./ContentTypeExpanded";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Zap, Palette } from "lucide-react";

interface ContentGeneratorMainProps {
  canGenerateMore: boolean;
  postsRemaining: number;
}

export const ContentGeneratorMain = ({ canGenerateMore, postsRemaining }: ContentGeneratorMainProps) => {
  const [activeMode, setActiveMode] = useState<'standard' | 'enhanced' | 'presets'>('standard');
  const [activeTemplate, setActiveTemplate] = useState("basic-post");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter"]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [contentType, setContentType] = useState("post");
  const [generatedContent, setGeneratedContent] = useState("");
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [contentMetadata, setContentMetadata] = useState<any>(null);
  
  const { toast } = useToast();
  const { executeWithLoading, isLoading, error } = useLoadingState();
  const { addSuccess, addError, addWarning } = useNotifications();
  const { hasAccess } = useSubscriptionFeatures();
  const isMobile = useIsMobile();

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.length > 1 ? prev.filter(p => p !== platformId) : prev;
      } else {
        return [platformId];
      }
    });
  };

  const handleEnhancedTemplateSelect = (templateId: string, variables: Record<string, string>) => {
    const template = enhancedTemplateService.getTemplate(templateId);
    if (template) {
      const prompt = enhancedTemplateService.interpolateTemplate(template, variables);
      setCustomPrompt(variables.topic || '');
      setActiveTemplate(templateId);
      
      // Auto-set platform if specified in variables
      if (variables.platform) {
        setSelectedPlatforms([variables.platform]);
      }
      
      generateContentWithPrompt(prompt);
    }
  };

  const handlePresetSelect = (preset: any) => {
    // Apply preset settings and generate content
    const options: ContentGenerationOptions = {
      template: activeTemplate,
      platforms: selectedPlatforms,
      customPrompt: customPrompt,
      contentType: preset.id.includes('video') ? 'video-script' : contentType,
      tone: preset.tone,
      contentGoal: preset.goal,
      contentLength: preset.contentLength,
      hashtagCount: preset.hashtagDensity,
      includeEmojis: preset.emojiUsage,
      includeHashtags: preset.hashtagDensity !== 'none'
    };
    
    generateContent(options);
  };

  const generateContentWithPrompt = async (prompt: string) => {
    if (!canGenerateMore) {
      addError("Post Limit Reached", "You've reached your monthly post limit.");
      return;
    }

    const result = await executeWithLoading(
      async () => {
        const response = await retryService.withRetry(
          () => centralizedAIService.generateContent({
            prompt,
            type: 'content',
            temperature: 0.7,
            maxTokens: 600,
            platforms: selectedPlatforms
          }),
          retryService.aiGeneration
        );

        if (response.error && !response.content) {
          throw new Error(response.error);
        }

        const content = response.content;
        setGeneratedContent(content);
        
        // Optimize content for platform
        if (selectedPlatforms[0]) {
          const optimization = platformOptimizationService.optimizeContent(
            content, 
            selectedPlatforms[0]
          );
          
          if (optimization.warnings.length > 0) {
            addWarning("Content Optimization", optimization.warnings.join(', '));
          }
        }
        
        addSuccess("Content Generated!", `Created content for ${selectedPlatforms[0]}`);
        return content;
      },
      {
        component: 'ContentGeneratorMain',
        action: 'generateContent'
      }
    );

    return result;
  };

  const generateContent = async (options: ContentGenerationOptions) => {
    if (!canGenerateMore) {
      addError("Post Limit Reached", "You've reached your monthly post limit.");
      return;
    }

    setGeneratedContent("");
    setGeneratedHashtags([]);
    setContentMetadata(null);

    const result = await executeWithLoading(
      async () => {
        if (!options.customPrompt?.trim()) {
          throw new Error("Please provide a topic or description for your content.");
        }

        if (!options.platforms || options.platforms.length === 0) {
          throw new Error("Please select at least one platform.");
        }
        
        // Use platform optimization service to create optimized prompt
        const optimizedPrompt = platformOptimizationService.generatePlatformSpecificPrompt(
          options.customPrompt,
          options.platforms[0],
          options.contentGoal || 'engagement'
        );
        
        toast({
          title: "Generating Content",
          description: `Creating ${options.contentType} for ${options.platforms[0]}...`,
        });
        
        const response = await retryService.withRetry(
          () => centralizedAIService.generateContent({
            prompt: optimizedPrompt,
            templateId: options.template,
            type: options.contentType === 'video-script' ? 'video-script' : 'content',
            temperature: 0.7,
            maxTokens: options.contentType === 'video-script' ? 800 : 600,
            platforms: options.platforms
          }),
          retryService.aiGeneration
        );

        if (response.error && !response.content) {
          throw new Error(response.error);
        }

        const content = response.content;
        if (!content || content.trim().length === 0) {
          throw new Error("No content was generated. Please try again.");
        }

        setGeneratedContent(content);
        
        // Optimize and analyze content
        const optimization = platformOptimizationService.optimizeContent(
          content,
          options.platforms[0]
        );
        
        if (optimization.recommendations.length > 0) {
          console.log('Platform recommendations:', optimization.recommendations);
        }
        
        if (optimization.warnings.length > 0) {
          addWarning("Content Optimization", optimization.warnings.join(', '));
        }
        
        setContentMetadata({
          platform: options.platforms[0],
          contentType: options.contentType,
          tone: options.tone,
          goal: options.contentGoal,
          topic: options.customPrompt,
          hashtags: []
        });
        
        // Generate hashtags if enabled
        if (options.contentType === 'post' && options.includeHashtags && hasAccess('hasHashtagResearch')) {
          try {
            const hashtags = await centralizedAIService.generateHashtags(content, 8);
            setGeneratedHashtags(hashtags);
            setContentMetadata(prev => prev ? { ...prev, hashtags } : null);
          } catch (error) {
            console.error('Hashtag generation failed:', error);
          }
        }
        
        const isUsingFallback = response.usage?.totalTokens === 0;
        const successMessage = isUsingFallback ? 
          `Content generated for ${options.platforms[0]}! (Smart Fallback)` : 
          `Content generated for ${options.platforms[0]}!`;
        
        addSuccess(successMessage, `${postsRemaining - 1} posts remaining this month.`);
        
        return content;
      },
      {
        component: 'ContentGeneratorMain',
        action: 'generateContent'
      }
    );

    return result;
  };

  const copyToClipboard = () => {
    if (!generatedContent) {
      toast({
        title: "Nothing to Copy",
        description: "Please generate content first",
        variant: "destructive"
      });
      return;
    }

    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  return (
    <div className="space-y-6 mt-0">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Enhanced Content Generator</h3>
        <ContentHistoryModal onSelectContent={(content) => {
          setCustomPrompt(content.topic);
          setSelectedPlatforms([content.platform]);
          setContentType(content.contentType);
        }} />
      </div>

      <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="standard" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Standard
          </TabsTrigger>
          <TabsTrigger value="enhanced" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="presets" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Presets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="standard" className="space-y-6">
          <ContentTypeExpanded
            selectedPlatforms={selectedPlatforms}
            onContentTypeSelect={setContentType}
            selectedContentType={contentType}
          />
          
          <ContentGeneratorForm
            activeTemplate={activeTemplate}
            selectedPlatforms={selectedPlatforms}
            customPrompt={customPrompt}
            contentType={contentType}
            isGenerating={isLoading}
            canGenerateMore={canGenerateMore}
            onTemplateSelect={setActiveTemplate}
            onPlatformToggle={handlePlatformToggle}
            onPromptChange={setCustomPrompt}
            onContentTypeChange={setContentType}
            onGenerate={generateContent}
          />
        </TabsContent>

        <TabsContent value="enhanced" className="space-y-6">
          <EnhancedTemplateSelector
            selectedPlatforms={selectedPlatforms}
            onTemplateSelect={handleEnhancedTemplateSelect}
            onBack={() => setActiveMode('standard')}
          />
        </TabsContent>

        <TabsContent value="presets" className="space-y-6">
          <ContentStylePresets onPresetSelect={handlePresetSelect} />
        </TabsContent>
      </Tabs>
      
      {generatedContent && (
        <ContentGeneratorOutput
          generatedContent={generatedContent}
          hasAdvancedScheduling={hasAccess('hasAdvancedScheduling')}
          selectedPlatforms={selectedPlatforms}
          contentMetadata={contentMetadata}
          onCopy={copyToClipboard}
        />
      )}
      
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="text-red-700">
              <strong>Error:</strong> {error}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
