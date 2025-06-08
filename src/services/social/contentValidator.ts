
import { TwitterAPIService } from '../platforms/TwitterAPIService';
import { LinkedInAPIService } from '../platforms/LinkedInAPIService';

export class ContentValidator {
  static validateContentForPlatform(content: string, platform: string): { isValid: boolean; error?: string } {
    switch (platform) {
      case 'twitter':
        const twitterValidation = TwitterAPIService.validateContentLength(content);
        return {
          isValid: twitterValidation.isValid,
          error: twitterValidation.isValid ? undefined : `Content exceeds Twitter's ${twitterValidation.maxLength} character limit`
        };
      
      case 'linkedin':
        const linkedinValidation = LinkedInAPIService.validateContentLength(content);
        return {
          isValid: linkedinValidation.isValid,
          error: linkedinValidation.isValid ? undefined : `Content exceeds LinkedIn's ${linkedinValidation.maxLength} character limit`
        };
      
      default:
        return { isValid: true };
    }
  }
}
