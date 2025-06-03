
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Zap, Heart, Brain, Trophy, Target, Sparkles, TrendingUp } from "lucide-react";

interface StylePreset {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  tone: string;
  goal: string;
  emojiUsage: boolean;
  hashtagDensity: string;
  contentLength: string;
  color: string;
  examples: string[];
  metrics: string;
}

interface EnhancedContentStylePresetsProps {
  onPresetSelect: (preset: StylePreset) => void;
}

export const EnhancedContentStylePresets = ({ onPresetSelect }: EnhancedContentStylePresetsProps) => {
  const presets: StylePreset[] = [
    {
      id: 'viral-growth',
      name: 'Viral Growth',
      description: 'Optimized for maximum reach and engagement',
      icon: Zap,
      tone: 'humorous',
      goal: 'engagement',
      emojiUsage: true,
      hashtagDensity: '8-12',
      contentLength: 'short',
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      examples: ['Question hooks', 'Controversial takes', 'Trend jacking'],
      metrics: '3x more shares on average'
    },
    {
      id: 'professional-authority',
      name: 'Professional Authority',
      description: 'Builds credibility and thought leadership',
      icon: Trophy,
      tone: 'professional',
      goal: 'brand-awareness',
      emojiUsage: false,
      hashtagDensity: '3-5',
      contentLength: 'long',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      examples: ['Industry insights', 'Data-driven posts', 'Expert opinions'],
      metrics: '40% more B2B leads'
    },
    {
      id: 'community-builder',
      name: 'Community Builder',
      description: 'Fosters connections and discussions',
      icon: Heart,
      tone: 'casual',
      goal: 'engagement',
      emojiUsage: true,
      hashtagDensity: '5-8',
      contentLength: 'medium',
      color: 'bg-pink-100 text-pink-700 border-pink-200',
      examples: ['User-generated content', 'Behind the scenes', 'Community spotlights'],
      metrics: '2x more comments'
    },
    {
      id: 'educational-expert',
      name: 'Educational Expert',
      description: 'Teaches and provides valuable insights',
      icon: Brain,
      tone: 'educational',
      goal: 'engagement',
      emojiUsage: false,
      hashtagDensity: '3-5',
      contentLength: 'long',
      color: 'bg-green-100 text-green-700 border-green-200',
      examples: ['How-to guides', 'Tips & tricks', 'Industry education'],
      metrics: '60% higher saves'
    },
    {
      id: 'brand-storyteller',
      name: 'Brand Storyteller',
      description: 'Creates compelling brand narratives',
      icon: Palette,
      tone: 'inspirational',
      goal: 'brand-awareness',
      emojiUsage: true,
      hashtagDensity: '5-8',
      contentLength: 'medium',
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      examples: ['Brand story', 'Customer journeys', 'Mission-driven content'],
      metrics: '50% better brand recall'
    },
    {
      id: 'conversion-optimizer',
      name: 'Conversion Optimizer',
      description: 'Designed to drive actions and sales',
      icon: Target,
      tone: 'persuasive',
      goal: 'conversion',
      emojiUsage: true,
      hashtagDensity: '6-10',
      contentLength: 'medium',
      color: 'bg-red-100 text-red-700 border-red-200',
      examples: ['Product demos', 'Social proof', 'Limited offers'],
      metrics: '5x more click-throughs'
    },
    {
      id: 'trend-rider',
      name: 'Trend Rider',
      description: 'Capitalizes on current trends and memes',
      icon: TrendingUp,
      tone: 'trendy',
      goal: 'viral',
      emojiUsage: true,
      hashtagDensity: '10-15',
      contentLength: 'short',
      color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      examples: ['Meme adaptations', 'Trend participation', 'Pop culture refs'],
      metrics: '4x more reach'
    },
    {
      id: 'thought-provoker',
      name: 'Thought Provoker',
      description: 'Sparks meaningful conversations',
      icon: Sparkles,
      tone: 'thoughtful',
      goal: 'engagement',
      emojiUsage: false,
      hashtagDensity: '4-6',
      contentLength: 'long',
      color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      examples: ['Open questions', 'Philosophical takes', 'Future predictions'],
      metrics: '3x longer engagement time'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Enhanced Content Style Presets
        </CardTitle>
        <p className="text-sm text-gray-600">
          Choose a proven style template to optimize your content performance
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {presets.map(preset => {
            const Icon = preset.icon;
            return (
              <Card 
                key={preset.id}
                className={`cursor-pointer transition-all hover:shadow-md border-2 ${preset.color}`}
                onClick={() => onPresetSelect(preset)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6" />
                      <div>
                        <h3 className="font-semibold">{preset.name}</h3>
                        <p className="text-sm opacity-80">{preset.description}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Use Preset
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {preset.tone} tone
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {preset.contentLength} form
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {preset.hashtagDensity} hashtags
                      </Badge>
                      {preset.emojiUsage && (
                        <Badge variant="secondary" className="text-xs">
                          emojis
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-600">
                      <strong>Examples:</strong> {preset.examples.join(', ')}
                    </div>
                    
                    <div className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded">
                      📈 {preset.metrics}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
