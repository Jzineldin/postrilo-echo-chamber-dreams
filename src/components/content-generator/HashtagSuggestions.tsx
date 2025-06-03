
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hash, Plus, Sparkles } from "lucide-react";

interface HashtagSuggestionsProps {
  platform: string;
  topic: string;
  tone: string;
  onHashtagsSelected: (hashtags: string[]) => void;
}

export const HashtagSuggestions = ({ 
  platform, 
  topic, 
  tone, 
  onHashtagsSelected 
}: HashtagSuggestionsProps) => {
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    generateHashtagSuggestions();
  }, [platform, topic, tone]);

  const generateHashtagSuggestions = () => {
    // Nordic-specific and platform-optimized hashtags
    const nordicHashtags = ['lagom', 'hygge', 'nordic', 'scandinavian', 'sustainability'];
    const platformSpecific = getPlatformSpecificHashtags(platform);
    const topicBased = getTopicBasedHashtags(topic);
    const toneBasedHashtags = getToneBasedHashtags(tone);

    const allSuggestions = [
      ...topicBased,
      ...platformSpecific,
      ...nordicHashtags,
      ...toneBasedHashtags
    ].slice(0, 15);

    setSuggestions(allSuggestions);
  };

  const getPlatformSpecificHashtags = (platform: string): string[] => {
    const platformHashtags = {
      instagram: ['instagood', 'photooftheday', 'instadaily', 'explore'],
      twitter: ['trending', 'discussion', 'thoughts', 'share'],
      linkedin: ['professional', 'business', 'industry', 'networking'],
      facebook: ['community', 'family', 'friends', 'local'],
      tiktok: ['fyp', 'viral', 'trending', 'fun'],
      youtube: ['subscribe', 'tutorial', 'howto', 'learn']
    };
    return platformHashtags[platform as keyof typeof platformHashtags] || [];
  };

  const getTopicBasedHashtags = (topic: string): string[] => {
    const words = topic.toLowerCase().split(' ');
    return words.map(word => word.replace(/[^a-zA-Z0-9]/g, '')).filter(word => word.length > 2);
  };

  const getToneBasedHashtags = (tone: string): string[] => {
    const toneHashtags = {
      professional: ['business', 'professional', 'career'],
      casual: ['lifestyle', 'everyday', 'relatable'],
      humorous: ['funny', 'humor', 'comedy'],
      inspirational: ['motivation', 'inspiration', 'success'],
      educational: ['learn', 'education', 'tips']
    };
    return toneHashtags[tone as keyof typeof toneHashtags] || [];
  };

  const toggleHashtag = (hashtag: string) => {
    const updated = selectedHashtags.includes(hashtag)
      ? selectedHashtags.filter(h => h !== hashtag)
      : [...selectedHashtags, hashtag];
    
    setSelectedHashtags(updated);
    onHashtagsSelected(updated);
  };

  const getPlatformLimit = (platform: string): number => {
    const limits = {
      instagram: 30,
      twitter: 2,
      linkedin: 5,
      facebook: 10,
      tiktok: 20,
      youtube: 15
    };
    return limits[platform as keyof typeof limits] || 10;
  };

  const limit = getPlatformLimit(platform);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Hash className="w-5 h-5" />
          Hashtag Suggestions
          <Badge variant="outline">
            {selectedHashtags.length}/{limit}
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Optimized for {platform} and Nordic market trends
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected hashtags */}
        {selectedHashtags.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Selected:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedHashtags.map((hashtag) => (
                <Badge 
                  key={hashtag}
                  variant="default"
                  className="cursor-pointer hover:bg-red-500"
                  onClick={() => toggleHashtag(hashtag)}
                >
                  #{hashtag} ×
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Suggestions:</h4>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((hashtag) => (
              <Badge
                key={hashtag}
                variant={selectedHashtags.includes(hashtag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-500 hover:text-white"
                onClick={() => toggleHashtag(hashtag)}
              >
                <Plus className="w-3 h-3 mr-1" />
                #{hashtag}
              </Badge>
            ))}
          </div>
        </div>

        {selectedHashtags.length >= limit && (
          <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
            You've reached the maximum recommended hashtags for {platform} ({limit})
          </div>
        )}

        <Button
          onClick={generateHashtagSuggestions}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate New Suggestions
        </Button>
      </CardContent>
    </Card>
  );
};
