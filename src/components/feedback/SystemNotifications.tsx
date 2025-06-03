
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

interface NotificationConfig {
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useSystemNotifications = () => {
  const { toast } = useToast();

  const showNotification = (config: NotificationConfig) => {
    const getIcon = () => {
      switch (config.type) {
        case 'success':
          return <CheckCircle className="w-5 h-5 text-green-600" />;
        case 'error':
          return <X className="w-5 h-5 text-red-600" />;
        case 'warning':
          return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
        case 'info':
          return <Info className="w-5 h-5 text-blue-600" />;
      }
    };

    toast({
      title: config.title,
      description: (
        <div className="flex items-center gap-2">
          {getIcon()}
          {config.description}
        </div>
      ),
      duration: config.duration || 5000,
      action: config.action ? (
        <button
          onClick={config.action.onClick}
          className="text-sm underline hover:no-underline"
        >
          {config.action.label}
        </button>
      ) : undefined,
    });
  };

  const showSuccess = (title: string, description?: string) => {
    showNotification({ title, description, type: 'success' });
  };

  const showError = (title: string, description?: string) => {
    showNotification({ title, description, type: 'error', duration: 8000 });
  };

  const showWarning = (title: string, description?: string) => {
    showNotification({ title, description, type: 'warning' });
  };

  const showInfo = (title: string, description?: string) => {
    showNotification({ title, description, type: 'info' });
  };

  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};
