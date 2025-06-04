
interface RateLimitEntry {
  requests: number[];
  lastReset: number;
}

export class RateLimitService {
  private static storage = new Map<string, RateLimitEntry>();
  
  static checkRateLimit(
    userId: string, 
    action: string, 
    maxRequests: number = 10, 
    windowMs: number = 60000
  ): boolean {
    const key = `${userId}:${action}`;
    const now = Date.now();
    
    // Get existing entry or create new one
    let entry = this.storage.get(key);
    if (!entry) {
      entry = { requests: [], lastReset: now };
      this.storage.set(key, entry);
    }
    
    // Clean old requests outside the window
    entry.requests = entry.requests.filter(timestamp => now - timestamp < windowMs);
    
    // Check if limit exceeded
    if (entry.requests.length >= maxRequests) {
      return false;
    }
    
    // Add current request
    entry.requests.push(now);
    
    return true;
  }
  
  static getRemainingRequests(
    userId: string, 
    action: string, 
    maxRequests: number = 10, 
    windowMs: number = 60000
  ): number {
    const key = `${userId}:${action}`;
    const now = Date.now();
    
    const entry = this.storage.get(key);
    if (!entry) return maxRequests;
    
    // Clean old requests
    const validRequests = entry.requests.filter(timestamp => now - timestamp < windowMs);
    
    return Math.max(0, maxRequests - validRequests.length);
  }
  
  static resetRateLimit(userId: string, action: string): void {
    const key = `${userId}:${action}`;
    this.storage.delete(key);
  }
}
