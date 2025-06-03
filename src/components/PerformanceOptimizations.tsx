
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, TrendingUp, Users, BarChart3 } from "lucide-react";

export const OptimizedInteractiveFeedback = () => {
  const [metrics, setMetrics] = useState({
    likes: 847,
    comments: 23,
    shares: 156,
    engagement: 4.2
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setMetrics(prev => ({
        likes: prev.likes + Math.floor(Math.random() * 3),
        comments: prev.comments + (Math.random() > 0.7 ? 1 : 0),
        shares: prev.shares + (Math.random() > 0.8 ? 1 : 0),
        engagement: Number((prev.engagement + (Math.random() - 0.5) * 0.1).toFixed(1))
      }));
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statsData = [
    {
      icon: Heart,
      label: "Avg. Likes",
      value: metrics.likes,
      change: "+15%",
      color: "text-red-500"
    },
    {
      icon: MessageCircle,
      label: "Comments",
      value: metrics.comments,
      change: "+8%",
      color: "text-blue-500"
    },
    {
      icon: Share2,
      label: "Shares",
      value: metrics.shares,
      change: "+22%",
      color: "text-green-500"
    },
    {
      icon: TrendingUp,
      label: "Engagement Rate",
      value: `${metrics.engagement}%`,
      change: "+16%",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${stat.color}`} />
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                <p className={`text-lg font-bold text-gray-900 ${isAnimating ? 'animate-pulse' : ''}`}>
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export const OptimizedPlatformExamples = () => {
  const platforms = [
    {
      name: "Instagram",
      type: "Carousel Post",
      engagement: "8.4%",
      color: "from-pink-500 to-purple-600",
      icon: "📷",
      content: "✗ wrong! strategy > effort.\n\n📱 'never take breaks'\n✗ wrong! Rest fuels performance\n\n📱 'Perfect is the goal'\n✗ wrong! Done beats perfect\n\n📱 think with surprised you next",
      metrics: { likes: "1.2K", comments: "89", shares: "234", reach: "15.7K" }
    },
    {
      name: "Twitter",
      type: "Thread",
      engagement: "6.2%",
      color: "from-blue-400 to-blue-600",
      icon: "🐦",
      content: "The #1 productivity mistake I see entrepreneurs make:\n\nThey optimize their time instead of their energy.\n\nHere's why energy management beats time management every time: 🧵\n\n1/7",
      metrics: { retweets: "445", likes: "1.8K", replies: "127", views: "28.3K" }
    },
    {
      name: "LinkedIn",
      type: "Professional Article",
      engagement: "7.1%",
      color: "from-blue-600 to-blue-800",
      icon: "💼",
      content: "I analyzed the daily routines of 500+ successful entrepreneurs.\n\nThe results will surprise you.\n\n✗ It's NOT about waking up early\n✗ It's NOT about working 80-hour weeks\n✗ It's NOT about perfect planning",
      metrics: { reactions: "567", comments: "89", reposts: "234", views: "12.4K" }
    },
    {
      name: "Facebook",
      type: "Community Post",
      engagement: "4.3%",
      color: "from-blue-500 to-blue-700",
      icon: "📘",
      content: "Hey productivity warriors! 😊\n\nI just finished a 30-day experiment that completely changed how I work.\n\nThe challenge: NO multitasking for an entire month.\n\nThe results? Mind-blowing! 🤯",
      metrics: { reactions: "234", comments: "67", shares: "89", reach: "8.9K" }
    },
    {
      name: "YouTube",
      type: "Video Description",
      engagement: "5.8%",
      color: "from-red-500 to-red-600",
      icon: "🎥",
      content: "🔥 The Productivity System That Changed Everything | Complete Guide\n\nIn this video, I'm breaking down the exact 3-step productivity system that helped me:\n→ Save 15+ hours per week\n→ 3x my output quality\n→ Eliminate decision fatigue",
      metrics: { views: "45.7K", likes: "2.1K", comments: "189", subscribers: "+847" }
    },
    {
      name: "TikTok",
      type: "Short Video",
      engagement: "8.2%",
      color: "from-pink-400 to-pink-600",
      icon: "🎵",
      content: "POV: You discover the productivity hack that actually works 👀\n\n*Shows person struggling with endless to-do list*\n\n'Just do this instead' 😌\n\n🧠 Map your energy, not your time",
      metrics: { views: "127K", likes: "8.9K", comments: "456", shares: "1.2K" }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-gray-900 leading-tight">
          See AI content across all platforms
        </h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-body">
          Same topic, optimized for each platform's unique audience and format
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {platforms.map((platform, index) => (
          <Card key={index} className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center text-white text-sm`}>
                    {platform.icon}
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold text-gray-900">
                      {platform.name}
                    </CardTitle>
                    <p className="text-xs text-gray-600">{platform.type}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                  {platform.engagement} engagement
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-3 min-h-[120px]">
                <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                  {platform.content}
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {Object.entries(platform.metrics).map(([key, value], idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-xs font-semibold text-gray-900">{value}</p>
                    <p className="text-xs text-gray-600 capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
