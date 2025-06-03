import { PromptTemplate } from './types';
import { POSTRILO_TEMPLATES } from './postrilotemplateData';

// Keep existing templates for backward compatibility
const LEGACY_TEMPLATES: PromptTemplate[] = [
  {
    id: 'social-media-expert',
    name: 'Social Media Expert (Legacy)',
    description: 'Expert social media copywriter with platform-specific optimization',
    category: 'legacy',
    behavior: 'platform-optimized social media specialist',
    contentStyle: 'engaging and platform-specific',
    requirements: 'Optimize for platform constraints and audience behavior',
    structure: 'Hook + Value + CTA format',
    template: `You are an expert social media copywriter with {{behavior}} behavior.

Generate a {{content_type}} for {{platform}} with a {{tone}} tone.

Content goal: {{goal}}
Topic: {{topic}}
Template behavior: {{behavior}}
Content style: {{content_style}}

Include the following key points if provided: {{key_points}}

Platform-specific constraints:
- Twitter: Keep it under 280 characters and make it engaging.
- Instagram: Add emojis and visually descriptive language.
- LinkedIn: Keep it professional and value-driven.
- Facebook: Make it conversational and community-focused.
- TikTok: Use a trendy hook and casual tone.
- YouTube: Make the text suitable as a script or caption.

Enhance engagement using emojis: {{use_emojis}}
Add strategic hashtags based on topic and platform: {{use_hashtags}}

Follow these requirements: {{requirements}}
Use this structure: {{structure}}

Output format:
1. Final Post Text
2. 5-8 Relevant Hashtags
3. Best Time to Post Recommendation`,
    variables: [
      {
        name: 'content_type',
        type: 'select',
        defaultValue: 'social media post',
        options: ['social media post', 'video script', 'story content', 'carousel post'],
        description: 'Type of content to generate'
      },
      {
        name: 'platform',
        type: 'select',
        defaultValue: 'instagram',
        options: ['instagram', 'twitter', 'linkedin', 'facebook', 'tiktok', 'youtube'],
        description: 'Target social media platform'
      },
      {
        name: 'tone',
        type: 'select',
        defaultValue: 'professional',
        options: ['professional', 'casual', 'humorous', 'inspirational', 'educational', 'conversational'],
        description: 'Tone of voice for the content'
      },
      {
        name: 'goal',
        type: 'select',
        defaultValue: 'engagement',
        options: ['engagement', 'brand-awareness', 'lead-generation', 'sales', 'education', 'community'],
        description: 'Primary goal of the content'
      },
      {
        name: 'topic',
        type: 'text',
        defaultValue: '',
        description: 'Main topic or subject for the content'
      },
      {
        name: 'key_points',
        type: 'textarea',
        defaultValue: '',
        description: 'Key points to include (optional)'
      },
      {
        name: 'use_emojis',
        type: 'boolean',
        defaultValue: true,
        description: 'Include emojis for better engagement'
      },
      {
        name: 'use_hashtags',
        type: 'boolean',
        defaultValue: true,
        description: 'Add strategic hashtags'
      },
      {
        name: 'behavior',
        type: 'text',
        defaultValue: 'platform-optimized social media specialist',
        description: 'AI behavior pattern'
      },
      {
        name: 'content_style',
        type: 'text',
        defaultValue: 'engaging and platform-specific',
        description: 'Content style approach'
      },
      {
        name: 'requirements',
        type: 'text',
        defaultValue: 'Optimize for platform constraints and audience behavior',
        description: 'Special requirements'
      },
      {
        name: 'structure',
        type: 'text',
        defaultValue: 'Hook + Value + CTA format',
        description: 'Content structure'
      }
    ]
  }
];

// Combine Postrilo templates with legacy templates
export const PROMPT_TEMPLATES: PromptTemplate[] = [
  ...POSTRILO_TEMPLATES,
  ...LEGACY_TEMPLATES
];
