
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { errorHandlingService } from '@/services/errorHandlingService';

interface LoadingOptions {
  successMessage?: string;
  errorMessage?: string;
  component?: string;
  action?: string;
}

export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const executeWithLoading = useCallback(async <T>(
    asyncOperation: () => Promise<T>,
    options: LoadingOptions = {}
  ): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await asyncOperation();
      
      if (options.successMessage) {
        toast({
          title: "Success",
          description: options.successMessage,
        });
      }

      return result;
    } catch (err) {
      const appError = errorHandlingService.logError(err instanceof Error ? err : String(err), {
        component: options.component,
        action: options.action
      });

      const userMessage = options.errorMessage || errorHandlingService.getUserFriendlyMessage(appError);
      setError(userMessage);

      toast({
        title: "Error",
        description: userMessage,
        variant: "destructive"
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    executeWithLoading,
    clearError
  };
};
