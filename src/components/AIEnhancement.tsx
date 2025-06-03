
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { centralizedAIService } from '@/services/centralizedAIService';
import { Sparkles, Lightbulb, Hash, Target, Loader2, AlertTriangle, Zap } from 'lucide-react';

interface AIEnhancementProps {
  content: string;
  onContentUpdate: (newContent: string) => void;
  platform?: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok';
}

export const AIEnhancement = ({ content, onContentUpdate, platform = 'instagram' }: AIEnhancementProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [improvedContent, setImprovedContent] = useState('');

  const handleAIEnhancement = async () => {
    if (!content.trim()) {
      toast({
        title: "No Content",
        description: "Please add some content first to enhance it with AI."
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Get content optimization suggestions
      const optimizationSuggestions = await centralizedAIService.optimizeContent({
        content,
        platform,
        objective: 'engagement'
      });
      
      setSuggestions(optimizationSuggestions);

      // Generate hashtags
      const hashtags = await centralizedAIService.generateHashtags(content, 8);
      setGeneratedHashtags(hashtags);

      toast({
        title: "AI Analysis Complete!",
        description: "Generated suggestions and hashtags for your content."
      });
    } catch (error) {
      console.error('AI enhancement error:', error);
      toast({
        title: "AI Enhancement Failed",
        description: "There was an error analyzing your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImproveContent = async () => {
    if (suggestions.length === 0) {
      toast({
        title: "No Suggestions",
        description: "Run AI analysis first to get improvement suggestions."
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const improvements = suggestions
        .filter(s => s.type === 'copy_improvement')
        .map(s => s.suggestion);
      
      if (improvements.length === 0) {
        improvements.push("Make the content more engaging and compelling");
      }

      const improved = await centralizedAIService.improveContent(content, improvements);
      setImprovedContent(improved);

      toast({
        title: "Content Improved!",
        description: "Your content has been enhanced based on AI suggestions."
      });
    } catch (error) {
      console.error('Content improvement error:', error);
      toast({
        title: "Improvement Failed",
        description: "There was an error improving your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applyImprovedContent = () => {
    onContentUpdate(improvedContent);
    setImprovedContent('');
    toast({
      title: "Content Applied!",
      description: "The improved content has been applied to your post."
    });
  };

  const addHashtagsToContent = () => {
    if (generatedHashtags.length > 0) {
      const hashtagString = generatedHashtags.join(' ');
      onContentUpdate(`${content}\n\n${hashtagString}`);
      toast({
        title: "Hashtags Added!",
        description: "Generated hashtags have been added to your content."
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Content Enhancement
            <Badge variant="secondary" className="text-xs">
              <Zap className="w-3 h-3 mr-1" />
              Powered by AI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={handleAIEnhancement} 
              disabled={isLoading}
              variant="outline"
              className="flex-1"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
              Analyze Content
            </Button>
            <Button 
              onClick={handleImproveContent} 
              disabled={isLoading || suggestions.length === 0}
              variant="outline"
              className="flex-1"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
              Improve Content
            </Button>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                AI Suggestions
              </h4>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.type.replace('_', ' ')}
                      </Badge>
                      <span className="text-sm font-medium">
                        {Math.round(suggestion.confidence * 100)}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{suggestion.suggestion}</p>
                    <p className="text-xs text-gray-500 mt-1">{suggestion.reasoning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generated Hashtags */}
          {generatedHashtags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Generated Hashtags
                </h4>
                <Button size="sm" onClick={addHashtagsToContent}>
                  Add to Content
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {generatedHashtags.map((hashtag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {hashtag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Improved Content Preview */}
          {improvedContent && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Improved Content</h4>
                <Button size="sm" onClick={applyImprovedContent}>
                  Apply Changes
                </Button>
              </div>
              <Textarea
                value={improvedContent}
                onChange={(e) => setImprovedContent(e.target.value)}
                rows={6}
                className="text-sm"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
