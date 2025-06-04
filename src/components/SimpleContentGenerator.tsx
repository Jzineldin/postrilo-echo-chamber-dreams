
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/hooks/useSubscription";

interface SimpleContentGeneratorProps {
  canGenerateMore?: boolean;
  postsRemaining?: number;
}

export const SimpleContentGenerator = ({ 
  canGenerateMore = true, 
  postsRemaining = 10 
}: SimpleContentGeneratorProps) => {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [contentType, setContentType] = useState("post");
  const [tone, setTone] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your content.",
        variant: "destructive"
      });
      return;
    }

    if (!canGenerateMore) {
      toast({
        title: "Post Limit Reached",
        description: "You've reached your monthly post limit.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate content generation for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sampleContent = `🚀 ${topic}

Here's some engaging content about ${topic} for ${platform}! 

This is a ${tone} ${contentType} that's perfect for your ${platform} audience.

✨ Key benefits:
• Increased engagement
• Better reach
• More followers

#${topic.replace(/\s+/g, '')} #content #${platform}`;

      setGeneratedContent(sampleContent);
      
      toast({
        title: "Content Generated!",
        description: `Created ${contentType} for ${platform}`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Content Generator
          </CardTitle>
          <p className="text-gray-600">Create engaging content with AI assistance</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic *</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What's your content about?"
                disabled={isGenerating}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform} disabled={isGenerating}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter/X</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contentType">Content Type</Label>
              <Select value={contentType} onValueChange={setContentType} disabled={isGenerating}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">Social Media Post</SelectItem>
                  <SelectItem value="story">Story Content</SelectItem>
                  <SelectItem value="video-script">Video Script</SelectItem>
                  <SelectItem value="thread">Thread/Carousel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone} disabled={isGenerating}>
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

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {postsRemaining} posts remaining this month
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim() || !canGenerateMore}
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Content</span>
              <Button onClick={handleCopy} variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="whitespace-pre-wrap text-gray-800">
                {generatedContent}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Platform: {platform} | Type: {contentType} | Tone: {tone}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
