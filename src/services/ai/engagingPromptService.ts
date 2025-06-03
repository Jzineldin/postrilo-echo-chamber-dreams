
import { FormData } from '@/components/content-generator/multi-step/types';

export class EngagingPromptService {
  private static languageNames: Record<string, string> = {
    'sv': 'svenska',
    'no': 'norsk', 
    'da': 'dansk',
    'fi': 'suomi',
    'de': 'deutsch',
    'fr': 'français',
    'es': 'español'
  };

  static createEngagingPrompt(formData: FormData): string {
    const languageName = this.languageNames[formData.language] || formData.language;
    
    let prompt = `Create an engaging ${formData.platform} ${formData.contentType} about: ${formData.topic}

TONE: ${formData.tone} - make it ${formData.tone === 'humorous' ? 'funny, witty, and entertaining' : formData.tone}
GOAL: ${formData.goal} - optimize for maximum ${formData.goal}
PLATFORM: ${formData.platform} - use ${formData.platform}-specific style and format
LANGUAGE: Write EVERYTHING in ${languageName}`;

    // Add key points with emphasis
    if (formData.bulletPoints && formData.bulletPoints.length > 0) {
      prompt += `\n\nMANDATORY KEY POINTS TO INCLUDE:
${formData.bulletPoints.map((point, index) => `${index + 1}. ${point} - make this a central focus`).join('\n')}

CRITICAL: You MUST incorporate ALL these key points into your content. Don't just mention them - build the entire content around these points.`;
    }

    // Platform-specific requirements
    if (formData.platform === 'twitter') {
      prompt += `\n\nTWITTER REQUIREMENTS:
- Start with a hook that stops scrolling
- Keep under 280 characters
- Use thread format if needed
- Include engaging questions
- Make it shareable and quotable`;
    } else if (formData.platform === 'instagram') {
      prompt += `\n\nINSTAGRAM REQUIREMENTS:
- Start with an attention-grabbing first line
- Use storytelling format
- Include relatable moments
- Add conversation starters
- Make it save-worthy`;
    }

    // Tone-specific instructions
    if (formData.tone === 'humorous') {
      prompt += `\n\nHUMOR REQUIREMENTS:
- Use clever wordplay and puns
- Include unexpected twists
- Add relatable funny observations
- Use conversational, witty language
- Make people want to share it for the humor`;
    }

    prompt += `\n\nFINAL OUTPUT: Write only the ${formData.contentType} content in ${languageName}. No explanations, no meta-commentary, just the engaging content that incorporates ALL key points.`;

    return prompt;
  }

  static createRefinedRetryPrompt(formData: FormData): string {
    const languageName = this.languageNames[formData.language] || formData.language;
    
    return `Write a ${formData.tone} ${formData.platform} post about ${formData.topic} in ${languageName === 'english' ? 'English' : languageName}.

MUST INCLUDE these specific points:
${formData.bulletPoints?.map(point => `- ${point} (make this prominent)`).join('\n')}

Make it ${formData.tone} and engaging for ${formData.platform}. Write ONLY the content, no explanations.`;
  }
}
