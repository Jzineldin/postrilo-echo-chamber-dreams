
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
  MessageSquare,
  TrendingUp,
  Clock,
  Users
} from "lucide-react";

interface ExpandedPlatformExamplesProps {
  className?: string;
}

export const ExpandedPlatformExamples = ({ className = "" }: ExpandedPlatformExamplesProps) => {
  const platformExamples = [
    {
      platform: "Instagram",
      icon: Instagram,
      type: "Carousel Post",
      post: "🌟 5 Productivity Myths BUSTED! 🌟\n\nSwipe to see what's actually holding you back →\n\n1️⃣ \"Wake up at 5 AM\"\n❌ Wrong! Find YOUR optimal time\n\n2️⃣ \"Multitasking = More done\"\n❌ Wrong! Focus beats scattered effort\n\n3️⃣ \"Work harder, not smarter\"\n❌ Wrong! Strategy > effort\n\n4️⃣ \"Never take breaks\"\n❌ Wrong! Rest fuels performance\n\n5️⃣ \"Perfect is the goal\"\n❌ Wrong! Done beats perfect\n\n💡 Which myth surprised you most?\n\n#ProductivityTips #WorkSmart #MindsetShift #BusinessTips #EfficiencyHacks",
      color: "from-pink-500 to-purple-600",
      metrics: { likes: "1.2K", comments: "89", shares: "234", reach: "15.7K" },
      engagement: "8.4%"
    },
    {
      platform: "Twitter",
      icon: Twitter,
      type: "Thread",
      post: "The #1 productivity mistake I see entrepreneurs make:\n\nThey optimize their time instead of their energy.\n\nHere's why energy management beats time management every time: 🧵\n\n1/7",
      color: "from-blue-400 to-blue-600",
      metrics: { retweets: "445", likes: "1.8K", replies: "127", views: "28.3K" },
      engagement: "6.2%"
    },
    {
      platform: "LinkedIn",
      icon: Linkedin,
      type: "Professional Article",
      post: "I analyzed the daily routines of 500+ successful entrepreneurs.\n\nThe results will surprise you.\n\n❌ It's NOT about waking up early\n❌ It's NOT about working 80-hour weeks\n❌ It's NOT about perfect planning\n\n✅ It's about energy optimization.\n\nHere's the framework that 78% of top performers use:\n\n🧠 COGNITIVE PEAK HOURS\n→ Schedule deep work during mental prime time\n→ Most people: 9-11 AM and 2-4 PM\n→ Track YOUR patterns for 2 weeks\n\n⚡ ENERGY AUDIT\n→ What drains you? (meetings, emails, decisions)\n→ What energizes you? (creative work, planning)\n→ Batch similar tasks together\n\n🔄 RECOVERY RITUALS\n→ Micro-breaks every 90 minutes\n→ Physical movement between tasks\n→ Mindfulness practices\n\nResult: 2.3x more meaningful work completed.\n\nWhat's your biggest energy drain? Share below. 👇",
      color: "from-blue-600 to-blue-800",
      metrics: { reactions: "567", comments: "89", reposts: "234", views: "12.4K" },
      engagement: "7.1%"
    },
    {
      platform: "Facebook",
      icon: Facebook,
      type: "Community Post",
      post: "Hey productivity warriors! 👋\n\nI just finished a 30-day experiment that completely changed how I work.\n\nThe challenge: NO multitasking for an entire month.\n\nThe results? Mind-blowing! 🤯\n\n📈 40% increase in quality output\n⏰ 25% less time spent on tasks\n😌 90% reduction in work stress\n🧠 Better focus and creativity\n\nHere's what I learned:\n\n1. Single-tasking is a superpower\n2. Context switching kills productivity\n3. Deep work beats busy work\n4. Quality > Quantity always wins\n\nWho's ready to join me for a single-tasking challenge? Drop a 🙋‍♀️ or 🙋‍♂️ if you're in!\n\nI'll share my complete system in the comments below! 👇\n\n#ProductivityChallenge #SingleTasking #WorkSmart #ProductivityTips",
      color: "from-blue-500 to-indigo-600",
      metrics: { reactions: "234", comments: "67", shares: "89", reach: "8.9K" },
      engagement: "4.3%"
    },
    {
      platform: "YouTube",
      icon: Youtube,
      type: "Video Description",
      post: "🎯 The Productivity System That Changed Everything | Complete Guide\n\nIn this video, I'm breaking down the exact 3-step productivity system that helped me:\n→ Save 15+ hours per week\n→ 3x my output quality\n→ Eliminate decision fatigue\n→ Build sustainable work habits\n\n⏰ TIMESTAMPS:\n00:00 - Why most productivity advice fails\n02:15 - The Energy Management Framework\n05:30 - Step 1: Cognitive Load Mapping\n08:45 - Step 2: Peak Performance Scheduling\n12:20 - Step 3: Recovery & Renewal Systems\n16:10 - Real-world implementation guide\n19:30 - Common mistakes to avoid\n22:15 - Results you can expect\n\n📝 FREE RESOURCES:\n→ Download the complete workbook (link in description)\n→ Energy audit spreadsheet template\n→ Weekly planning template\n\n💡 MENTIONED IN THIS VIDEO:\n→ Peak performance research by Dr. Anders Ericsson\n→ Ultradian rhythms and work cycles\n→ The myth of work-life balance\n\n🔔 Subscribe for more productivity deep-dives every Tuesday!\n\n#Productivity #TimeManagement #WorkSmart #Entrepreneur #BusinessTips",
      color: "from-red-500 to-red-600",
      metrics: { views: "45.7K", likes: "2.1K", comments: "189", subscribers: "+847" },
      engagement: "5.8%"
    },
    {
      platform: "TikTok",
      icon: MessageSquare,
      type: "Short Video",
      post: "POV: You discover the productivity hack that actually works ✨\n\n*Shows person struggling with endless to-do list*\n\n\"Just do this instead\" 👇\n\n🧠 Map your energy, not your time\n⚡ Work WITH your natural rhythms\n🔄 Batch similar tasks together\n\nResult: 2x the output in half the time\n\nTry it for one week and thank me later 😉\n\n#ProductivityHack #WorkSmart #TimeManagement #LifeHacks #ProductivityTips #WorkLife #Entrepreneur #StudyTips #Efficiency",
      color: "from-purple-400 to-pink-500",
      metrics: { views: "127K", likes: "8.9K", comments: "456", shares: "1.2K" },
      engagement: "8.2%"
    }
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">
          See AI content across all platforms
        </h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Same topic, optimized for each platform's unique audience and format
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {platformExamples.map((example, index) => {
          const Icon = example.icon;
          return (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 hover:bg-white/95 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${example.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-heading">{example.platform}</CardTitle>
                      <p className="text-sm text-gray-500">{example.type}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    {example.engagement} engagement
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-mono">
                    {example.post}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                  {Object.entries(example.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm font-bold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
