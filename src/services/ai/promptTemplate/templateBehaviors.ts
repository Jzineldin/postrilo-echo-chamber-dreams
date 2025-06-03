
import { TemplateBehavior } from './types';

export const TEMPLATE_BEHAVIORS: Record<string, TemplateBehavior> = {
  'basic-post': {
    behavior: 'direct and scroll-stopping',
    contentStyle: 'short, clear, general-purpose',
    requirements: 'Clear and engaging. Add 5-8 hashtags.',
    structure: 'Direct statement with strong hook'
  },
  'quote-inspiration': {
    behavior: 'motivational and poetic',
    contentStyle: 'uplifting and inspirational',
    requirements: 'Include a powerful quote or metaphor. Always uplifting tone.',
    structure: 'Quote or inspirational message with context'
  },
  'brand-story': {
    behavior: 'storytelling focused',
    contentStyle: 'narrative and value-driven',
    requirements: 'Highlight values, history, or identity. Use first person when appropriate.',
    structure: 'Story format with brand values'
  },
  'product-launch': {
    behavior: 'promotional and urgent',
    contentStyle: 'feature-focused with benefits',
    requirements: 'Highlight features or benefits. Use urgency. Include CTA.',
    structure: 'Product introduction with benefits and CTA'
  },
  'tutorial-post': {
    behavior: 'educational and clear',
    contentStyle: 'step-by-step instructional',
    requirements: 'Be clear and educational. Write step-by-step. Use numbered or bullet format.',
    structure: 'Step-by-step tutorial format'
  },
  'behind-the-scenes': {
    behavior: 'authentic and conversational',
    contentStyle: 'human and relatable',
    requirements: 'Be authentic, conversational. Talk like a human.',
    structure: 'Casual behind-the-scenes narrative'
  },
  'educational-carousel': {
    behavior: 'educational expert',
    contentStyle: 'fact-focused and informative',
    requirements: 'Focus on bite-sized facts. Separate content into 3-5 blocks.',
    structure: 'Educational content in digestible blocks'
  }
};
