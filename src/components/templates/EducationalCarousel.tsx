
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedFormFields, ContentStyles } from "@/components/EnhancedFormFields";
import { AIEnhancement } from "@/components/AIEnhancement";
import { useContentStorage } from "@/hooks/useContentStorage";
import { useToast } from "@/hooks/use-toast";
import { Plus, Minus, BookOpen, Eye, Save, ArrowLeft } from "lucide-react";

export const EducationalCarousel = () => {
  const { toast } = useToast();
  const { saveContent } = useContentStorage();
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState([
    { title: "", content: "" },
    { title: "", content: "" },
    { title: "", content: "" }
  ]);
  const [styles, setStyles] = useState<ContentStyles | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const addSlide = () => {
    if (slides.length < 10) {
      setSlides([...slides, { title: "", content: "" }]);
    }
  };

  const removeSlide = (index: number) => {
    if (slides.length > 2) {
      setSlides(slides.filter((_, i) => i !== index));
    }
  };

  const updateSlide = (index: number, field: 'title' | 'content', value: string) => {
    const updated = slides.map((slide, i) => 
      i === index ? { ...slide, [field]: value } : slide
    );
    setSlides(updated);
  };

  const generateContent = () => {
    if (!topic.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a topic for your educational carousel."
      });
      return;
    }

    const generatedSlides = slides.map((slide, index) => {
      if (index === 0) {
        return `🎯 ${topic}\n\n${slide.content || "Welcome to this educational journey! Let's explore key insights together."}`;
      } else if (index === slides.length - 1) {
        return `🎉 Key Takeaways\n\n${slide.content || "Remember these important points from our discussion. Apply these insights to achieve better results!"}`;
      } else {
        return `📚 ${slide.title || `Point ${index}`}\n\n${slide.content || "This is an important concept to understand. It will help you in your learning journey."}`;
      }
    });

    setGeneratedContent(generatedSlides);
    setShowPreview(true);
  };

  const saveGeneratedContent = () => {
    const contentId = saveContent(
      "educational-carousel",
      topic,
      generatedContent,
      { styles, originalSlides: slides },
      tags
    );

    toast({
      title: "Content Generated!",
      description: "Your educational carousel has been created and saved."
    });

    // Reset form
    setTopic("");
    setSlides([
      { title: "", content: "" },
      { title: "", content: "" },
      { title: "", content: "" }
    ]);
    setGeneratedContent([]);
    setShowPreview(false);
  };

  const editContent = () => {
    setShowPreview(false);
  };

  const handleAIContentUpdate = (newContent: string) => {
    if (slides.length > 0) {
      updateSlide(0, 'content', newContent);
    }
  };

  const getCurrentContent = () => {
    return slides.map(slide => `${slide.title}\n${slide.content}`).join('\n\n');
  };

  if (showPreview) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Eye className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Content Preview</h2>
          </div>
          <p className="text-gray-600">Review your generated educational carousel</p>
        </div>

        <div className="space-y-4">
          {generatedContent.map((slide, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
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
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Educational Carousel</h2>
        </div>
        <p className="text-gray-600">Create informative multi-slide educational content</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="topic">Main Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., 5 Tips for Better Time Management"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Slides ({slides.length}/10)</Label>
              <div className="flex gap-2">
                <Button 
                  onClick={addSlide} 
                  size="sm" 
                  variant="outline"
                  disabled={slides.length >= 10}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {slides.map((slide, index) => (
              <Card key={index} className="border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm">
                      Slide {index + 1}
                      {index === 0 && " (Intro)"}
                      {index === slides.length - 1 && index > 0 && " (Conclusion)"}
                    </span>
                    {slides.length > 2 && (
                      <Button
                        onClick={() => removeSlide(index)}
                        size="sm"
                        variant="ghost"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {index !== 0 && index !== slides.length - 1 && (
                    <div className="mb-3">
                      <Label>Slide Title</Label>
                      <Input
                        placeholder="e.g., Prioritize Your Tasks"
                        value={slide.title}
                        onChange={(e) => updateSlide(index, 'title', e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      placeholder={
                        index === 0 
                          ? "Introduction to your topic..."
                          : index === slides.length - 1
                          ? "Summary and key takeaways..."
                          : "Explain this point in detail..."
                      }
                      value={slide.content}
                      onChange={(e) => updateSlide(index, 'content', e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {topic && (
        <AIEnhancement
          content={getCurrentContent()}
          onContentUpdate={handleAIContentUpdate}
          platform="instagram"
        />
      )}

      <EnhancedFormFields onStyleChange={setStyles} onTagsChange={setTags} />

      <Button onClick={generateContent} className="w-full" size="lg">
        <Eye className="w-4 h-4 mr-2" />
        Preview Educational Carousel
      </Button>
    </div>
  );
};
