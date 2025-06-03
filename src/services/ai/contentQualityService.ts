
export class ContentQualityService {
  static evaluateContent(content: string, platform: string, language: string): {
    score: number;
    issues: string[];
    suggestions: string[];
  } {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // Check for generic phrases
    const genericPhrases = [
      "let's dive into",
      "here are key insights",
      "what's your experience",
      "drop a comment",
      "let's discuss"
    ];

    genericPhrases.forEach(phrase => {
      if (content.toLowerCase().includes(phrase)) {
        issues.push(`Generic phrase detected: "${phrase}"`);
        score -= 10;
      }
    });

    // Platform-specific checks
    if (platform === 'tiktok') {
      if (!content.includes('[HOOK') && !content.toLowerCase().includes('pov:')) {
        issues.push('Missing strong hook for TikTok');
        score -= 20;
      }
      
      if (content.length < 100) {
        issues.push('TikTok script too short');
        score -= 15;
      }
    }

    if (platform === 'instagram') {
      if (!content.includes('✨') && !content.includes('📚')) {
        suggestions.push('Add emojis for better Instagram engagement');
      }
    }

    // Enhanced language mixing check
    if (language !== 'en') {
      const languageCheck = this.checkLanguageConsistency(content, language);
      if (!languageCheck.isCorrectLanguage) {
        issues.push(`Content appears to be in ${languageCheck.detectedLanguage} but ${language} was requested`);
        score -= 30;
      }
    }

    return { score, issues, suggestions };
  }

  private static checkLanguageConsistency(content: string, expectedLanguage: string): {
    isCorrectLanguage: boolean;
    detectedLanguage: string;
  } {
    // Common English words that shouldn't appear in other languages
    const englishWords = /\b(the|and|or|but|in|on|at|to|for|of|with|by|is|are|was|were|have|has|had|will|would|could|should|this|that|these|those)\b/gi;
    const englishMatches = content.match(englishWords) || [];
    
    // Language-specific patterns
    const languagePatterns: Record<string, RegExp[]> = {
      'sv': [
        /\b(och|eller|men|i|på|att|för|av|med|är|var|har|hade|kommer|skulle|kunde|denna|detta|dessa)\b/gi,
        /\b(jag|du|han|hon|det|vi|ni|de|min|din|hans|hennes|vår|er|deras)\b/gi
      ],
      'no': [
        /\b(og|eller|men|i|på|å|for|av|med|er|var|har|hadde|vil|skulle|kunne|denne|dette|disse)\b/gi,
        /\b(jeg|du|han|hun|det|vi|dere|de|min|din|hans|hennes|vår|deres)\b/gi
      ],
      'da': [
        /\b(og|eller|men|i|på|at|for|af|med|er|var|har|havde|vil|skulle|kunne|denne|dette|disse)\b/gi,
        /\b(jeg|du|han|hun|det|vi|i|de|min|din|hans|hendes|vores|jeres|deres)\b/gi
      ],
      'fi': [
        /\b(ja|tai|mutta|sisään|päällä|että|varten|kanssa|on|oli|on|oli|tulee|pitäisi|voisi|tämä|että|nämä)\b/gi,
        /\b(minä|sinä|hän|se|me|te|he|minun|sinun|hänen|meidän|teidän|heidän)\b/gi
      ]
    };

    const contentWords = content.split(/\s+/).length;
    const englishWordCount = englishMatches.length;
    const englishRatio = englishWordCount / contentWords;

    // Check for expected language patterns
    const expectedPatterns = languagePatterns[expectedLanguage] || [];
    let languageWordCount = 0;
    
    expectedPatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      languageWordCount += matches.length;
    });

    const languageRatio = languageWordCount / contentWords;

    // If more than 20% English words and less than 10% target language words, likely wrong language
    if (englishRatio > 0.2 && languageRatio < 0.1) {
      return {
        isCorrectLanguage: false,
        detectedLanguage: 'English'
      };
    }

    return {
      isCorrectLanguage: true,
      detectedLanguage: expectedLanguage
    };
  }

  static improveContent(content: string, issues: string[]): string {
    let improvedContent = content;

    // Remove generic phrases and replace with more engaging alternatives
    const replacements = {
      "let's dive into": "🎬 Ready to discover",
      "here are key insights": "💡 Here's what I learned",
      "what's your experience": "What's your take on this?",
      "drop a comment": "Tell me in the comments",
      "let's discuss": "Let's talk about this"
    };

    Object.entries(replacements).forEach(([generic, improved]) => {
      improvedContent = improvedContent.replace(new RegExp(generic, 'gi'), improved);
    });

    return improvedContent;
  }
}
