
import React, { useState } from "react";
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
import { FormData as EnhancedFormData } from "@/components/enhanced-content-generator/types";

export const MultiStepContentGenerator = ({ 
  canGenerateMore, 
  postsRemaining,
  initialTemplate 
}: MultiStepContentGeneratorProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  
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
    setGeneratedContent(content.content);
    setGeneratedHashtags(content.hashtags || []);
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

  const handleNext = () => {
    nextStep();
    return true;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContentTypeStep 
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
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
            generatedHashtags={generatedHashtags}
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
        onNext={handleNext}
        isNextDisabled={!canProceedToNext()}
      />
    </div>
  );
};
