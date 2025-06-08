import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useMultiStepForm } from "./content-generator/multi-step/hooks/useMultiStepForm";
import { useContentGeneration } from "./content-generator/multi-step/hooks/useContentGeneration";
import { ContentTypeStep } from "./content-generator/steps/ContentTypeStep";
import { TopicPlatformStep } from "./content-generator/steps/TopicPlatformStep";
import { StyleGoalStep } from "./content-generator/steps/StyleGoalStep";
import { KeyPointsStep } from "./content-generator/steps/KeyPointsStep";
import { ReviewGenerateStep } from "./content-generator/steps/ReviewGenerateStep";
import { ProgressHeader } from "./content-generator/multi-step/ProgressHeader";
import { StepNavigation } from "./content-generator/multi-step/StepNavigation";
import { MobileContentGenerator } from "./mobile/MobileContentGenerator";
import { useIsMobile } from "@/hooks/use-mobile";

interface MultiStepContentGeneratorProps {
  canGenerateMore: boolean;
  postsRemaining: number;
  onBack?: () => void;
}

export const MultiStepContentGenerator = ({ 
  canGenerateMore, 
  postsRemaining,
  onBack 
}: MultiStepContentGeneratorProps) => {
  const isMobile = useIsMobile();
  
  const {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    resetForm
  } = useMultiStepForm();

  const {
    generatedContent,
    suggestedHashtags,
    isGenerating,
    handleGenerate
  } = useContentGeneration();

  const totalSteps = 5;

  const onGenerate = async () => {
    if (!canGenerateMore) {
      alert(`You've reached your monthly limit of posts. You have ${postsRemaining} posts remaining.`);
      return;
    }

    await handleGenerate(formData, canGenerateMore);
  };

  const onMobileContentGenerated = (content: any) => {
    // Handle mobile content generation
    console.log('Mobile content generated:', content);
  };

  const onMobileGenerationError = (error: any) => {
    console.error('Mobile generation error:', error);
  };

  const handleBackToDashboard = () => {
    if (onBack) {
      onBack();
    } else {
      // Fallback navigation
      window.location.hash = 'dashboard';
    }
  };

  // Use mobile component for mobile devices
  if (isMobile) {
    return (
      <div className="px-3 py-4">
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
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
            onBack={handleBackToDashboard}
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
            formData={formData}
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back to Dashboard Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </div>

      <ProgressHeader 
        currentStep={currentStep}
        postsRemaining={postsRemaining}
        onStepClick={goToStep}
      />
      
      {renderCurrentStep()}
      
      <StepNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={prevStep}
        onNext={nextStep}
        isNextDisabled={false}
      />
    </div>
  );
};
