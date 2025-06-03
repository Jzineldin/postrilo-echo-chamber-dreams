
import { Instagram, Twitter, Linkedin, Music, Youtube, Facebook, Zap, Target, Users, Sparkles } from "lucide-react";

export const platforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600', audience: '2B+' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-600', audience: '450M+' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-800', audience: '900M+' },
  { id: 'tiktok', name: 'TikTok', icon: Music, color: 'from-black to-pink-600', audience: '1B+' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-600', audience: '2.7B+' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-500 to-blue-700', audience: '2.9B+' }
];

export const contentTypes = [
  { id: 'product-launch', name: 'Product Launch', description: 'Announce new products or features', icon: Zap },
  { id: 'educational', name: 'Educational Content', description: 'Share knowledge and insights', icon: Target },
  { id: 'behind-scenes', name: 'Behind the Scenes', description: 'Show your process and culture', icon: Users },
  { id: 'industry-insights', name: 'Industry Insights', description: 'Share trends and analysis', icon: Sparkles }
];

export const topics = [
  'AI productivity tools',
  'Sustainable business practices',
  'Remote work strategies',
  'Digital marketing trends',
  'Customer success stories'
];

export const demoSteps = [
  {
    title: "Choose Your Platform",
    description: "Select where you want to publish your content",
    component: "platform-selector"
  },
  {
    title: "Pick Content Type",
    description: "Choose the type of content you want to create",
    component: "template-selector"
  },
  {
    title: "Add Your Topic",
    description: "Tell us what you want to create content about",
    component: "topic-input"
  },
  {
    title: "AI Generation",
    description: "Watch our AI create platform-optimized content",
    component: "generation"
  },
  {
    title: "Your Content",
    description: "See the final result with hashtags and optimization",
    component: "result"
  }
];

export const demoContent = {
  instagram: `🚀 The future of productivity is here! 

Meet the AI tool that's transforming how teams work. From automating repetitive tasks to generating personalized strategies, artificial intelligence is becoming every professional's secret weapon.

✨ What makes this different:
• Saves 10+ hours per week
• Boosts creativity with AI insights  
• Scales your workflow effortlessly
• Maintains consistent quality

The best part? It learns your style and gets better over time.

Ready to revolutionize your workflow? Link in bio! 🌟

#ProductivityHacks #AITools #WorkSmarter #ContentCreation #Innovation #DigitalTransformation #TechTrends #Automation #FutureOfWork #TeamProductivity`,
  
  twitter: `🚀 The productivity revolution is here!

This AI tool is changing everything:
• 10+ hours saved weekly ⏰
• Enhanced creativity 🎨
• Effortless scaling 📈
• Consistent quality ✅

The future of work isn't just remote—it's AI-powered.

Ready to 10x your productivity? 

#ProductivityHacks #AITools #WorkSmarter #Innovation`,

  linkedin: `The Future of Work: How AI is Revolutionizing Team Productivity

As we navigate an increasingly digital workplace, artificial intelligence has emerged as a game-changer for professionals across all industries. 

🎯 Key transformations I'm seeing:

→ Task Automation: Repetitive work is becoming obsolete, freeing teams for strategic thinking
→ Creative Enhancement: AI amplifies human creativity rather than replacing it
→ Personalized Workflows: Custom solutions adapt to unique team dynamics
→ Quality Consistency: Maintaining high standards at scale without burnout

The data speaks for itself: teams using AI-powered productivity tools report 40% faster project completion and 65% reduction in manual tasks.

The most successful organizations aren't those who fear AI, but those who embrace it as a collaborative multiplier.

What's your experience with AI in your workflow? I'd love to hear your thoughts in the comments.

#FutureOfWork #ArtificialIntelligence #Productivity #Innovation #DigitalTransformation #Leadership #TeamManagement`,

  tiktok: `POV: You found the productivity hack that changes everything 🤯

This AI tool just saved me 15 hours this week ⏰

✨ What it does:
• Writes emails in seconds
• Creates content automatically  
• Schedules everything perfectly
• Never forgets a deadline

The best part? It learns YOUR style 🔥

Who else is ready to work smarter not harder?

Drop a 🚀 if you're trying this!

#ProductivityHack #AITools #WorkSmarter #TechTok #ProductivityTips #LifeHack #WorkLife #Automation #TechReview #FYP`,

  youtube: `🎬 I Tested AI Productivity Tools for 30 Days - Here's What Happened

After using cutting-edge AI productivity tools for an entire month, the results completely blew my mind.

📊 The Numbers:
• 47% reduction in time spent on repetitive tasks
• 300% increase in content output
• 85% improvement in work-life balance
• $12,000+ saved in potential hiring costs

🔍 What I Discovered:
The biggest game-changer wasn't just the time saved, but how AI helped me focus on high-impact creative work instead of getting bogged down in administrative tasks.

⚡ Top Features That Actually Work:
1. Smart email drafting that sounds exactly like me
2. Automated content calendar planning
3. Real-time productivity analytics
4. Intelligent task prioritization

💡 The Surprising Truth:
AI doesn't replace human creativity—it amplifies it. I found myself coming up with better ideas because I had more mental space to think strategically.

🎯 Who Should Use This:
Perfect for entrepreneurs, content creators, small business owners, and anyone juggling multiple projects.

📈 ROI Breakdown:
Initial setup: 2 hours
Monthly time saved: 40+ hours
Cost vs. hiring assistant: 90% savings

Ready to transform your productivity? Links and discount codes in the description!

⏰ Timestamps:
00:00 - Introduction & Challenge Setup
02:15 - Week 1: Initial Setup & Learning Curve  
05:30 - Week 2: First Major Breakthroughs
08:45 - Week 3: Advanced Features & Workflows
11:20 - Week 4: Final Results & Analysis
14:10 - Cost-Benefit Analysis
16:30 - Who Should (and Shouldn't) Use This
18:00 - Final Verdict & Recommendations

#ProductivityTools #AIWorkflow #BusinessAutomation #TimeManagement #EntrepreneurLife #WorkSmarter #TechReview`
};
