
import { configurationManager } from '../configurationManager';

export interface AIHealthResult {
  status: 'healthy' | 'degraded' | 'down';
  details: string;
  timestamp: number;
  provider: string;
  canGenerate: boolean;
}

export interface AIGenerationRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AIGenerationResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface TestConnectionResult {
  success: boolean;
  provider: string;
  error?: string;
}

export interface CallAIResult {
  content: string;
  error?: string;
  fallback?: boolean;
}

class CoreAIService {
  private static instance: CoreAIService;
  
  static getInstance(): CoreAIService {
    if (!this.instance) {
      this.instance = new CoreAIService();
    }
    return this.instance;
  }

  async healthCheck(): Promise<AIHealthResult> {
    const config = configurationManager.getConfig();
    
    try {
      if (config.aiProvider === 'mock') {
        return {
          status: 'healthy',
          details: 'Mock AI service is operational',
          timestamp: Date.now(),
          provider: 'mock',
          canGenerate: true
        };
      }

      // For real OpenAI, check if API key is configured
      const apiKey = configurationManager.getAPIKey('openai');
      if (!apiKey) {
        return {
          status: 'down',
          details: 'OpenAI API key not configured',
          timestamp: Date.now(),
          provider: 'openai',
          canGenerate: false
        };
      }

      // Simple health check - just verify the API key format
      if (apiKey.startsWith('sk-')) {
        return {
          status: 'healthy',
          details: 'OpenAI service appears to be configured correctly',
          timestamp: Date.now(),
          provider: 'openai',
          canGenerate: true
        };
      } else {
        return {
          status: 'degraded',
          details: 'OpenAI API key format appears invalid',
          timestamp: Date.now(),
          provider: 'openai',
          canGenerate: false
        };
      }

    } catch (error) {
      console.error('AI health check failed:', error);
      return {
        status: 'down',
        details: error instanceof Error ? error.message : 'Unknown error during health check',
        timestamp: Date.now(),
        provider: config.aiProvider,
        canGenerate: false
      };
    }
  }

  async testConnection(): Promise<TestConnectionResult> {
    try {
      const health = await this.healthCheck();
      return {
        success: health.canGenerate,
        provider: health.provider,
        error: health.canGenerate ? undefined : health.details
      };
    } catch (error) {
      return {
        success: false,
        provider: 'unknown',
        error: error instanceof Error ? error.message : 'Connection test failed'
      };
    }
  }

  async callAI(prompt: string, provider?: string): Promise<CallAIResult> {
    const config = configurationManager.getConfig();
    
    try {
      if (config.aiProvider === 'mock') {
        // Mock response for testing
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        return {
          content: `Generated content for: "${prompt.substring(0, 50)}..." This is a mock response from the AI service.`,
          fallback: false
        };
      }

      // For real OpenAI implementation, this would make actual API calls
      throw new Error('Real OpenAI implementation not yet available in this service');
      
    } catch (error) {
      console.error('AI call failed:', error);
      return {
        content: `Fallback content for: "${prompt.substring(0, 50)}..."`,
        error: error instanceof Error ? error.message : 'AI call failed',
        fallback: true
      };
    }
  }

  async generateContent(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    const config = configurationManager.getConfig();
    
    if (config.aiProvider === 'mock') {
      // Mock response for testing
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      return {
        content: `Generated content for: "${request.prompt.substring(0, 50)}..." This is a mock response from the AI service.`,
        usage: {
          promptTokens: Math.floor(request.prompt.length / 4),
          completionTokens: 50,
          totalTokens: Math.floor(request.prompt.length / 4) + 50
        }
      };
    }

    // For real OpenAI implementation, this would make actual API calls
    throw new Error('Real OpenAI implementation not yet available in this service');
  }

  isServiceAvailable(): boolean {
    const config = configurationManager.getConfig();
    
    if (config.aiProvider === 'mock') {
      return true;
    }
    
    return !!configurationManager.getAPIKey('openai');
  }
}

export const coreAIService = CoreAIService.getInstance();
