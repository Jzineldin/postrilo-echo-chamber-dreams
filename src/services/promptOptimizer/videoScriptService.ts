
export class VideoScriptService {
  static getEnhancedVideoScriptPrompt(platform: string, topic: string, keyPoints?: string): string {
    const videoPrompts = {
      tiktok: `

CREATE A TIKTOK VIDEO SCRIPT WITH THESE DISTINCT SECTIONS:

🎯 HOOK (0-3 seconds): Create a scroll-stopping opener that makes viewers pause immediately
Examples:
- "POV: You discover the ${topic} secret that changes everything..."
- "Wait, this ${topic} hack actually works?!"
- "The thing nobody tells you about ${topic}..."
- "This will blow your mind in 3 seconds..."
- "I tried ${topic} for 30 days and this happened..."

📚 MAIN CONTENT (3-45 seconds): Deliver value that's DIFFERENT from your hook
- Step-by-step demonstration or explanation
- Behind-the-scenes insights about ${topic}
- Real examples, before/after, or case studies
- Quick tips that solve actual problems
- Transformation or results showcase

🔥 CALL TO ACTION (45-60 seconds): Drive viral engagement
- "Try this ${topic} method and tell me if it works!"
- "Which one are you? Comment 1 or 2 below!"
- "Follow for more ${topic} secrets that actually work!"
- "Save this for when you need ${topic} help!"
- "Duet this with your ${topic} results!"

CRITICAL: Each section must serve a DIFFERENT purpose - hook grabs attention, content delivers value, CTA drives engagement.`,

      instagram: `

CREATE AN INSTAGRAM VIDEO SCRIPT:

🎬 HOOK (0-3 seconds): Visual attention-grabber or intriguing opener about ${topic}
📖 MAIN CONTENT (5-45 seconds): Story-driven content with visual storytelling elements
🤝 CALL TO ACTION: Community engagement, saves, and Instagram-specific features

Structure for Instagram algorithm optimization and story potential.`,

      youtube: `

CREATE A YOUTUBE VIDEO SCRIPT:

🎯 HOOK (0-15 seconds): Compelling introduction with clear value promise about ${topic}
📚 MAIN CONTENT (15-300+ seconds): Educational deep-dive with clear, structured information
🔔 CALL TO ACTION: Subscribe, notification bell, and engagement prompts

Include SEO-friendly language and searchable keywords related to ${topic}.`,

      linkedin: `

CREATE A LINKEDIN VIDEO SCRIPT:

💼 HOOK (0-5 seconds): Professional insight or industry question about ${topic}
🎯 MAIN CONTENT (10-60 seconds): Business value and expertise demonstration
🤝 CALL TO ACTION: Professional network engagement and thought leadership

Focus on career/business value and professional development.`,

      facebook: `

CREATE A FACEBOOK VIDEO SCRIPT:

👋 HOOK (0-3 seconds): Relatable opening that sparks conversation about ${topic}
📖 MAIN CONTENT (5-90 seconds): Community-focused storytelling with local relevance
💬 CALL TO ACTION: Comments, shares, and community discussion

Optimize for Facebook's community-focused algorithm.`
    };

    const basePrompt = videoPrompts[platform as keyof typeof videoPrompts] || videoPrompts.instagram;
    
    if (keyPoints) {
      return basePrompt + `\n\nINCLUDE THESE KEY POINTS:\n${keyPoints}`;
    }
    
    return basePrompt;
  }
}
