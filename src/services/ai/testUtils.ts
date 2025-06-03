
import { configurationManager } from '../configurationManager';
import { coreAIService } from './coreAIService';

export interface TestResult {
  success: boolean;
  message: string;
  duration?: number;
  error?: string;
}

export class AITestUtils {
  static async validateFormData(formData: any): Promise<TestResult> {
    try {
      const validation = configurationManager.validateContentFormData(formData);
      return {
        success: validation.valid,
        message: validation.valid ? 'Form data is valid' : `Validation failed: ${validation.errors.join(', ')}`,
        error: validation.valid ? undefined : validation.errors.join(', ')
      };
    } catch (error) {
      return {
        success: false,
        message: 'Form validation failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async testAIConnection(): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      const result = await coreAIService.testConnection();
      const duration = Date.now() - startTime;
      
      return {
        success: result.success,
        message: result.success ? `Connected to ${result.provider}` : `Connection failed: ${result.error}`,
        duration,
        error: result.error
      };
    } catch (error) {
      return {
        success: false,
        message: 'Connection test failed',
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async testContentGeneration(prompt: string = 'Test content generation'): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      const result = await coreAIService.callAI(prompt);
      const duration = Date.now() - startTime;
      
      return {
        success: !result.error,
        message: result.error ? `Generation failed: ${result.error}` : 'Content generated successfully',
        duration,
        error: result.error
      };
    } catch (error) {
      return {
        success: false,
        message: 'Content generation test failed',
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const aiTestUtils = AITestUtils;
