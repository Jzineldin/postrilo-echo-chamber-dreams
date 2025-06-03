import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedFormFields, ContentStyles } from "@/components/EnhancedFormFields";
import { useContentStorage } from "@/hooks/useContentStorage";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Eye, Save, ArrowLeft } from "lucide-react";

export const TutorialPost = () => {
  const { toast } = useToast();
  const { saveContent } = useContentStorage();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [timeRequired, setTimeRequired] = useState("");
  const [materials, setMaterials] = useState("");
  const [steps, setSteps] = useState("");
  const [tips, setTips] = useState("");
  const [styles, setStyles] = useState<ContentStyles | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const generateContent = () => {
    if (!title.trim() || !steps.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the tutorial title and steps."
      });
      return;
    }

    const tutorialContent = [
      `📚 Tutorial: ${title}\n\n🎯 Difficulty: ${difficulty}\n⏰ Time needed: ${timeRequired || "30 minutes"}\n\nReady to learn something new? Let's dive in! 🚀`,
      
      `🛠️ What You'll Need\n\n${materials || "• Computer/smartphone\n• Internet connection\n• Willingness to learn!\n\nThat's it - simple and accessible for everyone!"}`,
      
      `📝 Step-by-Step Guide\n\n${steps}\n\nTake your time with each step and don't hesitate to go back if needed!`,
      
      tips ? `💡 Pro Tips & Tricks\n\n${tips}` : null,
      
      `🎉 You Did It!\n\nCongratulations on completing this tutorial! Practice makes perfect, so don't be afraid to try this again.\n\nFound this helpful? Save this post and share it with someone who might benefit! 👇\n\n#tutorial #learning #howto #tips`
    ].filter(Boolean);

    setGeneratedContent(tutorialContent);
    setShowPreview(true);
  };

  const saveGeneratedContent = () => {
    const contentId = saveContent(
      "tutorial-post",
      title,
      generatedContent,
      { 
        styles, 
        tutorialInfo: { title, difficulty, timeRequired, materials, steps, tips } 
      },
      tags
    );

    toast({
      title: "Tutorial Created!",
      description: "Your tutorial post has been generated and saved."
    });

    // Reset form
    setTitle("");
    setDifficulty("Beginner");
    setTimeRequired("");
    setMaterials("");
    setSteps("");
    setTips("");
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
            <Eye className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Content Preview</h2>
          </div>
          <p className="text-gray-600">Review your generated tutorial</p>
        </div>

        <div className="space-y-4">
          {generatedContent.map((slide, index) => (
            <Card key={index} className="border-l-4 border-l-indigo-500">
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
          <BookOpen className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Tutorial/How-To</h2>
        </div>
        <p className="text-gray-600">Create step-by-step educational content</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tutorial Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Tutorial Title *</Label>
            <Input
              id="title"
              placeholder="How to..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div>
              <Label htmlFor="timeRequired">Time Required</Label>
              <Input
                id="timeRequired"
                placeholder="e.g., 15 minutes"
                value={timeRequired}
                onChange={(e) => setTimeRequired(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="materials">Materials/Requirements</Label>
            <Textarea
              id="materials"
              placeholder="List what people need to follow this tutorial"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="steps">Step-by-Step Instructions *</Label>
            <Textarea
              id="steps"
              placeholder="Break down your tutorial into clear, numbered steps"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              rows={6}
            />
          </div>

          <div>
            <Label htmlFor="tips">Pro Tips & Additional Notes</Label>
            <Textarea
              id="tips"
              placeholder="Share helpful tips, common mistakes to avoid, or additional insights"
              value={tips}
              onChange={(e) => setTips(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <EnhancedFormFields onStyleChange={setStyles} onTagsChange={setTags} />

      <Button onClick={generateContent} className="w-full" size="lg">
        <Eye className="w-4 h-4 mr-2" />
        Preview Tutorial Post
      </Button>
    </div>
  );
};
