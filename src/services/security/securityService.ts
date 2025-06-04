
export class SecurityService {
  /**
   * Sanitizes user input to prevent XSS attacks
   */
  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';
    
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .trim();
  }

  /**
   * Validates email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates content length for platform constraints
   */
  static validateContentLength(content: string, platform: string): boolean {
    const maxLengths: Record<string, number> = {
      twitter: 280,
      instagram: 2200,
      linkedin: 3000,
      facebook: 63206,
      tiktok: 150,
      youtube: 5000
    };

    const maxLength = maxLengths[platform] || 5000;
    return content.length <= maxLength;
  }

  /**
   * Checks for potentially malicious content
   */
  static validateContentSafety(content: string): { isValid: boolean; reason?: string } {
    // Check for script injection attempts
    const scriptPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /data:text\/html/gi
    ];

    for (const pattern of scriptPatterns) {
      if (pattern.test(content)) {
        return { isValid: false, reason: 'Potentially malicious content detected' };
      }
    }

    // Check for excessive special characters (potential injection)
    const specialCharCount = (content.match(/[<>{}[\]]/g) || []).length;
    if (specialCharCount > content.length * 0.1) {
      return { isValid: false, reason: 'Excessive special characters detected' };
    }

    return { isValid: true };
  }

  /**
   * Rate limiting check for user actions
   */
  static checkRateLimit(userId: string, action: string): boolean {
    const key = `${userId}:${action}`;
    const now = Date.now();
    const timeWindow = 60000; // 1 minute
    const maxRequests = 10;

    // Get stored requests from localStorage (in production, use Redis)
    const stored = localStorage.getItem(`rateLimit:${key}`);
    let requests: number[] = stored ? JSON.parse(stored) : [];

    // Remove old requests outside time window
    requests = requests.filter(timestamp => now - timestamp < timeWindow);

    // Check if limit exceeded
    if (requests.length >= maxRequests) {
      return false;
    }

    // Add current request
    requests.push(now);
    localStorage.setItem(`rateLimit:${key}`, JSON.stringify(requests));

    return true;
  }

  /**
   * Validates user permissions for admin actions
   */
  static async validateAdminAccess(userRole: string | null): Promise<boolean> {
    return userRole === 'admin';
  }

  /**
   * Logs security events for monitoring
   */
  static logSecurityEvent(event: string, userId: string, details: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      userId,
      details,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.warn('🔒 Security Event:', logEntry);
    
    // In production, send to monitoring service
    // await fetch('/api/security-log', { method: 'POST', body: JSON.stringify(logEntry) });
  }
}
