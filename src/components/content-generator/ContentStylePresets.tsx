
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Zap, Heart, Brain, Trophy } from "lucide-react";

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
}

interface ContentStylePresetsProps {
  onPresetSelect: (preset: StylePreset) => void;
}

export const ContentStylePresets = ({ onPresetSelect }: ContentStylePresetsProps) => {
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
      color: 'bg-purple-100 text-purple-700 border-purple-200'
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
      color: 'bg-blue-100 text-blue-700 border-blue-200'
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
      color: 'bg-pink-100 text-pink-700 border-pink-200'
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
      color: 'bg-green-100 text-green-700 border-green-200'
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
      color: 'bg-orange-100 text-orange-700 border-orange-200'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Content Style Presets
        </CardTitle>
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
                  <div className="flex items-start justify-between">
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
                  <div className="mt-3 flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {preset.tone}
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
