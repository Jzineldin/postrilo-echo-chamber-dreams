
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLoadingState } from "@/hooks/useLoadingState";
import { useNotifications } from "@/hooks/useNotifications";
import { useSubscriptionFeatures } from "@/hooks/useSubscriptionFeatures";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSecureContentGeneration } from "@/hooks/useSecureContentGeneration";
import { AuthGuard } from "@/services/security/authGuard";
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
import { Sparkles, Zap, Palette, Shield } from "lucide-react";

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
  const { addSuccess, addError, addWarning } = useNotifications();
  const { hasAccess } = useSubscriptionFeatures();
  const isMobile = useIsMobile();
  
  // Use secure content generation
  const { generateContent: secureGenerateContent, isGenerating, validationErrors } = useSecureContentGeneration();
  
  // Authentication guard
  const { isAuthenticated, isLoading: authLoading, user } = AuthGuard.useRequireAuth();

  if (authLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </CardContent>
      </Card>
    );
  }

  if (!isAuthenticated) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Shield className="w-5 h-5" />
            Authentication Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700 mb-4">
            You need to be logged in to generate content. This ensures your content is secure and personalized.
          </p>
          <Button onClick={() => window.location.href = '/auth'}>
            Sign In
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.length > 1 ? prev.filter(p => p !== platformId) : prev;
      } else {
        return [platformId];
      }
    });
  };

  const generateContent = async (options: ContentGenerationOptions) => {
    if (!canGenerateMore) {
      addError("Post Limit Reached", "You've reached your monthly post limit.");
      return;
    }

    setGeneratedContent("");
    setGeneratedHashtags([]);
    setContentMetadata(null);

    try {
      if (!options.customPrompt?.trim()) {
        throw new Error("Please provide a topic or description for your content.");
      }

      if (!options.platforms || options.platforms.length === 0) {
        throw new Error("Please select at least one platform.");
      }
      
      toast({
        title: "Generating Content",
        description: `Creating ${options.contentType} for ${options.platforms[0]}...`,
      });
      
      // Use secure content generation
      const result = await secureGenerateContent({
        prompt: options.customPrompt,
        type: options.contentType === 'video-script' ? 'video-script' : 'content',
        platforms: options.platforms,
        temperature: 0.7,
        maxTokens: options.contentType === 'video-script' ? 800 : 600
      });

      if (!result.content || result.content.trim().length === 0) {
        throw new Error("No content was generated. Please try again.");
      }

      setGeneratedContent(result.content);
      
      setContentMetadata({
        platform: options.platforms[0],
        contentType: options.contentType,
        tone: options.tone,
        goal: options.contentGoal,
        topic: options.customPrompt,
        hashtags: []
      });
      
      addSuccess("Content Generated Securely!", `Content created for ${options.platforms[0]} with security validation.`);
      
      return result.content;
    } catch (error) {
      console.error('Content generation error:', error);
      addError("Generation Failed", error instanceof Error ? error.message : "Please try again.");
    }
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
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          Secure Content Generator
        </h3>
        <ContentHistoryModal onSelectContent={(content) => {
          setCustomPrompt(content.topic);
          setSelectedPlatforms([content.platform]);
          setContentType(content.contentType);
        }} />
      </div>

      {validationErrors.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="text-red-700">
              <strong>Security Validation Errors:</strong>
              <ul className="list-disc ml-4 mt-2">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

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
            isGenerating={isGenerating}
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
            onTemplateSelect={(templateId, variables) => {
              setCustomPrompt(variables.topic || '');
              setActiveTemplate(templateId);
              if (variables.platform) {
                setSelectedPlatforms([variables.platform]);
              }
            }}
            onBack={() => setActiveMode('standard')}
          />
        </TabsContent>

        <TabsContent value="presets" className="space-y-6">
          <ContentStylePresets onPresetSelect={(preset) => {
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
          }} />
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
    </div>
  );
};
