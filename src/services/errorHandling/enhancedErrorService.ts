
export const enhancedErrorService = {
  captureError: (error: { name: string; message: string; stack?: string }) => {
    console.error('Error captured:', error);
    // In a real app, this would send to error reporting service
  }
};
