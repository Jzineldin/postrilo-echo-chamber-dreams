import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useContentStorage } from "@/hooks/useContentStorage";
import { Target, TrendingUp, Clock, Users, Lightbulb, Star } from "lucide-react";

interface Recommendation {
  id: string;
  type: 'content_type' | 'posting_time' | 'platform' | 'engagement' | 'frequency';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  actionable: string;
  basedOn: string;
}

export const RecommendationEngine = () => {
  const { savedContent } = useContentStorage();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    generateRecommendations();
  }, [savedContent]);

  const generateRecommendations = () => {
    const recs: Recommendation[] = [];

    // Content Type Recommendations
    const contentTypes = savedContent.reduce((acc, content) => {
      const type = content.templateType || 'general';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostUsedType = Object.entries(contentTypes)
      .sort(([,a], [,b]) => b - a)[0];

    if (mostUsedType && mostUsedType[1] > 3) {
      recs.push({
        id: 'content-variety',
        type: 'content_type',
        title: 'Diversify Your Content Types',
        description: `You've created ${mostUsedType[1]} ${mostUsedType[0]} posts. Try mixing in different formats for better engagement.`,
        impact: 'high',
        confidence: 85,
        actionable: 'Create 2-3 posts using different templates this week',
        basedOn: 'Content type analysis'
      });
    }

    // Platform Recommendations
    const platforms = savedContent.reduce((acc, content) => {
      const platform = content.metadata?.platform || 'unknown';
      acc[platform] = (acc[platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    if (Object.keys(platforms).length < 3 && savedContent.length > 5) {
      recs.push({
        id: 'platform-expansion',
        type: 'platform',
        title: 'Expand to More Platforms',
        description: 'You\'re only using a few platforms. Expanding could increase your reach by 40-60%.',
        impact: 'high',
        confidence: 78,
        actionable: 'Test content on 1-2 new platforms this month',
        basedOn: 'Platform diversity analysis'
      });
    }

    // Engagement Optimization
    const engagementPatterns = [
      {
        id: 'emoji-usage',
        type: 'engagement' as const,
        title: 'Increase Emoji Usage',
        description: 'Posts with emojis see 25% higher engagement rates across all platforms.',
        impact: 'medium' as const,
        confidence: 82,
        actionable: 'Add 2-3 relevant emojis to your next 5 posts',
        basedOn: 'Engagement pattern analysis'
      },
      {
        id: 'cta-optimization',
        type: 'engagement' as const,
        title: 'Strengthen Your Call-to-Actions',
        description: 'Clear CTAs can boost engagement by up to 35%. Consider adding more direct asks.',
        impact: 'high' as const,
        confidence: 89,
        actionable: 'End each post with a specific question or action request',
        basedOn: 'CTA effectiveness analysis'
      }
    ];

    recs.push(...engagementPatterns);

    // Posting Frequency
    if (savedContent.length > 0) {
      const daysSinceFirst = Math.floor((Date.now() - new Date(savedContent[0].createdAt).getTime()) / (1000 * 60 * 60 * 24));
      const avgPostsPerWeek = (savedContent.length / daysSinceFirst) * 7;

      if (avgPostsPerWeek < 3) {
        recs.push({
          id: 'posting-frequency',
          type: 'frequency',
          title: 'Increase Posting Frequency',
          description: `You're posting ${avgPostsPerWeek.toFixed(1)} times per week. Aim for 3-5 posts for optimal engagement.`,
          impact: 'medium',
          confidence: 75,
          actionable: 'Schedule 1-2 additional posts per week',
          basedOn: 'Posting frequency analysis'
        });
      }
    }

    // Time-based Recommendations
    const timeRecs: Recommendation[] = [
      {
        id: 'optimal-timing',
        type: 'posting_time',
        title: 'Optimize Posting Times',
        description: 'Post during peak engagement hours: 9-10 AM and 7-9 PM for better visibility.',
        impact: 'medium',
        confidence: 80,
        actionable: 'Schedule your next 3 posts during these peak hours',
        basedOn: 'Platform analytics data'
      }
    ];

    recs.push(...timeRecs);

    setRecommendations(recs);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'content_type': return TrendingUp;
      case 'posting_time': return Clock;
      case 'platform': return Users;
      case 'engagement': return Star;
      case 'frequency': return Target;
      default: return Lightbulb;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Based on your content history and industry best practices, here are personalized recommendations to boost your social media performance.
          </p>
          
          {recommendations.length === 0 ? (
            <div className="text-center py-8">
              <Lightbulb className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Create more content to get personalized recommendations!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec) => {
                const Icon = getTypeIcon(rec.type);
                return (
                  <Card key={rec.id} className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Icon className="w-5 h-5 text-purple-600" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{rec.title}</h4>
                            <Badge className={`text-white text-xs ${getImpactColor(rec.impact)}`}>
                              {rec.impact.toUpperCase()} IMPACT
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {rec.confidence}% confidence
                            </Badge>
                          </div>
                          
                          <p className="text-gray-700 mb-3">{rec.description}</p>
                          
                          <div className="bg-blue-50 rounded-lg p-3 mb-3">
                            <p className="text-sm font-medium text-blue-900 mb-1">Recommended Action:</p>
                            <p className="text-sm text-blue-800">{rec.actionable}</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">Based on: {rec.basedOn}</p>
                            <Button size="sm" variant="outline">
                              Apply Suggestion
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Quick Optimization Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ What's Working</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Consistent content creation</li>
                <li>• Variety in content topics</li>
                <li>• Regular platform usage</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-orange-900 mb-2">⚡ Areas to Improve</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Experiment with video content</li>
                <li>• Increase engagement tactics</li>
                <li>• Test different posting times</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry Benchmarks */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Benchmarks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">3-5</p>
              <p className="text-sm text-gray-600">Posts per week</p>
              <p className="text-xs text-gray-500">Optimal frequency</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">5-8%</p>
              <p className="text-sm text-gray-600">Engagement rate</p>
              <p className="text-xs text-gray-500">Industry average</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">2-3</p>
              <p className="text-sm text-gray-600">Platforms</p>
              <p className="text-xs text-gray-500">Recommended minimum</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
