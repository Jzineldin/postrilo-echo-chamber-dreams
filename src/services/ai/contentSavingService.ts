
import { ContentManagementService } from "@/services/contentManagementService";

export class ContentSavingService {
  static async saveGeneratedContent(
    content: string,
    platform: string,
    suggestedHashtags: string[]
  ) {
    try {
      ContentManagementService.saveContent({
        content,
        platform,
        status: 'draft',
        hashtags: suggestedHashtags.length > 0 ? suggestedHashtags : undefined
      });
    } catch (saveError) {
      console.error("❌ Failed to save content to history:", saveError);
      // Don't show error to user as this is non-critical
    }
  }

  static generateFallbackHashtags(platform: string): string[] {
    const fallbackHashtags = {
      instagram: ['#content', '#socialmedia', '#marketing', '#business', '#brand'],
      twitter: ['#content', '#marketing'],
      linkedin: ['#business', '#professional', '#networking'],
      tiktok: ['#content', '#viral', '#trending', '#fyp'],
      facebook: ['#business', '#marketing', '#community'],
      youtube: ['#content', '#video', '#tutorial']
    };
    
    return fallbackHashtags[platform as keyof typeof fallbackHashtags] || ['#content'];
  }
}
