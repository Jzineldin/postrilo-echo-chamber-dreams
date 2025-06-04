
import { SecurityService } from './securityService';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedContent?: string;
}

export class ContentValidator {
  static validateGenerationRequest(request: {
    prompt: string;
    platforms?: string[];
    type?: string;
    userId: string;
  }): ValidationResult {
    const errors: string[] = [];

    // Rate limiting check
    if (!SecurityService.checkRateLimit(request.userId, 'content_generation')) {
      errors.push('Rate limit exceeded. Please wait before generating more content.');
    }

    // Sanitize and validate prompt
    const sanitizedPrompt = SecurityService.sanitizeInput(request.prompt);
    if (!sanitizedPrompt || sanitizedPrompt.length < 3) {
      errors.push('Prompt must be at least 3 characters long');
    }

    if (sanitizedPrompt.length > 2000) {
      errors.push('Prompt is too long (max 2000 characters)');
    }

    // Content safety check
    const safetyCheck = SecurityService.validateContentSafety(request.prompt);
    if (!safetyCheck.isValid) {
      errors.push(safetyCheck.reason || 'Content validation failed');
      SecurityService.logSecurityEvent('unsafe_content_attempt', request.userId, {
        prompt: request.prompt.substring(0, 100),
        reason: safetyCheck.reason
      });
    }

    // Platform validation
    if (request.platforms) {
      const validPlatforms = ['instagram', 'twitter', 'linkedin', 'facebook', 'tiktok', 'youtube'];
      const invalidPlatforms = request.platforms.filter(p => !validPlatforms.includes(p));
      if (invalidPlatforms.length > 0) {
        errors.push(`Invalid platforms: ${invalidPlatforms.join(', ')}`);
      }
    }

    // Type validation
    if (request.type) {
      const validTypes = ['content', 'video-script', 'story', 'carousel'];
      if (!validTypes.includes(request.type)) {
        errors.push(`Invalid content type: ${request.type}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedContent: sanitizedPrompt
    };
  }

  static validateGeneratedContent(content: string, platform: string): ValidationResult {
    const errors: string[] = [];

    // Length validation
    if (!SecurityService.validateContentLength(content, platform)) {
      errors.push(`Content exceeds maximum length for ${platform}`);
    }

    // Safety validation
    const safetyCheck = SecurityService.validateContentSafety(content);
    if (!safetyCheck.isValid) {
      errors.push(safetyCheck.reason || 'Generated content failed safety validation');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedContent: SecurityService.sanitizeInput(content)
    };
  }
}
