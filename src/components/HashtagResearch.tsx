
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Hash, TrendingUp, Lock } from 'lucide-react';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { useSubscription } from '@/hooks/useSubscription';

interface HashtagResearchProps {
  onHashtagsGenerated?: (hashtags: string[]) => void;
}

export const HashtagResearch = ({ onHashtagsGenerated }: HashtagResearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { hasAccess, currentPlanName } = useSubscriptionFeatures();
  const { createCheckout } = useSubscription();

  const hasHashtagAccess = hasAccess('hasHashtagResearch');

  const generateHashtags = async () => {
    if (!hasHashtagAccess || !searchQuery.trim()) return;
    
    setLoading(true);
    // Simulate hashtag generation
    setTimeout(() => {
      const generatedHashtags = [
        `#${searchQuery.replace(/\s+/g, '')}`,
        '#socialmedia',
        '#marketing',
        '#content',
        '#business',
        '#entrepreneur',
        '#digitalmarketing',
        '#social',
        '#growth',
        '#brand'
      ];
      setHashtags(generatedHashtags);
      onHashtagsGenerated?.(generatedHashtags);
      setLoading(false);
    }, 1500);
  };

  const handleUpgrade = async () => {
    await createCheckout('Creator');
  };

  if (!hasHashtagAccess) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Hashtag Research
            <Lock className="w-4 h-4 text-gray-400" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Hash className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Unlock Hashtag Research</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get AI-powered hashtag suggestions to maximize your content reach
            </p>
            <Badge variant="outline" className="bg-purple-100 text-purple-700 mb-4">
              Creator Plan Feature
            </Badge>
            <Button
              onClick={handleUpgrade}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Upgrade to Creator Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Hash className="w-5 h-5" />
          Hashtag Research
          <Badge className="bg-purple-100 text-purple-700">Creator</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter topic or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generateHashtags()}
          />
          <Button
            onClick={generateHashtags}
            disabled={loading || !searchQuery.trim()}
            className="flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            {loading ? 'Researching...' : 'Research'}
          </Button>
        </div>

        {hashtags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-medium text-sm">Recommended Hashtags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((hashtag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => navigator.clipboard.writeText(hashtag)}
                >
                  {hashtag}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500">Click any hashtag to copy it</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
