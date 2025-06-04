
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { enhancedSecurityService } from '@/services/security/enhancedSecurityService';

interface SecurityStatus {
  isSecure: boolean;
  riskScore: number;
  threats: string[];
  sessionValid: boolean;
}

export const useEnhancedSecurity = () => {
  const { user } = useAuth();
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    isSecure: true,
    riskScore: 0,
    threats: [],
    sessionValid: true
  });
  const [isLoading, setIsLoading] = useState(false);

  // Monitor security status
  useEffect(() => {
    if (!user) {
      setSecurityStatus({
        isSecure: false,
        riskScore: 0,
        threats: ['Not authenticated'],
        sessionValid: false
      });
      return;
    }

    const checkSecurity = async () => {
      setIsLoading(true);
      try {
        // Validate session
        const sessionCheck = enhancedSecurityService.validateSession(user);
        
        // Check for suspicious activity
        const suspiciousActivity = await enhancedSecurityService.detectSuspiciousActivity(user.id);
        
        setSecurityStatus({
          isSecure: sessionCheck.valid && !suspiciousActivity.isSuspicious,
          riskScore: suspiciousActivity.riskScore,
          threats: suspiciousActivity.reasons,
          sessionValid: sessionCheck.valid
        });

        // Log security check
        if (suspiciousActivity.isSuspicious) {
          await enhancedSecurityService.logSecurityEvent({
            event: 'suspicious_activity_detected',
            userId: user.id,
            details: {
              riskScore: suspiciousActivity.riskScore,
              reasons: suspiciousActivity.reasons
            },
            severity: suspiciousActivity.riskScore > 70 ? 'critical' : 'high'
          });
        }

      } catch (error) {
        console.error('Security check failed:', error);
        setSecurityStatus({
          isSecure: false,
          riskScore: 100,
          threats: ['Security check failed'],
          sessionValid: false
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkSecurity();
    
    // Periodic security checks
    const interval = setInterval(checkSecurity, 5 * 60 * 1000); // Every 5 minutes
    
    return () => clearInterval(interval);
  }, [user]);

  // Validate input with security checks
  const validateInput = (input: string, maxLength?: number) => {
    return enhancedSecurityService.validateUserInput(input, maxLength);
  };

  // Check rate limits
  const checkRateLimit = (action: string) => {
    if (!user) return { allowed: false, remaining: 0 };
    return enhancedSecurityService.checkRateLimit(user.id, action);
  };

  // Log security event
  const logSecurityEvent = async (
    event: string, 
    details: any, 
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ) => {
    if (!user) return;
    
    await enhancedSecurityService.logSecurityEvent({
      event,
      userId: user.id,
      details,
      severity
    });
  };

  return {
    securityStatus,
    isLoading,
    validateInput,
    checkRateLimit,
    logSecurityEvent,
    isSecure: securityStatus.isSecure,
    riskScore: securityStatus.riskScore,
    threats: securityStatus.threats
  };
};
