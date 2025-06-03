
export class ContentLanguageService {
  private static languageNames: Record<string, string> = {
    'sv': 'svenska',
    'no': 'norsk', 
    'da': 'dansk',
    'fi': 'suomi',
    'de': 'deutsch',
    'fr': 'français',
    'es': 'español'
  };

  static createLanguageSpecificPrompt(language: string, basePrompt: string): string {
    if (language === 'en') {
      return basePrompt;
    }

    const languageName = this.languageNames[language] || language;
    
    return `${basePrompt}

CRITICAL: Write EVERYTHING in ${languageName}. No English words, no meta-commentary, no explanations. Only the final content in perfect ${languageName}.`;
  }

  static cleanGeneratedContent(content: string, language: string): string {
    // Remove common leaked instructions and meta-commentary
    const instructionPatterns = [
      /DU MÅSTE SKRIVA PÅ.*?!/gi,
      /INGEN ENGELSKA.*?!/gi,
      /KRITISKT:.*?nödvändigt\./gi,
      /Here is.*?in.*?:/gi,
      /The following.*?content.*?:/gi,
      /OUTPUT:.*?meta-commentary\./gi,
      /IMPORTANT:.*?instructions.*?\./gi,
      /CRITICAL:.*?svenska\./gi,
      /Write.*?in.*?:/gi
    ];

    let cleanedContent = content;
    
    instructionPatterns.forEach(pattern => {
      cleanedContent = cleanedContent.replace(pattern, '');
    });

    // Remove excessive newlines and trim
    cleanedContent = cleanedContent.replace(/\n{3,}/g, '\n\n').trim();
    
    return cleanedContent;
  }
}
