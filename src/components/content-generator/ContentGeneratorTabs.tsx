import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HashtagResearch } from "@/components/HashtagResearch";
import { AnalyticsPanel } from "@/components/AnalyticsPanel";
import { Sparkles, BarChart3, Users, Lock, Zap } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";

interface ContentGeneratorTabsProps {
  hasHashtagResearch: boolean;
  hasAnalytics: boolean;
  hasTeamCollaboration: boolean;
  onHashtagsGenerated: (hashtags: string[]) => void;
}

export const ContentGeneratorTabs = ({
  hasHashtagResearch,
  hasAnalytics,
  hasTeamCollaboration,
  onHashtagsGenerated
}: ContentGeneratorTabsProps) => {
  const { createCheckout, planName } = useSubscription();

  const handleUpgrade = async (plan: string) => {
    await createCheckout(plan);
  };

  const UpgradeCard = ({ 
    feature, 
    icon, 
    description, 
    requiredPlan,
    benefits 
  }: { 
    feature: string;
    icon: React.ReactNode;
    description: string;
    requiredPlan: string;
    benefits: string[];
  }) => (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          {feature}
          <Lock className="w-4 h-4 text-gray-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {icon}
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Unlock {feature}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          
          <div className="space-y-2 mb-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded border text-left">
                <div className="font-medium text-gray-700 text-sm">{benefit}</div>
              </div>
            ))}
          </div>
          
          <Badge variant="outline" className="bg-purple-100 text-purple-700 mb-4">
            {requiredPlan} Plan Feature
          </Badge>
          
          <div className="space-y-2">
            {planName === 'Free' && (
              <>
                <Button
                  onClick={() => handleUpgrade('Creator')}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="sm"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Upgrade to Creator - $9.99/month
                </Button>
                <Button
                  onClick={() => handleUpgrade('Business')}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  Upgrade to Business - $19.99/month
                </Button>
              </>
            )}
            
            {planName === 'Creator' && requiredPlan === 'Business' && (
              <Button
                onClick={() => handleUpgrade('Business')}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                <Zap className="w-4 h-4 mr-2" />
                Upgrade to Business - $19.99/month
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return {
    hashtags: hasHashtagResearch ? (
      <HashtagResearch onHashtagsGenerated={onHashtagsGenerated} />
    ) : (
      <UpgradeCard
        feature="Hashtag Research"
        icon={<Sparkles className="w-8 h-8 text-purple-500" />}
        description="Get AI-powered hashtag suggestions to maximize your content reach"
        requiredPlan="Creator"
        benefits={[
          "AI-powered hashtag suggestions",
          "Trending hashtag discovery",
          "Hashtag performance analytics",
          "Custom hashtag sets"
        ]}
      />
    ),

    analytics: hasAnalytics ? (
      <AnalyticsPanel />
    ) : (
      <UpgradeCard
        feature="Analytics & Performance Tips"
        icon={<BarChart3 className="w-8 h-8 text-blue-500" />}
        description="Track your content performance and get AI-powered optimization tips"
        requiredPlan="Business"
        benefits={[
          "Detailed performance metrics",
          "AI-powered optimization tips",
          "Content performance tracking",
          "Competitor insights"
        ]}
      />
    ),

    team: hasTeamCollaboration ? (
      <Card className="bg-white/80 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Collaboration
            <Badge className="bg-blue-100 text-blue-700">Business</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 py-8">Team collaboration features coming soon...</p>
        </CardContent>
      </Card>
    ) : (
      <UpgradeCard
        feature="Team Collaboration"
        icon={<Users className="w-8 h-8 text-green-500" />}
        description="Collaborate with your team on content creation and approval workflows"
        requiredPlan="Business"
        benefits={[
          "Team member invitations",
          "Content approval workflows",
          "Shared brand voice settings",
          "Team performance analytics"
        ]}
      />
    )
  };
};
