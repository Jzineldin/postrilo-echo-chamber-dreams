interface SecurityEvent {
  id: string;
  timestamp: number;
  event: string;
  userId: string;
  details: any;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
}

export class SecurityLogger {
  private static events: SecurityEvent[] = [];
  private static maxEvents = 1000;
  
  static logEvent(
    event: string, 
    userId: string, 
    details: any, 
    severity: SecurityEvent['severity'] = 'medium',
    source: string = 'unknown'
  ): void {
    const securityEvent: SecurityEvent = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      event,
      userId,
      details,
      severity,
      source
    };
    
    // Add to local storage (front of array)
    this.events.unshift(securityEvent);
    
    // Keep only the most recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(0, this.maxEvents);
    }
    
    // Log to console with security prefix
    console.warn('🔒 Security Event:', {
      event: securityEvent.event,
      userId: securityEvent.userId,
      severity: securityEvent.severity,
      source: securityEvent.source,
      timestamp: new Date(securityEvent.timestamp).toISOString(),
      details: securityEvent.details
    });
    
    // In production, send to monitoring service
    if (severity === 'critical' || severity === 'high') {
      this.sendToMonitoring(securityEvent);
    }
  }
  
  static getEvents(
    userId?: string, 
    severity?: SecurityEvent['severity'],
    limit: number = 50
  ): SecurityEvent[] {
    let filtered = this.events;
    
    if (userId) {
      filtered = filtered.filter(event => event.userId === userId);
    }
    
    if (severity) {
      filtered = filtered.filter(event => event.severity === severity);
    }
    
    return filtered.slice(0, limit);
  }
  
  static getEventStats(): {
    total: number;
    bySeverity: Record<SecurityEvent['severity'], number>;
    recent24h: number;
  } {
    const now = Date.now();
    const dayAgo = now - (24 * 60 * 60 * 1000);
    
    const bySeverity = this.events.reduce((acc, event) => {
      acc[event.severity] = (acc[event.severity] || 0) + 1;
      return acc;
    }, {} as Record<SecurityEvent['severity'], number>);
    
    const recent24h = this.events.filter(event => event.timestamp > dayAgo).length;
    
    return {
      total: this.events.length,
      bySeverity,
      recent24h
    };
  }
  
  private static sendToMonitoring(event: SecurityEvent): void {
    // In production, this would send to a monitoring service like Sentry
    console.error('🚨 Critical Security Event:', event);
  }
}
