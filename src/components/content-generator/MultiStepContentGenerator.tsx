
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

// Step Components
import { ContentTypeStep } from "./steps/ContentTypeStep";
import { TopicPlatformStep } from "./steps/TopicPlatformStep";
import { StyleGoalStep } from "./steps/StyleGoalStep";
import { KeyPointsStep } from "./steps/KeyPointsStep";
import { ReviewGenerateStep } from "./steps/ReviewGenerateStep";

// Refactored Components
import { ProgressHeader } from "./multi-step/ProgressHeader";
import { StepNavigation } from "./multi-step/StepNavigation";
import { useMultiStepForm } from "./multi-step/hooks/useMultiStepForm";
import { useEnhancedContentGeneration } from "../enhanced-content-generator/hooks/useEnhancedContentGeneration";
import { MultiStepContentGeneratorProps } from "./multi-step/types";
import { useToast } from "@/hooks/use-toast";

export const MultiStepContentGenerator = ({ 
  canGenerateMore, 
  postsRemaining,
  initialTemplate 
}: MultiStepContentGeneratorProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const {
    currentStep,
    formData,
    updateFormData,
    jumpToStep,
    nextStep,
    prevStep,
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

  const onGenerate = async () => {
    if (!canGenerateMore) {
      toast({
        title: "Post limit reached",
        description: `You've reached your monthly limit. You have ${postsRemaining} posts remaining.`,
        variant: "destructive"
      });
      return;
    }

    // Convert form data to enhanced generator format
    const enhancedFormData = {
      topic: formData.topic,
      platform: formData.platforms[0] || formData.platform || 'instagram',
      goal: formData.goal,
      tone: formData.tone,
      contentType: formData.contentType,
      keyPoints: formData.keyPoints?.join(', ') || '',
      emojiUsage: formData.includeEmojis || false,
      hashtagDensity: formData.includeHashtags || false,
      shortSentences: true,
      useCache: true
    };

    await generateEnhancedContent(enhancedFormData);
  };

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
            onGenerate={onGenerate}
            canGenerateMore={canGenerateMore}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${isMobile ? 'px-3 py-4' : 'px-4 py-8'}`}>
      {/* Progress Header */}
      <ProgressHeader 
        currentStep={currentStep}
        postsRemaining={postsRemaining}
        onStepClick={jumpToStep}
      />

      {/* Current Step Content */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl min-h-[400px]">
        <CardContent className="p-8">
          {renderCurrentStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <StepNavigation 
        currentStep={currentStep}
        totalSteps={5}
        onPrevious={prevStep}
        onNext={nextStep}
        isNextDisabled={!canProceedToNext()}
      />
    </div>
  );
};
