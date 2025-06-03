
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Instagram, Twitter, Linkedin, Facebook, Youtube, Hash } from "lucide-react";

interface PlatformPreviewProps {
  content: string;
  platform: string;
  hashtags?: string[];
}

export const PlatformPreview = ({ content, platform, hashtags = [] }: PlatformPreviewProps) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      default: return <Hash className="w-5 h-5" />;
    }
  };

  const getPlatformStyle = () => {
    switch (platform) {
      case 'instagram':
        return {
          bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
          text: 'text-white',
          accent: 'bg-white/20'
        };
      case 'twitter':
        return {
          bg: 'bg-blue-500',
          text: 'text-white',
          accent: 'bg-white/20'
        };
      case 'linkedin':
        return {
          bg: 'bg-blue-700',
          text: 'text-white',
          accent: 'bg-white/20'
        };
      case 'facebook':
        return {
          bg: 'bg-blue-600',
          text: 'text-white',
          accent: 'bg-white/20'
        };
      case 'youtube':
        return {
          bg: 'bg-red-600',
          text: 'text-white',
          accent: 'bg-white/20'
        };
      default:
        return {
          bg: 'bg-gray-600',
          text: 'text-white',
          accent: 'bg-white/20'
        };
    }
  };

  const formatContentForPlatform = (content: string) => {
    // Add platform-specific formatting
    switch (platform) {
      case 'twitter':
        return content.length > 280 ? content.substring(0, 277) + '...' : content;
      case 'linkedin':
        // Add professional formatting
        return content;
      case 'instagram':
        // Add visual formatting with line breaks
        return content.replace(/\.\s/g, '.\n\n');
      default:
        return content;
    }
  };

  const style = getPlatformStyle();
  const formattedContent = formatContentForPlatform(content);

  return (
    <Card className="overflow-hidden">
      <CardHeader className={`${style.bg} ${style.text} py-3`}>
        <CardTitle className="flex items-center gap-2 text-sm">
          {getPlatformIcon()}
          {platform.charAt(0).toUpperCase() + platform.slice(1)} Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Mock user profile */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div>
              <p className="font-semibold text-sm">Your Brand</p>
              <p className="text-xs text-gray-500">@yourbrand</p>
            </div>
          </div>

          {/* Content */}
          <div className="whitespace-pre-wrap text-sm">
            {formattedContent}
          </div>

          {/* Hashtags */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {hashtags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Mock engagement */}
          <div className="flex gap-4 text-xs text-gray-500 pt-2 border-t">
            <span>👍 42</span>
            <span>💬 8</span>
            <span>🔄 12</span>
            <span>📤 Share</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
