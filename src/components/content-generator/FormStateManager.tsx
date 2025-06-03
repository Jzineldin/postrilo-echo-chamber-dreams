
import React from "react";
import { enhancedContentGenerationService } from "@/services/ai/enhancedContentGenerationService";

export interface ContentGenerationOptions {
  tone: string;
  contentGoal: string;
  includeHashtags: boolean;
  hashtagCount: string;
  includeEmojis: boolean;
  contentLength: string;
  platforms: string[];
  template: string;
  contentType: string;
  customPrompt: string;
  usePromptTemplate?: boolean;
  templateId?: string;
  templateVariables?: Record<string, any>;
}

export const useFormStateManager = () => {
  // Template state
  const [usePromptTemplate, setUsePromptTemplate] = React.useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = React.useState<string | null>(null);
  const [templateVariables, setTemplateVariables] = React.useState<Record<string, any>>({});
  
  // Enhanced settings state
  const [tone, setTone] = React.useState("professional");
  const [contentGoal, setContentGoal] = React.useState("engagement");
  const [includeHashtags, setIncludeHashtags] = React.useState(true);
  const [hashtagCount, setHashtagCount] = React.useState("5-8");
  const [includeEmojis, setIncludeEmojis] = React.useState(true);
  const [contentLength, setContentLength] = React.useState("medium");

  // Get available templates
  const availableTemplates = enhancedContentGenerationService.getTemplates();
  const selectedTemplate = selectedTemplateId ? enhancedContentGenerationService.getTemplate(selectedTemplateId) : null;

  const handleTemplateVariableChange = (variable: string, value: any) => {
    setTemplateVariables(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const handleSelectPromptTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = enhancedContentGenerationService.getTemplate(templateId);
    
    if (template) {
      const initialVariables: Record<string, any> = {};
      template.variables.forEach(variable => {
        initialVariables[variable.name] = variable.defaultValue;
      });
      setTemplateVariables(initialVariables);
    }
  };

  const handleBackToTemplateSelection = () => {
    setSelectedTemplateId(null);
    setTemplateVariables({});
  };

  const resetTemplateState = () => {
    setSelectedTemplateId(null);
    setTemplateVariables({});
  };

  return {
    // Template state
    usePromptTemplate,
    setUsePromptTemplate,
    selectedTemplateId,
    setSelectedTemplateId,
    templateVariables,
    setTemplateVariables,
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
    resetTemplateState,
  };
};
