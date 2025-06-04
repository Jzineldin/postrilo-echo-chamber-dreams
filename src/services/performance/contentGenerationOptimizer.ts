export class ContentGenerationOptimizer {
  private static requestQueue: Array<() => Promise<any>> = [];
  private static isProcessing = false;
  private static readonly MAX_CONCURRENT = 2;
  private static readonly REQUEST_DELAY = 1000; // 1 second between requests
  
  static async optimizedGenerate<T>(
    generationFunction: () => Promise<T>,
    priority: 'high' | 'normal' | 'low' = 'normal'
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestWrapper = async () => {
        try {
          const result = await generationFunction();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      // Add to queue based on priority
      if (priority === 'high') {
        this.requestQueue.unshift(requestWrapper);
      } else {
        this.requestQueue.push(requestWrapper);
      }

      this.processQueue();
    });
  }

  private static async processQueue() {
    if (this.isProcessing || this.requestQueue.length === 0) {
      return;
    }

    this.isProcessing = true;
    console.log(`🚀 Processing queue: ${this.requestQueue.length} requests pending`);

    while (this.requestQueue.length > 0) {
      const batchSize = Math.min(this.MAX_CONCURRENT, this.requestQueue.length);
      const batch = this.requestQueue.splice(0, batchSize);

      try {
        // Process batch concurrently
        await Promise.allSettled(batch.map(request => request()));
        
        // Add delay between batches to prevent rate limiting
        if (this.requestQueue.length > 0) {
          await new Promise(resolve => setTimeout(resolve, this.REQUEST_DELAY));
        }
      } catch (error) {
        console.error('🚨 Batch processing error:', error);
      }
    }

    this.isProcessing = false;
    console.log('✅ Queue processing completed');
  }

  static getQueueStatus() {
    return {
      queueLength: this.requestQueue.length,
      isProcessing: this.isProcessing
    };
  }

  static clearQueue() {
    this.requestQueue = [];
    this.isProcessing = false;
  }
}

export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();

  static startTimer(operation: string): () => number {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      this.recordMetric(operation, duration);
      return duration;
    };
  }

  private static recordMetric(operation: string, duration: number) {
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, []);
    }
    
    const operationMetrics = this.metrics.get(operation)!;
    operationMetrics.push(duration);
    
    // Keep only last 100 measurements
    if (operationMetrics.length > 100) {
      operationMetrics.shift();
    }
  }

  static getMetrics(operation: string) {
    const metrics = this.metrics.get(operation) || [];
    
    if (metrics.length === 0) {
      return null;
    }

    const sorted = [...metrics].sort((a, b) => a - b);
    
    return {
      count: metrics.length,
      average: metrics.reduce((sum, val) => sum + val, 0) / metrics.length,
      median: sorted[Math.floor(sorted.length / 2)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      min: sorted[0],
      max: sorted[sorted.length - 1]
    };
  }

  static getAllMetrics() {
    const result: Record<string, any> = {};
    
    for (const [operation, _] of this.metrics) {
      result[operation] = this.getMetrics(operation);
    }
    
    return result;
  }

  static clearMetrics() {
    this.metrics.clear();
  }
}
