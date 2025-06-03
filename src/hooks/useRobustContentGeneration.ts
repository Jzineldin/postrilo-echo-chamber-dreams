
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { RobustContentGenerationService, RobustGenerationRequest } from '@/services/ai/robustContentGenerationService';
import { DetailedAIError } from '@/services/ai/improvedErrorHandling';

export const useRobustContentGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<string>('');
  const [lastError, setLastError] = useState<DetailedAIError | null>(null);
  const { toast } = useToast();

  const generateContent = async (
    request: RobustGenerationRequest,
    onSuccess?: (content: string, fallbackUsed: boolean) => void,
    onError?: (error: DetailedAIError) => void
  ) => {
    setIsGenerating(true);
    setGenerationProgress('Generating content...');
    setLastError(null);

    try {
      const result = await RobustContentGenerationService.generateWithRobustErrorHandling(
        request,
        (progressMessage) => {
          setGenerationProgress(progressMessage);
          toast({
            title: "Retrying...",
            description: progressMessage,
          });
        }
      );

      if (result.success) {
        toast({
          title: "Content Generated!",
          description: `Created content${result.attemptsMade > 1 ? ` after ${result.attemptsMade} attempts` : ''}`,
        });
        
        if (onSuccess) {
          onSuccess(result.content, result.fallbackUsed);
        }
      } else {
        setLastError(result.error!);
        
        if (result.fallbackUsed) {
          toast({
            title: "Using Backup Content",
            description: "AI generation failed, but we created content for you to edit.",
            variant: "destructive"
          });
          
          if (onSuccess) {
            onSuccess(result.content, true);
          }
        } else {
          toast({
            title: "Generation Failed",
            description: result.error!.userFriendlyMessage,
            variant: "destructive"
          });
          
          // Show suggested action in a separate toast if available
          if (result.error!.suggestedAction) {
            setTimeout(() => {
              toast({
                title: "Suggestion",
                description: result.error!.suggestedAction,
              });
            }, 1000);
          }
          
          if (onError) {
            onError(result.error!);
          }
        }
      }
    } catch (error) {
      console.error('Unexpected error in content generation:', error);
      
      const unexpectedError: DetailedAIError = {
        type: 'unknown',
        message: error instanceof Error ? error.message : 'Unexpected error',
        userFriendlyMessage: 'An unexpected error occurred. Please try again.',
        retryable: true,
        suggestedAction: 'Refresh the page and try again, or contact support if the problem persists.'
      };
      
      setLastError(unexpectedError);
      
      toast({
        title: "Unexpected Error",
        description: unexpectedError.userFriendlyMessage,
        variant: "destructive"
      });
      
      if (onError) {
        onError(unexpectedError);
      }
    } finally {
      setIsGenerating(false);
      setGenerationProgress('');
    }
  };

  const retryLastGeneration = async (
    request: RobustGenerationRequest,
    onSuccess?: (content: string, fallbackUsed: boolean) => void,
    onError?: (error: DetailedAIError) => void
  ) => {
    if (lastError && !lastError.retryable) {
      toast({
        title: "Cannot Retry",
        description: lastError.suggestedAction || "This error type cannot be retried automatically.",
        variant: "destructive"
      });
      return;
    }

    await generateContent(request, onSuccess, onError);
  };

  return {
    isGenerating,
    generationProgress,
    lastError,
    generateContent,
    retryLastGeneration
  };
};
