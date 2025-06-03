
import { PromptOptimizer } from '../promptOptimizer';

export class EnhancedPromptService {
  static generateAdvancedPrompt(formData: any): string {
    // Platform-specific optimization
    if (formData.platform === 'tiktok' && formData.contentType === 'video-script') {
      return this.generateTikTokScript(formData);
    }
    
    if (formData.platform === 'instagram' && formData.contentType === 'post') {
      return this.generateInstagramPost(formData);
    }
    
    return PromptOptimizer.generateOptimizedPrompt(formData);
  }

  private static generateTikTokScript(formData: any): string {
    const language = formData.language || 'en';
    const topic = formData.topic;
    const tone = formData.tone;
    
    const languageInstructions = this.getStrongLanguageInstructions(language);
    
    return `${languageInstructions}

Create a viral TikTok video script about: ${topic}

CRITICAL TikTok Requirements:
- Hook (0-3 seconds): Start with a scroll-stopping opener
- Value delivery (3-45 seconds): Provide real insights/entertainment
- Strong CTA (45-60 seconds): Drive engagement

SCRIPT FORMAT:
[HOOK - 3 seconds] 
Write an attention-grabbing opening that makes people stop scrolling. Use patterns like:
- "POV: You discover..."
- "Wait, this actually works..."
- "The thing nobody tells you about ${topic}..."

[MAIN CONTENT - 30-40 seconds]
Deliver valuable content about ${topic}. Include:
- Quick tips or insights
- Behind-the-scenes secrets
- Step-by-step process
- Surprising facts

[CALL TO ACTION - 5-10 seconds]
End with engagement drivers:
- "Try this and comment if it works!"
- "Which one are you? Type 1 or 2 below!"
- "Follow for more ${topic} secrets!"

TONE: ${tone}

OUTPUT: Provide the complete script with timing markers and make it sound natural and conversational.`;
  }

  private static generateInstagramPost(formData: any): string {
    const language = formData.language || 'en';
    const topic = formData.topic;
    
    const languageInstructions = this.getStrongLanguageInstructions(language);
    
    return `${languageInstructions}

Create an engaging Instagram post about: ${topic}

Instagram Post Requirements:
- Strong opening hook that stops the scroll
- Value-packed content with visual storytelling
- Community engagement elements
- Strategic hashtag placement

STRUCTURE:
✨ Hook (first line): Grab attention immediately
📚 Value Content: Provide actionable insights about ${topic}
🤝 Community Element: Ask questions or encourage interaction
#️⃣ Hashtags: Include 8-12 relevant hashtags that drive discovery

TONE: ${formData.tone}

Make it feel authentic and conversational, not corporate or salesy.`;
  }

  private static getStrongLanguageInstructions(language: string): string {
    const languageMap: Record<string, string> = {
      'sv': `ABSOLUT KRAV: Skriv ALLT på svenska. Använd ENDAST svenska ord, uttryck och formuleringar. Ingen engelska alls. Skriv som en svensk modersmålstalare. DETTA ÄR KRITISKT - ingen engelska text får förekomma.`,
      'no': `ABSOLUTT KRAV: Skriv ALT på norsk. Bruk BARE norske ord, uttrykk og formuleringer. Ingen engelsk i det hele tatt. Skriv som en norsk morsmålsbruker. DETTE ER KRITISK - ingen engelsk tekst må forekomme.`,
      'da': `ABSOLUT KRAV: Skriv ALT på dansk. Brug KUN danske ord, udtryk og formuleringer. Ingen engelsk overhovedet. Skriv som en dansk modersmålstalende. DETTE ER KRITISK - ingen engelsk tekst må forekomme.`,
      'fi': `EHDOTON VAATIMUS: Kirjoita KAIKKI suomeksi. Käytä VAIN suomalaisia sanoja, ilmaisuja ja muotoiluja. Ei englantia ollenkaan. Kirjoita kuin suomalainen äidinkielinen puhuja. TÄMÄ ON KRIITTISTÄ - englanninkielistä tekstiä ei saa esiintyä.`,
      'de': `ABSOLUTE ANFORDERUNG: Schreiben Sie ALLES auf Deutsch. Verwenden Sie NUR deutsche Wörter, Ausdrücke und Formulierungen. Kein Englisch überhaupt. Schreiben Sie wie ein deutscher Muttersprachler. DIES IST KRITISCH - kein englischer Text darf vorkommen.`,
      'fr': `EXIGENCE ABSOLUE: Écrivez TOUT en français. Utilisez UNIQUEMENT des mots, expressions et formulations françaises. Aucun anglais du tout. Écrivez comme un locuteur natif français. CECI EST CRITIQUE - aucun texte anglais ne doit apparaître.`,
      'es': `REQUISITO ABSOLUTO: Escriba TODO en español. Use ÚNICAMENTE palabras, expresiones y formulaciones en español. Nada de inglés en absoluto. Escriba como un hablante nativo de español. ESTO ES CRÍTICO - no debe aparecer ningún texto en inglés.`,
      'en': `LANGUAGE REQUIREMENT: Write in English with natural, conversational tone.`
    };

    return languageMap[language] || `CRITICAL LANGUAGE REQUIREMENT: Write EVERYTHING in ${language}. Do not use any English words or phrases. Write as a native speaker of ${language} would. This is absolutely mandatory.`;
  }

  static generateSmartHashtags(content: string, platform: string, language: string = 'en'): string[] {
    // Platform-specific hashtag strategies
    const platformStrategies = {
      tiktok: ['trending', 'niche', 'broad'],
      instagram: ['community', 'location', 'niche', 'broad'],
      twitter: ['trending', 'conversation'],
      linkedin: ['professional', 'industry'],
    };

    // Language-specific hashtags
    const languageHashtags: Record<string, string[]> = {
      'sv': ['sverige', 'svenska', 'stockholm', 'göteborg', 'malmö'],
      'no': ['norge', 'norsk', 'oslo', 'bergen', 'trondheim'],
      'da': ['danmark', 'dansk', 'københavn', 'aarhus', 'odense'],
      'fi': ['suomi', 'helsinki', 'tampere', 'turku'],
      'en': ['trending', 'viral', 'fyp', 'foryou']
    };

    // Base platform hashtags
    const baseHashtags = {
      tiktok: ['fyp', 'viral', 'trending', 'foryou'],
      instagram: ['instagood', 'photooftheday', 'love', 'follow'],
      twitter: ['threads', 'discussion'],
      linkedin: ['professional', 'career', 'business', 'networking']
    };

    const platformTags = baseHashtags[platform as keyof typeof baseHashtags] || [];
    const langTags = languageHashtags[language] || [];
    
    return [...langTags.slice(0, 3), ...platformTags.slice(0, 4)];
  }
}
