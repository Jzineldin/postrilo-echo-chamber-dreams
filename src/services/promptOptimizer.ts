
import { enhancedPlatformCharacterLimits, detailedPlatformStyles } from './promptOptimizer/enhancedPlatformConfigs';
import { enhancedToneModifiers } from './promptOptimizer/toneModifiers';
import { advancedGoalOptimizations, getGoalOptimization, getGoalStrategiesForPlatform } from './promptOptimizer/enhancedGoalOptimizations';
import { EnhancedVideoScriptService } from './promptOptimizer/enhancedVideoScriptService';
import { EnhancedContentAdaptationService } from './promptOptimizer/enhancedContentAdaptationService';

export interface PlatformPromptConfig {
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  topic: string;
  keyPoints?: string;
  emojiUsage?: boolean;
  hashtagDensity?: boolean;
  shortSentences?: boolean;
  contentLength?: string;
  hashtagCount?: string;
}

export class PromptOptimizer {
  private static platformCharacterLimits = enhancedPlatformCharacterLimits;
  private static detailedPlatformStyles = detailedPlatformStyles;
  private static enhancedToneModifiers = enhancedToneModifiers;
  private static advancedGoalOptimizations = advancedGoalOptimizations;

  static generateOptimizedPrompt(config: PlatformPromptConfig): string {
    const platformConfig = this.detailedPlatformStyles[config.platform as keyof typeof this.detailedPlatformStyles];
    const toneConfig = this.enhancedToneModifiers[config.tone as keyof typeof this.enhancedToneModifiers];
    const goalConfig = getGoalOptimization(config.goal);
    const charLimit = this.platformCharacterLimits[config.platform as keyof typeof this.platformCharacterLimits];
    const platformGoalStrategy = getGoalStrategiesForPlatform(config.goal, config.platform);

    // Enhanced prompt with advanced platform optimization
    let prompt = `${platformConfig.prefix} ${toneConfig.voice} about: ${config.topic}

PLATFORM: ${config.platform.toUpperCase()}
CONTENT TYPE: ${config.contentType}
CHARACTER LIMIT: ${charLimit} characters
TONE: ${config.tone} - ${toneConfig.approach}
GOAL: ${goalConfig.focus}
CONTENT LENGTH: ${config.contentLength || 'medium'}

PLATFORM-SPECIFIC REQUIREMENTS:
- Style: ${platformConfig.style}
- Structure: ${platformConfig.contentStructure.join(' → ')}
- Call to Action: ${platformConfig.callToAction}
- Best Practices: ${platformConfig.bestPractices.slice(0, 4).join(', ')}
- Tone Adaptation: ${platformConfig.toneAdaptations[config.tone as keyof typeof platformConfig.toneAdaptations]}

ADVANCED GOAL OPTIMIZATION:
- Focus: ${goalConfig.elements}
- Strategy: ${goalConfig.contentApproach}
- Platform Strategy: ${platformGoalStrategy}
- CTA Strategy: ${goalConfig.ctaStrategy}
- Key Metrics: ${goalConfig.keyMetrics.join(', ')}

TONE EXECUTION:
- Voice: ${toneConfig.voice}
- Language: ${toneConfig.language}
- Approach: ${toneConfig.approach}`;

    if (config.keyPoints) {
      prompt += `\n\nKEY POINTS TO INCLUDE:
${config.keyPoints}
CRITICAL: You MUST incorporate ALL these key points naturally into the content structure.`;
    }

    if (config.contentType === 'post') {
      prompt += `\n\nPOST-SPECIFIC REQUIREMENTS:
- Stay under ${charLimit} characters
- Optimize for ${goalConfig.focus}
- Use ${platformConfig.contentStructure.join(' → ')} structure`;
      
      // Content length settings
      if (config.contentLength === 'short') {
        prompt += `\n- Keep it very concise and punchy (under 50% of character limit)`;
      } else if (config.contentLength === 'long') {
        prompt += `\n- Provide detailed, comprehensive content (use 80-90% of character limit)`;
      }
      
      // Emoji settings
      if (config.emojiUsage) {
        prompt += `\n- Include relevant emojis strategically to enhance engagement and visual appeal`;
      } else {
        prompt += `\n- Do not use any emojis - keep text-only`;
      }
      
      // Hashtag settings
      if (config.hashtagCount && config.hashtagCount !== 'none') {
        const hashtagCountMap: { [key: string]: string } = {
          '3-5': '3-5 targeted hashtags',
          '5-8': '5-8 relevant hashtags',
          '8-12': '8-12 strategic hashtags',
          'maximum': '15+ comprehensive hashtags for maximum reach'
        };
        prompt += `\n- Include ${hashtagCountMap[config.hashtagCount] || '5-8 relevant hashtags'}`;
        prompt += `\n- Place hashtags at the end of the post for clean readability`;
      } else {
        prompt += `\n- Do not include any hashtags`;
      }
      
      // Sentence structure
      if (config.shortSentences) {
        prompt += `\n- Use short, punchy sentences for maximum impact and readability`;
      }
    } else if (config.contentType === 'video' || config.contentType === 'video-script') {
      prompt += EnhancedVideoScriptService.getAdvancedVideoScriptPrompt(config.platform, config.topic, config.tone, config.goal, config.keyPoints);
    }

    prompt += `\n\nVIRAL POTENTIAL ELEMENTS:
- Platform-specific viral elements: ${platformConfig.viralElements.join(', ')}
- Engagement tactics: ${platformConfig.engagementTactics.join(', ')}
- Content formats: ${platformConfig.contentFormats.join(', ')}
- Optimize for platform algorithm and user behavior

FINAL OPTIMIZATION:
- Every element must serve the ${config.goal} objective
- Content must feel native to ${config.platform}
- Tone must be consistently ${config.tone} throughout
- Structure must follow ${platformConfig.contentStructure.join(' → ')} format
- Apply advanced goal strategies: ${Object.values(goalConfig.strategies).slice(0, 2).join(', ')}

OUTPUT: Provide only the final content optimized for ${config.platform} with ${config.tone} tone to achieve ${config.goal}. No explanations or meta-commentary.`;

    return prompt;
  }

  static adaptContentForPlatform(content: string, fromPlatform: string, toPlatform: string, tone: string = 'casual', goal: string = 'engagement'): string {
    return EnhancedContentAdaptationService.adaptContentForPlatform(content, fromPlatform, toPlatform, tone, goal);
  }
}
