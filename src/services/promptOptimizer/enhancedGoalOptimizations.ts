
export const advancedGoalOptimizations = {
  "brand-awareness": {
    focus: "brand visibility, recognition, and memorable messaging that builds lasting brand equity",
    elements: "unique value proposition, brand personality showcase, memorable hooks, consistent voice",
    ctaStrategy: "brand recall and recognition-focused calls to action that reinforce brand identity",
    contentApproach: "showcase brand values and personality consistently while creating shareable moments",
    keyMetrics: ["brand mention increase", "share rate", "brand recall", "voice consistency"],
    strategies: {
      storytelling: "Use brand origin stories, behind-the-scenes content, and values-driven narratives",
      consistency: "Maintain consistent brand voice, visual identity, and messaging across all content",
      memorability: "Create memorable taglines, catchphrases, or unique brand elements",
      shareability: "Design content that people want to share because it represents the brand well"
    },
    platformOptimizations: {
      twitter: "Create quotable brand moments and consistent brand voice in threads",
      instagram: "Showcase brand aesthetics and behind-the-scenes brand stories",
      linkedin: "Establish thought leadership and professional brand authority",
      facebook: "Build community around brand values and shared experiences",
      tiktok: "Create branded challenges and memorable brand moments",
      youtube: "Develop brand series and consistent channel identity"
    }
  },
  "engagement": {
    focus: "audience interaction, community building, and conversation generation that creates lasting connections",
    elements: "interactive questions, polls, discussion starters, shareable moments, community challenges",
    ctaStrategy: "direct engagement prompts that encourage meaningful participation",
    contentApproach: "create content that demands audience participation and builds community",
    keyMetrics: ["comment rate", "share rate", "save rate", "community growth"],
    strategies: {
      questioning: "Ask thought-provoking questions that generate meaningful discussions",
      interactive: "Use polls, quizzes, challenges, and user-generated content campaigns",
      controversial: "Share respectful controversial takes that spark healthy debate",
      community: "Create exclusive community content and insider experiences"
    },
    platformOptimizations: {
      twitter: "Use polls, ask questions, create debate-worthy content and thread discussions",
      instagram: "Stories polls, question stickers, comment-driving captions, save-worthy content",
      linkedin: "Professional discussions, industry insights, and networking opportunities",
      facebook: "Group discussions, community polls, and shareable family/community content",
      tiktok: "Duet-worthy content, challenges, reaction videos, and trending participation",
      youtube: "Comment questions, community posts, live streams, and series engagement"
    }
  },
  "lead-generation": {
    focus: "capturing potential customers and building qualified prospect lists through value-first approaches",
    elements: "value propositions, lead magnets, clear benefits, trust building, social proof",
    ctaStrategy: "conversion-focused with clear, valuable next steps that provide immediate value",
    contentApproach: "provide substantial value first, then guide naturally to conversion opportunities",
    keyMetrics: ["conversion rate", "lead quality", "email signups", "consultation bookings"],
    strategies: {
      valueFirst: "Provide 80% value, 20% pitch with genuine helpful content",
      leadMagnets: "Offer valuable resources, guides, templates, or exclusive content",
      trustBuilding: "Share testimonials, case studies, and social proof elements",
      nurturing: "Create content series that gradually build trust and demonstrate expertise"
    },
    platformOptimizations: {
      twitter: "Share valuable insights with link to detailed resources",
      instagram: "Educational carousels with bio link to lead magnets",
      linkedin: "Professional insights with connection to business resources",
      facebook: "Community value with group join or resource access",
      tiktok: "Quick tips with bio link to comprehensive guides",
      youtube: "Educational content with description links to resources"
    }
  },
  "promotion": {
    focus: "product/service promotion with authentic sales conversion that doesn't feel pushy",
    elements: "features and benefits balance, social proof, urgency elements, value demonstration",
    ctaStrategy: "direct but value-focused sales calls that emphasize customer benefits",
    contentApproach: "balance promotional content with authentic value and social proof",
    keyMetrics: ["conversion rate", "click-through rate", "sales attribution", "ROI"],
    strategies: {
      benefitFocused: "Emphasize customer outcomes and transformations over features",
      socialProof: "Include customer testimonials, reviews, and success stories",
      urgency: "Create appropriate urgency through limited-time offers or scarcity",
      demonstration: "Show the product/service in action with real results"
    },
    platformOptimizations: {
      twitter: "Quick benefit statements with clear links to sales pages",
      instagram: "Visual product showcases with shopping tags and story links",
      linkedin: "Professional service promotion with business case studies",
      facebook: "Community-focused product sharing with group discussions",
      tiktok: "Product demonstrations and before/after transformations",
      youtube: "Detailed product reviews and tutorial-style promotions"
    }
  },
  "education": {
    focus: "teaching and knowledge sharing that positions you as a trusted expert and thought leader",
    elements: "step-by-step guidance, actionable insights, real examples, skill development",
    ctaStrategy: "learning-focused calls that encourage skill development and knowledge application",
    contentApproach: "break down complex concepts into digestible, actionable insights",
    keyMetrics: ["time spent", "save rate", "share rate", "follow rate"],
    strategies: {
      structured: "Use clear frameworks, numbered steps, and logical progressions",
      actionable: "Provide specific, implementable advice that readers can use immediately",
      examples: "Include real-world examples, case studies, and practical applications",
      progression: "Create learning pathways that build from basic to advanced concepts"
    },
    platformOptimizations: {
      twitter: "Thread-based tutorials and quick tip series",
      instagram: "Carousel tutorials and educational story highlights",
      linkedin: "Professional skill development and industry education",
      facebook: "Community learning and group educational discussions",
      tiktok: "Quick learning moments and educational trends",
      youtube: "Comprehensive tutorials and educational series"
    }
  },
  "entertainment": {
    focus: "audience entertainment that builds positive brand association and increases reach",
    elements: "humor, storytelling, surprise elements, relatable content, trending topics",
    ctaStrategy: "entertainment-focused calls that encourage sharing and enjoyment",
    contentApproach: "balance entertainment value with subtle brand messaging",
    keyMetrics: ["share rate", "reach", "engagement rate", "positive sentiment"],
    strategies: {
      humor: "Use appropriate humor that aligns with brand personality",
      storytelling: "Create engaging narratives that captivate audiences",
      trending: "Participate in trending topics and viral moments appropriately",
      relatable: "Share content that audiences see themselves in"
    },
    platformOptimizations: {
      twitter: "Witty observations and humorous takes on trending topics",
      instagram: "Entertaining stories and fun behind-the-scenes content",
      linkedin: "Professional humor and entertaining industry insights",
      facebook: "Community entertainment and shareable fun content",
      tiktok: "Trend participation and entertaining challenges",
      youtube: "Entertainment series and engaging personality-driven content"
    }
  }
};

export const getGoalOptimization = (goal: string) => {
  return advancedGoalOptimizations[goal as keyof typeof advancedGoalOptimizations] || advancedGoalOptimizations["engagement"];
};

export const getGoalStrategiesForPlatform = (goal: string, platform: string) => {
  const optimization = getGoalOptimization(goal);
  return optimization.platformOptimizations[platform as keyof typeof optimization.platformOptimizations] || optimization.strategies;
};
