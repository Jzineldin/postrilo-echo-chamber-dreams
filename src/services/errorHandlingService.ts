
export interface AppError {
  id: string;
  type: 'network' | 'validation' | 'auth' | 'api' | 'unknown';
  message: string;
  details?: any;
  timestamp: number;
  stack?: string;
}

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

class ErrorHandlingService {
  private errors: AppError[] = [];
  private maxErrors = 100;

  logError(error: Error | string, context?: ErrorContext): AppError {
    const appError: AppError = {
      id: this.generateErrorId(),
      type: this.categorizeError(error),
      message: typeof error === 'string' ? error : error.message,
      details: typeof error === 'object' ? { stack: error.stack, ...context } : context,
      timestamp: Date.now(),
      stack: typeof error === 'object' ? error.stack : undefined
    };

    this.errors.unshift(appError);
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('App Error:', appError);
    }

    return appError;
  }

  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private categorizeError(error: Error | string): AppError['type'] {
    if (typeof error === 'string') {
      if (error.includes('network') || error.includes('fetch')) return 'network';
      if (error.includes('validation') || error.includes('required')) return 'validation';
      if (error.includes('auth') || error.includes('unauthorized')) return 'auth';
      return 'unknown';
    }

    const message = error.message.toLowerCase();
    if (message.includes('fetch') || message.includes('network')) return 'network';
    if (message.includes('validation') || message.includes('required')) return 'validation';
    if (message.includes('unauthorized') || message.includes('auth')) return 'auth';
    if (message.includes('api')) return 'api';
    
    return 'unknown';
  }

  getRecentErrors(limit = 10): AppError[] {
    return this.errors.slice(0, limit);
  }

  clearErrors(): void {
    this.errors = [];
  }

  getUserFriendlyMessage(error: AppError): string {
    switch (error.type) {
      case 'network':
        return 'Connection issue. Please check your internet connection and try again.';
      case 'validation':
        return 'Please check your input and try again.';
      case 'auth':
        return 'Authentication error. Please log in again.';
      case 'api':
        return 'Service temporarily unavailable. Please try again in a moment.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}

export const errorHandlingService = new ErrorHandlingService();
