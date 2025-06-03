
import { PlatformValidationService } from "./platformValidationService";

export class ContentValidationService {
  static validateAndShowFeedback(
    content: string, 
    platform: string, 
    toast: ({ title, description, variant }: { title: string; description: string; variant?: "default" | "destructive" }) => void
  ) {
    if (!platform) return null;

    const validation = PlatformValidationService.validateContent(content, platform);
    
    if (!validation.isValid) {
      toast({
        title: "Content Validation Issues",
        description: validation.warnings.join(', '),
        variant: "destructive"
      });
    } else if (validation.warnings.length > 0) {
      toast({
        title: "Content Suggestions", 
        description: validation.warnings.join(', '),
      });
    }

    return validation;
  }
}
