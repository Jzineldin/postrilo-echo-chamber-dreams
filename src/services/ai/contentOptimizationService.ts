
import { coreAIService } from './coreAIService';
import { fallbackGenerators } from './fallbackGenerators';
import { OptimizeContentRequest, ContentSuggestion } from './types';

export class ContentOptimizationService {
  async optimizeContent(request: OptimizeContentRequest): Promise<ContentSuggestion[]> {
    console.log('Calling content optimization service');

    try {
      const optimizationPrompt = `Analyze this ${request.platform} content and provide optimization suggestions for ${request.objective}:

Content: ${request.content}

Provide 3-5 specific suggestions to improve engagement, readability, and platform performance. Format as JSON array with objects containing: type, suggestion, reasoning, confidence (0-1).`;

      const result = await coreAIService.callAI(optimizationPrompt, 'gemini');

      if (result.error) {
        console.error('AI optimization error:', result.error);
        return fallbackGenerators.generateFallbackOptimizations(request.content, request.platform);
      }

      try {
        const suggestions = JSON.parse(result.content);
        return Array.isArray(suggestions) ? suggestions : fallbackGenerators.generateFallbackOptimizations(request.content, request.platform);
      } catch (parseError) {
        console.error('Failed to parse optimization suggestions:', parseError);
        return fallbackGenerators.generateFallbackOptimizations(request.content, request.platform);
      }

    } catch (error) {
      console.error('Content optimization error:', error);
      return fallbackGenerators.generateFallbackOptimizations(request.content, request.platform);
    }
  }

  async improveContent(content: string, improvements: string[]): Promise<string> {
    console.log('Calling content improvement service');

    try {
      const improvementPrompt = `Improve this content based on these suggestions:

Original Content: ${content}

Improvements to apply:
${improvements.map((imp, i) => `${i + 1}. ${imp}`).join('\n')}

Return only the improved content, maintaining the original tone and style while applying the suggested improvements.`;

      const result = await coreAIService.callAI(improvementPrompt, 'gemini');

      if (result.error) {
        console.error('AI improvement error:', result.error);
        return fallbackGenerators.generateFallbackImprovement(content);
      }

      return result.content || fallbackGenerators.generateFallbackImprovement(content);

    } catch (error) {
      console.error('Content improvement error:', error);
      return fallbackGenerators.generateFallbackImprovement(content);
    }
  }
}

export const contentOptimizationService = new ContentOptimizationService();
