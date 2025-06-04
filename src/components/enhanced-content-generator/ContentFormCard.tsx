
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Shield } from 'lucide-react';
import { FormData } from './types';

interface ContentFormCardProps {
  formData: FormData;
  onFormDataChange: (updates: Partial<FormData>) => void;
}

export const ContentFormCard = ({ formData, onFormDataChange }: ContentFormCardProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          Secure Content Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic *</Label>
            <Input
              id="topic"
              value={formData.topic}
              onChange={(e) => onFormDataChange({ topic: e.target.value })}
              placeholder="What's your content about?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select 
              value={formData.platform} 
              onValueChange={(value) => onFormDataChange({ platform: value as FormData['platform'] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter/X</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="goal">Content Goal</Label>
            <Select 
              value={formData.goal} 
              onValueChange={(value) => onFormDataChange({ goal: value as FormData['goal'] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engagement">Drive Engagement</SelectItem>
                <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                <SelectItem value="lead-generation">Lead Generation</SelectItem>
                <SelectItem value="promotion">Product Promotion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select 
              value={formData.tone} 
              onValueChange={(value) => onFormDataChange({ tone: value as FormData['tone'] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="humorous">Humorous</SelectItem>
                <SelectItem value="inspirational">Inspirational</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contentType">Content Type</Label>
          <Select 
            value={formData.contentType} 
            onValueChange={(value) => onFormDataChange({ contentType: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="post">Social Media Post</SelectItem>
              <SelectItem value="video-script">Video Script</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="keyPoints">Key Points (Optional)</Label>
          <Textarea
            id="keyPoints"
            value={formData.keyPoints}
            onChange={(e) => onFormDataChange({ keyPoints: e.target.value })}
            placeholder="Any specific points you want to include..."
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emojiUsage">Include Emojis</Label>
            <Switch
              id="emojiUsage"
              checked={formData.emojiUsage}
              onCheckedChange={(checked) => onFormDataChange({ emojiUsage: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="hashtagDensity">Use More Hashtags</Label>
            <Switch
              id="hashtagDensity"
              checked={formData.hashtagDensity}
              onCheckedChange={(checked) => onFormDataChange({ hashtagDensity: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="shortSentences">Use Short Sentences</Label>
            <Switch
              id="shortSentences"
              checked={formData.shortSentences}
              onCheckedChange={(checked) => onFormDataChange({ shortSentences: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="useCache">Use Cache for Faster Results</Label>
            <Switch
              id="useCache"
              checked={formData.useCache}
              onCheckedChange={(checked) => onFormDataChange({ useCache: checked })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
