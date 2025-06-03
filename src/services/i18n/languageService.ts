
export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  culturalContext: {
    communicationStyle: string;
    businessEtiquette: string;
    socialMediaHabits: string;
  };
}

export class LanguageService {
  private static languages: Record<string, LanguageConfig> = {
    en: {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧',
      culturalContext: {
        communicationStyle: 'Direct and professional',
        businessEtiquette: 'Formal but friendly',
        socialMediaHabits: 'Engagement-focused, hashtag-heavy'
      }
    },
    sv: {
      code: 'sv',
      name: 'Swedish',
      nativeName: 'Svenska',
      flag: '🇸🇪',
      culturalContext: {
        communicationStyle: 'Lagom (balanced), understated',
        businessEtiquette: 'Informal, egalitarian',
        socialMediaHabits: 'Quality over quantity, sustainability focus'
      }
    },
    no: {
      code: 'no',
      name: 'Norwegian',
      nativeName: 'Norsk',
      flag: '🇳🇴',
      culturalContext: {
        communicationStyle: 'Direct but warm, nature-focused',
        businessEtiquette: 'Informal, work-life balance important',
        socialMediaHabits: 'Outdoor lifestyle, authentic content'
      }
    },
    da: {
      code: 'da',
      name: 'Danish',
      nativeName: 'Dansk',
      flag: '🇩🇰',
      culturalContext: {
        communicationStyle: 'Hygge-inspired, cozy and inclusive',
        businessEtiquette: 'Flat hierarchy, consensus-driven',
        socialMediaHabits: 'Community-focused, design-conscious'
      }
    },
    fi: {
      code: 'fi',
      name: 'Finnish',
      nativeName: 'Suomi',
      flag: '🇫🇮',
      culturalContext: {
        communicationStyle: 'Reserved but honest, sisu mentality',
        businessEtiquette: 'Punctual, straightforward',
        socialMediaHabits: 'Minimalist, technology-forward'
      }
    }
  };

  static getAllLanguages(): LanguageConfig[] {
    return Object.values(this.languages);
  }

  static getLanguage(code: string): LanguageConfig | undefined {
    return this.languages[code];
  }

  static getNordicLanguages(): LanguageConfig[] {
    return Object.values(this.languages).filter(lang => 
      ['sv', 'no', 'da', 'fi'].includes(lang.code)
    );
  }

  static getCulturalPromptModifications(languageCode: string): string {
    const language = this.getLanguage(languageCode);
    if (!language) return '';

    const culturalPrompts: Record<string, string> = {
      sv: `
Adapt content for Swedish audience:
- Embrace "lagom" (balanced, not too much, not too little)
- Use sustainability and environmental consciousness themes
- Keep tone modest and understated
- Reference Swedish values: equality, work-life balance, nature
- Use Swedish expressions naturally where appropriate`,
      
      no: `
Adapt content for Norwegian audience:
- Emphasize outdoor lifestyle and nature connection
- Use direct but warm communication style
- Reference Norwegian values: equality, environmental stewardship
- Include themes of work-life balance and friluftsliv (outdoor life)
- Use Norwegian expressions naturally where appropriate`,
      
      da: `
Adapt content for Danish audience:
- Incorporate "hygge" concept (coziness, togetherness)
- Use inclusive and community-focused language
- Reference Danish design sensibility and quality of life
- Keep tone friendly and approachable
- Use Danish expressions naturally where appropriate`,
      
      fi: `
Adapt content for Finnish audience:
- Embrace "sisu" mentality (determination, resilience)
- Use straightforward, honest communication
- Reference Finnish innovation and technology leadership
- Keep tone reserved but genuine
- Use Finnish expressions naturally where appropriate`
    };

    return culturalPrompts[languageCode] || '';
  }

  static getLanguageSpecificHashtags(languageCode: string, topic: string): string[] {
    const hashtagSets: Record<string, string[]> = {
      sv: ['lagom', 'hållbarhet', 'sverige', 'nordiclifestyle', 'svenskdesign'],
      no: ['friluftsliv', 'norge', 'bærekraft', 'norskdesign', 'naturglede'],
      da: ['hygge', 'danmark', 'bæredygtighed', 'danskdesign', 'fællesskab'],
      fi: ['sisu', 'suomi', 'kestävyys', 'suomalainen', 'luonto']
    };

    return hashtagSets[languageCode] || [];
  }
}

export const languageService = new LanguageService();
