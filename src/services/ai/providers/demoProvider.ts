
export interface DemoRequest {
  prompt: string;
  platform?: string;
  contentType?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface DemoResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export class DemoProvider {
  async generateContent(request: DemoRequest): Promise<DemoResponse> {
    console.log('Using enhanced demo mode for content generation');
    
    // Simulate realistic AI delay based on content complexity
    const delay = request.platform === 'youtube' ? 4000 : 2000 + Math.random() * 3000;
    await new Promise(resolve => setTimeout(resolve, delay));

    const content = this.generatePlatformSpecificContent(request);

    const response = {
      content,
      usage: {
        promptTokens: Math.floor(request.prompt.length / 4),
        completionTokens: Math.floor(content.length / 4),
        totalTokens: 0
      }
    };
    response.usage.totalTokens = response.usage.promptTokens + response.usage.completionTokens;

    return response;
  }

  private generatePlatformSpecificContent(request: DemoRequest): string {
    const { prompt, platform, contentType } = request;
    const lowerPrompt = prompt.toLowerCase();

    // Platform-specific generation
    if (platform) {
      return this.generateForPlatform(platform, prompt, contentType);
    }

    // Legacy topic-based generation
    if (lowerPrompt.includes('nocco') && lowerPrompt.includes('energy drink')) {
      return this.generateNoccoContent(prompt);
    } else if (lowerPrompt.includes('brand story')) {
      return this.generateBrandStoryContent(prompt);
    } else if (lowerPrompt.includes('video script')) {
      return this.generateVideoScriptContent(prompt);
    } else {
      return this.generateGenericContent(prompt);
    }
  }

  private generateForPlatform(platform: string, topic: string, contentType?: string): string {
    switch (platform) {
      case 'instagram':
        return this.generateInstagramContent(topic, contentType);
      case 'twitter':
        return this.generateTwitterContent(topic, contentType);
      case 'linkedin':
        return this.generateLinkedInContent(topic, contentType);
      case 'tiktok':
        return this.generateTikTokContent(topic, contentType);
      case 'youtube':
        return this.generateYouTubeContent(topic, contentType);
      case 'facebook':
        return this.generateFacebookContent(topic, contentType);
      default:
        return this.generateGenericContent(topic);
    }
  }

  private generateInstagramContent(topic: string, contentType?: string): string {
    if (contentType === 'product-launch') {
      return `🚀 LAUNCH ALERT: The game-changer you've been waiting for!

✨ Introducing ${topic} - where innovation meets simplicity

What makes this different?
→ Cuts your workflow time by 70%
→ Learns and adapts to your style
→ Seamless integration with your existing tools
→ Results you can see from day one

The future isn't coming... it's here! 🌟

Ready to transform how you work? Link in bio for early access!

#Innovation #ProductLaunch #GameChanger #TechNews #Productivity #AI #FutureOfWork #Startup #NewProduct #DigitalTransformation`;
    }

    return `✨ The ${topic} revolution is here and it's incredible!

Here's what's changing the game:
• Smart automation that actually works
• Personalized insights that matter
• Community-driven innovation
• Results that speak for themselves

The best part? It gets better the more you use it 🚀

What's your experience with ${topic}? Drop a comment below! 👇

#Innovation #Technology #Productivity #AI #DigitalTransformation #TechTrends #FutureOfWork #Automation #Smart`;
  }

  private generateTwitterContent(topic: string, contentType?: string): string {
    if (contentType === 'product-launch') {
      return `🚀 BREAKING: ${topic} just changed everything

The features everyone's talking about:
• 10x faster workflows ⚡
• AI-powered insights 🧠
• Zero learning curve 📈
• Enterprise-grade security 🔒

Early access starts today 👇

This is the productivity revolution we've been waiting for.

#ProductLaunch #Innovation #TechNews #AI #Productivity`;
    }

    return `The ${topic} landscape is evolving fast 🚀

Key trends I'm seeing:
• Automation becoming mainstream
• AI integration everywhere
• User experience taking center stage
• Community-driven development

What trends are you noticing? Let's discuss 👇

#TechTrends #Innovation #DigitalTransformation #AI`;
  }

  private generateLinkedInContent(topic: string, contentType?: string): string {
    if (contentType === 'educational') {
      return `The ${topic} Revolution: What Every Professional Needs to Know

After analyzing market trends and speaking with industry leaders, three critical shifts are reshaping our industry:

🎯 Automation is Democratizing Expertise
Tasks that once required specialized knowledge are becoming accessible to everyone. This isn't about replacing humans—it's about amplifying human capabilities.

📊 Data-Driven Decision Making is Becoming Standard
Organizations using AI-powered insights report 40% faster decision-making and 35% better outcomes.

🤝 Collaboration Models are Evolving
Remote-first companies are outperforming traditional models by leveraging digital-native workflows.

The professionals thriving in this new landscape share one trait: they embrace change as opportunity.

Key takeaway: The question isn't whether AI will transform your industry—it's whether you'll lead that transformation or follow it.

What trends are you seeing in your field? I'd love to hear your perspective.

#ProfessionalDevelopment #Innovation #Leadership #DigitalTransformation #FutureOfWork #${topic.replace(/\s+/g, '')}`;
    }

    return `Why ${topic} is the Most Important Skill for 2024

The landscape is changing faster than ever. Here's what I've learned from working with top-performing teams:

→ Traditional approaches are becoming obsolete
→ Adaptability beats expertise in rapidly changing fields  
→ Cross-functional collaboration drives innovation
→ Continuous learning is now a competitive advantage

Companies investing in ${topic} see 3x better performance metrics.

The question isn't whether to adapt—it's how quickly you can transform your approach.

What's your experience with implementing new methodologies? Share your insights below.

#Leadership #Innovation #ProfessionalGrowth #BusinessStrategy #${topic.replace(/\s+/g, '')}`;
  }

  private generateTikTokContent(topic: string, contentType?: string): string {
    if (contentType === 'behind-scenes') {
      return `POV: You're building the future of ${topic} 🔥

Behind the scenes of creating something that will change everything:

Day 1: Had a crazy idea 💡
Day 30: Built the first prototype 🛠️
Day 60: Got our first beta users ✨
Day 90: Mind = blown by the results 🤯

The best part? We're just getting started 🚀

What would you build if you had unlimited resources?

Drop your wildest ideas below! 👇

#BehindTheScenes #Innovation #Startup #TechTok #BuildInPublic #Entrepreneur #DreamBig #Innovation #FutureOfWork #AI`;
    }

    return `This ${topic} hack will blow your mind 🤯

Wait for it... 

✨ The secret nobody talks about:
• Start before you're ready
• Fail fast and learn faster  
• Focus on progress not perfection
• Celebrate small wins

Plot twist: Every expert started as a beginner 😮‍💨

Who else needed to hear this today?

Tag someone who's overthinking it! 

#MotivationMonday #TechTips #ProductivityHack #MindsetShift #GrowthMindset #Innovation #Success #Inspiration`;
  }

  private generateYouTubeContent(topic: string, contentType?: string): string {
    return `🎬 I Spent 30 Days Mastering ${topic} - Here Are the Results

After diving deep into ${topic} for an entire month, the results completely transformed my perspective on what's possible.

📊 The Numbers:
• 300% improvement in efficiency
• 85% reduction in manual work
• $15,000+ in time savings
• Countless "aha!" moments

🔍 What I Discovered:
The biggest revelation wasn't the tool itself, but how it fundamentally changed my approach to problem-solving.

⚡ Key Breakthroughs:
1. The 80/20 rule applies more than ever
2. Automation amplifies good processes (and bad ones)
3. The learning curve is steeper than expected but worth it
4. Community knowledge accelerates everything

💡 Surprising Insights:
${topic} doesn't replace human creativity—it amplifies it by removing repetitive tasks and freeing mental bandwidth for strategic thinking.

🎯 Who This Is Perfect For:
- Entrepreneurs looking to scale
- Teams wanting to work smarter
- Anyone drowning in repetitive tasks
- People curious about the future of work

📈 ROI Breakdown:
Initial learning investment: 20 hours
Monthly time saved: 60+ hours  
Cost vs traditional solutions: 75% less
Satisfaction level: Through the roof

🔧 Tools & Resources (links in description):
- Starter templates I created
- Training materials that actually work
- Community groups worth joining
- Mistakes to avoid at all costs

Ready to transform your workflow? Everything you need to get started is in the description!

⏰ Timestamps:
00:00 - Introduction & 30-Day Challenge
02:30 - Week 1: Setup & First Impressions
05:45 - Week 2: Major Breakthroughs  
09:20 - Week 3: Advanced Techniques
12:10 - Week 4: Optimization & Results
15:30 - Cost-Benefit Analysis
17:45 - Who Should (and Shouldn't) Try This
19:20 - Resources & Next Steps
21:00 - Final Thoughts & Challenge

💬 What's your experience with ${topic}? Drop a comment with your biggest challenge or success story!

🔔 Subscribe for more deep-dives into productivity tools and techniques that actually work!

#${topic.replace(/\s+/g, '')} #ProductivityTips #ToolReview #WorkSmarter #TechReview #Automation #Innovation #DigitalTransformation`;
  }

  private generateFacebookContent(topic: string, contentType?: string): string {
    return `Hey friends! 👋

I wanted to share something amazing that's been changing how I approach ${topic}...

You know that feeling when you discover something that completely shifts your perspective? That's exactly what happened to me recently.

Here's the thing: we often make ${topic} way more complicated than it needs to be. But what if I told you there's a simpler way that actually gets better results?

🔑 The game-changer? 
Starting small and building momentum. Just one tiny improvement each day.

I've been testing this approach for the past month, and the results have been incredible:
✅ 50% less time on repetitive tasks
✅ Way better results with less stress
✅ Actually enjoying the process again!

The best part? Anyone can do this, regardless of experience level.

💭 What's one small change you could make today related to ${topic}?

I love hearing your stories and learning from this amazing community! Drop a comment below and let's help each other succeed. 🤗

#${topic.replace(/\s+/g, '')} #CommunityLove #PersonalGrowth #SimplifyYourLife #SmallStepsBigResults`;
  }

  // Legacy methods for backward compatibility
  private generateNoccoContent(prompt: string): string {
    const platform = this.extractPlatform(prompt);
    
    if (platform === 'tiktok') {
      return `POV: You found the energy drink that doesn't make you crash 😮‍💨

Guys... NOCCO just dropped and I'm OBSESSED ✨

🔥 Zero sugar (but tastes like candy)
🔥 BCAA for actual muscle recovery
🔥 Energy that lasts ALL DAY
🔥 No jittery feeling

The strawberry flavor is literally heaven in a can 🍓

Who else is trying this?? Drop a 🚀 if you're ready to ditch your old energy drink!

#NOCCO #EnergyDrink #NewObsession #ZeroSugar #FitnessCheck #EnergyBoost #TikTokFinds #MustTry #CleanEnergy #GameChanger`;
    }

    return `Introducing NOCCO - The next generation energy drink that's about to change your entire routine.

What makes NOCCO different? Everything.

While other energy drinks leave you crashing, NOCCO delivers clean, sustained energy with zero sugar and added BCAAs for recovery.

This isn't just another energy drink - it's a complete performance upgrade.

Ready to experience the difference?

#NOCCO #EnergyDrink #ZeroSugar #Performance #CleanEnergy #NewLaunch`;
  }

  private generateBrandStoryContent(prompt: string): string {
    const companyMatch = prompt.match(/about ([^.]+)\./);
    const companyName = companyMatch ? companyMatch[1] : 'our company';
    
    return `🌟 The ${companyName} Story

Every innovation starts with a problem that won't let you sleep.

For us, it was watching talented people struggle with outdated solutions while better alternatives remained just out of reach.

So we built something different. Not just another product, but a complete reimagining of what's possible.

Today, ${companyName} isn't just solving problems - we're preventing them. We're not just building software - we're crafting experiences that make people's lives genuinely better.

From our first prototype to serving thousands of customers, one thing has never changed: our obsession with getting the details right.

Ready to see what happens when passion meets purpose?

#Innovation #StartupStory #PurposeDriven #CustomerFirst #TechForGood #Entrepreneurship #BuildingTheFuture`;
  }

  private generateVideoScriptContent(prompt: string): string {
    return `Hook: "I spent $500 testing every energy drink so you don't have to - here's what I found"

Main Content: "Most energy drinks are basically sugar water with caffeine. But then I discovered NOCCO. Zero sugar, packed with BCAAs for recovery, and sustained energy without the crash. The raspberry flavor literally tastes like a sports drink but with none of the guilt. I've been drinking this for 3 months and my workout performance is noticeably better."

Call to Action: "Comment 'ENERGY' if you want me to do a full ingredient breakdown! And if you try NOCCO, tag me - I want to see your reaction!"`;
  }

  private generateGenericContent(prompt: string): string {
    return `Creating content that truly connects starts with understanding your audience's deepest needs.

Here's what most brands get wrong: they talk about features instead of transformations.

Your audience doesn't care about what you do - they care about who they become after working with you.

The secret? Stop selling products. Start selling better versions of your customers.

What transformation are you really offering?

#ContentStrategy #MarketingTips #BrandBuilding #CustomerFirst #ValueDriven #DigitalMarketing #GrowthHacking`;
  }

  private extractPlatform(prompt: string): string {
    if (prompt.includes('tiktok')) return 'tiktok';
    if (prompt.includes('instagram')) return 'instagram';
    if (prompt.includes('linkedin')) return 'linkedin';
    if (prompt.includes('twitter')) return 'twitter';
    if (prompt.includes('facebook')) return 'facebook';
    return 'general';
  }
}
