
import { coreAIService, AIHealthResult } from './ai/coreAIService';
import { aiProviderManager } from './ai/aiProviderManager';
import { configurationManager } from './configurationManager';

interface ServiceHealth {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  details: string;
  canGenerate: boolean;
}

class ServiceRegistry {
  private static instance: ServiceRegistry;
  
  static getInstance(): ServiceRegistry {
    if (!this.instance) {
      this.instance = new ServiceRegistry();
    }
    return this.instance;
  }

  async getServiceHealth(): Promise<ServiceHealth[]> {
    try {
      const aiHealth: AIHealthResult = await coreAIService.healthCheck();
      const providerStatus = aiProviderManager.getProviderStatus();
      
      return [
        {
          service: 'AI Service',
          status: aiHealth.status,
          details: aiHealth.details,
          canGenerate: aiHealth.canGenerate
        },
        {
          service: 'Configuration',
          status: 'healthy',
          details: 'Configuration service operational',
          canGenerate: true
        },
        {
          service: 'Provider Manager',
          status: providerStatus.initialized ? 'healthy' : 'degraded',
          details: `Provider: ${providerStatus.provider}, API Key: ${providerStatus.apiKeySet ? 'Set' : 'Not Set'}`,
          canGenerate: providerStatus.initialized
        }
      ];
    } catch (error) {
      console.error('Service health check failed:', error);
      return [
        {
          service: 'Service Registry',
          status: 'down',
          details: 'Failed to check service health',
          canGenerate: false
        }
      ];
    }
  }

  async isSystemHealthy(): Promise<boolean> {
    try {
      const services = await this.getServiceHealth();
      return services.every(service => service.status !== 'down');
    } catch (error) {
      return false;
    }
  }
}

export const serviceRegistry = ServiceRegistry.getInstance();
