
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useEnhancedContentGeneration } from "./hooks/useEnhancedContentGeneration";
import { FormData, GeneratedContent, GenerationError } from "./types";
import { Loader2, Sparkles } from "lucide-react";

interface EnhancedContentGeneratorFormProps {
  onContentGenerated: (content: GeneratedContent) => void;
  onGenerationError: (error: GenerationError) => void;
}

export const EnhancedContentGeneratorForm = ({
  onContentGenerated,
  onGenerationError
}: EnhancedContentGeneratorFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    topic: "",
    platform: "instagram",
    goal: "engagement",
    tone: "casual",
    contentType: "post",
    keyPoints: "",
    emojiUsage: true,
    hashtagDensity: true,
    shortSentences: false,
    useCache: true
  });

  const { isGenerating, generateEnhancedContent } = useEnhancedContentGeneration(
    onContentGenerated,
    onGenerationError
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateEnhancedContent(formData);
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic *</Label>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) => updateFormData("topic", e.target.value)}
                placeholder="What's your content about?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={formData.platform} onValueChange={(value) => updateFormData("platform", value)}>
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
              <Select value={formData.goal} onValueChange={(value) => updateFormData("goal", value)}>
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
              <Select value={formData.tone} onValueChange={(value) => updateFormData("tone", value)}>
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
            <Select value={formData.contentType} onValueChange={(value) => updateFormData("contentType", value)}>
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
              onChange={(e) => updateFormData("keyPoints", e.target.value)}
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
                onCheckedChange={(checked) => updateFormData("emojiUsage", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="hashtagDensity">Use More Hashtags</Label>
              <Switch
                id="hashtagDensity"
                checked={formData.hashtagDensity}
                onCheckedChange={(checked) => updateFormData("hashtagDensity", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="shortSentences">Use Short Sentences</Label>
              <Switch
                id="shortSentences"
                checked={formData.shortSentences}
                onCheckedChange={(checked) => updateFormData("shortSentences", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="useCache">Use Cache for Faster Results</Label>
              <Switch
                id="useCache"
                checked={formData.useCache}
                onCheckedChange={(checked) => updateFormData("useCache", checked)}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isGenerating || !formData.topic.trim()}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Content
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
