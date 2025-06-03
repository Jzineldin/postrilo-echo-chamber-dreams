
import { LanguageService } from "@/services/i18n/languageService";
import { PromptOptimizer } from "@/services/promptOptimizer";

export interface MultiLanguageContentRequest {
  topic: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  language: string;
  includeEmojis: boolean;
  includeHashtags: boolean;
}

export class MultiLanguageContentService {
  static generateLocalizedPrompt(request: MultiLanguageContentRequest): string {
    const basePrompt = PromptOptimizer.generateOptimizedPrompt({
      platform: request.platform,
      contentType: request.contentType,
      tone: request.tone,
      goal: request.goal,
      topic: request.topic,
      emojiUsage: request.includeEmojis,
      hashtagDensity: request.includeHashtags
    });

    // Add language-specific cultural adaptations
    const culturalModifications = LanguageService.getCulturalPromptModifications(request.language);
    
    if (request.language !== 'en' && culturalModifications) {
      return `${basePrompt}

IMPORTANT LANGUAGE & CULTURAL REQUIREMENTS:
- Write the content in ${LanguageService.getLanguage(request.language)?.name || request.language}
- Use native expressions and idioms naturally
${culturalModifications}

If including hashtags, incorporate these language-specific tags naturally: ${LanguageService.getLanguageSpecificHashtags(request.language, request.topic).map(tag => `#${tag}`).join(', ')}`;
    }

    return basePrompt;
  }

  static getLanguageSpecificGuidelines(languageCode: string): string[] {
    const guidelines: Record<string, string[]> = {
      sv: [
        "Keep content balanced and moderate (lagom philosophy)",
        "Emphasize sustainability and environmental consciousness",
        "Use inclusive language that reflects Swedish egalitarian values",
        "Reference nature, outdoor activities, and work-life balance"
      ],
      no: [
        "Highlight connection to nature and outdoor lifestyle (friluftsliv)",
        "Use direct but warm communication style",
        "Emphasize quality of life and work-life balance",
        "Include references to Norwegian innovation and environmental stewardship"
      ],
      da: [
        "Incorporate hygge elements (coziness, togetherness, comfort)",
        "Use friendly and inclusive language",
        "Reference Danish design principles and community values",
        "Keep tone approachable and down-to-earth"
      ],
      fi: [
        "Reflect sisu mentality (determination, grit, resilience)",
        "Use straightforward, honest communication",
        "Emphasize innovation, technology, and practical solutions",
        "Keep tone reserved but genuine and authentic"
      ]
    };

    return guidelines[languageCode] || [
      "Use clear and professional language",
      "Adapt content for international audience",
      "Focus on universal values and experiences"
    ];
  }

  static validateLanguageContent(content: string, languageCode: string): {
    isValid: boolean;
    suggestions: string[];
  } {
    const suggestions: string[] = [];
    let isValid = true;

    // Basic validation checks
    if (content.length < 10) {
      isValid = false;
      suggestions.push("Content is too short for meaningful engagement");
    }

    // Language-specific validation
    const language = LanguageService.getLanguage(languageCode);
    if (language && languageCode !== 'en') {
      // Check if content appears to be in the target language
      // This is a simplified check - in production, you'd use a language detection library
      const hasEnglishOnlyWords = /\b(the|and|or|but|in|on|at|to|for|of|with|by)\b/gi.test(content);
      const contentWords = content.split(/\s+/).length;
      const englishMatches = content.match(/\b(the|and|or|but|in|on|at|to|for|of|with|by)\b/gi) || [];
      
      if (englishMatches.length > contentWords * 0.3) {
        suggestions.push(`Content appears to be in English, but ${language.name} was requested`);
      }

      // Check for cultural elements
      const culturalKeywords = LanguageService.getLanguageSpecificHashtags(languageCode, '');
      const hasCulturalElements = culturalKeywords.some(keyword => 
        content.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (!hasCulturalElements) {
        suggestions.push(`Consider adding ${language.name} cultural elements or references`);
      }
    }

    return { isValid, suggestions };
  }
}

export const multiLanguageContentService = new MultiLanguageContentService();
