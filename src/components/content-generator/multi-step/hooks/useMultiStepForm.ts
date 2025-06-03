
import { useState } from "react";
import { FormData } from "../types";

export const useMultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    contentType: "post",
    topic: "",
    platform: "",
    language: "en",
    tone: "",
    goal: "",
    template: "",
    bulletPoints: [],
    includeEmojis: true,
    includeHashtags: true
  });

  const updateFormData = (updates: Partial<FormData>) => {
    console.log('Updating form data:', updates);
    setFormData(prev => {
      const updated = { ...prev, ...updates };
      console.log('New form data:', updated);
      return updated;
    });
  };

  const nextStep = () => {
    console.log('Attempting to go to next step. Current step:', currentStep);
    
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!formData.contentType || !formData.language) {
        console.log('Cannot proceed: missing content type or language');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.topic?.trim() || !formData.platform) {
        console.log('Cannot proceed: missing topic or platform');
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.tone || !formData.goal) {
        console.log('Cannot proceed: missing tone or goal');
        return false;
      }
    }
    
    if (currentStep < 5) {
      const newStep = currentStep + 1;
      console.log('Moving to step:', newStep);
      setCurrentStep(newStep);
      return true;
    }
    return false;
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      console.log('Moving back to step:', newStep);
      setCurrentStep(newStep);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      console.log('Jumping to step:', step);
      setCurrentStep(step);
    }
  };

  // Alias for compatibility
  const jumpToStep = goToStep;

  const resetForm = () => {
    console.log('Resetting form');
    setFormData({
      contentType: "post",
      topic: "",
      platform: "",
      language: "en",
      tone: "",
      goal: "",
      template: "",
      bulletPoints: [],
      includeEmojis: true,
      includeHashtags: true
    });
    setCurrentStep(1);
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.contentType && !!formData.language;
      case 2:
        return !!formData.topic?.trim() && !!formData.platform;
      case 3:
        return !!formData.tone && !!formData.goal;
      case 4:
        return true; // Key points are optional
      case 5:
        return true; // Review step is always valid if we got here
      default:
        return false;
    }
  };

  const canProceedToNext = () => {
    return isStepValid(currentStep);
  };

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    jumpToStep,
    resetForm,
    isStepValid,
    canProceedToNext
  };
};
