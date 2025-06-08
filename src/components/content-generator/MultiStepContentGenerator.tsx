
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
import { useContentGeneration } from "./multi-step/hooks/useContentGeneration";
import { MultiStepContentGeneratorProps } from "./multi-step/types";

export const MultiStepContentGenerator = ({ 
  canGenerateMore, 
  postsRemaining,
  initialTemplate 
}: MultiStepContentGeneratorProps) => {
  const isMobile = useIsMobile();
  
  const {
    currentStep,
    formData,
    updateFormData,
    jumpToStep,
    nextStep,
    prevStep,
    canProceedToNext
  } = useMultiStepForm();

  const {
    generatedContent,
    suggestedHashtags,
    isGenerating,
    handleGenerate
  } = useContentGeneration();

  const onGenerate = () => {
    handleGenerate(formData, canGenerateMore);
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
            generatedContent={generatedContent}
            generatedHashtags={suggestedHashtags}
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
