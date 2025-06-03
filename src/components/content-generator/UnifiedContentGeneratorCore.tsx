import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import { ContentFormData, GeneratedContentResult } from '@/types/contentGeneration';
import { StandardizedAIError } from '@/services/ai/standardizedErrorHandling';
import { unifiedAIService } from '@/services/ai/unifiedAIService';
import { configurationManager } from '@/services/configurationManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sparkles, Copy, RefreshCw, AlertCircle } from 'lucide-react';
import { APP_CONFIG } from '@/config/app';

interface UnifiedContentGeneratorCoreProps {
  canGenerateMore?: boolean;
  postsRemaining?: number;
  onContentGenerated?: (content: GeneratedContentResult) => void;
  onGenerationError?: (error: StandardizedAIError) => void;
}

export const UnifiedContentGeneratorCore = ({
  canGenerateMore = true,
  postsRemaining = APP_CONFIG.defaultPostLimit,
  onContentGenerated,
  onGenerationError
}: UnifiedContentGeneratorCoreProps) => {
  const isMobile = useIsMobile();
  const { debounce } = usePerformanceOptimization();
  const { getOptimizedProps } = useMobileOptimization();
  
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

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContentResult | null>(null);
  const [generationError, setGenerationError] = useState<StandardizedAIError | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Optimized form update with debouncing
  const updateFormData = debounce((updates: Partial<ContentFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, 300, 'formUpdate');

  const handleGenerate = async () => {
    console.log('🎯 UnifiedContentGenerator: Starting generation');
    
    const validation = configurationManager.validateContentFormData(formData);
    if (!validation.valid) {
      const error: StandardizedAIError = {
        type: 'validation_error',
        message: `Validation failed: ${validation.errors.join(', ')}`,
        userFriendlyMessage: validation.errors.join(', '),
        retryable: true,
        timestamp: Date.now()
      };
      setGenerationError(error);
      onGenerationError?.(error);
      return;
    }

    if (!canGenerateMore) {
      const error: StandardizedAIError = {
        type: 'quota_exceeded',
        message: 'Monthly post limit reached',
        userFriendlyMessage: 'You have reached your monthly post limit',
        retryable: false,
        timestamp: Date.now()
      };
      setGenerationError(error);
      onGenerationError?.(error);
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const result = await unifiedAIService.generateFromFormData(formData);
      setGeneratedContent(result);
      setRetryCount(0);
      onContentGenerated?.(result);
      
      console.log('✅ UnifiedContentGenerator: Content generated successfully');
    } catch (error) {
      console.error('🚨 UnifiedContentGenerator: Generation failed:', error);
      const standardizedError = error as StandardizedAIError;
      setGenerationError(standardizedError);
      onGenerationError?.(standardizedError);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetry = () => {
    const maxRetries = configurationManager.getAIConfig().maxRetries;
    
    if (retryCount < maxRetries) {
      console.log(`🔄 UnifiedContentGenerator: Retrying generation (${retryCount + 1}/${maxRetries})`);
      setRetryCount(prev => prev + 1);
      handleGenerate();
    } else {
      console.log('🛑 UnifiedContentGenerator: Max retries reached');
    }
  };

  const handleCopy = () => {
    if (generatedContent?.content) {
      navigator.clipboard.writeText(generatedContent.content);
    }
  };

  const platformOptions = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube' }
  ];

  return (
    <div className={`space-y-6 ${isMobile ? 'p-4' : 'p-6'} critical-section`}>
      {/* Header */}
      <Card className={isMobile ? 'shadow-sm' : 'shadow-md'}>
        <CardHeader className={isMobile ? 'pb-3' : 'pb-4'}>
          <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>
            <Sparkles className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-purple-600 gpu-accelerated`} />
            Create Content
          </CardTitle>
          <Badge variant="outline" className="w-fit">
            {postsRemaining} posts remaining
          </Badge>
        </CardHeader>
      </Card>

      {/* Content Form */}
      <Card className="contain-layout">
        <CardContent className={`space-y-4 ${isMobile ? 'p-4' : 'p-6'}`}>
          {/* Topic Input */}
          <div>
            <Label className="block text-sm font-medium mb-2">
              What's your topic?
            </Label>
            <Textarea
              {...getOptimizedProps({
                placeholder: "Enter your content topic...",
                value: formData.topic,
                className: `resize-none ${isMobile ? 'min-h-[80px]' : 'min-h-[100px]'}`
              })}
              onChange={(e) => updateFormData({ topic: e.target.value })}
            />
          </div>

          {/* Platform Selection */}
          <div>
            <Label className="block text-sm font-medium mb-2">Platform</Label>
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

          {/* Tone and Goal Selection */}
          <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <div>
              <Label className="block text-sm font-medium mb-2">Tone</Label>
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
              <Label className="block text-sm font-medium mb-2">Goal</Label>
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

          {/* Content Settings */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Content Settings</Label>
            <div className={`space-y-3 ${isMobile ? '' : 'grid grid-cols-2 gap-4'}`}>
              <div className="flex items-center space-x-2">
                <Switch
                  id="emoji-usage"
                  checked={formData.emojiUsage}
                  onCheckedChange={(checked) => updateFormData({ emojiUsage: checked })}
                />
                <Label htmlFor="emoji-usage" className="text-sm">Use emojis</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="hashtag-density"
                  checked={formData.hashtagDensity}
                  onCheckedChange={(checked) => updateFormData({ hashtagDensity: checked })}
                />
                <Label htmlFor="hashtag-density" className="text-sm">Include hashtags</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="short-sentences"
                  checked={formData.shortSentences}
                  onCheckedChange={(checked) => updateFormData({ shortSentences: checked })}
                />
                <Label htmlFor="short-sentences" className="text-sm">Short sentences</Label>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            {...getOptimizedProps({
              onClick: handleGenerate,
              disabled: !formData.topic.trim() || isGenerating || !canGenerateMore,
              className: `w-full ${isMobile ? 'h-12' : 'h-14'} text-base smooth-transition`,
              size: "lg"
            })}
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

          {/* Error Display */}
          {generationError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-700 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Generation Failed</span>
              </div>
              <p className="text-sm text-red-600 mb-3">
                {generationError.userFriendlyMessage}
              </p>
              {retryCount < configurationManager.getAIConfig().maxRetries && (
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry ({configurationManager.getAIConfig().maxRetries - retryCount} attempts left)
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Content Display */}
      {generatedContent && !isGenerating && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Content</span>
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="whitespace-pre-wrap text-gray-800">
                {generatedContent.content}
              </div>
            </div>
            {generatedContent.hashtags && generatedContent.hashtags.length > 0 && (
              <div className="mt-4">
                <Label className="text-sm font-medium mb-2 block">Hashtags</Label>
                <div className="flex flex-wrap gap-2">
                  {generatedContent.hashtags.map((hashtag, index) => (
                    <Badge key={index} variant="secondary">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
