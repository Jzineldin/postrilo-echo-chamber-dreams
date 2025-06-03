
type BackoffStrategy = 'linear' | 'exponential' | 'decorrelated';

interface ResilienceOptions {
  maxRetries: number;
  initialBackoff: number;
  maxBackoff: number;
  backoffStrategy: BackoffStrategy;
  jitterFactor: number;
  timeout?: number;
}

interface CircuitBreakerConfig {
  failureThreshold: number;
  resetTimeout: number;
  halfOpenSuccessThreshold: number;
}

interface CircuitBreakerState {
  state: 'closed' | 'open' | 'half-open';
  failures: number;
  lastFailure: number | null;
  lastSuccess: number | null;
  openUntil: number | null;
}

class ResilienceService {
  private static instance: ResilienceService;
  private circuitBreakers: Record<string, CircuitBreakerState> = {};
  private defaultOptions: ResilienceOptions = {
    maxRetries: 3,
    initialBackoff: 300,
    maxBackoff: 10000,
    backoffStrategy: 'exponential',
    jitterFactor: 0.1
  };
  
  private defaultCircuitConfig: CircuitBreakerConfig = {
    failureThreshold: 5,
    resetTimeout: 30000,  // 30 seconds
    halfOpenSuccessThreshold: 2
  };

  static getInstance(): ResilienceService {
    if (!this.instance) {
      this.instance = new ResilienceService();
    }
    return this.instance;
  }

  /**
   * Execute a function with retry logic
   */
  async executeWithRetry<T>(
    fn: () => Promise<T>,
    options: Partial<ResilienceOptions> = {}
  ): Promise<T> {
    const config = { ...this.defaultOptions, ...options };
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < config.maxRetries; attempt++) {
      try {
        return await this.executeWithTimeout(fn, config.timeout);
      } catch (error: any) {
        lastError = error;
        
        if (attempt < config.maxRetries - 1) {
          const delay = this.calculateBackoff(attempt, config);
          console.log(`🔄 Retry attempt ${attempt + 1}/${config.maxRetries} after ${delay}ms delay`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError || new Error('Operation failed after retries');
  }

  /**
   * Execute a function with timeout
   */
  private async executeWithTimeout<T>(fn: () => Promise<T>, timeout?: number): Promise<T> {
    if (!timeout) return fn();
    
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Operation timed out after ${timeout}ms`)), timeout);
    });
    
    return Promise.race([fn(), timeoutPromise]) as Promise<T>;
  }

  /**
   * Calculate backoff delay based on strategy
   */
  private calculateBackoff(attemptNumber: number, options: ResilienceOptions): number {
    let delay: number;
    
    switch (options.backoffStrategy) {
      case 'linear':
        delay = options.initialBackoff * (attemptNumber + 1);
        break;
        
      case 'exponential':
        delay = options.initialBackoff * Math.pow(2, attemptNumber);
        break;
        
      case 'decorrelated':
        delay = options.initialBackoff * (Math.random() + 1) * Math.pow(2, attemptNumber);
        break;
        
      default:
        delay = options.initialBackoff;
    }
    
    // Apply jitter to avoid thundering herd
    const jitter = options.jitterFactor * delay * (Math.random() * 2 - 1);
    delay = delay + jitter;
    
    // Ensure delay is within bounds
    return Math.min(options.maxBackoff, Math.max(options.initialBackoff, delay));
  }

  /**
   * Execute operation with circuit breaker pattern
   */
  async executeWithCircuitBreaker<T>(
    serviceName: string,
    fn: () => Promise<T>,
    circuitConfig: Partial<CircuitBreakerConfig> = {}
  ): Promise<T> {
    const config = { ...this.defaultCircuitConfig, ...circuitConfig };
    
    // Initialize circuit breaker if it doesn't exist
    if (!this.circuitBreakers[serviceName]) {
      this.circuitBreakers[serviceName] = {
        state: 'closed',
        failures: 0,
        lastFailure: null,
        lastSuccess: null,
        openUntil: null
      };
    }
    
    const breaker = this.circuitBreakers[serviceName];
    const now = Date.now();
    
    // Check if circuit is open
    if (breaker.state === 'open') {
      if (breaker.openUntil && now < breaker.openUntil) {
        throw new Error(`Circuit for ${serviceName} is open until ${new Date(breaker.openUntil).toISOString()}`);
      }
      
      // Transition to half-open state
      breaker.state = 'half-open';
      console.log(`🔌 Circuit for ${serviceName} transitioning to half-open`);
    }
    
    try {
      const result = await fn();
      
      // Success logic
      if (breaker.state === 'half-open') {
        breaker.failures = 0;
        breaker.state = 'closed';
        console.log(`✅ Circuit for ${serviceName} closed after successful operation`);
      } else if (breaker.state === 'closed') {
        breaker.failures = 0;
      }
      
      breaker.lastSuccess = now;
      return result;
      
    } catch (error) {
      breaker.lastFailure = now;
      
      if (breaker.state === 'half-open') {
        // Failed in half-open state, reopen circuit
        breaker.state = 'open';
        breaker.openUntil = now + config.resetTimeout;
        console.log(`🔌 Circuit for ${serviceName} reopened after failure in half-open state`);
        
      } else if (breaker.state === 'closed') {
        // Increment failure counter
        breaker.failures++;
        
        // Check if failure threshold is reached
        if (breaker.failures >= config.failureThreshold) {
          breaker.state = 'open';
          breaker.openUntil = now + config.resetTimeout;
          console.log(`🔌 Circuit for ${serviceName} opened after ${breaker.failures} failures`);
        }
      }
      
      throw error;
    }
  }

  /**
   * Get all circuit breakers' status
   */
  getCircuitBreakersStatus(): Record<string, { state: string; failures: number; lastFailure: number | null }> {
    const status: Record<string, any> = {};
    
    for (const [name, breaker] of Object.entries(this.circuitBreakers)) {
      status[name] = {
        state: breaker.state,
        failures: breaker.failures,
        lastFailure: breaker.lastFailure ? new Date(breaker.lastFailure).toISOString() : null,
        lastSuccess: breaker.lastSuccess ? new Date(breaker.lastSuccess).toISOString() : null,
        openUntil: breaker.openUntil ? new Date(breaker.openUntil).toISOString() : null
      };
    }
    
    return status;
  }

  /**
   * Reset a specific circuit breaker
   */
  resetCircuitBreaker(serviceName: string): boolean {
    if (!this.circuitBreakers[serviceName]) {
      return false;
    }
    
    this.circuitBreakers[serviceName] = {
      state: 'closed',
      failures: 0,
      lastFailure: null,
      lastSuccess: null,
      openUntil: null
    };
    
    return true;
  }

  /**
   * Reset all circuit breakers
   */
  resetAllCircuitBreakers(): void {
    for (const name in this.circuitBreakers) {
      this.resetCircuitBreaker(name);
    }
    console.log('🔄 All circuit breakers have been reset');
  }
}

export const resilienceService = ResilienceService.getInstance();
