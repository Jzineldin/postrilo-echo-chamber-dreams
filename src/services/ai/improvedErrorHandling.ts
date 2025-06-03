
export interface DetailedAIError {
  type: 'network' | 'authentication' | 'rate_limit' | 'quota_exceeded' | 'service_unavailable' | 'content_blocked' | 'generation_error' | 'validation_error' | 'unknown';
  message: string;
  userFriendlyMessage?: string;
  retryable: boolean;
  retryAfter?: number;
  suggestedAction?: string;
  details?: any;
}

export const createDetailedError = (
  type: DetailedAIError['type'],
  message: string,
  retryable: boolean = true,
  userFriendlyMessage?: string
): DetailedAIError => {
  return {
    type,
    message,
    userFriendlyMessage: userFriendlyMessage || message,
    retryable,
  };
};

export const handleAIError = (error: any): DetailedAIError => {
  if (error?.code === 'NETWORK_ERROR') {
    return createDetailedError(
      'network',
      'Network connection failed',
      true,
      'Please check your internet connection and try again'
    );
  }

  if (error?.status === 401) {
    return createDetailedError(
      'authentication',
      'Authentication failed',
      false,
      'There was an authentication issue. Please refresh the page and try again'
    );
  }

  if (error?.status === 429) {
    return createDetailedError(
      'rate_limit',
      'Rate limit exceeded',
      true,
      'Too many requests. Please wait a moment before trying again'
    );
  }

  return createDetailedError(
    'unknown',
    error?.message || 'An unexpected error occurred',
    true,
    'Something went wrong. Please try again'
  );
};

export class ImprovedAIErrorHandler {
  static categorizeError(error: any): DetailedAIError {
    return handleAIError(error);
  }

  static shouldRetry(error: DetailedAIError, attempt: number, maxRetries: number): boolean {
    // Don't retry if we've reached max attempts
    if (attempt >= maxRetries) {
      return false;
    }

    // Don't retry authentication errors
    if (error.type === 'authentication') {
      return false;
    }

    // Don't retry content blocked errors
    if (error.type === 'content_blocked') {
      return false;
    }

    // Retry other types if they're marked as retryable
    return error.retryable;
  }

  static getRetryDelay(error: DetailedAIError, attempt: number): number {
    // Use exponential backoff with jitter
    const baseDelay = 1000; // 1 second
    const maxDelay = 30000; // 30 seconds
    
    // If the error specifies a retry-after time, use that
    if (error.retryAfter) {
      return Math.min(error.retryAfter * 1000, maxDelay);
    }

    // Calculate exponential backoff: 1s, 2s, 4s, 8s, etc.
    const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
    
    // Add jitter (random variation of ±25%)
    const jitter = delay * 0.25 * (Math.random() * 2 - 1);
    
    return Math.max(500, delay + jitter); // Minimum 500ms delay
  }

  static getProgressiveRetryMessage(attempt: number, maxRetries: number): string {
    const remaining = maxRetries - attempt + 1;
    
    if (attempt === 2) {
      return `First attempt failed, trying again... (${remaining} attempts remaining)`;
    } else if (attempt === 3) {
      return `Still having issues, retrying with different approach... (${remaining} attempts remaining)`;
    } else {
      return `Attempt ${attempt} of ${maxRetries} - trying alternative method...`;
    }
  }
}
