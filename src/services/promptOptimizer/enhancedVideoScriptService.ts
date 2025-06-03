
export class EnhancedVideoScriptService {
  static getAdvancedVideoScriptPrompt(platform: string, topic: string, tone: string, goal: string, keyPoints?: string): string {
    const platformConfigs = {
      tiktok: {
        structure: {
          hook: "0-3 seconds: Scroll-stopping opener",
          content: "3-45 seconds: Value delivery",
          cta: "45-60 seconds: Viral engagement driver"
        },
        requirements: [
          "Each section must serve a DIFFERENT purpose",
          "Hook grabs attention, content delivers value, CTA drives engagement",
          "Optimize for vertical mobile viewing",
          "Include trending elements and sounds potential",
          "Create duet and stitch opportunities"
        ],
        hooks: [
          "POV: You discover the {topic} secret that changes everything...",
          "Wait, this {topic} hack actually works?!",
          "The thing nobody tells you about {topic}...",
          "This will blow your mind in 3 seconds...",
          "I tried {topic} for 30 days and this happened..."
        ],
        ctas: [
          "Try this {topic} method and tell me if it works!",
          "Which one are you? Comment 1 or 2 below!",
          "Follow for more {topic} secrets that actually work!",
          "Save this for when you need {topic} help!",
          "Duet this with your {topic} results!"
        ]
      },
      instagram: {
        structure: {
          hook: "0-3 seconds: Visual attention-grabber",
          story: "5-30 seconds: Story-driven content",
          value: "30-45 seconds: Key takeaways",
          cta: "45-60 seconds: Community engagement"
        },
        requirements: [
          "Visual storytelling elements throughout",
          "Instagram algorithm optimization",
          "Story potential for highlights",
          "Carousel slide potential",
          "Save-worthy content structure"
        ],
        hooks: [
          "✨ The {topic} transformation nobody talks about...",
          "🎯 What I wish I knew about {topic} before starting...",
          "📸 Behind the scenes of my {topic} journey...",
          "💫 The {topic} mistake that changed everything...",
          "🔥 Real talk about {topic}..."
        ],
        ctas: [
          "Save this for your {topic} journey! 📌",
          "What's your {topic} experience? Tell me below! 👇",
          "Share this with someone who needs to see it! 💕",
          "Follow for more {topic} content like this! ✨",
          "Try this and let me know how it goes! 🙌"
        ]
      },
      youtube: {
        structure: {
          hook: "0-15 seconds: Compelling introduction",
          promise: "15-30 seconds: Value promise",
          content: "30-300+ seconds: Educational deep-dive",
          cta: "Final 30 seconds: Subscribe and engagement"
        },
        requirements: [
          "SEO-friendly language throughout",
          "Searchable keywords integration",
          "Watch time optimization structure",
          "Thumbnail-worthy moments",
          "Series potential consideration"
        ],
        hooks: [
          "In this video, I'm revealing the {topic} strategy that...",
          "If you're struggling with {topic}, this will change everything...",
          "The {topic} method that got me [specific result]...",
          "Everything you think you know about {topic} is wrong...",
          "Today I'm breaking down the complete {topic} system..."
        ],
        ctas: [
          "Subscribe for more {topic} content like this!",
          "Let me know your {topic} questions in the comments!",
          "Hit that notification bell for weekly {topic} tips!",
          "What {topic} topic should I cover next?",
          "Share this with someone who needs {topic} help!"
        ]
      },
      linkedin: {
        structure: {
          hook: "0-5 seconds: Professional insight",
          credibility: "5-15 seconds: Expertise demonstration",
          value: "15-45 seconds: Business value delivery",
          cta: "45-60 seconds: Professional networking"
        },
        requirements: [
          "Professional tone throughout",
          "Industry credibility establishment",
          "Business value focus",
          "Career development angle",
          "Thought leadership positioning"
        ],
        hooks: [
          "After [X years] in {topic}, here's what I've learned...",
          "The {topic} strategy that transformed our business...",
          "Why most companies get {topic} completely wrong...",
          "The {topic} insight that changed my career...",
          "Industry leaders are using this {topic} approach..."
        ],
        ctas: [
          "What's your experience with {topic}? Share below.",
          "Connect with me for more {topic} insights.",
          "Repost if this resonates with your network.",
          "Follow for weekly {topic} industry updates.",
          "Book a call to discuss your {topic} strategy."
        ]
      },
      facebook: {
        structure: {
          hook: "0-3 seconds: Relatable opening",
          story: "5-60 seconds: Community-focused narrative",
          connection: "60-90 seconds: Shared experience",
          cta: "Final 15 seconds: Community discussion"
        },
        requirements: [
          "Community-focused approach",
          "Relatable storytelling",
          "Local connection potential",
          "Group discussion optimization",
          "Family-friendly content"
        ],
        hooks: [
          "Can we talk about {topic} for a second?",
          "My {topic} journey has been a rollercoaster...",
          "Fellow parents/professionals/community members...",
          "I never thought {topic} would impact me this way...",
          "Local community: let's discuss {topic}..."
        ],
        ctas: [
          "What's your {topic} story? Share in comments!",
          "Tag someone who needs to hear this!",
          "Join our community discussion about {topic}!",
          "Share if you've experienced this too!",
          "Let's support each other on this {topic} journey!"
        ]
      }
    };

    const config = platformConfigs[platform as keyof typeof platformConfigs] || platformConfigs.instagram;
    
    let prompt = `CREATE A ${platform.toUpperCase()} VIDEO SCRIPT ABOUT: ${topic}

TONE: ${tone} - Make it genuinely ${tone} throughout
GOAL: ${goal} - Optimize every element for ${goal}

SCRIPT STRUCTURE:
${Object.entries(config.structure).map(([section, timing]) => `📍 ${section.toUpperCase()}: ${timing}`).join('\n')}

PLATFORM REQUIREMENTS:
${config.requirements.map(req => `• ${req}`).join('\n')}

SAMPLE HOOKS (adapt one for your topic):
${config.hooks.map(hook => `• ${hook.replace('{topic}', topic)}`).join('\n')}

SAMPLE CTAs (adapt one for your goal):
${config.ctas.map(cta => `• ${cta.replace('{topic}', topic)}`).join('\n')}`;

    if (keyPoints) {
      prompt += `\n\nMANDATORY KEY POINTS TO INCLUDE:
${keyPoints}
CRITICAL: You MUST incorporate ALL these key points into your script naturally.`;
    }

    prompt += `\n\nTONE EXECUTION FOR ${tone.toUpperCase()}:`;
    
    if (tone === 'humorous') {
      prompt += `
• Use clever wordplay and unexpected twists
• Include relatable funny observations  
• Make people want to share for the humor
• Balance entertainment with your message`;
    } else if (tone === 'professional') {
      prompt += `
• Demonstrate expertise and credibility
• Use industry-appropriate language
• Focus on valuable insights and takeaways
• Maintain authoritative yet accessible tone`;
    } else if (tone === 'inspirational') {
      prompt += `
• Use motivating and empowering language
• Include transformation elements
• Focus on possibility and achievement
• Create emotional connection and action`;
    }

    prompt += `\n\nFINAL OUTPUT: Write only the complete ${platform} video script in the specified structure. Make it ${tone} and optimized for ${goal}. No explanations or meta-commentary.`;

    return prompt;
  }

  static getStructuredVideoScript(platform: string, topic: string, tone: string = 'casual', goal: string = 'engagement', keyPoints?: string): string {
    return this.getAdvancedVideoScriptPrompt(platform, topic, tone, goal, keyPoints);
  }
}
