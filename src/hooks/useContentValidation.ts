
import { FormData } from '@/components/content-generator/multi-step/types';
import { ContentQualityService } from '@/services/ai/contentQualityService';

export const useContentValidation = () => {
  const validateKeyPointsInclusion = (content: string, formData: FormData): number => {
    if (!formData.bulletPoints || formData.bulletPoints.length === 0) {
      return 0;
    }

    return formData.bulletPoints.filter(point => 
      content.toLowerCase().includes(point.toLowerCase().split(' ')[0])
    ).length;
  };

  const getMissingKeyPoints = (content: string, formData: FormData): string[] => {
    if (!formData.bulletPoints) return [];
    
    return formData.bulletPoints.filter(point => 
      !content.toLowerCase().includes(point.toLowerCase().split(' ')[0])
    );
  };

  const shouldRetryGeneration = (
    content: string, 
    formData: FormData, 
    qualityScore: number
  ): boolean => {
    const missingKeyPoints = getMissingKeyPoints(content, formData);
    return missingKeyPoints.length > 0 || qualityScore < 70;
  };

  const evaluateRetryImprovement = (
    originalContent: string,
    retryContent: string,
    formData: FormData
  ): { useRetry: boolean; reason: string } => {
    const originalKeyPoints = validateKeyPointsInclusion(originalContent, formData);
    const retryKeyPoints = validateKeyPointsInclusion(retryContent, formData);
    
    const originalQuality = ContentQualityService.evaluateContent(
      originalContent, 
      formData.platform, 
      formData.language
    );
    
    const retryQuality = ContentQualityService.evaluateContent(
      retryContent, 
      formData.platform, 
      formData.language
    );

    if (retryKeyPoints > originalKeyPoints) {
      return {
        useRetry: true,
        reason: `Retry improved key point inclusion from ${originalKeyPoints} to ${retryKeyPoints}`
      };
    }

    if (retryQuality.score > originalQuality.score) {
      return {
        useRetry: true,
        reason: `Retry improved quality score from ${originalQuality.score} to ${retryQuality.score}`
      };
    }

    return {
      useRetry: false,
      reason: 'Original content was better or equivalent'
    };
  };

  return {
    validateKeyPointsInclusion,
    getMissingKeyPoints,
    shouldRetryGeneration,
    evaluateRetryImprovement
  };
};
