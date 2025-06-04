
import { supabase } from '@/integrations/supabase/client';
import { SecurityLogger } from './securityLogger';
import { RateLimitService } from './rateLimit';

interface SecurityEvent {
  event: string;
  userId: string;
  details: any;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source?: string;
}

interface SecurityMetrics {
  totalEvents: number;
  criticalEvents: number;
  recentEvents: number;
  topRisks: Array<{ type: string; count: number }>;
}

export class EnhancedSecurityService {
  private static instance: EnhancedSecurityService;
  
  static getInstance(): EnhancedSecurityService {
    if (!this.instance) {
      this.instance = new EnhancedSecurityService();
    }
    return this.instance;
  }

  // Enhanced security event logging with database persistence
  async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      // Log to local SecurityLogger
      SecurityLogger.logEvent(
        event.event,
        event.userId,
        event.details,
        event.severity,
        event.source || 'web'
      );

      // Also persist to database for admin monitoring
      const { error } = await supabase
        .from('security_events')
        .insert({
          event: event.event,
          user_id: event.userId === 'anonymous' ? null : event.userId,
          details: event.details,
          severity: event.severity,
          source: event.source || 'web',
          ip_address: this.getClientIP(),
          user_agent: navigator.userAgent
        });

      if (error) {
        console.error('Failed to persist security event:', error);
      }

      // Alert on critical events
      if (event.severity === 'critical') {
        this.alertCriticalEvent(event);
      }

    } catch (error) {
      console.error('Security event logging failed:', error);
    }
  }

  // Validate user input with enhanced security checks
  validateUserInput(input: string, maxLength: number = 1000): { 
    isValid: boolean; 
    sanitized?: string; 
    violations?: string[] 
  } {
    const violations: string[] = [];
    
    if (!input || typeof input !== 'string') {
      return { isValid: false, violations: ['Input must be a non-empty string'] };
    }

    if (input.length > maxLength) {
      violations.push(`Input exceeds maximum length of ${maxLength} characters`);
    }

    // Check for malicious patterns
    const maliciousPatterns = [
      { pattern: /<script|javascript:|data:|vbscript:/gi, name: 'Script injection' },
      { pattern: /\bon\w+\s*=/gi, name: 'Event handlers' },
      { pattern: /\b(eval|function|constructor)\s*\(/gi, name: 'Code execution' },
      { pattern: /\b(admin|root|sudo)\b/gi, name: 'Privileged terms' },
      { pattern: /\b(password|token|key|secret)\s*[:=]/gi, name: 'Credential exposure' }
    ];

    let sanitized = input;
    for (const { pattern, name } of maliciousPatterns) {
      if (pattern.test(input)) {
        violations.push(`Detected ${name}`);
        sanitized = sanitized.replace(pattern, '[FILTERED]');
      }
    }

    // Basic XSS prevention
    sanitized = sanitized
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');

    return {
      isValid: violations.length === 0,
      sanitized,
      violations: violations.length > 0 ? violations : undefined
    };
  }

  // Check if user has exceeded rate limits
  checkRateLimit(userId: string, action: string): { 
    allowed: boolean; 
    remaining: number; 
    resetTime?: number 
  } {
    const limits = {
      'content_generation': { max: 20, window: 3600000 }, // 20 per hour
      'api_request': { max: 100, window: 3600000 }, // 100 per hour
      'login_attempt': { max: 5, window: 900000 }, // 5 per 15 minutes
    };

    const limit = limits[action] || limits['api_request'];
    const allowed = RateLimitService.checkRateLimit(userId, action, limit.max, limit.window);
    const remaining = RateLimitService.getRemainingRequests(userId, action, limit.max, limit.window);

    if (!allowed) {
      this.logSecurityEvent({
        event: 'rate_limit_exceeded',
        userId,
        details: { action, limit: limit.max, window: limit.window },
        severity: 'medium'
      });

      return {
        allowed: false,
        remaining: 0,
        resetTime: Date.now() + limit.window
      };
    }

    return { allowed: true, remaining };
  }

  // Monitor for suspicious activity patterns
  async detectSuspiciousActivity(userId: string): Promise<{
    isSuspicious: boolean;
    reasons: string[];
    riskScore: number;
  }> {
    const reasons: string[] = [];
    let riskScore = 0;

    try {
      const { data: recentEvents } = await supabase
        .from('security_events')
        .select('event, severity, timestamp')
        .eq('user_id', userId)
        .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('timestamp', { ascending: false });

      if (recentEvents) {
        // Check for rapid succession of failed attempts
        const failedAttempts = recentEvents.filter(e => 
          e.event.includes('unauthorized') || e.event.includes('failed')
        );
        
        if (failedAttempts.length > 10) {
          reasons.push('High number of failed attempts');
          riskScore += 30;
        }

        // Check for critical events
        const criticalEvents = recentEvents.filter(e => e.severity === 'critical');
        if (criticalEvents.length > 0) {
          reasons.push('Critical security events detected');
          riskScore += 50;
        }

        // Check for unusual activity volume
        if (recentEvents.length > 100) {
          reasons.push('Unusually high activity volume');
          riskScore += 20;
        }
      }

      return {
        isSuspicious: riskScore > 50,
        reasons,
        riskScore
      };

    } catch (error) {
      console.error('Failed to detect suspicious activity:', error);
      return { isSuspicious: false, reasons: [], riskScore: 0 };
    }
  }

  // Get security metrics for admin dashboard
  async getSecurityMetrics(): Promise<SecurityMetrics> {
    try {
      const { data: events } = await supabase
        .from('security_events')
        .select('event, severity, timestamp')
        .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (!events) {
        return { totalEvents: 0, criticalEvents: 0, recentEvents: 0, topRisks: [] };
      }

      const totalEvents = events.length;
      const criticalEvents = events.filter(e => e.severity === 'critical').length;
      const recentEvents = events.filter(e => 
        new Date(e.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
      ).length;

      // Calculate top risks
      const riskCounts = events.reduce((acc, event) => {
        acc[event.event] = (acc[event.event] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topRisks = Object.entries(riskCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([type, count]) => ({ type, count }));

      return { totalEvents, criticalEvents, recentEvents, topRisks };

    } catch (error) {
      console.error('Failed to get security metrics:', error);
      return { totalEvents: 0, criticalEvents: 0, recentEvents: 0, topRisks: [] };
    }
  }

  // Alert on critical security events
  private alertCriticalEvent(event: SecurityEvent): void {
    console.error('🚨 CRITICAL SECURITY EVENT:', {
      event: event.event,
      userId: event.userId,
      details: event.details,
      timestamp: new Date().toISOString()
    });

    // In production, this would send alerts to monitoring services
    if (typeof window !== 'undefined' && window.Notification) {
      new Notification('Critical Security Alert', {
        body: `Security event: ${event.event}`,
        icon: '/favicon.ico'
      });
    }
  }

  // Get client IP address
  private getClientIP(): string {
    // In a real implementation, this would get the actual client IP
    return 'unknown';
  }

  // Session validation
  validateSession(user: any): { valid: boolean; reason?: string } {
    if (!user) {
      return { valid: false, reason: 'No user session' };
    }

    // Check session age
    const sessionAge = Date.now() - new Date(user.created_at || 0).getTime();
    const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours

    if (sessionAge > maxSessionAge) {
      return { valid: false, reason: 'Session expired' };
    }

    return { valid: true };
  }
}

export const enhancedSecurityService = EnhancedSecurityService.getInstance();
