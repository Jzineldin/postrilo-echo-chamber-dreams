
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContentSettingsFormProps {
  contentType: string;
  tone: string;
  contentGoal: string;
  contentLength: string;
  hashtagCount: string;
  includeEmojis: boolean;
  includeHashtags: boolean;
  onContentTypeChange: (type: string) => void;
  onToneChange: (tone: string) => void;
  onContentGoalChange: (goal: string) => void;
  onContentLengthChange: (length: string) => void;
  onHashtagCountChange: (count: string) => void;
  onIncludeEmojisChange: (include: boolean) => void;
  onIncludeHashtagsChange: (include: boolean) => void;
}

export const ContentSettingsForm = ({
  contentType,
  tone,
  contentGoal,
  contentLength,
  hashtagCount,
  includeEmojis,
  includeHashtags,
  onContentTypeChange,
  onToneChange,
  onContentGoalChange,
  onContentLengthChange,
  onHashtagCountChange,
  onIncludeEmojisChange,
  onIncludeHashtagsChange
}: ContentSettingsFormProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Content Type & Tone */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
        <Card className="bg-white/95 backdrop-blur-sm border-blue-200 shadow-sm">
          <CardHeader className={`${isMobile ? 'pb-2 px-4 pt-3' : 'pb-3'}`}>
            <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} text-blue-900 font-semibold`}>📺 Content Type</CardTitle>
          </CardHeader>
          <CardContent className={`${isMobile ? 'px-4 pb-3' : 'pb-4'}`}>
            <RadioGroup value={contentType} onValueChange={onContentTypeChange}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="post" id="post" />
                <Label htmlFor="post" className="cursor-pointer font-medium text-sm">Social Media Post</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="video-script" id="video-script" />
                <Label htmlFor="video-script" className="cursor-pointer font-medium text-sm">Video Script</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-green-200 shadow-sm">
          <CardHeader className={`${isMobile ? 'pb-2 px-4 pt-3' : 'pb-3'}`}>
            <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} text-green-900 font-semibold`}>🎭 Tone of Voice</CardTitle>
          </CardHeader>
          <CardContent className={`${isMobile ? 'px-4 pb-3' : 'pb-4'}`}>
            <Select value={tone} onValueChange={onToneChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual & Friendly</SelectItem>
                <SelectItem value="humorous">Humorous & Fun</SelectItem>
                <SelectItem value="inspirational">Inspirational</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
                <SelectItem value="conversational">Conversational</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Content Goal & Length */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
        <Card className="bg-white/95 backdrop-blur-sm border-orange-200 shadow-sm">
          <CardHeader className={`${isMobile ? 'pb-2 px-4 pt-3' : 'pb-3'}`}>
            <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} text-orange-900 font-semibold`}>🎯 Content Goal</CardTitle>
          </CardHeader>
          <CardContent className={`${isMobile ? 'px-4 pb-3' : 'pb-4'}`}>
            <Select value={contentGoal} onValueChange={onContentGoalChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engagement">Drive Engagement</SelectItem>
                <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                <SelectItem value="lead-generation">Lead Generation</SelectItem>
                <SelectItem value="sales">Drive Sales</SelectItem>
                <SelectItem value="education">Educate Audience</SelectItem>
                <SelectItem value="community">Build Community</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-indigo-200 shadow-sm">
          <CardHeader className={`${isMobile ? 'pb-2 px-4 pt-3' : 'pb-3'}`}>
            <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} text-indigo-900 font-semibold`}>📏 Content Length</CardTitle>
          </CardHeader>
          <CardContent className={`${isMobile ? 'px-4 pb-3' : 'pb-4'}`}>
            <Select value={contentLength} onValueChange={onContentLengthChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short & Punchy</SelectItem>
                <SelectItem value="medium">Medium Length</SelectItem>
                <SelectItem value="long">Detailed & Long</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Content Settings */}
      <Card className="bg-white/95 backdrop-blur-sm border-purple-200 shadow-sm">
        <CardHeader className={`${isMobile ? 'pb-2 px-4 pt-3' : 'pb-3'}`}>
          <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'} text-purple-900 font-semibold`}>
            <Settings className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4'}`} />
            Content Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className={`space-y-4 ${isMobile ? 'px-4 pb-3' : 'pb-4'}`}>
          <div className="space-y-2">
            <Label htmlFor="hashtags" className="font-medium text-sm">Hashtag Count</Label>
            <Select value={hashtagCount} onValueChange={onHashtagCountChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Hashtags</SelectItem>
                <SelectItem value="3-5">3-5 Hashtags</SelectItem>
                <SelectItem value="5-8">5-8 Hashtags</SelectItem>
                <SelectItem value="8-12">8-12 Hashtags</SelectItem>
                <SelectItem value="maximum">Maximum Hashtags</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Toggle switches */}
          <div className="space-y-3 pt-2">
            <div className={`flex items-center justify-between ${isMobile ? 'py-2' : 'py-2'}`}>
              <div className="flex-1 pr-4">
                <Label htmlFor="emojis" className="font-medium text-sm">Include Emojis</Label>
                <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-500 mt-1`}>Add relevant emojis for engagement</p>
              </div>
              <Switch
                id="emojis"
                checked={includeEmojis}
                onCheckedChange={onIncludeEmojisChange}
              />
            </div>

            <div className={`flex items-center justify-between ${isMobile ? 'py-2' : 'py-2'}`}>
              <div className="flex-1 pr-4">
                <Label htmlFor="hashtags-toggle" className="font-medium text-sm">Include Hashtags</Label>
                <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-500 mt-1`}>Add strategic hashtags for reach</p>
              </div>
              <Switch
                id="hashtags-toggle"
                checked={includeHashtags}
                onCheckedChange={onIncludeHashtagsChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
