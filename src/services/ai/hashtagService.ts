
import { coreAIService } from './coreAIService';
import { fallbackGenerators } from './fallbackGenerators';

export class HashtagService {
  async generateHashtags(content: string, count: number = 5): Promise<string[]> {
    console.log('Calling hashtag generation service');

    try {
      const hashtagPrompt = `Generate ${count} relevant and trending hashtags for this social media content:

Content: ${content}

Requirements:
- Make hashtags specific and relevant to the content
- Include mix of broad and niche hashtags
- Avoid overly generic hashtags
- Format each hashtag with # symbol
- Return as a simple list, one hashtag per line

Generate exactly ${count} hashtags:`;

      const result = await coreAIService.callAI(hashtagPrompt, 'gemini');

      if (result.error) {
        console.error('AI hashtag generation error:', result.error);
        return this.generateFallbackHashtags(content, count);
      }

      try {
        // Parse the hashtags from the response
        const hashtags = result.content
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('#'))
          .slice(0, count);

        if (hashtags.length === 0) {
          return this.generateFallbackHashtags(content, count);
        }

        return hashtags;
      } catch (parseError) {
        console.error('Failed to parse hashtags:', parseError);
        return this.generateFallbackHashtags(content, count);
      }

    } catch (error) {
      console.error('Hashtag generation error:', error);
      return this.generateFallbackHashtags(content, count);
    }
  }

  private generateFallbackHashtags(content: string, count: number): string[] {
    // Generate basic hashtags based on content analysis
    const commonHashtags = [
      '#content', '#socialmedia', '#engagement', '#community', 
      '#inspiration', '#motivation', '#business', '#marketing',
      '#lifestyle', '#growth', '#success', '#tips', '#advice',
      '#trending', '#viral', '#creative', '#digital', '#online'
    ];

    // Try to extract keywords from content for more relevant hashtags
    const words = content.toLowerCase().split(/\s+/);
    const relevantHashtags: string[] = [];

    // Look for relevant words that could be hashtags
    words.forEach(word => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, '');
      if (cleanWord.length > 3 && cleanWord.length < 15) {
        relevantHashtags.push(`#${cleanWord}`);
      }
    });

    // Combine relevant and common hashtags
    const allHashtags = [...relevantHashtags.slice(0, Math.floor(count/2)), ...commonHashtags];
    
    // Remove duplicates and return requested count
    const uniqueHashtags = [...new Set(allHashtags)];
    return uniqueHashtags.slice(0, count);
  }
}

export const hashtagService = new HashtagService();
