
import { aiProviderManager } from './aiProviderManager';
import { coreAIService } from './coreAIService';

export interface HealthMonitoringResult {
  status: 'healthy' | 'degraded' | 'down';
  provider: string;
  details: string;
  timestamp: number;
  canGenerate: boolean;
}

export interface AIHealthStatus {
  status: 'healthy' | 'degraded' | 'offline';
  provider: string;
  message: string;
  lastChecked: Date;
}

export class HealthMonitoringService {
  private static instance: HealthMonitoringService;
  private currentStatus: AIHealthStatus = {
    status: 'offline',
    provider: 'unknown',
    message: 'Not initialized',
    lastChecked: new Date()
  };
  
  static getInstance(): HealthMonitoringService {
    if (!this.instance) {
      this.instance = new HealthMonitoringService();
    }
    return this.instance;
  }

  async checkProviderHealth(): Promise<HealthMonitoringResult> {
    try {
      const providerStatus = aiProviderManager.getProviderStatus();
      const aiHealth = await coreAIService.healthCheck();
      
      return {
        status: aiHealth.status,
        provider: providerStatus.provider,
        details: aiHealth.details,
        timestamp: Date.now(),
        canGenerate: aiHealth.canGenerate
      };
    } catch (error) {
      return {
        status: 'down',
        provider: 'unknown',
        details: error instanceof Error ? error.message : 'Health check failed',
        timestamp: Date.now(),
        canGenerate: false
      };
    }
  }

  async performSystemCheck(): Promise<{
    overall: 'healthy' | 'degraded' | 'down';
    services: HealthMonitoringResult[];
  }> {
    try {
      const providerHealth = await this.checkProviderHealth();
      const services = [providerHealth];
      
      const overall = services.every(s => s.status === 'healthy') 
        ? 'healthy' 
        : services.some(s => s.status === 'down') 
          ? 'down' 
          : 'degraded';
      
      return {
        overall,
        services
      };
    } catch (error) {
      return {
        overall: 'down',
        services: [{
          status: 'down',
          provider: 'system',
          details: 'System check failed',
          timestamp: Date.now(),
          canGenerate: false
        }]
      };
    }
  }

  async checkHealth(): Promise<AIHealthStatus> {
    try {
      const health = await this.checkProviderHealth();
      this.currentStatus = {
        status: health.status === 'down' ? 'offline' : health.status,
        provider: health.provider,
        message: health.details,
        lastChecked: new Date()
      };
      return this.currentStatus;
    } catch (error) {
      this.currentStatus = {
        status: 'offline',
        provider: 'unknown',
        message: 'Health check failed',
        lastChecked: new Date()
      };
      return this.currentStatus;
    }
  }

  getHealthStatus(): AIHealthStatus {
    return this.currentStatus;
  }

  startMonitoring(): void {
    console.log('Health monitoring started');
    // Start periodic health checks
    setInterval(() => {
      this.checkHealth();
    }, 30000); // Check every 30 seconds
  }

  stopMonitoring(): void {
    console.log('Health monitoring stopped');
  }

  isSystemHealthy(): Promise<boolean> {
    return this.performSystemCheck().then(result => result.overall !== 'down');
  }
}

export const healthMonitoringService = HealthMonitoringService.getInstance();
export const aiHealthMonitoringService = healthMonitoringService;
