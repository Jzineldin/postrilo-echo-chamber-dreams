
import React from "react";
import { TemplateSelector } from "../TemplateSelector";
import { PlatformSelector } from "../PlatformSelector";
import { ContentGeneratorRandomizer } from "./ContentGeneratorRandomizer";
import { ContentTopicSection } from "./ContentTopicSection";
import { ContentSettingsForm } from "./ContentSettingsForm";
import { GenerateButton } from "./GenerateButton";
import { enhancedContentGenerationService } from "@/services/ai/enhancedContentGenerationService";
import { centralizedAIService } from "@/services/centralizedAIService";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { ContentGenerationOptions } from "./FormStateManager";

interface StandardFormSectionProps {
  activeTemplate: string;
  selectedPlatforms: string[];
  customPrompt: string;
  contentType: string;
  isGenerating: boolean;
  canGenerateMore: boolean;
  tone: string;
  contentGoal: string;
  contentLength: string;
  hashtagCount: string;
  includeEmojis: boolean;
  includeHashtags: boolean;
  onTemplateSelect: (template: string) => void;
  onPlatformToggle: (platformId: string) => void;
  onPromptChange: (prompt: string) => void;
  onContentTypeChange: (type: string) => void;
  onToneChange: (tone: string) => void;
  onContentGoalChange: (goal: string) => void;
  onContentLengthChange: (length: string) => void;
  onHashtagCountChange: (count: string) => void;
  onIncludeEmojisChange: (include: boolean) => void;
  onIncludeHashtagsChange: (include: boolean) => void;
  onGenerate: (options: ContentGenerationOptions) => void;
}

export const StandardFormSection = ({
  activeTemplate,
  selectedPlatforms,
  customPrompt,
  contentType,
  isGenerating,
  canGenerateMore,
  tone,
  contentGoal,
  contentLength,
  hashtagCount,
  includeEmojis,
  includeHashtags,
  onTemplateSelect,
  onPlatformToggle,
  onPromptChange,
  onContentTypeChange,
  onToneChange,
  onContentGoalChange,
  onContentLengthChange,
  onHashtagCountChange,
  onIncludeEmojisChange,
  onIncludeHashtagsChange,
  onGenerate
}: StandardFormSectionProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleRandomize = (settings: { template: string; platforms: string[]; prompt: string }) => {
    onTemplateSelect(settings.template);
    
    // Clear current platforms and set new ones
    selectedPlatforms.forEach(platform => onPlatformToggle(platform));
    settings.platforms.forEach(platform => onPlatformToggle(platform));
    
    onPromptChange(settings.prompt);
  };

  const handleRandomContentBrief = () => {
    const randomBrief = centralizedAIService.getRandomContentBrief();
    onPromptChange(randomBrief);
    
    toast({
      title: "Random Content Brief Generated! 💡",
      description: "Your content brief has been filled with a creative idea."
    });
  };

  const handleStandardGenerate = async () => {
    if (!customPrompt.trim()) {
      toast({
        title: "Missing content brief",
        description: "Please describe what you want to create.",
        variant: "destructive"
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platform selected",
        description: "Please select a platform for your content.",
        variant: "destructive"
      });
      return;
    }

    // Use the new enhanced generation system for standard generation too
    const response = await enhancedContentGenerationService.generateWithTemplate({
      templateId: 'standard',
      variables: {},
      useTemplate: false,
      topic: customPrompt,
      platform: selectedPlatforms[0],
      goal: contentGoal,
      tone: tone,
      template: activeTemplate,
      length: contentLength,
      hashtagCount: hashtagCount,
      useEmojis: includeEmojis,
      useHashtags: includeHashtags
    });

    const enhancedOptions: ContentGenerationOptions = {
      tone,
      contentGoal,
      includeHashtags,
      hashtagCount,
      includeEmojis,
      contentLength,
      platforms: selectedPlatforms,
      template: activeTemplate,
      contentType,
      customPrompt: response.content,
      usePromptTemplate: false
    };
    
    console.log('🧩 Generating with enhanced standard system:', enhancedOptions);
    onGenerate(enhancedOptions);
  };

  return (
    <>
      {/* Enhanced Content Generation Form with Template Behavior System */}
      <ContentTopicSection
        customPrompt={customPrompt}
        contentType={contentType}
        onPromptChange={onPromptChange}
        onRandomContentBrief={handleRandomContentBrief}
      />

      {/* Template Behavior Selection */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
        <TemplateSelector
          templates={[]}
          activeTemplate={activeTemplate}
          onTemplateSelect={onTemplateSelect}
        />
        
        <PlatformSelector
          selectedPlatforms={selectedPlatforms}
          onPlatformToggle={onPlatformToggle}
        />
      </div>

      {/* Enhanced Settings */}
      <ContentSettingsForm
        contentType={contentType}
        tone={tone}
        contentGoal={contentGoal}
        contentLength={contentLength}
        hashtagCount={hashtagCount}
        includeEmojis={includeEmojis}
        includeHashtags={includeHashtags}
        onContentTypeChange={onContentTypeChange}
        onToneChange={onToneChange}
        onContentGoalChange={onContentGoalChange}
        onContentLengthChange={onContentLengthChange}
        onHashtagCountChange={onHashtagCountChange}
        onIncludeEmojisChange={onIncludeEmojisChange}
        onIncludeHashtagsChange={onIncludeHashtagsChange}
      />

      {/* Generate Button */}
      <GenerateButton
        onGenerate={handleStandardGenerate}
        isGenerating={isGenerating}
        canGenerateMore={canGenerateMore}
        customPrompt={customPrompt}
        contentType={contentType}
      />

      {/* Quick Actions - Randomizer */}
      <ContentGeneratorRandomizer onRandomize={handleRandomize} />
    </>
  );
};
