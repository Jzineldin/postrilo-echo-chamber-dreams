
import { PromptTemplate } from './types';

export const POSTRILO_TEMPLATES: PromptTemplate[] = [
  {
    id: 'social-media-post',
    name: 'Social Media Post',
    description: 'Short-form content optimized for social feeds with platform-specific requirements',
    category: 'social-media',
    behavior: 'platform-optimized content specialist with Nordic market understanding',
    contentStyle: 'engaging, authentic, and platform-specific',
    requirements: 'Adapt to platform character limits, use appropriate hashtags and emojis, optimize for engagement',
    structure: 'Hook + Value + CTA format with platform-specific optimization',
    template: `You are the AI content engine for Postrilo, specialized for Nordic markets.

Create a {{content_type}} for {{platform}} about: {{topic}}

Platform: {{platform}}
Tone: {{tone}}
Goal: {{goal}}
Key Points: {{key_points}}

PLATFORM-SPECIFIC REQUIREMENTS:
- Facebook: Conversational, can use longer text, good for storytelling
- Instagram: Visual focus, use emojis, 5-15 relevant hashtags, engaging first line
- Twitter/X: Concise, under 280 characters, 1-2 hashtags, conversation starter
- LinkedIn: Professional, industry insights, minimal hashtags, business value focus
- TikTok: Trendy, authentic, conversational, hook in first line
- Pinterest: Descriptive, keyword-rich, inspirational, clear value proposition
- YouTube: Detailed description, timestamps if applicable, keywords, subscribe CTA
- Jodel: Location-based, anonymous community style, local Nordic references
- ResearchGate: Academic tone, research-focused, professional citations

TONE APPLICATION:
Apply {{tone}} tone throughout while maintaining authenticity and platform appropriateness.

GOAL OPTIMIZATION:
Optimize for {{goal}} with appropriate calls-to-action and engagement techniques.

NORDIC SPECIALIZATION:
- Use Nordic communication style (direct, less promotional)
- Include cultural nuances when relevant
- Maintain clean, minimal aesthetic in language
- Focus on authentic, relationship-based messaging

Generate content that feels natural and engaging for Nordic audiences.`,
    variables: [
      {
        name: 'content_type',
        type: 'select',
        defaultValue: 'social media post',
        options: ['social media post', 'video script', 'story content', 'carousel post'],
        description: 'Type of social media content'
      },
      {
        name: 'platform',
        type: 'select',
        defaultValue: 'instagram',
        options: ['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'pinterest', 'youtube', 'reddit', 'jodel', 'researchgate'],
        description: 'Target social media platform'
      },
      {
        name: 'tone',
        type: 'select',
        defaultValue: 'conversational',
        options: ['professional', 'conversational', 'humorous', 'inspirational', 'educational', 'authoritative', 'empathetic', 'urgent', 'minimalist', 'poetic', 'lagom', 'hygge'],
        description: 'Content tone and voice'
      },
      {
        name: 'goal',
        type: 'select',
        defaultValue: 'engagement',
        options: ['engagement', 'brand-awareness', 'lead-generation', 'sales-conversion', 'customer-education', 'community-building', 'thought-leadership', 'crisis-management', 'recruitment', 'seo-optimization'],
        description: 'Primary content goal'
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
      }
    ]
  },
  {
    id: 'blog-article',
    name: 'Article/Blog Post',
    description: 'Long-form content (500-2000 words) with SEO optimization and structured format',
    category: 'content-marketing',
    behavior: 'expert content writer with Nordic market expertise',
    contentStyle: 'comprehensive, well-structured, and SEO-optimized',
    requirements: 'Include headings, provide detailed information, optimize for search engines',
    structure: 'Introduction + Main sections with headings + Conclusion with CTA',
    template: `Create a comprehensive {{content_type}} about: {{topic}}

Tone: {{tone}}
Goal: {{goal}}
Target Length: 500-2000 words
Key Points: {{key_points}}

STRUCTURE REQUIREMENTS:
1. Compelling headline optimized for SEO
2. Introduction that hooks the reader
3. Main content with clear headings (H2, H3)
4. Practical examples and actionable insights
5. Conclusion with clear call-to-action

NORDIC MARKET FOCUS:
- Address Nordic business culture and communication preferences
- Include relevant local examples or case studies when appropriate
- Maintain authentic, non-promotional approach
- Focus on practical value and relationship-building

SEO OPTIMIZATION:
- Include relevant keywords naturally
- Structure content for featured snippets
- Use descriptive meta descriptions
- Include internal linking opportunities

TONE APPLICATION:
Write in {{tone}} style while maintaining professionalism and providing substantial value.

Generate comprehensive, valuable content that establishes thought leadership in Nordic markets.`,
    variables: [
      {
        name: 'content_type',
        type: 'select',
        defaultValue: 'blog article',
        options: ['blog article', 'thought leadership piece', 'how-to guide', 'industry analysis', 'case study'],
        description: 'Type of long-form content'
      },
      {
        name: 'topic',
        type: 'text',
        defaultValue: '',
        description: 'Main topic for the article'
      },
      {
        name: 'tone',
        type: 'select',
        defaultValue: 'professional',
        options: ['professional', 'educational', 'authoritative', 'conversational', 'inspirational', 'lagom'],
        description: 'Article tone and style'
      },
      {
        name: 'goal',
        type: 'select',
        defaultValue: 'thought-leadership',
        options: ['thought-leadership', 'seo-optimization', 'lead-generation', 'customer-education', 'brand-awareness'],
        description: 'Primary article goal'
      },
      {
        name: 'key_points',
        type: 'textarea',
        defaultValue: '',
        description: 'Main points to cover in the article'
      }
    ]
  },
  {
    id: 'video-script',
    name: 'Video Script',
    description: 'Structured scripts for video content with visual cues and platform optimization',
    category: 'video-content',
    behavior: 'video content specialist with Nordic storytelling expertise',
    contentStyle: 'engaging spoken delivery with visual elements',
    requirements: 'Include intro/main/conclusion structure, visual cues, platform-specific optimization',
    structure: 'Hook + Introduction + Main points + Conclusion + CTA',
    template: `Create a {{content_type}} for {{platform}} about: {{topic}}

Platform: {{platform}}
Tone: {{tone}}
Goal: {{goal}}
Duration Target: {{duration}}
Key Points: {{key_points}}

SCRIPT STRUCTURE:
[HOOK - First 3-5 seconds]
Compelling opening that grabs attention immediately

[INTRODUCTION - 10-15 seconds]
Brief intro to topic and what viewers will learn

[MAIN CONTENT - 60-80% of duration]
Core content broken into digestible segments with visual cues

[CONCLUSION - Final 10-15 seconds]
Summary and strong call-to-action

PLATFORM OPTIMIZATION:
- YouTube: Detailed, educational, include timestamps and subscribe CTA
- TikTok: Fast-paced, trendy, hook in first 3 seconds
- Instagram Reels: Visual storytelling, engaging throughout
- LinkedIn Video: Professional insights, business value

VISUAL CUES:
Include [Visual suggestions] for key moments
Suggest B-roll opportunities where relevant

NORDIC STORYTELLING:
- Use authentic, relatable examples
- Maintain understated confidence
- Focus on practical value over entertainment
- Include lagom (balanced) approach to messaging

TONE APPLICATION:
Deliver in {{tone}} style while maintaining engagement and authenticity.

Write for spoken delivery with natural pauses and emphasis points.`,
    variables: [
      {
        name: 'content_type',
        type: 'select',
        defaultValue: 'video script',
        options: ['video script', 'tutorial script', 'product demo script', 'testimonial script', 'educational series script'],
        description: 'Type of video content'
      },
      {
        name: 'platform',
        type: 'select',
        defaultValue: 'youtube',
        options: ['youtube', 'tiktok', 'instagram', 'linkedin', 'facebook'],
        description: 'Target video platform'
      },
      {
        name: 'duration',
        type: 'select',
        defaultValue: '60 seconds',
        options: ['15 seconds', '30 seconds', '60 seconds', '2-3 minutes', '5-10 minutes'],
        description: 'Target video duration'
      },
      {
        name: 'topic',
        type: 'text',
        defaultValue: '',
        description: 'Video topic or subject'
      },
      {
        name: 'tone',
        type: 'select',
        defaultValue: 'conversational',
        options: ['conversational', 'educational', 'inspirational', 'humorous', 'professional', 'lagom'],
        description: 'Video tone and delivery style'
      },
      {
        name: 'goal',
        type: 'select',
        defaultValue: 'engagement',
        options: ['engagement', 'education', 'brand-awareness', 'lead-generation', 'sales-conversion'],
        description: 'Primary video goal'
      },
      {
        name: 'key_points',
        type: 'textarea',
        defaultValue: '',
        description: 'Main points to cover in the video'
      }
    ]
  },
  {
    id: 'email-newsletter',
    name: 'Email Newsletter',
    description: 'Personalized email content with clear sections and strong CTAs',
    category: 'email-marketing',
    behavior: 'email marketing specialist with Nordic communication expertise',
    contentStyle: 'personal, valuable, and action-oriented',
    requirements: 'Include subject line, preview text, clear sections, and compelling CTAs',
    structure: 'Subject + Preview + Personal greeting + Value sections + CTA',
    template: `Create an {{content_type}} about: {{topic}}

Tone: {{tone}}
Goal: {{goal}}
Target Audience: {{target_audience}}
Key Points: {{key_points}}

EMAIL STRUCTURE:

Subject Line: (50-60 characters, compelling and clear)
Preview Text: (90-130 characters, complements subject line)

Dear [First Name],

[PERSONAL OPENING]
Brief, warm introduction that connects with the recipient

[MAIN CONTENT SECTIONS]
2-3 clear sections with valuable information:
• Section 1: Primary value/information
• Section 2: Supporting details or secondary benefit
• Section 3: Additional value or social proof

[CLEAR CALL-TO-ACTION]
Prominent, specific action for the recipient to take

[CLOSING]
Warm, personal sign-off

Best regards,
[Name]
[Title]
[Company]

NORDIC EMAIL BEST PRACTICES:
- Direct, honest communication
- Focus on value before selling
- Respect privacy and preferences
- Use clear, simple language
- Build trust through transparency

TONE APPLICATION:
Write in {{tone}} style while maintaining professionalism and personal connection.

Optimize for {{goal}} with clear value proposition and compelling CTA.`,
    variables: [
      {
        name: 'content_type',
        type: 'select',
        defaultValue: 'newsletter',
        options: ['newsletter', 'promotional email', 'welcome email', 'product announcement', 'educational email'],
        description: 'Type of email content'
      },
      {
        name: 'topic',
        type: 'text',
        defaultValue: '',
        description: 'Email topic or main message'
      },
      {
        name: 'tone',
        type: 'select',
        defaultValue: 'professional',
        options: ['professional', 'conversational', 'friendly', 'educational', 'lagom', 'hygge'],
        description: 'Email tone and style'
      },
      {
        name: 'goal',
        type: 'select',
        defaultValue: 'engagement',
        options: ['engagement', 'lead-generation', 'sales-conversion', 'customer-education', 'retention'],
        description: 'Primary email goal'
      },
      {
        name: 'target_audience',
        type: 'text',
        defaultValue: 'existing customers',
        description: 'Target audience for the email'
      },
      {
        name: 'key_points',
        type: 'textarea',
        defaultValue: '',
        description: 'Key information to include'
      }
    ]
  },
  {
    id: 'product-description',
    name: 'Product Description',
    description: 'Feature-focused content highlighting benefits with persuasive language',
    category: 'e-commerce',
    behavior: 'product marketing specialist with Nordic market understanding',
    contentStyle: 'persuasive yet authentic, benefit-focused',
    requirements: 'Highlight features and benefits, include specifications, clear value proposition',
    structure: 'Compelling headline + Key benefits + Features + Specifications + CTA',
    template: `Create a {{content_type}} for: {{product_name}}

Product Category: {{category}}
Tone: {{tone}}
Goal: {{goal}}
Key Features: {{key_features}}
Target Audience: {{target_audience}}

PRODUCT DESCRIPTION STRUCTURE:

# [Compelling Product Name/Headline]

[OPENING VALUE STATEMENT]
Clear, compelling statement of primary benefit or unique value

## Key Benefits
• Benefit 1: How it improves the customer's life
• Benefit 2: Problem it solves or value it provides
• Benefit 3: Unique advantage or differentiator

## Features & Specifications
[Detailed feature list with relevant specifications]

## Why Choose This Product
[Trust signals, quality indicators, or unique selling points]

## Perfect For
[Target use cases or customer types]

[PRICING/AVAILABILITY]
[Clear pricing and purchase information]

[CALL-TO-ACTION]
Clear, compelling action for the customer

NORDIC E-COMMERCE APPROACH:
- Focus on quality and functionality over flashy marketing
- Emphasize sustainability and ethical production when relevant
- Use honest, straightforward language
- Highlight practical value and longevity
- Include social proof authentically

TONE APPLICATION:
Write in {{tone}} style while maintaining credibility and focusing on customer value.

Create authentic, persuasive content that builds trust and drives {{goal}}.`,
    variables: [
      {
        name: 'content_type',
        type: 'select',
        defaultValue: 'product description',
        options: ['product description', 'product page copy', 'catalog description', 'feature highlight'],
        description: 'Type of product content'
      },
      {
        name: 'product_name',
        type: 'text',
        defaultValue: '',
        description: 'Product name or title'
      },
      {
        name: 'category',
        type: 'text',
        defaultValue: '',
        description: 'Product category or type'
      },
      {
        name: 'tone',
        type: 'select',
        defaultValue: 'professional',
        options: ['professional', 'conversational', 'minimalist', 'lagom', 'authoritative'],
        description: 'Description tone and style'
      },
      {
        name: 'goal',
        type: 'select',
        defaultValue: 'sales-conversion',
        options: ['sales-conversion', 'product-awareness', 'feature-education', 'comparison'],
        description: 'Primary description goal'
      },
      {
        name: 'key_features',
        type: 'textarea',
        defaultValue: '',
        description: 'Main product features and specifications'
      },
      {
        name: 'target_audience',
        type: 'text',
        defaultValue: '',
        description: 'Target customer or use case'
      }
    ]
  }
];
