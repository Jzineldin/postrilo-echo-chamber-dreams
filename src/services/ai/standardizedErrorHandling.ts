
import { ContentGenerationError } from '@/types/contentGeneration';

export type StandardizedAIError = ContentGenerationError;

export class StandardizedErrorHandler {
  static createError(
    type: ContentGenerationError['type'],
    message: string,
    userFriendlyMessage?: string,
    retryable: boolean = true
  ): StandardizedAIError {
    return {
      type,
      message,
      userFriendlyMessage: userFriendlyMessage || message,
      retryable,
      timestamp: Date.now()
    };
  }

  static handleFetchError(error: unknown): StandardizedAIError {
    if (error instanceof Error) {
      return this.createError(
        'network',
        error.message,
        'Network error occurred. Please check your connection.'
      );
    }
    return this.createError(
      'unknown',
      'Unknown error',
      'An unexpected error occurred.'
    );
  }

  static shouldRetry(error: StandardizedAIError, attempt: number, maxRetries: number): boolean {
    return error.retryable && attempt < maxRetries;
  }

  static getRetryDelay(error: StandardizedAIError, attempt: number): number {
    return Math.min(1000 * Math.pow(2, attempt), 10000);
  }
}
