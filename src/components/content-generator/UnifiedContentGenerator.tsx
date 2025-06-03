
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Wand2, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { centralizedAIService } from "@/services/centralizedAIService";
import { useContentGenerationState } from "@/hooks/useContentGenerationState";
import { useAppStateManager } from "@/hooks/useAppStateManager";

const platformOptions = [
  { id: 'twitter', name: 'Twitter', color: 'bg-blue-500' },
  { id: 'facebook', name: 'Facebook', color: 'bg-blue-600' },
  { id: 'instagram', name: 'Instagram', color: 'bg-pink-500' },
  { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700' },
  { id: 'tiktok', name: 'TikTok', color: 'bg-black' },
  { id: 'youtube', name: 'YouTube', color: 'bg-red-500' }
];

export const UnifiedContentGenerator = () => {
  const { toast } = useToast();
  const { canGenerateMore, postsRemaining } = useAppStateManager();
  const {
    formData,
    isFormValid,
    isGenerating,
    generatedContent,
    lastError,
    showAdvancedSettings,
    updateFormData,
    startGeneration,
    toggleAdvancedSettings
  } = useContentGenerationState();

  const handleRandomIdea = () => {
    const randomBrief = centralizedAIService.getRandomContentBrief();
    updateFormData({ topic: randomBrief });
    toast({
      title: "Random idea generated! 💡",
      description: "Your content brief has been filled with a creative idea."
    });
  };

  const handleGenerate = async () => {
    if (!canGenerateMore) {
      toast({
        title: "Post limit reached",
        description: "You've reached your monthly post limit. Upgrade your plan for more posts.",
        variant: "destructive"
      });
      return;
    }
    
    await startGeneration();
    
    if (generatedContent) {
      toast({
        title: `Content generated for ${formData.platform}!`,
        description: `${postsRemaining - 1} posts remaining this month.`,
      });
    }
  };

  const copyToClipboard = () => {
    if (generatedContent?.content) {
      navigator.clipboard.writeText(generatedContent.content);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Content Creation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Topic & Platform */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  Topic & Platform
                </CardTitle>
                <Button
                  onClick={handleRandomIdea}
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:text-purple-700"
                >
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Get Ideas
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">What do you want to create?</label>
                <Textarea
                  placeholder="e.g., A motivational post about morning routines, or a product showcase for NOCCO energy drinks..."
                  value={formData.topic}
                  onChange={(e) => updateFormData({ topic: e.target.value })}
                  className="min-h-20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Platform</label>
                <div className="text-xs text-gray-600 mb-3">Choose ONE platform for optimized content generation</div>
                <div className="grid grid-cols-3 gap-2">
                  {platformOptions.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => updateFormData({ platform: platform.id as any })}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        formData.platform === platform.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {platform.name}
                    </button>
                  ))}
                </div>
                {formData.platform && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <div className={`w-2 h-2 rounded-full ${platformOptions.find(p => p.id === formData.platform)?.color}`}></div>
                      Content will be optimized specifically for {platformOptions.find(p => p.id === formData.platform)?.name} to maximize engagement and performance.
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Style & Goal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                Style & Goal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tone</label>
                  <Select value={formData.tone} onValueChange={(value) => updateFormData({ tone: value as any })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Goal</label>
                  <Select value={formData.goal} onValueChange={(value) => updateFormData({ goal: value as any })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="lead-generation">Lead Generation</SelectItem>
                      <SelectItem value="sales">Drive Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content Type</label>
                  <Select value={formData.contentType} onValueChange={(value) => updateFormData({ contentType: value as any })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post">Social Media Post</SelectItem>
                      <SelectItem value="video-script">Video Script</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-emojis"
                    checked={formData.emojiUsage}
                    onCheckedChange={(checked) => updateFormData({ emojiUsage: checked === true })}
                  />
                  <label htmlFor="include-emojis" className="text-sm font-medium cursor-pointer">
                    Include Emojis
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-hashtags"
                    checked={formData.hashtagDensity}
                    onCheckedChange={(checked) => updateFormData({ hashtagDensity: checked === true })}
                  />
                  <label htmlFor="include-hashtags" className="text-sm font-medium cursor-pointer">
                    Include Hashtags
                  </label>
                </div>
              </div>

              <button
                onClick={toggleAdvancedSettings}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
              >
                ⚙️ Advanced Settings {showAdvancedSettings ? '−' : '+'}
              </button>

              {showAdvancedSettings && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Key Points (Optional)</label>
                    <Textarea
                      placeholder="Add specific points to include in your content..."
                      value={formData.keyPoints || ''}
                      onChange={(e) => updateFormData({ keyPoints: e.target.value })}
                      className="min-h-16"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 3: Generate */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                Generate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleGenerate}
                disabled={!isFormValid || isGenerating || !canGenerateMore}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>

              {!canGenerateMore && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                  <p className="text-sm text-amber-800 font-medium text-center">
                    You've reached your monthly limit. Upgrade to generate more content.
                  </p>
                </div>
              )}

              {lastError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                  <p className="text-sm text-red-800 font-medium">
                    {lastError.userFriendlyMessage}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Current Settings & Generated Content */}
        <div className="space-y-6">
          {/* Current Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Current Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Platform:</span>
                <Badge variant="outline" className="capitalize">
                  {formData.platform}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Type:</span>
                <Badge variant="outline">
                  {formData.contentType === 'video-script' ? 'Video Script' : 'Post'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tone:</span>
                <Badge variant="outline" className="capitalize">
                  {formData.tone}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Goal:</span>
                <Badge variant="outline" className="capitalize">
                  {formData.goal.replace('-', ' ')}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Generated Content */}
          <Card className="min-h-64">
            <CardHeader>
              <CardTitle className="text-base">Generated Content</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="whitespace-pre-line text-gray-800 leading-relaxed">
                      {generatedContent.content}
                    </p>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="w-full"
                  >
                    Copy Content
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Wand2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Your generated content will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
