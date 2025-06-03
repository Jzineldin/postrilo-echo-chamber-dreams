
import { centralizedAIService } from "@/services/centralizedAIService";
import { ContentSavingService } from "./contentSavingService";

export class HashtagGenerationService {
  static async generateHashtags(
    content: string,
    platform: string,
    maxHashtags: number = 15
  ): Promise<string[]> {
    try {
      return await centralizedAIService.generateHashtags(content, maxHashtags);
    } catch (error) {
      console.error("❌ Hashtag generation error:", error);
      return ContentSavingService.generateFallbackHashtags(platform);
    }
  }
}
