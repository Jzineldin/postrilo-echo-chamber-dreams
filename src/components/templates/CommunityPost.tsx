import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedFormFields, ContentStyles } from "@/components/EnhancedFormFields";
import { useContentStorage } from "@/hooks/useContentStorage";
import { useToast } from "@/hooks/use-toast";
import { Users, Eye, Save, ArrowLeft } from "lucide-react";

export const CommunityPost = () => {
  const { toast } = useToast();
  const { saveContent } = useContentStorage();
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [engagement, setEngagement] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [styles, setStyles] = useState<ContentStyles | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const generateContent = () => {
    if (!topic.trim() || !question.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the topic and main question."
      });
      return;
    }

    const communityContent = [
      `🤔 Let's Talk: ${topic}\n\n${context || "I've been thinking about this lately and would love to hear your perspective!"}`,
      
      `💭 The Question\n\n${question}\n\nThis is something I'm genuinely curious about, and I know this community has amazing insights!`,
      
      `🗣️ Why This Matters\n\n${engagement || "Your experiences and perspectives help all of us learn and grow. There's no right or wrong answer - just real, authentic thoughts from real people."}`,
      
      `👇 Share Your Thoughts!\n\nDrop a comment below with your take. I'll be reading every single response and engaging with as many as I can!\n\n${hashtags || "#community #discussion #perspective #learning"}`
    ];

    setGeneratedContent(communityContent);
    setShowPreview(true);
  };

  const saveGeneratedContent = () => {
    const contentId = saveContent(
      "community-post",
      `Community Discussion: ${topic}`,
      generatedContent,
      { 
        styles, 
        communityInfo: { topic, question, context, engagement, hashtags } 
      },
      tags
    );

    toast({
      title: "Community Post Created!",
      description: "Your community engagement post has been generated and saved."
    });

    // Reset form
    setTopic("");
    setQuestion("");
    setContext("");
    setEngagement("");
    setHashtags("");
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
          <p className="text-gray-600">Review your generated community post</p>
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
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Community Post</h2>
        </div>
        <p className="text-gray-600">Create engaging posts that spark meaningful discussions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Community Engagement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="topic">Topic/Theme *</Label>
            <Input
              id="topic"
              placeholder="What topic do you want to discuss?"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="question">Main Question *</Label>
            <Textarea
              id="question"
              placeholder="What specific question do you want to ask your community?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="context">Context/Background</Label>
            <Textarea
              id="context"
              placeholder="Provide some context or background for your question"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="engagement">Why It Matters</Label>
            <Textarea
              id="engagement"
              placeholder="Explain why this discussion is valuable for your community"
              value={engagement}
              onChange={(e) => setEngagement(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="hashtags">Hashtags</Label>
            <Input
              id="hashtags"
              placeholder="#community #discussion #yourhashtags"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <EnhancedFormFields onStyleChange={setStyles} onTagsChange={setTags} />

      <Button onClick={generateContent} className="w-full" size="lg">
        <Eye className="w-4 h-4 mr-2" />
        Preview Community Post
      </Button>
    </div>
  );
};
