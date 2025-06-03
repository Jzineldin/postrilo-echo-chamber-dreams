
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSubscriptionFeatures } from "@/hooks/useSubscriptionFeatures";
import { useSubscription } from "@/hooks/useSubscription";

interface Platform {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

const ALL_PLATFORMS: Platform[] = [
  {
    id: "twitter",
    name: "Twitter",
    icon: "🐦",
    description: "Share thoughts and engage in conversations",
    color: "bg-blue-500"
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    description: "Connect with friends and family",
    color: "bg-blue-600"
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📷",
    description: "Share photos and stories",
    color: "bg-pink-500"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    description: "Professional networking and content",
    color: "bg-blue-700"
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    description: "Short-form video content",
    color: "bg-black"
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "📺",
    description: "Video content and tutorials",
    color: "bg-red-600"
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: "📌",
    description: "Visual discovery and ideas",
    color: "bg-red-500"
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: "👻",
    description: "Ephemeral content and stories",
    color: "bg-yellow-400"
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: "🤖",
    description: "Community discussions and content",
    color: "bg-orange-600"
  }
];

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onPlatformToggle: (platformId: string) => void;
}

export const PlatformSelector = ({ selectedPlatforms, onPlatformToggle }: PlatformSelectorProps) => {
  const { canAccessPlatform, getAvailablePlatforms, currentPlanName } = useSubscriptionFeatures();
  const { createCheckout } = useSubscription();
  
  const availablePlatformIds = getAvailablePlatforms();
  const availablePlatforms = ALL_PLATFORMS.filter(platform => 
    availablePlatformIds.includes(platform.id)
  );
  const restrictedPlatforms = ALL_PLATFORMS.filter(platform => 
    !availablePlatformIds.includes(platform.id)
  );

  const handleUpgrade = async () => {
    if (currentPlanName === 'Free') {
      await createCheckout('Creator');
    } else {
      await createCheckout('Business');
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-lg">Select Platform</CardTitle>
        <CardDescription>
          Choose ONE platform for optimized content generation
          {selectedPlatforms.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              Selected: {availablePlatforms.find(p => p.id === selectedPlatforms[0])?.name}
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {availablePlatforms.map((platform) => (
            <Button
              key={platform.id}
              variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
              className={`h-auto p-3 flex flex-col items-center gap-2 transition-all hover:scale-105 ${
                selectedPlatforms.includes(platform.id) 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "hover:bg-blue-50"
              }`}
              onClick={() => onPlatformToggle(platform.id)}
            >
              <span className="text-2xl">{platform.icon}</span>
              <span className="font-medium text-sm">{platform.name}</span>
            </Button>
          ))}
        </div>

        {selectedPlatforms.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <span className="text-blue-600">ℹ️</span>
              <span>
                Content will be optimized specifically for <strong>{availablePlatforms.find(p => p.id === selectedPlatforms[0])?.name}</strong> 
                to maximize engagement and performance.
              </span>
            </div>
          </div>
        )}

        {restrictedPlatforms.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Upgrade to unlock more platforms</h4>
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                {currentPlanName === 'Free' ? 'Creator+' : 'Business'}
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
              {restrictedPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className="flex flex-col items-center gap-1 p-2 bg-white rounded border opacity-60"
                >
                  <span className="text-lg">{platform.icon}</span>
                  <span className="text-xs text-gray-600">{platform.name}</span>
                </div>
              ))}
            </div>
            <Button
              onClick={handleUpgrade}
              size="sm"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Upgrade to access all platforms
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
