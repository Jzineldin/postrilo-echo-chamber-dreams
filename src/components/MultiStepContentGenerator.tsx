
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useMultiStepForm } from "./content-generator/multi-step/hooks/useMultiStepForm";
import { useEnhancedContentGeneration } from "./enhanced-content-generator/hooks/useEnhancedContentGeneration";
import { ContentTypeStep } from "./content-generator/steps/ContentTypeStep";
import { TopicPlatformStep } from "./content-generator/steps/TopicPlatformStep";
import { StyleGoalStep } from "./content-generator/steps/StyleGoalStep";
import { KeyPointsStep } from "./content-generator/steps/KeyPointsStep";
import { ReviewGenerateStep } from "./content-generator/steps/ReviewGenerateStep";
import { ProgressHeader } from "./content-generator/multi-step/ProgressHeader";
import { StepNavigation } from "./content-generator/multi-step/StepNavigation";
import { MobileContentGenerator } from "./mobile/MobileContentGenerator";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { FormData as EnhancedFormData } from "@/components/enhanced-content-generator/types";

interface MultiStepContentGeneratorProps {
  canGenerateMore: boolean;
  postsRemaining: number;
  onBack?: () => void;
  initialTemplate?: any;
}

export const MultiStepContentGenerator = ({ 
  canGenerateMore, 
  postsRemaining,
  onBack,
  initialTemplate
}: MultiStepContentGeneratorProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    jumpToStep,
    resetForm,
    canProceedToNext
  } = useMultiStepForm();

  const onContentGenerated = (content: any) => {
    console.log('Content generated successfully:', content);
    toast({
      title: "Content Generated!",
      description: `Successfully generated ${content.contentType} for ${content.platform}`,
    });
  };

  const onGenerationError = (error: any) => {
    console.error('Content generation error:', error);
    toast({
      title: "Generation Failed",
      description: error.userFriendlyMessage || "Failed to generate content. Please try again.",
      variant: "destructive"
    });
  };

  const { isGenerating, generateEnhancedContent } = useEnhancedContentGeneration(
    onContentGenerated,
    onGenerationError
  );

  const totalSteps = 5;

  const onGenerate = async () => {
    if (!canGenerateMore) {
      toast({
        title: "Post limit reached",
        description: `You've reached your monthly limit. You have ${postsRemaining} posts remaining.`,
        variant: "destructive"
      });
      return;
    }

    // Convert form data to enhanced generator format with proper typing
    const enhancedFormData: EnhancedFormData = {
      topic: formData.topic,
      platform: (formData.platforms[0] || formData.platform || 'instagram') as 'instagram' | 'twitter' | 'linkedin' | 'facebook' | 'tiktok' | 'youtube',
      goal: (formData.goal || 'engagement') as 'engagement' | 'brand-awareness' | 'lead-generation' | 'promotion',
      tone: (formData.tone || 'professional') as 'professional' | 'casual' | 'humorous' | 'inspirational' | 'educational',
      contentType: (formData.contentType || 'post') as 'post' | 'video-script' | 'story' | 'reel' | 'carousel' | 'thread',
      keyPoints: formData.keyPoints?.join(', ') || '',
      emojiUsage: formData.includeEmojis || false,
      hashtagDensity: formData.includeHashtags || false,
      shortSentences: true,
      useCache: true
    };

    await generateEnhancedContent(enhancedFormData);
  };

  const onMobileContentGenerated = (content: any) => {
    console.log('Mobile content generated:', content);
  };

  const onMobileGenerationError = (error: any) => {
    console.error('Mobile generation error:', error);
  };

  // Use mobile component for mobile devices
  if (isMobile) {
    return (
      <div className="px-3 py-4">
        <MobileContentGenerator
          onContentGenerated={onMobileContentGenerated}
          onGenerationError={onMobileGenerationError}
          isGenerating={isGenerating}
          canGenerateMore={canGenerateMore}
          postsRemaining={postsRemaining}
        />
      </div>
    );
  }

  // Keep existing desktop multi-step form
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContentTypeStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <TopicPlatformStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <StyleGoalStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <KeyPointsStep
            formData={{ ...formData, bulletPoints: formData.bulletPoints || [] }}
            updateFormData={updateFormData}
          />
        );
      case 5:
        return (
          <ReviewGenerateStep
            formData={formData}
            generatedContent=""
            generatedHashtags={[]}
            isGenerating={isGenerating}
            canGenerateMore={canGenerateMore}
            onGenerate={onGenerate}
            onPrevious={prevStep}
            onStartOver={resetForm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${isMobile ? 'px-3 py-4' : 'px-4 py-8'}`}>
      <ProgressHeader 
        currentStep={currentStep}
        postsRemaining={postsRemaining}
        onStepClick={jumpToStep}
      />
      
      {renderCurrentStep()}
      
      <StepNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={prevStep}
        onNext={nextStep}
        isNextDisabled={!canProceedToNext()}
      />
    </div>
  );
};
