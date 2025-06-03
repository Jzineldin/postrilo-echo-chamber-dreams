import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedFormFields, ContentStyles } from "@/components/EnhancedFormFields";
import { useContentStorage } from "@/hooks/useContentStorage";
import { useToast } from "@/hooks/use-toast";
import { Camera, Eye, Save, ArrowLeft } from "lucide-react";

export const BehindTheScenes = () => {
  const { toast } = useToast();
  const { saveContent } = useContentStorage();
  const [title, setTitle] = useState("");
  const [process, setProcess] = useState("");
  const [teamSpotlight, setTeamSpotlight] = useState("");
  const [challenges, setChallenges] = useState("");
  const [insights, setInsights] = useState("");
  const [futureGoals, setFutureGoals] = useState("");
  const [styles, setStyles] = useState<ContentStyles | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const generateContent = () => {
    if (!title.trim() || !process.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the title and process description."
      });
      return;
    }

    const behindScenesContent = [
      `🎬 Behind the Scenes: ${title}\n\nEver wondered what goes on behind the magic? Let's take you on a journey behind the curtain! ✨`,
      
      `⚙️ Our Process\n\n${process}\n\nEvery great result starts with a solid process and attention to detail.`,
      
      teamSpotlight ? `👥 Team Spotlight\n\n${teamSpotlight}` : null,
      
      challenges ? `💪 Challenges We Faced\n\n${challenges}\n\nEvery project teaches us something new!` : null,
      
      `💡 Key Insights\n\n${insights || "This experience reminded us that the best work comes from collaboration, creativity, and never giving up on quality."}`,
      
      `🔮 What's Next\n\n${futureGoals || "We're always looking for ways to improve and deliver even better results. Stay tuned for more exciting projects!"}\n\nWhat would you like to see behind the scenes next? Let us know! 👇`
    ].filter(Boolean);

    setGeneratedContent(behindScenesContent);
    setShowPreview(true);
  };

  const saveGeneratedContent = () => {
    const contentId = saveContent(
      "behind-scenes",
      title,
      generatedContent,
      { 
        styles, 
        behindScenesInfo: { title, process, teamSpotlight, challenges, insights, futureGoals } 
      },
      tags
    );

    toast({
      title: "Behind the Scenes Created!",
      description: "Your behind-the-scenes content has been generated and saved."
    });

    // Reset form
    setTitle("");
    setProcess("");
    setTeamSpotlight("");
    setChallenges("");
    setInsights("");
    setFutureGoals("");
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
            <Eye className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Content Preview</h2>
          </div>
          <p className="text-gray-600">Review your generated behind-the-scenes content</p>
        </div>

        <div className="space-y-4">
          {generatedContent.map((slide, index) => (
            <Card key={index} className="border-l-4 border-l-green-500">
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
          <Camera className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Behind the Scenes</h2>
        </div>
        <p className="text-gray-600">Share your process, team, and authentic moments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Behind the Scenes Story</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title/Project Name *</Label>
            <Input
              id="title"
              placeholder="e.g., Creating Our New Product Campaign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="process">Process Description *</Label>
            <Textarea
              id="process"
              placeholder="Describe your process, workflow, or how you approach this work"
              value={process}
              onChange={(e) => setProcess(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="teamSpotlight">Team Spotlight (Optional)</Label>
            <Textarea
              id="teamSpotlight"
              placeholder="Highlight team members who made this possible and their contributions"
              value={teamSpotlight}
              onChange={(e) => setTeamSpotlight(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="challenges">Challenges Overcome (Optional)</Label>
            <Textarea
              id="challenges"
              placeholder="What obstacles did you face and how did you solve them?"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="insights">Key Insights/Learnings</Label>
            <Textarea
              id="insights"
              placeholder="What did you learn from this experience? What insights can you share?"
              value={insights}
              onChange={(e) => setInsights(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="futureGoals">Future Goals/Next Steps</Label>
            <Textarea
              id="futureGoals"
              placeholder="What's coming next? How will you build on this experience?"
              value={futureGoals}
              onChange={(e) => setFutureGoals(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <EnhancedFormFields onStyleChange={setStyles} onTagsChange={setTags} />

      <Button onClick={generateContent} className="w-full" size="lg">
        <Eye className="w-4 h-4 mr-2" />
        Preview Behind the Scenes
      </Button>
    </div>
  );
};
