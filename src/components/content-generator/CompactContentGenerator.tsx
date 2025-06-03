import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles, Lightbulb, Video, FileText, Plus, X, Hash, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { centralizedAIService } from "@/services/centralizedAIService";
import { useIsMobile } from "@/hooks/use-mobile";

interface CompactContentGeneratorProps {
  canGenerateMore: boolean;
  postsRemaining: number;
}

export const CompactContentGenerator = ({ 
  canGenerateMore, 
  postsRemaining 
}: CompactContentGeneratorProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [formData, setFormData] = useState({
    contentType: "post",
    topic: "",
    platform: "",
    tone: "",
    goal: "",
    template: "",
    bulletPoints: [] as string[],
    includeEmojis: false,
    includeHashtags: false
  });
  
  const [generatedContent, setGeneratedContent] = useState("");
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingHashtags, setIsGeneratingHashtags] = useState(false);
  const [newBulletPoint, setNewBulletPoint] = useState("");

  const platforms = [
    { value: "twitter", label: "Twitter" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "tiktok", label: "TikTok" },
    { value: "youtube", label: "YouTube" },
    { value: "pinterest", label: "Pinterest" },
    { value: "snapchat", label: "Snapchat" },
    { value: "reddit", label: "Reddit" }
  ];

  const tones = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "humorous", label: "Humorous" },
    { value: "inspirational", label: "Inspirational" },
    { value: "educational", label: "Educational" }
  ];

  const goals = [
    { value: "brand-awareness", label: "Brand Awareness" },
    { value: "engagement", label: "Engagement" },
    { value: "lead-generation", label: "Lead Generation" },
    { value: "promotion", label: "Promotion" }
  ];

  const templates = [
    { value: "basic-post", label: "Basic Post" },
    { value: "quote-inspiration", label: "Quote & Inspiration" },
    { value: "brand-story", label: "Brand Story" },
    { value: "product-launch", label: "Product Launch" },
    { value: "tutorial-how-to", label: "Tutorial & How-to" },
    { value: "behind-scenes", label: "Behind the Scenes" },
    { value: "community-engagement", label: "Community Engagement" },
    { value: "educational-carousel", label: "Educational Carousel" }
  ];

  const addBulletPoint = () => {
    if (newBulletPoint.trim()) {
      setFormData(prev => ({
        ...prev,
        bulletPoints: [...prev.bulletPoints, newBulletPoint.trim()]
      }));
      setNewBulletPoint("");
    }
  };

  const removeBulletPoint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bulletPoints: prev.bulletPoints.filter((_, i) => i !== index)
    }));
  };

  const generateHashtags = async (content: string) => {
    if (!content.trim()) return;
    
    setIsGeneratingHashtags(true);
    try {
      const hashtags = await centralizedAIService.generateHashtags(content, 10);
      setGeneratedHashtags(hashtags);
    } catch (error) {
      console.error("Hashtag generation error:", error);
      // Fallback hashtags
      setGeneratedHashtags([
        '#socialmedia', '#content', '#marketing', '#business', 
        '#entrepreneur', '#digitalmarketing', '#social', '#growth'
      ]);
    } finally {
      setIsGeneratingHashtags(false);
    }
  };

  const toggleHashtagSelection = (hashtag: string) => {
    setSelectedHashtags(prev => 
      prev.includes(hashtag) 
        ? prev.filter(h => h !== hashtag)
        : [...prev, hashtag]
    );
  };

  const selectAllHashtags = () => {
    setSelectedHashtags([...generatedHashtags]);
  };

  const clearHashtagSelection = () => {
    setSelectedHashtags([]);
  };

  const addSelectedHashtagsToContent = () => {
    if (selectedHashtags.length === 0) return;
    
    const hashtagString = selectedHashtags.join(' ');
    const updatedContent = generatedContent + '\n\n' + hashtagString;
    setGeneratedContent(updatedContent);
    setSelectedHashtags([]);
    
    toast({
      title: "Hashtags Added!",
      description: `${selectedHashtags.length} hashtags added to your content.`
    });
  };

  const handleGenerate = async () => {
    if (!formData.topic.trim() || !formData.platform) {
      toast({
        title: "Missing Information",
        description: "Please fill in the topic and select a platform.",
        variant: "destructive"
      });
      return;
    }

    if (!canGenerateMore) {
      toast({
        title: "Generation Limit Reached",
        description: "You've reached your monthly generation limit. Please upgrade your plan.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      let prompt = `Create a ${formData.contentType === "post" ? "social media post" : "video script"} for ${formData.platform} about: ${formData.topic}`;
      
      if (formData.tone) prompt += `\nTone: ${formData.tone}`;
      if (formData.goal) prompt += `\nGoal: ${formData.goal}`;
      if (formData.template) prompt += `\nTemplate: ${formData.template}`;
      
      if (formData.bulletPoints.length > 0) {
        prompt += `\nKey points to include:\n${formData.bulletPoints.map(point => `• ${point}`).join('\n')}`;
      }
      
      prompt += `\nRequirements:`;
      prompt += `\n- Optimize for ${formData.platform}`;
      prompt += `\n- ${formData.includeEmojis ? "Include relevant emojis" : "No emojis"}`;
      prompt += `\n- ${formData.includeHashtags ? "Include relevant hashtags" : "No hashtags"}`;

      const response = await centralizedAIService.generateContent({
        prompt,
        type: 'content',
        temperature: 0.7,
        maxTokens: 500
      });

      if (response.error) {
        toast({
          title: "Generation Failed",
          description: response.error,
          variant: "destructive"
        });
      } else {
        setGeneratedContent(response.content);
        // Generate hashtags automatically after content generation
        await generateHashtags(response.content);
        toast({
          title: "Content Generated!",
          description: "Your content has been generated successfully."
        });
      }
    } catch (error) {
      console.error("Content generation error:", error);
      toast({
        title: "Generation Failed",
        description: "An error occurred while generating content.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRandomIdea = () => {
    const ideas = [
      "A motivational post about morning routines, or a product showcase for NOCCO energy drinks...",
      "Behind-the-scenes look at your daily workflow and productivity tips",
      "Customer success story featuring your product or service",
      "Educational content about industry trends and best practices",
      "Community engagement post asking followers about their experiences"
    ];
    
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    setFormData(prev => ({ ...prev, topic: randomIdea }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-8">
        {/* Content Type Card */}
        <Card className="bg-gradient-to-br from-slate-50 via-white to-purple-50 border-slate-200 shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-display text-slate-900 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              Content Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={formData.contentType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, contentType: value }))}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-transparent hover:border-purple-200 hover:bg-purple-50/50 transition-all cursor-pointer">
                <RadioGroupItem value="post" id="post" className="border-purple-400" />
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <div>
                    <Label htmlFor="post" className="font-semibold text-slate-900 cursor-pointer">
                      Social Media Post
                    </Label>
                    <p className="text-sm text-slate-600">Ready-to-publish social media content</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-transparent hover:border-pink-200 hover:bg-pink-50/50 transition-all cursor-pointer">
                <RadioGroupItem value="video" id="video" className="border-pink-400" />
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-pink-600" />
                  <div>
                    <Label htmlFor="video" className="font-semibold text-slate-900 cursor-pointer">
                      Video Script
                    </Label>
                    <p className="text-sm text-slate-600">Complete script for video content</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Topic & Platform Card */}
        <Card className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-blue-200 shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-display text-slate-900 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Lightbulb className="w-5 h-5" />
                </div>
                Topic & Platform
              </CardTitle>
              <Button
                onClick={handleRandomIdea}
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-100/80 font-medium"
              >
                <Lightbulb className="w-4 h-4 mr-1" />
                Get Ideas
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900">What do you want to create?</Label>
              <Textarea
                placeholder={
                  formData.contentType === "video" 
                    ? "e.g., A 60-second video script about morning productivity tips for busy professionals..."
                    : "e.g., A motivational post about morning routines, or a product showcase for NOCCO energy drinks..."
                }
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                className="resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 bg-white/70 backdrop-blur-sm text-base"
                rows={4}
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900">Platform</Label>
              <Select value={formData.platform} onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}>
                <SelectTrigger className="bg-white/70 backdrop-blur-sm border-blue-200 focus:border-blue-400 h-12">
                  <SelectValue placeholder="Choose platform for optimized content generation" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-slate-200 shadow-xl z-50 backdrop-blur-sm">
                  {platforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value} className="hover:bg-blue-50 focus:bg-blue-50">
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.platform && (
                <div className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  ✨ Content will be optimized specifically for <strong>{platforms.find(p => p.value === formData.platform)?.label}</strong>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bullet Points Card */}
        <Card className="bg-gradient-to-br from-green-50 via-white to-emerald-50 border-green-200 shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-display text-slate-900 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Plus className="w-5 h-5" />
              </div>
              Key Points
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a key point to include..."
                value={newBulletPoint}
                onChange={(e) => setNewBulletPoint(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addBulletPoint()}
                className="bg-white/70 backdrop-blur-sm border-green-200 focus:border-green-400"
              />
              <Button 
                onClick={addBulletPoint}
                size="sm"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {formData.bulletPoints.length > 0 && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {formData.bulletPoints.map((point, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-green-200">
                    <span className="text-sm text-slate-700">• {point}</span>
                    <Button
                      onClick={() => removeBulletPoint(index)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Style & Goal Card */}
        <Card className="bg-gradient-to-br from-orange-50 via-white to-red-50 border-orange-200 shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-display text-slate-900 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              Style & Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-900">Tone</Label>
                <Select value={formData.tone} onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
                  <SelectTrigger className="bg-white/70 backdrop-blur-sm border-orange-200 focus:border-orange-400">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-xl z-50">
                    {tones.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value} className="hover:bg-orange-50">
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-900">Goal</Label>
                <Select value={formData.goal} onValueChange={(value) => setFormData(prev => ({ ...prev, goal: value }))}>
                  <SelectTrigger className="bg-white/70 backdrop-blur-sm border-orange-200 focus:border-orange-400">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-xl z-50">
                    {goals.map((goal) => (
                      <SelectItem key={goal.value} value={goal.value} className="hover:bg-orange-50">
                        {goal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-900">Template</Label>
                <Select value={formData.template} onValueChange={(value) => setFormData(prev => ({ ...prev, template: value }))}>
                  <SelectTrigger className="bg-white/70 backdrop-blur-sm border-orange-200 focus:border-orange-400">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-xl z-50">
                    {templates.map((template) => (
                      <SelectItem key={template.value} value={template.value} className="hover:bg-orange-50">
                        {template.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-xl border border-orange-200">
                <Checkbox
                  id="include-emojis"
                  checked={formData.includeEmojis}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeEmojis: checked as boolean }))}
                  className="border-orange-300"
                />
                <Label htmlFor="include-emojis" className="font-semibold text-slate-900 cursor-pointer">
                  Include Emojis
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-xl border border-orange-200">
                <Checkbox
                  id="include-hashtags"
                  checked={formData.includeHashtags}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeHashtags: checked as boolean }))}
                  className="border-orange-300"
                />
                <Label htmlFor="include-hashtags" className="font-semibold text-slate-900 cursor-pointer">
                  Include Hashtags
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Card className="bg-gradient-to-br from-purple-100 via-white to-pink-100 border-purple-300 shadow-xl backdrop-blur-sm">
          <CardContent className="pt-6">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !canGenerateMore}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white py-8 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-6 h-6 mr-3 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 mr-3" />
                  Generate Content
                </>
              )}
            </Button>
            {!canGenerateMore && (
              <p className="text-sm text-center mt-3 text-red-600 font-medium">
                Monthly limit reached. Upgrade your plan to generate more content.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Current Settings & Generated Content */}
      <div className="space-y-8">
        {/* Current Settings Card */}
        <Card className="bg-gradient-to-br from-slate-50 via-white to-gray-50 border-slate-300 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-display text-slate-900">Current Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Content Type:</span>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 font-medium">
                {formData.contentType === "post" ? "Social Media Post" : "Video Script"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Platform:</span>
              {formData.platform ? (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-medium">
                  {platforms.find(p => p.value === formData.platform)?.label}
                </Badge>
              ) : (
                <span className="text-sm text-slate-400">None selected</span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Tone:</span>
              {formData.tone ? (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 font-medium">
                  {tones.find(t => t.value === formData.tone)?.label}
                </Badge>
              ) : (
                <span className="text-sm text-slate-400">None selected</span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Goal:</span>
              {formData.goal ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800 font-medium">
                  {goals.find(g => g.value === formData.goal)?.label}
                </Badge>
              ) : (
                <span className="text-sm text-slate-400">None selected</span>
              )}
            </div>

            {formData.bulletPoints.length > 0 && (
              <div className="pt-2 border-t border-slate-200">
                <span className="text-sm font-medium text-slate-600 block mb-2">Key Points:</span>
                <div className="space-y-1">
                  {formData.bulletPoints.slice(0, 3).map((point, index) => (
                    <div key={index} className="text-xs text-slate-500">• {point}</div>
                  ))}
                  {formData.bulletPoints.length > 3 && (
                    <div className="text-xs text-slate-400">...and {formData.bulletPoints.length - 3} more</div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Content Card */}
        <Card className="bg-gradient-to-br from-slate-50 via-white to-gray-50 border-slate-300 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-display text-slate-900">Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedContent ? (
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 shadow-inner">
                  <p className="whitespace-pre-wrap text-slate-800 leading-relaxed">{generatedContent}</p>
                </div>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedContent);
                    toast({
                      title: "Copied!",
                      description: "Content has been copied to your clipboard."
                    });
                  }}
                  variant="outline"
                  className="w-full border-slate-300 hover:bg-slate-50 font-medium"
                >
                  Copy to Clipboard
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium">Your generated content will appear here</p>
                <p className="text-sm mt-2">Fill out the form and click generate to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hashtag Selection Card */}
        {generatedHashtags.length > 0 && (
          <Card className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 border-indigo-200 shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-display text-slate-900 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                    <Hash className="w-5 h-5" />
                  </div>
                  Select Hashtags
                </CardTitle>
                {isGeneratingHashtags && (
                  <div className="text-sm text-indigo-600 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Generating...
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button
                  onClick={selectAllHashtags}
                  variant="outline"
                  size="sm"
                  className="border-indigo-200 hover:bg-indigo-50"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Select All
                </Button>
                <Button
                  onClick={clearHashtagSelection}
                  variant="outline"
                  size="sm"
                  className="border-indigo-200 hover:bg-indigo-50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {generatedHashtags.map((hashtag, index) => (
                  <Badge
                    key={index}
                    variant={selectedHashtags.includes(hashtag) ? "default" : "secondary"}
                    className={`cursor-pointer transition-all ${
                      selectedHashtags.includes(hashtag)
                        ? "bg-indigo-500 text-white hover:bg-indigo-600"
                        : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                    }`}
                    onClick={() => toggleHashtagSelection(hashtag)}
                  >
                    {selectedHashtags.includes(hashtag) && (
                      <Check className="w-3 h-3 mr-1" />
                    )}
                    {hashtag}
                  </Badge>
                ))}
              </div>
              
              {selectedHashtags.length > 0 && (
                <div className="pt-4 border-t border-indigo-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Selected ({selectedHashtags.length}):
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 mb-3 p-3 bg-indigo-50 rounded-lg">
                    {selectedHashtags.join(' ')}
                  </div>
                  <Button
                    onClick={addSelectedHashtagsToContent}
                    className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
                  >
                    Add {selectedHashtags.length} Hashtag{selectedHashtags.length !== 1 ? 's' : ''} to Content
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
