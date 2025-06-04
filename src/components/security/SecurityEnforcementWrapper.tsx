
import React, { useEffect } from 'react';
import { useEnhancedSecurity } from '@/hooks/useEnhancedSecurity';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, RefreshCw } from 'lucide-react';

interface SecurityEnforcementWrapperProps {
  children: React.ReactNode;
  requireSecureSession?: boolean;
  maxRiskScore?: number;
}

export const SecurityEnforcementWrapper = ({ 
  children, 
  requireSecureSession = true,
  maxRiskScore = 70
}: SecurityEnforcementWrapperProps) => {
  const { user, signOut } = useAuth();
  const { securityStatus, isLoading, logSecurityEvent } = useEnhancedSecurity();

  useEffect(() => {
    if (user && !securityStatus.sessionValid) {
      logSecurityEvent('invalid_session_detected', {
        riskScore: securityStatus.riskScore,
        threats: securityStatus.threats
      }, 'high');
    }
  }, [user, securityStatus, logSecurityEvent]);

  // Show loading state
  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying security status...</p>
        </CardContent>
      </Card>
    );
  }

  // Block access if session is invalid and required
  if (requireSecureSession && !securityStatus.sessionValid) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-5 h-5" />
            Invalid Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Your session has expired or is invalid. Please sign in again to continue.
            </AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button onClick={() => signOut()} variant="outline">
              Sign Out
            </Button>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Block access if risk score is too high
  if (securityStatus.riskScore > maxRiskScore) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-5 h-5" />
            High Security Risk Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Suspicious activity has been detected on your account. Access has been temporarily restricted.
            </AlertDescription>
          </Alert>
          
          <div className="mb-4">
            <p className="text-sm text-red-700 mb-2">
              <strong>Risk Score:</strong> {securityStatus.riskScore}/100
            </p>
            {securityStatus.threats.length > 0 && (
              <div>
                <p className="text-sm text-red-700 mb-1">
                  <strong>Security Concerns:</strong>
                </p>
                <ul className="text-sm text-red-600 list-disc list-inside">
                  {securityStatus.threats.map((threat, index) => (
                    <li key={index}>{threat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={() => signOut()} variant="outline">
              Sign Out
            </Button>
            <Button onClick={() => window.location.href = '/support'}>
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show security warning for elevated risk
  if (securityStatus.riskScore > 30 && securityStatus.threats.length > 0) {
    return (
      <div className="space-y-4">
        <Alert className="border-yellow-200 bg-yellow-50">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Security Notice:</strong> Some security concerns have been detected. 
            Your access continues but please review your account activity.
            {securityStatus.threats.length > 0 && (
              <span className="block mt-1 text-sm">
                Concerns: {securityStatus.threats.join(', ')}
              </span>
            )}
          </AlertDescription>
        </Alert>
        {children}
      </div>
    );
  }

  // Normal secure access
  return <>{children}</>;
};
