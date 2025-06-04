
import { useState } from 'react';
import { useAuth } from './useAuth';
import { ContentValidator } from '@/services/security/contentValidator';
import { SecurityService } from '@/services/security/securityService';
import { centralizedAIService } from '@/services/centralizedAIService';

export const useSecureContentGeneration = () => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const generateContent = async (request: {
    prompt: string;
    type?: string;
    platforms?: string[];
    temperature?: number;
    maxTokens?: number;
  }) => {
    if (!user) {
      throw new Error('User must be authenticated to generate content');
    }

    setIsGenerating(true);
    setValidationErrors([]);

    try {
      // Validate the request
      const validation = ContentValidator.validateGenerationRequest({
        ...request,
        userId: user.id
      });

      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      // Log the generation attempt
      SecurityService.logSecurityEvent('content_generation_request', user.id, {
        type: request.type,
        platforms: request.platforms,
        promptLength: request.prompt.length
      });

      // Generate content with sanitized prompt
      const result = await centralizedAIService.generateContent({
        prompt: validation.sanitizedContent || request.prompt,
        type: request.type || 'content',
        platforms: request.platforms,
        temperature: request.temperature,
        maxTokens: request.maxTokens
      });

      // Validate generated content
      if (result.content && request.platforms) {
        for (const platform of request.platforms) {
          const contentValidation = ContentValidator.validateGeneratedContent(
            result.content,
            platform
          );
          
          if (!contentValidation.isValid) {
            SecurityService.logSecurityEvent('unsafe_content_generated', user.id, {
              platform,
              errors: contentValidation.errors
            });
            
            // Use sanitized version if available
            if (contentValidation.sanitizedContent) {
              result.content = contentValidation.sanitizedContent;
            }
          }
        }
      }

      return result;
    } catch (error) {
      SecurityService.logSecurityEvent('content_generation_error', user.id, {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateContent,
    isGenerating,
    validationErrors
  };
};
