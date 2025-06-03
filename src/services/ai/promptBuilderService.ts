
import { PlatformValidationService } from "./platformValidationService";
import { FormData } from "@/components/content-generator/multi-step/types";

export class PromptBuilderService {
  static buildContentPrompt(formData: FormData) {
    const constraints = PlatformValidationService.getConstraints(formData.platform);
    const suggestions = PlatformValidationService.getSuggestions(formData.platform);

    // Build enhanced prompt
    let prompt = `Create a ${formData.contentType === "post" ? "social media post" : "video script"} for ${formData.platform} about: ${formData.topic}`;
    
    if (formData.tone) prompt += `\nTone: ${formData.tone}`;
    if (formData.goal) prompt += `\nGoal: ${formData.goal}`;
    if (formData.template) prompt += `\nTemplate: ${formData.template}`;
    
    if (formData.bulletPoints && formData.bulletPoints.length > 0) {
      prompt += `\nKey points to include:\n${formData.bulletPoints.map(point => `• ${point}`).join('\n')}`;
    }
    
    prompt += `\nRequirements:`;
    prompt += `\n- Optimize for ${formData.platform}`;
    
    if (constraints) {
      prompt += `\n- Keep content under ${constraints.maxCharacters} characters`;
      if (constraints.maxHashtags > 0) {
        prompt += `\n- Include up to ${constraints.maxHashtags} relevant hashtags`;
      }
      if (!constraints.supportsEmojis) {
        prompt += `\n- Do not use emojis`;
      }
    }
    
    prompt += `\n- ${formData.includeEmojis ? "Include relevant emojis" : "No emojis"}`;
    prompt += `\n- DO NOT include hashtags in the main content`;
    prompt += `\n- Focus on engaging, valuable content`;
    
    if (suggestions.length > 0) {
      prompt += `\n- Platform tips: ${suggestions.join(', ')}`;
    }

    return { prompt, constraints };
  }

  static buildDynamicPrompt(request: any): string {
    // Enhanced prompt building logic for dynamic content generation
    let prompt = `Create engaging content for ${request.platform} about: ${request.topic}`;
    
    if (request.tone) prompt += `\nTone: ${request.tone}`;
    if (request.goal) prompt += `\nGoal: ${request.goal}`;
    if (request.template) prompt += `\nTemplate style: ${request.template}`;
    
    prompt += `\nRequirements:`;
    prompt += `\n- Optimize for ${request.platform}`;
    prompt += `\n- ${request.useEmojis ? "Include relevant emojis" : "No emojis"}`;
    prompt += `\n- ${request.useHashtags ? "Include relevant hashtags" : "No hashtags"}`;
    prompt += `\n- Focus on engaging, valuable content`;
    
    return prompt;
  }
}

// Export instance for backward compatibility
export const promptBuilderService = new PromptBuilderService();
