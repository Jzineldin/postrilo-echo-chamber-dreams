
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, RefreshCw, Wifi } from "lucide-react";
import { coreAIService, AIHealthResult } from "@/services/ai/coreAIService";

export const AIHealthChecker = () => {
  const [healthStatus, setHealthStatus] = useState<{
    status: 'healthy' | 'degraded' | 'down' | 'checking';
    details: string;
    canGenerate: boolean;
  }>({
    status: 'checking',
    details: 'Checking AI service status...',
    canGenerate: false
  });

  const [isChecking, setIsChecking] = useState(false);

  const checkHealth = async () => {
    setIsChecking(true);
    setHealthStatus({
      status: 'checking',
      details: 'Checking AI service status...',
      canGenerate: false
    });

    try {
      const health: AIHealthResult = await coreAIService.healthCheck();
      setHealthStatus({
        status: health.status,
        details: health.details,
        canGenerate: health.canGenerate
      });
    } catch (error) {
      setHealthStatus({
        status: 'down',
        details: 'Health check failed',
        canGenerate: false
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const getStatusConfig = () => {
    switch (healthStatus.status) {
      case 'healthy':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          variant: 'default' as const,
          text: 'Healthy'
        };
      case 'degraded':
        return {
          icon: Wifi,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          variant: 'secondary' as const,
          text: 'Degraded'
        };
      case 'down':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          variant: 'destructive' as const,
          text: 'Down'
        };
      default:
        return {
          icon: RefreshCw,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          variant: 'outline' as const,
          text: 'Checking'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${config.color} ${healthStatus.status === 'checking' ? 'animate-spin' : ''}`} />
          AI Service Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge 
            variant={config.variant}
            className={`${config.bgColor} ${config.color}`}
          >
            {config.text}
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={checkHealth}
            disabled={isChecking}
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${isChecking ? 'animate-spin' : ''}`} />
            Check
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          <p><strong>Status:</strong> {healthStatus.details}</p>
          <p><strong>Can Generate:</strong> {healthStatus.canGenerate ? 'Yes' : 'No'}</p>
        </div>

        {!healthStatus.canGenerate && healthStatus.status === 'down' && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              AI service is currently unavailable. Please try again later or contact support if the issue persists.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
