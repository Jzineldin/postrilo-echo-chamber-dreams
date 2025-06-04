
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Clock, 
  User, 
  Eye,
  TrendingUp,
  Lock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { enhancedSecurityService } from '@/services/security/enhancedSecurityService';
import { useEnhancedSecurity } from '@/hooks/useEnhancedSecurity';

export const EnhancedSecurityDashboard = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { securityStatus, isLoading } = useEnhancedSecurity();
  const [metrics, setMetrics] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isAdmin) return;

    const loadMetrics = async () => {
      try {
        const securityMetrics = await enhancedSecurityService.getSecurityMetrics();
        setMetrics(securityMetrics);
      } catch (error) {
        console.error('Failed to load security metrics:', error);
      }
    };
    
    loadMetrics();
    const interval = setInterval(loadMetrics, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [isAdmin, refreshKey]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevelColor = (riskScore: number) => {
    if (riskScore >= 70) return 'text-red-600';
    if (riskScore >= 40) return 'text-orange-600';
    if (riskScore >= 20) return 'text-yellow-600';
    return 'text-green-600';
  };

  const refresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (!isAdmin) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Lock className="w-5 h-5" />
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700">
            Admin privileges required to access the security dashboard.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Status Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Enhanced Security Dashboard
          </CardTitle>
          <Button onClick={refresh} variant="outline" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {/* Current User Security Status */}
          <div className="mb-6 p-4 border rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Your Security Status
            </h3>
            {isLoading ? (
              <div className="animate-pulse">Loading security status...</div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Overall Security:</span>
                  <Badge className={securityStatus.isSecure ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {securityStatus.isSecure ? 'Secure' : 'At Risk'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Risk Score:</span>
                  <span className={`font-bold ${getRiskLevelColor(securityStatus.riskScore)}`}>
                    {securityStatus.riskScore}/100
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Session:</span>
                  <Badge className={securityStatus.sessionValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {securityStatus.sessionValid ? 'Valid' : 'Invalid'}
                  </Badge>
                </div>
                {securityStatus.threats.length > 0 && (
                  <Alert className="mt-3">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Security Concerns:</strong> {securityStatus.threats.join(', ')}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>

          {/* System-wide Metrics */}
          {metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{metrics.totalEvents}</div>
                <div className="text-sm text-gray-600">Total Events (7d)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{metrics.criticalEvents}</div>
                <div className="text-sm text-gray-600">Critical Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{metrics.recentEvents}</div>
                <div className="text-sm text-gray-600">Last 24h</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {user ? Math.max(0, 20 - (metrics.recentEvents || 0)) : 0}
                </div>
                <div className="text-sm text-gray-600">Rate Limit Remaining</div>
              </div>
            </div>
          )}

          {/* Top Security Risks */}
          {metrics?.topRisks && metrics.topRisks.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Top Security Risks (7 days)
              </h3>
              <div className="space-y-2">
                {metrics.topRisks.map((risk: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">
                      {risk.type.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </span>
                    <Badge variant="outline">{risk.count} events</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Features Status */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Security Features Active</span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✓ Row Level Security (RLS)</li>
                  <li>✓ Input Validation</li>
                  <li>✓ Rate Limiting</li>
                  <li>✓ Content Safety Checks</li>
                  <li>✓ Security Event Logging</li>
                  <li>✓ Session Validation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Monitoring Active</span>
                </div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Real-time threat detection</li>
                  <li>• Suspicious activity monitoring</li>
                  <li>• Failed authentication tracking</li>
                  <li>• Admin action logging</li>
                  <li>• Performance monitoring</li>
                  <li>• Automated alerting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
