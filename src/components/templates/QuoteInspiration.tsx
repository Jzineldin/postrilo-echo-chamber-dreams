import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedFormFields, ContentStyles } from "@/components/EnhancedFormFields";
import { useContentStorage } from "@/hooks/useContentStorage";
import { useToast } from "@/hooks/use-toast";
import { centralizedAIService } from "@/services/centralizedAIService";
import { Quote, Eye, Save, ArrowLeft, Shuffle } from "lucide-react";

export const QuoteInspiration = () => {
  const { toast } = useToast();
  const { saveContent } = useContentStorage();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [context, setContext] = useState("");
  const [personalStory, setPersonalStory] = useState("");
  const [actionItems, setActionItems] = useState("");
  const [styles, setStyles] = useState<ContentStyles | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const inspirationalPrompts = [
    "Find an inspiring quote about overcoming challenges and perseverance",
    "Share a motivational quote about success and hard work", 
    "Create content around a quote about personal growth and self-improvement",
    "Find an uplifting quote about believing in yourself and confidence",
    "Share wisdom about embracing change and new opportunities",
    "Create content about the power of positive thinking and mindset",
    "Find a quote about leadership and making a difference",
    "Share inspiration about following your dreams and passion",
    "Create content around quotes about gratitude and appreciation",
    "Find motivation about learning from failure and resilience"
  ];

  const randomizePrompt = () => {
    const randomPrompt = inspirationalPrompts[Math.floor(Math.random() * inspirationalPrompts.length)];
    setContext(randomPrompt);
    toast({
      title: "Random Inspiration Generated!",
      description: "Try generating content with this random inspirational theme."
    });
  };

  const generateContent = async () => {
    if (!quote.trim() && !context.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a quote or use the randomize button to get started."
      });
      return;
    }

    setIsGenerating(true);

    try {
      let prompt = "";
      
      if (quote.trim()) {
        // User provided a specific quote
        prompt = `Create an inspirational social media post featuring this quote: "${quote}"
        ${author ? `by ${author}` : ''}
        
        Create a multi-slide inspirational post with:
        1. The quote beautifully formatted with emojis
        2. Why this quote resonates and matters today
        3. ${personalStory ? `Personal reflection: ${personalStory}` : 'A relatable personal reflection or story'}
        4. ${actionItems ? `Action items: ${actionItems}` : 'Actionable steps people can take inspired by this quote'}
        5. A call to action asking followers to share their thoughts
        
        Make it engaging, authentic, and motivational. Use emojis and hashtags appropriately.`;
      } else {
        // User wants AI to generate everything
        prompt = `${context || 'Create an inspirational social media post'}.
        
        Please:
        1. Find or create an inspiring quote that fits this theme
        2. Explain why this quote is meaningful and relevant
        3. Add a personal reflection or relatable story
        4. Provide actionable takeaways or steps
        5. End with an engaging call to action
        
        Format as a multi-slide post with emojis and relevant hashtags. Make it authentic and motivational.`;
      }

      const response = await centralizedAIService.generateContent({
        prompt,
        templateId: 'quote-inspiration',
        type: 'content',
        temperature: 0.8,
        maxTokens: 800
      });

      if (response.error) {
        toast({
          title: "Generation Failed",
          description: response.error,
          variant: "destructive"
        });
        return;
      }

      // Split the content into slides/sections
      const content = response.content;
      const slides = content.split('\n\n').filter(slide => slide.trim().length > 0);
      
      setGeneratedContent(slides);
      setShowPreview(true);

      toast({
        title: "Inspirational Content Generated!",
        description: "Your motivational post has been created."
      });

    } catch (error) {
      console.error('Content generation error:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveGeneratedContent = () => {
    const contentId = saveContent(
      "quote-inspiration",
      `Quote: ${quote.substring(0, 50) || 'AI Generated'}...`,
      generatedContent,
      { styles, quoteInfo: { quote, author, context, personalStory, actionItems } },
      tags
    );

    toast({
      title: "Inspirational Content Saved!",
      description: "Your quote and inspiration post has been saved to your library."
    });

    // Reset form
    setQuote("");
    setAuthor("");
    setContext("");
    setPersonalStory("");
    setActionItems("");
    setGeneratedContent([]);
    setShowPreview(false);
  };

  const editContent = () => {
    setShowPreview(false);
  };

  if (showPreview) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Eye className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Content Preview</h2>
          </div>
          <p className="text-gray-600">Review your generated inspirational content</p>
        </div>

        <div className="space-y-4">
          {generatedContent.map((slide, index) => (
            <Card key={index} className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-sm text-gray-500">Slide {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-gray-700">{slide}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-4">
          <Button onClick={editContent} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Edit Content
          </Button>
          <Button onClick={saveGeneratedContent} className="flex items-center gap-2 flex-1">
            <Save className="w-4 h-4" />
            Save to Library
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Quote className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Quote & Inspiration</h2>
        </div>
        <p className="text-gray-600">Create motivational content that inspires and engages</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inspirational Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-blue-900">Need inspiration?</h4>
              <Button
                onClick={randomizePrompt}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-blue-700 border-blue-300 hover:bg-blue-100"
              >
                <Shuffle className="w-4 h-4" />
                Randomize Theme
              </Button>
            </div>
            <p className="text-sm text-blue-700">
              Click randomize to get a random inspirational theme, or enter your own quote below.
            </p>
          </div>

          <div>
            <Label htmlFor="quote">Quote (Optional)</Label>
            <Textarea
              id="quote"
              placeholder="Enter a specific quote you want to use, or leave empty to let AI generate one"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="author">Author/Source (Optional)</Label>
            <Input
              id="author"
              placeholder="Who said this quote? (e.g., Maya Angelou, Steve Jobs)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="context">Theme or Context</Label>
            <Textarea
              id="context"
              placeholder="What kind of inspiration are you looking for? (e.g., overcoming challenges, success mindset, personal growth)"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="personalStory">Personal Story/Experience (Optional)</Label>
            <Textarea
              id="personalStory"
              placeholder="Share a personal experience that relates to this inspiration"
              value={personalStory}
              onChange={(e) => setPersonalStory(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="actionItems">Action Items/Takeaways (Optional)</Label>
            <Textarea
              id="actionItems"
              placeholder="What specific actions can people take? (AI will generate if left empty)"
              value={actionItems}
              onChange={(e) => setActionItems(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <EnhancedFormFields onStyleChange={setStyles} onTagsChange={setTags} />

      <Button 
        onClick={generateContent} 
        className="w-full" 
        size="lg"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Generating Inspiration...
          </>
        ) : (
          <>
            <Eye className="w-4 h-4 mr-2" />
            Generate Inspirational Content
          </>
        )}
      </Button>
    </div>
  );
};
