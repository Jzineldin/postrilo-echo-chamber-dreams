
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PromptTemplateSelector } from "./PromptTemplateSelector";
import { DynamicPromptForm } from "./DynamicPromptForm";
import { ContentModeToggle } from "./ContentModeToggle";
import { enhancedContentGenerationService } from "@/services/ai/enhancedContentGenerationService";
import { useToast } from "@/hooks/use-toast";
import { ContentGenerationOptions } from "./FormStateManager";

interface TemplateFormSectionProps {
  usePromptTemplate: boolean;
  setUsePromptTemplate: (value: boolean) => void;
  selectedTemplateId: string | null;
  templateVariables: Record<string, any>;
  availableTemplates: any[];
  selectedTemplate: any;
  isGenerating: boolean;
  activeTemplate: string;
  selectedPlatforms: string[];
  contentType: string;
  customPrompt: string;
  tone: string;
  contentGoal: string;
  contentLength: string;
  hashtagCount: string;
  includeEmojis: boolean;
  includeHashtags: boolean;
  onSelectTemplate: (templateId: string) => void;
  onTemplateVariableChange: (variable: string, value: any) => void;
  onBackToTemplateSelection: () => void;
  onGenerate: (options: ContentGenerationOptions) => void;
}

export const TemplateFormSection = ({
  usePromptTemplate,
  setUsePromptTemplate,
  selectedTemplateId,
  templateVariables,
  availableTemplates,
  selectedTemplate,
  isGenerating,
  activeTemplate,
  selectedPlatforms,
  contentType,
  customPrompt,
  tone,
  contentGoal,
  contentLength,
  hashtagCount,
  includeEmojis,
  includeHashtags,
  onSelectTemplate,
  onTemplateVariableChange,
  onBackToTemplateSelection,
  onGenerate
}: TemplateFormSectionProps) => {
  const { toast } = useToast();

  const handleTemplateGenerate = async () => {
    if (!selectedTemplateId || !selectedTemplate) {
      toast({
        title: "No template selected",
        description: "Please select a prompt template.",
        variant: "destructive"
      });
      return;
    }

    // Use the new enhanced generation system
    const response = await enhancedContentGenerationService.generateWithTemplate({
      templateId: selectedTemplateId,
      variables: templateVariables,
      useTemplate: true,
      topic: customPrompt || templateVariables.topic || 'your topic',
      platform: selectedPlatforms[0] || 'instagram',
      goal: contentGoal,
      tone: tone,
      template: activeTemplate,
      length: contentLength,
      hashtagCount: hashtagCount,
      useEmojis: includeEmojis,
      useHashtags: includeHashtags
    });

    // Convert response to expected format for onGenerate
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
      usePromptTemplate: true,
      templateId: selectedTemplateId,
      templateVariables
    };
    
    console.log('🧩 Generating with enhanced template system:', enhancedOptions);
    onGenerate(enhancedOptions);
  };

  return (
    <>
      {/* Template Mode Toggle */}
      <ContentModeToggle 
        usePromptTemplate={usePromptTemplate}
        onToggle={setUsePromptTemplate}
      />

      {usePromptTemplate && (
        <>
          {/* Template Selection */}
          {!selectedTemplateId && (
            <PromptTemplateSelector
              templates={availableTemplates}
              selectedTemplate={selectedTemplateId}
              onSelectTemplate={onSelectTemplate}
            />
          )}

          {/* Dynamic Template Form */}
          {selectedTemplateId && selectedTemplate && (
            <>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-4">
                  <Button
                    variant="ghost"
                    onClick={onBackToTemplateSelection}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Templates
                  </Button>
                </CardContent>
              </Card>

              <DynamicPromptForm
                template={selectedTemplate}
                values={templateVariables}
                onChange={onTemplateVariableChange}
                onGenerate={handleTemplateGenerate}
                isGenerating={isGenerating}
              />
            </>
          )}
        </>
      )}
    </>
  );
};
