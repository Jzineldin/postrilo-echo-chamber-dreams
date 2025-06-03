
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from '@/components/ui/toaster';
import { appStartupService } from './services/appStartupService';
import { enhancedErrorService } from './services/errorHandling/enhancedErrorService';
import { environmentService } from './services/environmentService';

// Initialize application services before rendering
const initializeApp = async () => {
  try {
    // Log environment info
    environmentService.logEnvironmentStatus();
    
    // Initialize application
    const startupSuccess = await appStartupService.initializeApp();
    
    if (!startupSuccess) {
      console.error('⚠️ Application initialized with warnings. Some features may not work correctly.');
    }
    
    // Render the application (BrowserRouter is now in App.tsx)
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
        <Toaster />
      </React.StrictMode>
    );
    
  } catch (error) {
    // Handle catastrophic initialization failure
    enhancedErrorService.captureError({
      name: 'InitializationFailure',
      message: 'Failed to initialize the application',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Render minimal error UI
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Application Error
          </h1>
          <p className="text-gray-700 mb-6">
            The application failed to initialize properly. Please try refreshing the page or contact support if the problem persists.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }
};

// Start the application
initializeApp();
