
export const configurationManager = {
  validateContentFormData: (formData: any) => {
    const errors: string[] = [];
    
    if (!formData.topic?.trim()) {
      errors.push('Topic is required');
    }
    if (!formData.platform) {
      errors.push('Platform is required');
    }
    if (!formData.contentType) {
      errors.push('Content type is required');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },

  getAIConfig: () => ({
    maxRetries: 3,
    timeout: 30000,
    temperature: 0.7,
    aiProvider: 'mock'
  }),

  getConfig: () => ({
    aiProvider: 'mock',
    maxRetries: 3,
    timeout: 30000,
    temperature: 0.7
  }),

  getAPIKey: (provider: string) => {
    return null; // Mock implementation
  },

  exportConfig: () => ({
    content: {
      maxLength: 2000,
      defaultPlatform: 'instagram'
    }
  })
};
