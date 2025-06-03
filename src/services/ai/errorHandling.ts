
import { ContentGenerationError } from '@/types/contentGeneration';

export type DetailedAIError = ContentGenerationError;

export type AIError = ContentGenerationError;

export const createAIError = (
  type: ContentGenerationError['type'],
  message: string,
  userFriendlyMessage?: string,
  retryable: boolean = true
): DetailedAIError => ({
  type,
  message,
  userFriendlyMessage: userFriendlyMessage || message,
  retryable,
  timestamp: Date.now()
});

export const handleAIError = (error: unknown): DetailedAIError => {
  if (error instanceof Error) {
    return createAIError(
      'generation_error',
      error.message,
      'Failed to generate content. Please try again.'
    );
  }
  
  return createAIError(
    'generation_error',
    'Unknown error occurred',
    'An unexpected error occurred. Please try again.'
  );
};

export class AIErrorHandler {
  static handleError(error: unknown): DetailedAIError {
    return handleAIError(error);
  }

  static createError(
    type: ContentGenerationError['type'],
    message: string,
    userFriendlyMessage?: string,
    retryable: boolean = true
  ): DetailedAIError {
    return createAIError(type, message, userFriendlyMessage, retryable);
  }
}
