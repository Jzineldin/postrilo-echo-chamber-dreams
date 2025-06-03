
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MobileOptimizedButton } from './MobileOptimizedButton';
import { 
  Copy, 
  RefreshCw, 
  Share2, 
  Heart,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MobileContentPreviewProps {
  content: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  cached?: boolean;
  onRegenerate: () => void;
}

export const MobileContentPreview = ({
  content,
  platform,
  contentType,
  tone,
  goal,
  cached = false,
  onRegenerate
}: MobileContentPreviewProps) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy content",
        variant: "destructive"
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Generated Content',
          text: content
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      handleCopy();
    }
  };

  return (
    <Card className="bg-white border-green-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Content Ready
          </CardTitle>
          {cached && (
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              Cached
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">{platform}</Badge>
          <Badge variant="outline">{contentType}</Badge>
          <Badge variant="outline">{tone}</Badge>
          <Badge variant="outline">{goal}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <MobileOptimizedButton
            onClick={handleCopy}
            variant="default"
            size="default"
            icon={Copy}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Copy
          </MobileOptimizedButton>
          
          <MobileOptimizedButton
            onClick={handleShare}
            variant="outline"
            size="default"
            icon={Share2}
            className="border-blue-300 hover:bg-blue-50"
          >
            Share
          </MobileOptimizedButton>
        </div>
        
        <div className="flex gap-3">
          <MobileOptimizedButton
            onClick={onRegenerate}
            variant="outline"
            size="default"
            icon={RefreshCw}
            className="border-purple-300 hover:bg-purple-50 text-purple-700"
            fullWidth
          >
            Regenerate
          </MobileOptimizedButton>
          
          <MobileOptimizedButton
            onClick={() => {
              toast({
                title: "Saved!",
                description: "Content saved to your library",
              });
            }}
            variant="outline"
            size="default"
            icon={Heart}
            className="border-red-300 hover:bg-red-50 text-red-700"
          >
            Save
          </MobileOptimizedButton>
        </div>
      </CardContent>
    </Card>
  );
};
