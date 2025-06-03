
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { TemplateFormSection } from "./TemplateFormSection";
import { StandardFormSection } from "./StandardFormSection";
import { ConnectionStatusIndicator } from "./ConnectionStatusIndicator";
import { useFormStateManager, ContentGenerationOptions } from "./FormStateManager";

interface ContentGeneratorFormProps {
  activeTemplate: string;
  selectedPlatforms: string[];
  customPrompt: string;
  isGenerating: boolean;
  canGenerateMore: boolean;
  contentType: string;
  selectedLanguage?: string;
  onTemplateSelect: (template: string) => void;
  onPlatformToggle: (platformId: string) => void;
  onPromptChange: (prompt: string) => void;
  onContentTypeChange: (type: string) => void;
  onGenerate: (options: ContentGenerationOptions) => void;
}

export const ContentGeneratorForm = ({
  activeTemplate,
  selectedPlatforms,
  customPrompt,
  isGenerating,
  canGenerateMore,
  contentType,
  selectedLanguage = "en",
  onTemplateSelect,
  onPlatformToggle,
  onPromptChange,
  onContentTypeChange,
  onGenerate
}: ContentGeneratorFormProps) => {
  const isMobile = useIsMobile();
  
  const {
    // Template state
    usePromptTemplate,
    setUsePromptTemplate,
    selectedTemplateId,
    templateVariables,
    availableTemplates,
    selectedTemplate,
    
    // Enhanced settings state
    tone,
    setTone,
    contentGoal,
    setContentGoal,
    includeHashtags,
    setIncludeHashtags,
    hashtagCount,
    setHashtagCount,
    includeEmojis,
    setIncludeEmojis,
    contentLength,
    setContentLength,
    
    // Template handlers
    handleTemplateVariableChange,
    handleSelectPromptTemplate,
    handleBackToTemplateSelection,
  } = useFormStateManager();

  // Auto-regenerate on settings change (♻️ STEP 4)
  React.useEffect(() => {
    // Auto-regenerate when key settings change
    console.log('♻️ Settings changed - ready for auto-regeneration');
  }, [tone, contentGoal, includeHashtags, hashtagCount, includeEmojis, contentLength, selectedPlatforms, activeTemplate]);

  return (
    <div className={`space-y-6 ${isMobile ? 'px-1' : ''}`}>
      {/* Connection Status */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Content Generator</h3>
        <ConnectionStatusIndicator />
      </div>

      <TemplateFormSection
        usePromptTemplate={usePromptTemplate}
        setUsePromptTemplate={setUsePromptTemplate}
        selectedTemplateId={selectedTemplateId}
        templateVariables={templateVariables}
        availableTemplates={availableTemplates}
        selectedTemplate={selectedTemplate}
        isGenerating={isGenerating}
        activeTemplate={activeTemplate}
        selectedPlatforms={selectedPlatforms}
        contentType={contentType}
        customPrompt={customPrompt}
        tone={tone}
        contentGoal={contentGoal}
        contentLength={contentLength}
        hashtagCount={hashtagCount}
        includeEmojis={includeEmojis}
        includeHashtags={includeHashtags}
        onSelectTemplate={handleSelectPromptTemplate}
        onTemplateVariableChange={handleTemplateVariableChange}
        onBackToTemplateSelection={handleBackToTemplateSelection}
        onGenerate={onGenerate}
      />

      {!usePromptTemplate && (
        <StandardFormSection
          activeTemplate={activeTemplate}
          selectedPlatforms={selectedPlatforms}
          customPrompt={customPrompt}
          contentType={contentType}
          isGenerating={isGenerating}
          canGenerateMore={canGenerateMore}
          tone={tone}
          contentGoal={contentGoal}
          contentLength={contentLength}
          hashtagCount={hashtagCount}
          includeEmojis={includeEmojis}
          includeHashtags={includeHashtags}
          onTemplateSelect={onTemplateSelect}
          onPlatformToggle={onPlatformToggle}
          onPromptChange={onPromptChange}
          onContentTypeChange={onContentTypeChange}
          onToneChange={setTone}
          onContentGoalChange={setContentGoal}
          onContentLengthChange={setContentLength}
          onHashtagCountChange={setHashtagCount}
          onIncludeEmojisChange={setIncludeEmojis}
          onIncludeHashtagsChange={setIncludeHashtags}
          onGenerate={onGenerate}
        />
      )}
    </div>
  );
};
