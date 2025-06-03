
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useContentStorage } from '@/hooks/useContentStorage';
import { multiProviderAIService } from '@/services/multiProviderAIService';
import { Sparkles, Loader2, Eye, Save, Wand2, AlertCircle, Zap, Crown } from 'lucide-react';

export const BrandStoryWithAI = () => {
  const { toast } = useToast();
  const { saveContent } = useContentStorage();
  
  // Input fields for AI generation
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [foundingStory, setFoundingStory] = useState('');
  const [mission, setMission] = useState('');
  const [uniqueValue, setUniqueValue] = useState('');
  const [preferredProvider, setPreferredProvider] = useState<'gemini' | 'groq' | 'openai'>('gemini');
  
  // Generated content
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiProvider, setAiProvider] = useState<string>('');
  const [usage, setUsage] = useState<any>(null);

  const generateBrandStory = async () => {
    console.log("Generating brand story for:", companyName);
    
    if (!companyName.trim()) {
      toast({
        title: "Company Name Required",
        description: "Please enter your company name to generate a brand story.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const prompt = `Create an engaging brand story for a social media post about ${companyName}. 

Company Details:
- Industry: ${industry || 'Not specified'}
- Founding Story: ${foundingStory || 'Not provided'}
- Mission: ${mission || 'Not provided'}
- Unique Value: ${uniqueValue || 'Not provided'}

Create a compelling brand story that:
1. Hooks the reader in the first line
2. Tells our journey and mission
3. Highlights what makes us unique
4. Connects emotionally with the audience
5. Ends with a call to action
6. Is optimized for social media engagement

Format it as a complete social media post ready to publish.`;

      const response = await multiProviderAIService.generateContent({
        prompt,
        preferredProvider,
        type: 'content'
      });

      if (response.error) {
        if (response.type === 'usage_limit') {
          setError(`Daily usage limit reached. ${response.usageInfo ? 
            `Gemini: ${response.usageInfo.geminiUsage}/${response.usageInfo.dailyLimit}, Groq: ${response.usageInfo.groqUsage}/${response.usageInfo.dailyLimit}` : 
            'Upgrade to Pro for unlimited access.'}`);
          
          toast({
            title: "Usage Limit Reached",
            description: response.error,
            variant: "destructive"
          });
          return;
        }
        throw new Error(response.error);
      }

      setGeneratedContent(response.content);
      setAiProvider(response.provider);
      setUsage(response.usage);
      setShowPreview(true);

      toast({
        title: `Brand Story Generated! 🎉`,
        description: `Generated using ${response.provider.charAt(0).toUpperCase() + response.provider.slice(1)}`
      });
    } catch (error) {
      console.error('Brand story generation error:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      
      // Fallback demo content
      const demoContent = `🌟 The ${companyName} Story

Every great brand has a story worth telling. Ours began with a simple idea: ${mission || 'to make a difference in our industry'}.

${foundingStory || 'From humble beginnings, we\'ve grown into something special.'} What sets us apart? ${uniqueValue || 'Our commitment to excellence and innovation.'} 

Today, we're not just a ${industry || 'company'} - we're a movement. We're building something bigger than ourselves, one satisfied customer at a time.

Ready to be part of our story? 💫

#BrandStory #${companyName.replace(/\s+/g, '')} #Innovation #Community`;

      setGeneratedContent(demoContent);
      setAiProvider('fallback');
      setShowPreview(true);
      
      toast({
        title: "Brand Story Generated",
        description: "Generated with fallback content due to service limitations.",
        variant: "default"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!generatedContent.trim()) {
      toast({
        title: "No Content to Save",
        description: "Please generate content first.",
        variant: "destructive"
      });
      return;
    }

    try {
      const title = `Brand Story - ${companyName || 'Untitled'}`;
      const contentArray = [generatedContent];
      const metadata = {
        companyName,
        industry,
        foundingStory,
        mission,
        uniqueValue,
        platform: 'instagram'
      };

      saveContent('brand-story', title, contentArray, metadata, ['brand-story', 'storytelling']);
      
      toast({
        title: "Brand Story Saved! ✅",
        description: "Your content has been saved to the content manager."
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your content. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRegenerate = () => {
    setGeneratedContent('');
    setShowPreview(false);
    setError(null);
    generateBrandStory();
  };

  const resetForm = () => {
    setCompanyName('');
    setIndustry('');
    setFoundingStory('');
    setMission('');
    setUniqueValue('');
    setGeneratedContent('');
    setShowPreview(false);
    setError(null);
    
    toast({
      title: "Form Reset",
      description: "All fields have been cleared."
    });
  };

  if (showPreview && generatedContent) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              Brand Story Preview
              <div className="ml-auto flex items-center gap-2">
                {aiProvider === 'openai' ? (
                  <Badge variant="default" className="flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    GPT-4 (Pro)
                  </Badge>
                ) : aiProvider === 'fallback' ? (
                  <Badge variant="outline">
                    Fallback
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {aiProvider.charAt(0).toUpperCase() + aiProvider.slice(1)} (Free)
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-700 font-medium">Generation Note</p>
                  <p className="text-amber-600 text-sm">{error}</p>
                </div>
              </div>
            )}
            
            {usage && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-sm">
                  <strong>Usage:</strong> {usage.todayCount} requests today
                  {!usage.isPro && ` (${usage.dailyLimit - usage.todayCount} remaining)`}
                  {usage.isPro && ' (Unlimited)'}
                </p>
              </div>
            )}
            
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="whitespace-pre-wrap text-gray-800">
                {generatedContent}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Content
              </Button>
              <Button onClick={handleRegenerate} variant="outline" disabled={isGenerating}>
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                Regenerate
              </Button>
              <Button onClick={() => setShowPreview(false)} variant="ghost">
                Edit Inputs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Brand Story Generator
            <Badge variant="secondary" className="ml-auto">
              <Zap className="w-3 h-3 mr-1" />
              Multi-Provider AI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-sm">
              ✨ Free users get access to Gemini and Groq AI. Pro users get unlimited GPT-4 access!
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="provider">AI Provider</Label>
            <Select value={preferredProvider} onValueChange={(value: 'gemini' | 'groq' | 'openai') => setPreferredProvider(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Gemini (Free)
                  </div>
                </SelectItem>
                <SelectItem value="groq">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Groq (Free)
                  </div>
                </SelectItem>
                <SelectItem value="openai">
                  <div className="flex items-center gap-2">
                    <Crown className="w-3 h-3 text-purple-600" />
                    GPT-4 (Pro Only)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your company name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g., Technology, Fashion, Food"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="foundingStory">Founding Story</Label>
            <Textarea
              id="foundingStory"
              value={foundingStory}
              onChange={(e) => setFoundingStory(e.target.value)}
              placeholder="How did your company start? What inspired its creation?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission">Mission/Purpose</Label>
            <Textarea
              id="mission"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder="What's your company's mission and purpose?"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="uniqueValue">What Makes You Unique</Label>
            <Textarea
              id="uniqueValue"
              value={uniqueValue}
              onChange={(e) => setUniqueValue(e.target.value)}
              placeholder="What sets your brand apart from competitors?"
              rows={2}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={generateBrandStory} 
              disabled={isGenerating || !companyName.trim()}
              className="flex-1"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Your Brand Story...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Brand Story with AI
                </>
              )}
            </Button>
            
            <Button onClick={resetForm} variant="outline" size="lg">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
