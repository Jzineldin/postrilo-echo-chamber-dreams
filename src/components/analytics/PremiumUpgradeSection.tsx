
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Crown, 
  Info, 
  Lightbulb, 
  BarChart3, 
  TrendingUp, 
  Target, 
  Download 
} from "lucide-react";

export const PremiumUpgradeSection = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <BarChart3 className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
        <p className="text-gray-600">Get insights into your content performance and optimization opportunities</p>
      </div>

      {/* What Analytics Does - Explanation */}
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>What are Analytics?</strong> Analytics track how your content performs across social media platforms. 
          You can see which posts get the most engagement, what content types work best, and get AI-powered recommendations 
          to improve your content strategy and reach more people.
        </AlertDescription>
      </Alert>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What You'll Get with Analytics:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Performance Tracking:</strong> See likes, shares, comments, and reach for each post</li>
              <li>• <strong>Platform Insights:</strong> Learn which platforms work best for your content</li>
              <li>• <strong>Content Optimization:</strong> AI suggestions to improve future posts</li>
              <li>• <strong>Trend Analysis:</strong> Spot what content types perform best over time</li>
              <li>• <strong>Export Reports:</strong> Download data for presentations and planning</li>
            </ul>
          </div>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-8 text-center">
          <Crown className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h3 className="text-xl font-semibold mb-2">Upgrade to Premium</h3>
          <p className="text-gray-600 mb-6">
            Unlock detailed analytics, performance tracking, and AI-powered recommendations to supercharge your content strategy.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { icon: BarChart3, title: "Usage Analytics", desc: "Platform & goal insights" },
              { icon: TrendingUp, title: "Performance Tracking", desc: "Engagement metrics" },
              { icon: Target, title: "AI Recommendations", desc: "Optimization tips" },
              { icon: Download, title: "Export Reports", desc: "CSV & PDF exports" }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/60 rounded-lg p-4">
                  <Icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              );
            })}
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Upgrade to Premium
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
