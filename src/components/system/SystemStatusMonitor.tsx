
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, WifiOff, RefreshCw, Activity } from 'lucide-react';
import { aiHealthMonitoringService, AIHealthStatus } from '@/services/ai/healthMonitoringService';
import { environmentService } from '@/services/environmentService';
import { resilienceService } from '@/services/resilienceService';

export const SystemStatusMonitor = () => {
  const [healthStatus, setHealthStatus] = useState<AIHealthStatus | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [configWarnings, setConfigWarnings] = useState<string[]>([]);
  const [circuitBreakers, setCircuitBreakers] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Get initial health status
    setHealthStatus(aiHealthMonitoringService.getHealthStatus());
    
    // Get configuration warnings
    const validation = environmentService.getValidationResult();
    setConfigWarnings([...validation.errors, ...validation.warnings]);
    
    // Get circuit breaker status
    setCircuitBreakers(resilienceService.getCircuitBreakersStatus());
    
    // Set up refresh interval
    const intervalId = setInterval(() => {
      setHealthStatus(aiHealthMonitoringService.getHealthStatus());
      setCircuitBreakers(resilienceService.getCircuitBreakersStatus());
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleRefreshHealth = async () => {
    setIsChecking(true);
    try {
      const status = await aiHealthMonitoringService.checkHealth();
      setHealthStatus(status);
    } finally {
      setIsChecking(false);
    }
  };
  
  const handleResetCircuitBreakers = () => {
    resilienceService.resetAllCircuitBreakers();
    setCircuitBreakers(resilienceService.getCircuitBreakersStatus());
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'half-open':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'closed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'degraded':
      case 'half-open':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'offline':
      case 'open':
        return <WifiOff className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            System Health Monitor
          </span>
          <Button
            onClick={handleRefreshHealth}
            variant="ghost"
            size="sm"
            disabled={isChecking}
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
            <span className="ml-1">{isChecking ? 'Checking...' : 'Refresh'}</span>
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* AI Service Health */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm text-gray-700">AI Service Status</h3>
            {healthStatus && (
              <Badge className={getStatusColor(healthStatus.status)}>
                {healthStatus.status.charAt(0).toUpperCase() + healthStatus.status.slice(1)}
              </Badge>
            )}
          </div>
          
          {healthStatus ? (
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-2 mb-1">
                {getStatusIcon(healthStatus.status)}
                <span>Provider: {healthStatus.provider}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Last checked: {healthStatus.lastChecked.toLocaleString()}
              </div>
              {healthStatus.message && (
                <div className="mt-2 text-sm">{healthStatus.message}</div>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-500">Health status not available</div>
          )}
        </div>
        
        {/* Environment Warnings */}
        {configWarnings.length > 0 && (
          <div className="border rounded-md p-3 bg-yellow-50 border-yellow-200 space-y-2">
            <h3 className="font-medium flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="w-4 h-4" />
              Configuration Warnings
            </h3>
            <ul className="text-xs space-y-1 text-yellow-700">
              {configWarnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="block mt-1">•</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Circuit Breakers */}
        {Object.keys(circuitBreakers).length > 0 && (
          <div className="space-y-2 mt-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm text-gray-700">Circuit Breakers</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleResetCircuitBreakers}
              >
                Reset All
              </Button>
            </div>
            
            <div className="space-y-2">
              {Object.entries(circuitBreakers).map(([name, data]) => (
                <div key={name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(data.state)}
                    <span>{name}</span>
                  </div>
                  <Badge className={getStatusColor(data.state)}>
                    {data.state}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-xs text-center mt-3 text-gray-500">
          System monitoring active • Retry services enabled • Auto-recovery active
        </div>
      </CardContent>
    </Card>
  );
};
