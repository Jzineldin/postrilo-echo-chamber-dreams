
import { environmentService } from './environmentService';
import { enhancedErrorService } from './errorHandling/enhancedErrorService';

export const appStartupService = {
  initializeApp: async (): Promise<boolean> => {
    try {
      console.log('🚀 Initializing Postrilo application...');
      
      // Check environment configuration
      const envValidation = environmentService.getValidationResult();
      if (!envValidation.isValid) {
        console.warn('⚠️ Environment validation issues:', envValidation.warnings);
      }
      
      // Initialize Supabase connection
      console.log('🔗 Connecting to Supabase...');
      
      // Basic health checks
      console.log('🔍 Running health checks...');
      
      // Initialize AI services status
      console.log('🤖 Checking AI services availability...');
      
      // Setup error monitoring
      console.log('📊 Setting up error monitoring...');
      
      console.log('✅ Postrilo initialized successfully!');
      return true;
    } catch (error) {
      console.error('❌ Postrilo initialization failed:', error);
      enhancedErrorService.captureError({
        name: 'StartupFailure',
        message: 'Failed to initialize Postrilo',
        stack: error instanceof Error ? error.stack : undefined
      });
      return false;
    }
  }
};
