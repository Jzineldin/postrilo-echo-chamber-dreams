
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedFormFields, ContentStyles } from "@/components/EnhancedFormFields";
import { useContentStorage } from "@/hooks/useContentStorage";
import { useToast } from "@/hooks/use-toast";
import { Heart, Eye, Save, ArrowLeft } from "lucide-react";

export const BrandStory = () => {
  const { toast } = useToast();
  const { saveContent } = useContentStorage();
  const [brandName, setBrandName] = useState("");
  const [founding, setFounding] = useState("");
  const [mission, setMission] = useState("");
  const [values, setValues] = useState("");
  const [journey, setJourney] = useState("");
  const [vision, setVision] = useState("");
  const [styles, setStyles] = useState<ContentStyles | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const generateContent = () => {
    if (!brandName.trim() || !mission.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the brand name and mission."
      });
      return;
    }

    const storyContent = [
      `🌟 Our Story: ${brandName}\n\n${founding || "Every great brand has a beginning. Our journey started with a simple yet powerful idea that would change everything."}`,
      
      `🎯 Our Mission\n\n${mission}\n\nThis drives everything we do and guides every decision we make.`,
      
      `💫 Our Values\n\n${values || "Integrity, Innovation, and Impact - these core values shape our culture and define who we are as a company."}`,
      
      `🚀 The Journey\n\n${journey || "From humble beginnings to where we are today, our path has been filled with challenges, growth, and incredible milestones that shaped us."}`,
      
      `🔮 Our Vision\n\n${vision || "We envision a future where our impact creates positive change, and we're committed to making that vision a reality."}`
    ];

    setGeneratedContent(storyContent);
    setShowPreview(true);
  };

  const saveGeneratedContent = () => {
    const contentId = saveContent(
      "brand-story",
      `${brandName} Brand Story`,
      generatedContent,
      { styles, brandInfo: { brandName, founding, mission, values, journey, vision } },
      tags
    );

    toast({
      title: "Brand Story Saved!",
      description: "Your brand story has been saved to your content library."
    });

    // Reset form
    setBrandName("");
    setFounding("");
    setMission("");
    setValues("");
    setJourney("");
    setVision("");
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
            <Eye className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Content Preview</h2>
          </div>
          <p className="text-gray-600">Review your generated brand story</p>
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
          <Heart className="w-6 h-6 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">Brand Story</h2>
        </div>
        <p className="text-gray-600">Share your brand's authentic journey and values</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Brand Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="brandName">Brand Name *</Label>
            <Input
              id="brandName"
              placeholder="Your brand name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="founding">Founding Story</Label>
            <Textarea
              id="founding"
              placeholder="How and why was your brand founded? What was the inspiration?"
              value={founding}
              onChange={(e) => setFounding(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="mission">Mission Statement *</Label>
            <Textarea
              id="mission"
              placeholder="What is your brand's core mission? What do you aim to achieve?"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="values">Core Values</Label>
            <Textarea
              id="values"
              placeholder="What values drive your brand? What principles guide your decisions?"
              value={values}
              onChange={(e) => setValues(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="journey">Brand Journey</Label>
            <Textarea
              id="journey"
              placeholder="Share key milestones, challenges overcome, and growth moments"
              value={journey}
              onChange={(e) => setJourney(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="vision">Future Vision</Label>
            <Textarea
              id="vision"
              placeholder="Where do you see your brand going? What impact do you want to make?"
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <EnhancedFormFields onStyleChange={setStyles} onTagsChange={setTags} />

      <Button onClick={generateContent} className="w-full" size="lg">
        <Eye className="w-4 h-4 mr-2" />
        Preview Brand Story
      </Button>
    </div>
  );
};
