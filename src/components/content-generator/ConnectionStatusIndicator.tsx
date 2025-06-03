
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Wifi, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { coreAIService } from '@/services/ai/coreAIService';

export const ConnectionStatusIndicator = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'fallback' | 'error'>('checking');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkConnection = async () => {
    setStatus('checking');
    try {
      const result = await coreAIService.testConnection();
      if (result.success) {
        setStatus(result.provider === 'fallback' ? 'fallback' : 'connected');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('fallback');
    }
    setLastChecked(new Date());
  };

  useEffect(() => {
    checkConnection();
    // Check connection every 5 minutes
    const interval = setInterval(checkConnection, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: CheckCircle,
          text: 'AI Connected',
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'fallback':
        return {
          icon: Wifi,
          text: 'Smart Fallback',
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
      case 'error':
        return {
          icon: WifiOff,
          text: 'Connection Issue',
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 border-red-200'
        };
      default:
        return {
          icon: AlertCircle,
          text: 'Checking...',
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-600 border-gray-200'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant={config.variant}
        className={`${config.className} flex items-center gap-1 text-xs px-2 py-1`}
      >
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
      {lastChecked && (
        <span className="text-xs text-gray-500">
          {lastChecked.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};
