
import { useState, useCallback } from 'react';
import { FormData } from '../types';

export const useMultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    contentType: '',
    topic: '',
    platforms: [],
    tone: '',
    goal: '',
    keyPoints: [],
    language: 'en'
  });

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const jumpToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 5) {
      setCurrentStep(step);
    }
  }, []);

  const canProceedToNext = useCallback(() => {
    switch (currentStep) {
      case 1:
        return !!formData.contentType;
      case 2:
        return !!formData.topic && formData.platforms.length > 0;
      case 3:
        return !!formData.tone && !!formData.goal;
      case 4:
        return true; // Key points are optional
      case 5:
        return true;
      default:
        return false;
    }
  }, [currentStep, formData]);

  const resetForm = useCallback(() => {
    setCurrentStep(1);
    setFormData({
      contentType: '',
      topic: '',
      platforms: [],
      tone: '',
      goal: '',
      keyPoints: [],
      language: 'en'
    });
  }, []);

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    jumpToStep,
    canProceedToNext,
    resetForm
  };
};
