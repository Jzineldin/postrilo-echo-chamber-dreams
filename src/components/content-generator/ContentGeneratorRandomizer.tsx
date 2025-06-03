
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shuffle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentGeneratorRandomizerProps {
  onRandomize: (settings: {
    template: string;
    platforms: string[];
    prompt: string;
  }) => void;
}

export const ContentGeneratorRandomizer = ({ onRandomize }: ContentGeneratorRandomizerProps) => {
  const { toast } = useToast();

  const templates = [
    'basic-post',
    'quote-inspiration', 
    'brand-story',
    'product-launch',
    'tutorial-post',
    'community-post'
  ];

  const platforms = [
    'twitter',
    'facebook', 
    'instagram',
    'linkedin',
    'tiktok',
    'youtube'
  ];

  const randomPrompts = [
    "Share an inspiring story about overcoming challenges",
    "Announce an exciting new feature or product",
    "Create educational content that helps your audience",
    "Build community engagement with a fun question",
    "Share behind-the-scenes insights from your business",
    "Motivate your audience with actionable tips",
    "Celebrate a recent achievement or milestone",
    "Share a valuable lesson you've learned",
    "Create content about industry trends",
    "Engage followers with a relatable story"
  ];

  const handleRandomize = () => {
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    const randomPlatformCount = Math.floor(Math.random() * 3) + 1; // 1-3 platforms
    const randomPlatforms = platforms
      .sort(() => 0.5 - Math.random())
      .slice(0, randomPlatformCount);
    const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];

    onRandomize({
      template: randomTemplate,
      platforms: randomPlatforms,
      prompt: randomPrompt
    });

    toast({
      title: "Settings Randomized! 🎲",
      description: `Generated random template, platforms, and content idea.`
    });
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-purple-600" />
          Quick Start
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-purple-700">
            Need inspiration? Randomize your settings to get started quickly.
          </p>
          <Button
            onClick={handleRandomize}
            variant="outline"
            className="w-full flex items-center gap-2 bg-white/80 border-purple-300 text-purple-700 hover:bg-purple-100"
          >
            <Shuffle className="w-4 h-4" />
            Randomize Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
