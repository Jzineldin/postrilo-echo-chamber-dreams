
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { ContentFormData } from '@/types/contentGeneration';
import { StandardizedAIError } from '@/services/ai/standardizedErrorHandling';
import { APP_CONFIG } from '@/config/app';
import { MobileContentSettings } from './MobileContentSettings';

interface MobileContentFormCardProps {
  canGenerateMore: boolean;
  postsRemaining: number;
  formData: ContentFormData;
  updateFormData: (updates: Partial<ContentFormData>) => void;
  isGenerating: boolean;
  generationError: StandardizedAIError | null;
  retryCount: number;
  onGenerate: () => void;
  onRetry: () => void;
}

const platformOptions = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' }
];

export const MobileContentFormCard = ({
  canGenerateMore,
  postsRemaining,
  formData,
  updateFormData,
  isGenerating,
  generationError,
  retryCount,
  onGenerate,
  onRetry
}: MobileContentFormCardProps) => {
  const maxRetries = APP_CONFIG.maxRetryAttempts;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Create Content
        </CardTitle>
        <Badge variant="outline" className="w-fit">
          {postsRemaining} posts remaining
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            What's your topic?
          </label>
          <Textarea
            placeholder="Enter your content topic..."
            value={formData.topic}
            onChange={(e) => updateFormData({ topic: e.target.value })}
            className="min-h-[80px] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Platform</label>
          <Select value={formData.platform} onValueChange={(value) => updateFormData({ platform: value as ContentFormData["platform"] })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {platformOptions.map((platform) => (
                <SelectItem key={platform.value} value={platform.value}>
                  {platform.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-2">Tone</label>
            <Select value={formData.tone} onValueChange={(value) => updateFormData({ tone: value as ContentFormData["tone"] })}>
              <SelectTrigger>
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
            <label className="block text-sm font-medium mb-2">Goal</label>
            <Select value={formData.goal} onValueChange={(value) => updateFormData({ goal: value as ContentFormData["goal"] })}>
              <SelectTrigger>
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

        <MobileContentSettings
          formData={formData}
          updateFormData={updateFormData}
        />

        <Button
          onClick={onGenerate}
          disabled={!formData.topic.trim() || isGenerating || !canGenerateMore}
          className="w-full h-12 text-base"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating your content...
            </>
          ) : !canGenerateMore ? (
            'Limit Reached'
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Content
            </>
          )}
        </Button>

        {!canGenerateMore && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800 text-center">
              Monthly limit reached. Upgrade for more posts.
            </p>
          </div>
        )}

        {generationError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">Generation Failed</span>
            </div>
            <p className="text-sm text-red-600 mb-3">
              {generationError.userFriendlyMessage}
            </p>
            {retryCount < maxRetries && (
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry ({maxRetries - retryCount} attempts left)
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
