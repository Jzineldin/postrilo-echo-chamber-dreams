
import { useCallback } from 'react';
import { useContentGenerationContext } from '@/contexts/ContentGenerationContext';
import { ContentFormData, GeneratedContentResult, ContentFormValidator } from '@/types/contentGeneration';
import { useUnifiedContentGeneration } from '@/hooks/useUnifiedContentGeneration';
import { StandardizedAIError } from '@/services/ai/standardizedErrorHandling';

export const useContentGenerationState = () => {
  const { state, dispatch } = useContentGenerationContext();
  const { generateContent } = useUnifiedContentGeneration();

  // Form data management
  const updateFormData = useCallback((updates: Partial<ContentFormData>) => {
    dispatch({ type: 'UPDATE_FORM_DATA', payload: updates });
    
    // Validate form after update
    const newFormData = { ...state.currentFormData, ...updates };
    const isValid = ContentFormValidator.validateFormData(newFormData) === null;
    dispatch({ type: 'SET_FORM_VALIDITY', payload: isValid });
  }, [dispatch, state.currentFormData]);

  const resetForm = useCallback(() => {
    const defaultData = ContentFormValidator.getFormDataDefaults();
    dispatch({ type: 'UPDATE_FORM_DATA', payload: defaultData });
    dispatch({ type: 'SET_FORM_VALIDITY', payload: false });
  }, [dispatch]);

  // Generation management
  const startGeneration = useCallback(async () => {
    if (!state.isFormValid) {
      return;
    }

    dispatch({ type: 'START_GENERATION' });

    await generateContent(
      {
        topic: state.currentFormData.topic,
        platform: state.currentFormData.platform,
        contentType: state.currentFormData.contentType,
        tone: state.currentFormData.tone,
        goal: state.currentFormData.goal,
        keyPoints: state.currentFormData.keyPoints,
        emojiUsage: state.currentFormData.emojiUsage,
        hashtagDensity: state.currentFormData.hashtagDensity,
        shortSentences: state.currentFormData.shortSentences,
        maxRetries: 3
      },
      (content) => {
        dispatch({ type: 'GENERATION_SUCCESS', payload: content });
      },
      (error) => {
        dispatch({ type: 'GENERATION_ERROR', payload: error });
      }
    );
  }, [state.isFormValid, state.currentFormData, generateContent, dispatch]);

  // UI state management
  const setActiveTab = useCallback((tab: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  }, [dispatch]);

  const toggleAdvancedSettings = useCallback(() => {
    dispatch({ type: 'TOGGLE_ADVANCED_SETTINGS' });
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, [dispatch]);

  const resetGenerationState = useCallback(() => {
    dispatch({ type: 'RESET_GENERATION_STATE' });
  }, [dispatch]);

  return {
    // State
    formData: state.currentFormData,
    isFormValid: state.isFormValid,
    isGenerating: state.isGenerating,
    generationProgress: state.generationProgress,
    generatedContent: state.generatedContent,
    contentHistory: state.contentHistory,
    lastError: state.lastError,
    activeTab: state.activeTab,
    showAdvancedSettings: state.showAdvancedSettings,
    
    // Actions
    updateFormData,
    resetForm,
    startGeneration,
    setActiveTab,
    toggleAdvancedSettings,
    clearError,
    resetGenerationState
  };
};
