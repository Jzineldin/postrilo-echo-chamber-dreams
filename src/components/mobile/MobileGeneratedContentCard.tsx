
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Share2 } from 'lucide-react';
import { GeneratedContentResult } from '@/types/contentGeneration';

interface MobileGeneratedContentCardProps {
  generatedContent: GeneratedContentResult;
}

export const MobileGeneratedContentCard = ({ generatedContent }: MobileGeneratedContentCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent.content);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Generated Content',
        text: generatedContent.content,
      });
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Generated Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="whitespace-pre-line text-sm leading-relaxed">
            {generatedContent.content}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
