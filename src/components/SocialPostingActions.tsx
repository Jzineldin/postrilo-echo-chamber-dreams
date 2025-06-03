
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Share2, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSocialAccounts } from "@/hooks/useSocialAccounts";
import { SocialMediaService } from "@/services/socialMediaService";
import { useState } from "react";

interface SocialPostingActionsProps {
  content: string;
  platforms?: string[];
}

export const SocialPostingActions = ({ content, platforms = [] }: SocialPostingActionsProps) => {
  const { toast } = useToast();
  const { getConnectedAccounts } = useSocialAccounts();
  const [postingStatus, setPostingStatus] = useState<{ [key: string]: 'idle' | 'posting' | 'posted' | 'error' }>({});
  const connectedAccounts = getConnectedAccounts();

  const validateContentForPlatform = (platform: string, content: string) => {
    const limits = {
      twitter: 280,
      instagram: 2200,
      facebook: 63206,
      linkedin: 1300,
      tiktok: 150,
      youtube: 5000
    };
    
    const limit = limits[platform as keyof typeof limits];
    return {
      isValid: !limit || content.length <= limit,
      limit,
      currentLength: content.length
    };
  };

  const postToPlatform = async (platform: string) => {
    if (!content.trim()) {
      toast({
        title: "No Content",
        description: "Please generate content first before posting.",
        variant: "destructive"
      });
      return;
    }

    const validation = validateContentForPlatform(platform, content);
    if (!validation.isValid) {
      toast({
        title: "Content Too Long",
        description: `Content exceeds ${platform} limit of ${validation.limit} characters (current: ${validation.currentLength})`,
        variant: "destructive"
      });
      return;
    }

    setPostingStatus(prev => ({ ...prev, [platform]: 'posting' }));

    try {
      const result = await SocialMediaService.postContent({
        platform,
        content,
        status: 'draft'
      });

      if (result.success) {
        setPostingStatus(prev => ({ ...prev, [platform]: 'posted' }));
        toast({
          title: "Posted Successfully",
          description: `Content posted to ${platform}!`
        });
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      setPostingStatus(prev => ({ ...prev, [platform]: 'error' }));
      toast({
        title: "Posting Failed",
        description: error instanceof Error ? error.message : "Failed to post content",
        variant: "destructive"
      });
    }
  };

  const openPlatformComposer = (platform: string) => {
    if (!content.trim()) {
      toast({
        title: "No Content",
        description: "Please generate content first before posting.",
        variant: "destructive"
      });
      return;
    }

    const validation = validateContentForPlatform(platform, content);
    if (!validation.isValid) {
      toast({
        title: "Content Too Long",
        description: `Content exceeds ${platform} limit of ${validation.limit} characters. Please shorten your content.`,
        variant: "destructive"
      });
      return;
    }

    // Encode content for URLs
    const encodedContent = encodeURIComponent(content);
    let url = '';

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedContent}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?quote=${encodedContent}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedContent}`;
        break;
      case 'reddit':
        url = `https://www.reddit.com/submit?title=${encodedContent}`;
        break;
      case 'pinterest':
        url = `https://pinterest.com/pin/create/button/?description=${encodedContent}`;
        break;
      default:
        toast({
          title: "Platform Not Supported",
          description: `Direct posting to ${platform} is not available yet.`,
          variant: "destructive"
        });
        return;
    }

    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    
    toast({
      title: "Opening Composer",
      description: `Opening ${platform} composer with your content.`
    });
  };

  const getSupportedPlatforms = () => {
    return [
      { id: 'twitter', name: 'Twitter/X', icon: '𝕏', supported: true, directPost: true },
      { id: 'facebook', name: 'Facebook', icon: '📘', supported: true, directPost: false },
      { id: 'linkedin', name: 'LinkedIn', icon: '💼', supported: true, directPost: false },
      { id: 'reddit', name: 'Reddit', icon: '🤖', supported: true, directPost: false },
      { id: 'pinterest', name: 'Pinterest', icon: '📌', supported: true, directPost: false },
      { id: 'instagram', name: 'Instagram', icon: '📷', supported: false, directPost: false },
      { id: 'tiktok', name: 'TikTok', icon: '🎵', supported: false, directPost: false },
    ];
  };

  const supportedPlatforms = getSupportedPlatforms();
  const availablePlatforms = supportedPlatforms.filter(p => p.supported);
  const unavailablePlatforms = supportedPlatforms.filter(p => !p.supported);

  // Filter platforms based on selected platforms or show all
  const platformsToShow = platforms.length > 0 
    ? availablePlatforms.filter(p => platforms.includes(p.id))
    : availablePlatforms;

  if (!content.trim()) {
    return null;
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Share2 className="w-5 h-5" />
          Post to Social Media
        </CardTitle>
        <p className="text-sm text-gray-600">
          Click to post directly or open the platform's composer
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Platform Validation Preview */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <h4 className="text-sm font-medium">Content Validation</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {platformsToShow.map((platform) => {
              const validation = validateContentForPlatform(platform.id, content);
              return (
                <div key={platform.id} className="flex items-center gap-1">
                  {validation.isValid ? (
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-red-600" />
                  )}
                  <span className={validation.isValid ? 'text-green-700' : 'text-red-700'}>
                    {platform.name}: {validation.currentLength}/{validation.limit || '∞'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Available Platforms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {platformsToShow.map((platform) => {
            const isConnected = connectedAccounts.some(acc => acc.id === platform.id);
            const status = postingStatus[platform.id] || 'idle';
            const validation = validateContentForPlatform(platform.id, content);
            
            return (
              <Button
                key={platform.id}
                onClick={() => platform.directPost && isConnected ? postToPlatform(platform.id) : openPlatformComposer(platform.id)}
                variant="outline"
                disabled={!validation.isValid || status === 'posting'}
                className="h-auto p-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{platform.icon}</span>
                  <div className="text-left">
                    <p className="font-medium">
                      {platform.directPost && isConnected ? 'Post to' : 'Open'} {platform.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {status === 'posting' ? 'Posting...' : 
                       status === 'posted' ? 'Posted!' : 
                       status === 'error' ? 'Failed' :
                       platform.directPost && isConnected ? 'Direct post' : 'Opens composer'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isConnected && (
                    <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                      Connected
                    </Badge>
                  )}
                  {!validation.isValid && (
                    <Badge variant="destructive" className="text-xs">
                      Too long
                    </Badge>
                  )}
                  {status === 'posted' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {/* Unavailable Platforms */}
        {unavailablePlatforms.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium text-gray-700 mb-2">Coming Soon:</p>
            <div className="flex flex-wrap gap-2">
              {unavailablePlatforms.map((platform) => (
                <Badge key={platform.id} variant="secondary" className="text-xs">
                  {platform.icon} {platform.name}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              These platforms require special integration. Consider copying content manually.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
