
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, X } from 'lucide-react';

interface ContentTipProps {
  isMobile: boolean;
}

export const ContentTip = ({ isMobile }: ContentTipProps) => {
  const tips = [
    {
      title: "Use Trending Hashtags",
      description: "Research current hashtags in your niche to increase visibility and engagement.",
      category: "Growth"
    },
    {
      title: "Post at Peak Hours",
      description: "Schedule your content when your audience is most active for better engagement.",
      category: "Timing"
    },
    {
      title: "Tell Stories",
      description: "Share behind-the-scenes content and personal stories to connect with your audience.",
      category: "Content"
    },
    {
      title: "Use Visual Content",
      description: "Posts with images or videos get significantly more engagement than text-only posts.",
      category: "Visual"
    }
  ];

  const [currentTip, setCurrentTip] = React.useState(0);
  const [dismissed, setDismissed] = React.useState(false);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  if (dismissed) return null;

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            Content Tip
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="bg-yellow-100 px-2 py-1 rounded text-xs font-medium text-yellow-800 inline-block">
            {tips[currentTip].category}
          </div>
          <h4 className="font-medium text-sm">{tips[currentTip].title}</h4>
          <p className="text-xs text-gray-600">{tips[currentTip].description}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={nextTip}
            className="w-full text-xs"
          >
            Next Tip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
