
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface SecurityEvent {
  id: string;
  timestamp: number;
  event: string;
  userId: string;
  details: any;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const useSecurityMonitoring = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    // Listen for security events in the console
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    console.warn = (...args) => {
      originalConsoleWarn.apply(console, args);
      
      // Check if it's a security event
      if (args[0]?.includes('🔒 Security Event:')) {
        try {
          const eventData = JSON.parse(args[1] || '{}');
          const securityEvent: SecurityEvent = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            event: eventData.event || 'unknown',
            userId: eventData.userId || 'anonymous',
            details: eventData.details || {},
            severity: getSeverityFromEvent(eventData.event)
          };
          
          setEvents(prev => [securityEvent, ...prev.slice(0, 49)]); // Keep last 50 events
          
          if (securityEvent.severity === 'high' || securityEvent.severity === 'critical') {
            setAlertCount(prev => prev + 1);
          }
        } catch (error) {
          // Ignore parsing errors
        }
      }
    };

    return () => {
      console.warn = originalConsoleWarn;
      console.error = originalConsoleError;
    };
  }, []);

  const getSeverityFromEvent = (eventType: string): SecurityEvent['severity'] => {
    const severityMap: Record<string, SecurityEvent['severity']> = {
      'unauthorized_access_attempt': 'critical',
      'admin_access_attempt': 'critical',
      'unsafe_content_generated': 'high',
      'unsafe_content_attempt': 'high',
      'content_generation_error': 'medium',
      'content_generation_request': 'low',
      'session_expired': 'medium'
    };

    return severityMap[eventType] || 'low';
  };

  const clearAlerts = () => {
    setAlertCount(0);
  };

  const getRecentEvents = (hours = 24) => {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000);
    return events.filter(event => event.timestamp > cutoff);
  };

  const getEventsByUser = (userId: string) => {
    return events.filter(event => event.userId === userId);
  };

  const getEventsBySeverity = (severity: SecurityEvent['severity']) => {
    return events.filter(event => event.severity === severity);
  };

  return {
    events,
    alertCount,
    clearAlerts,
    getRecentEvents,
    getEventsByUser,
    getEventsBySeverity,
    isMonitoring: true
  };
};
