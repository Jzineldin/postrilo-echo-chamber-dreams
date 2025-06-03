
export interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoffMultiplier?: number;
  maxDelay?: number;
  shouldRetry?: (error: any) => boolean;
}

class RetryService {
  // Make static properties accessible on instances
  public aiGeneration = RetryService.aiGeneration;
  public socialMediaPost = RetryService.socialMediaPost;
  public contentSave = RetryService.contentSave;

  async withRetry<T>(
    operation: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {
    const {
      maxAttempts = 3,
      delay = 1000,
      backoffMultiplier = 2,
      maxDelay = 10000,
      shouldRetry = this.defaultShouldRetry
    } = options;

    let lastError: any;
    let currentDelay = delay;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;

        // Don't retry on last attempt or if error shouldn't be retried
        if (attempt === maxAttempts || !shouldRetry(error)) {
          throw error;
        }

        // Wait before retrying
        await this.wait(Math.min(currentDelay, maxDelay));
        currentDelay *= backoffMultiplier;

        console.log(`Retry attempt ${attempt} failed, retrying in ${currentDelay}ms...`);
      }
    }

    throw lastError;
  }

  private defaultShouldRetry(error: any): boolean {
    // Retry on network errors, timeouts, and 5xx status codes
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return true;
    }

    if (error.code === 'NETWORK_ERROR' || error.code === 'TIMEOUT') {
      return true;
    }

    if (error.status >= 500 && error.status < 600) {
      return true;
    }

    if (error.status === 429) { // Rate limiting
      return true;
    }

    return false;
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Specific retry configurations for different operations
  static aiGeneration: RetryOptions = {
    maxAttempts: 3,
    delay: 2000,
    backoffMultiplier: 2,
    shouldRetry: (error) => {
      return error.type !== 'content_moderation' && error.status !== 401;
    }
  };

  static socialMediaPost: RetryOptions = {
    maxAttempts: 2,
    delay: 1000,
    shouldRetry: (error) => {
      return error.status !== 400 && error.status !== 401 && error.status !== 403;
    }
  };

  static contentSave: RetryOptions = {
    maxAttempts: 3,
    delay: 500,
    backoffMultiplier: 1.5
  };
}

export const retryService = new RetryService();
