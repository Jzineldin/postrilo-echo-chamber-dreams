
import { useEffect, useState } from 'react';
import { appStartupService } from '@/services/appStartupService';
import { environmentService } from '@/services/environmentService';
import { aiHealthMonitoringService } from '@/services/ai/healthMonitoringService';
import { useToast } from '@/hooks/use-toast';

export const useAppInitializer = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        
        console.log('🚀 Initializing application...');
        
        // Initialize the environment service first
        environmentService.logEnvironmentStatus();
        
        // Get environment validation results
        const envValidation = environmentService.getValidationResult();
        if (envValidation.errors.length > 0) {
          toast({
            title: 'Environment Configuration Error',
            description: `${envValidation.errors.length} configuration errors detected. Some features may not work correctly.`,
            variant: 'destructive'
          });
        }
        
        // Initialize core app services
        const startupSuccessful = await appStartupService.initializeApp();
        if (!startupSuccessful) {
          throw new Error('Application startup failed');
        }
        
        // Start AI health monitoring
        aiHealthMonitoringService.startMonitoring();
        
        // Initial AI health check
        const aiHealth = await aiHealthMonitoringService.checkHealth();
        if (aiHealth.status === 'offline') {
          toast({
            title: 'AI Services Limited',
            description: 'AI services are currently unavailable. The application will use mock data.',
            variant: 'destructive'
          });
        } else if (aiHealth.status === 'degraded') {
          toast({
            title: 'AI Services Degraded',
            description: 'AI services are running in limited capacity. Some features may use fallback options.',
            variant: 'destructive'
          });
        }
        
        setIsInitialized(true);
        console.log('✅ Application initialized successfully');
        
      } catch (err) {
        console.error('🚨 Application initialization failed:', err);
        setError(err instanceof Error ? err.message : 'Unknown startup error');
        
        toast({
          title: 'Startup Error',
          description: 'Failed to initialize the application. Some features may not work correctly.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();

    // Cleanup function
    return () => {
      aiHealthMonitoringService.stopMonitoring();
    };
  }, [toast]);

  return {
    isInitialized,
    isLoading,
    error
  };
};
