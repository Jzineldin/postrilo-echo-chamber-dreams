
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sparkles, Smartphone } from 'lucide-react';
import { EnhancedLoading } from '@/components/ui/enhanced-loading';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

// Content form data interface
interface ContentFormData {
  topic: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  emojiUsage: boolean;
  hashtagDensity: boolean;
  shortSentences: boolean;
  keyPoints: string;
  useCache: boolean;
}

// App configuration
const APP_CONFIG = {
  availablePlatforms: ['instagram', 'twitter', 'facebook', 'linkedin', 'tiktok'],
  availableTones: ['professional', 'casual', 'friendly', 'authoritative', 'humorous'],
  contentGoals: ['engagement', 'awareness', 'conversion', 'education', 'entertainment']
};

interface MobileContentFormProps {
  onGenerate: (formData: ContentFormData) => Promise<void>;
  isGenerating: boolean;
  canGenerateMore: boolean;
  postsRemaining: number;
}

export const MobileContentForm = ({
  onGenerate,
  isGenerating,
  canGenerateMore,
  postsRemaining
}: MobileContentFormProps) => {
  const { getOptimizedProps, getMobileStyles } = useMobileOptimization();
  
  const [formData, setFormData] = useState<ContentFormData>({
    topic: '',
    platform: 'instagram',
    contentType: 'post',
    tone: 'professional',
    goal: 'engagement',
    emojiUsage: false,
    hashtagDensity: false,
    shortSentences: false,
    keyPoints: '',
    useCache: true
  });

  const updateFormData = (updates: Partial<ContentFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleGenerate = () => {
    if (formData.topic.trim() && canGenerateMore) {
      onGenerate(formData);
    }
  };

  const mobileStyles = getMobileStyles();

  return (
    <div className="space-y-4" style={mobileStyles}>
      {/* Header */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Smartphone className="w-5 h-5 text-purple-600" />
            Create Content
          </CardTitle>
          <Badge variant="outline" className="w-fit">
            {postsRemaining} posts remaining
          </Badge>
        </CardHeader>
      </Card>

      {/* Form */}
      <Card>
        <CardContent className="p-4 space-y-4">
          {/* Topic Input - Optimized for mobile */}
          <div>
            <Label className="block text-sm font-medium mb-2">
              What's your topic?
            </Label>
            <Textarea
              {...getOptimizedProps({
                placeholder: "Enter your content topic...",
                value: formData.topic,
                className: "resize-none min-h-[80px] text-base"
              })}
              onChange={(e) => updateFormData({ topic: e.target.value })}
            />
          </div>

          {/* Platform Selection */}
          <div>
            <Label className="block text-sm font-medium mb-2">Platform</Label>
            <Select 
              value={formData.platform} 
              onValueChange={(value) => updateFormData({ platform: value })}
            >
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {APP_CONFIG.availablePlatforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tone and Goal */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label className="block text-sm font-medium mb-2">Tone</Label>
              <Select 
                value={formData.tone} 
                onValueChange={(value) => updateFormData({ tone: value })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {APP_CONFIG.availableTones.map((tone) => (
                    <SelectItem key={tone} value={tone}>
                      {tone.charAt(0).toUpperCase() + tone.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block text-sm font-medium mb-2">Goal</Label>
              <Select 
                value={formData.goal} 
                onValueChange={(value) => updateFormData({ goal: value })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {APP_CONFIG.contentGoals.map((goal) => (
                    <SelectItem key={goal} value={goal}>
                      {goal.charAt(0).toUpperCase() + goal.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-3 pt-2 border-t">
            <Label className="text-sm font-medium">Content Options</Label>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="emoji-usage" className="text-sm">Include Emojis</Label>
              <Switch
                id="emoji-usage"
                checked={formData.emojiUsage}
                onCheckedChange={(checked) => updateFormData({ emojiUsage: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="hashtag-density" className="text-sm">Include Hashtags</Label>
              <Switch
                id="hashtag-density"
                checked={formData.hashtagDensity}
                onCheckedChange={(checked) => updateFormData({ hashtagDensity: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="short-sentences" className="text-sm">Short Sentences</Label>
              <Switch
                id="short-sentences"
                checked={formData.shortSentences}
                onCheckedChange={(checked) => updateFormData({ shortSentences: checked })}
              />
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!formData.topic.trim() || isGenerating || !canGenerateMore}
            className="w-full h-14 text-lg font-medium"
          >
            {isGenerating ? (
              <EnhancedLoading 
                isLoading={true}
                message="Creating your content..." 
                variant="minimal"
              />
            ) : !canGenerateMore ? (
              'Monthly Limit Reached'
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
