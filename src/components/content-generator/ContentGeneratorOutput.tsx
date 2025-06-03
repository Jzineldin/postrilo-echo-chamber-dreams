
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, Calendar, Wand2, Save, Eye, Hash, Archive } from "lucide-react";
import { SocialPostingActions } from "@/components/SocialPostingActions";
import { HashtagResearch } from "@/components/HashtagResearch";
import { CharacterCountDisplay } from "@/components/ui/CharacterCountDisplay";
import { ContentHistoryService } from "@/services/contentHistoryService";
import { PlatformPreview } from "./PlatformPreview";
import { HashtagSuggestions } from "./HashtagSuggestions";
import { useToast } from "@/hooks/use-toast";
import { useAutoContentSave } from "@/hooks/useAutoContentSave";

interface ContentGeneratorOutputProps {
  generatedContent: string;
  hasAdvancedScheduling: boolean;
  selectedPlatforms?: string[];
  onCopy: () => void;
  contentMetadata?: {
    platform: string;
    contentType: string;
    tone: string;
    goal: string;
    topic: string;
    keyPoints?: string;
    hashtags?: string[];
  };
}

export const ContentGeneratorOutput = ({
  generatedContent,
  hasAdvancedScheduling,
  selectedPlatforms = [],
  onCopy,
  contentMetadata
}: ContentGeneratorOutputProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>(contentMetadata?.hashtags || []);
  const { toast } = useToast();
  const { saveGeneratedContent } = useAutoContentSave();

  // Auto-save content when it's generated
  useEffect(() => {
    if (generatedContent && contentMetadata && !isSaved) {
      const contentId = saveGeneratedContent({
        content: generatedContent,
        platform: contentMetadata.platform,
        contentType: contentMetadata.contentType,
        tone: contentMetadata.tone,
        goal: contentMetadata.goal,
        topic: contentMetadata.topic,
        keyPoints: contentMetadata.keyPoints,
        hashtags: selectedHashtags
      });

      if (contentId) {
        setIsSaved(true);
      }
    }
  }, [generatedContent, contentMetadata, saveGeneratedContent, selectedHashtags, isSaved]);

  const handleManualSave = () => {
    if (contentMetadata && generatedContent) {
      try {
        ContentHistoryService.saveContent({
          content: generatedContent,
          platform: contentMetadata.platform,
          contentType: contentMetadata.contentType,
          tone: contentMetadata.tone,
          goal: contentMetadata.goal,
          topic: contentMetadata.topic,
          hashtags: selectedHashtags
        });
        
        toast({
          title: "Content Saved",
          description: "Added to your content history",
        });
      } catch (error) {
        console.error('Failed to save content:', error);
      }
    }
  };

  const handleExport = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `postrilo-content-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Content Exported",
      description: "Downloaded as text file",
    });
  };

  const primaryPlatform = selectedPlatforms[0] || contentMetadata?.platform || 'instagram';

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Generated Content</span>
            {isSaved && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Archive className="w-4 h-4" />
                <span>Auto-saved to library</span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {generatedContent ? (
            <>
              <div className="bg-gray-50 p-4 rounded-lg border min-h-48">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                  {generatedContent}
                </pre>
              </div>
              
              {/* Character Count Validation */}
              <CharacterCountDisplay 
                content={generatedContent}
                platform={primaryPlatform}
              />
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={onCopy}
                  variant="outline"
                  className="flex-1 min-w-0"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="flex-1 min-w-0"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>

                <Button
                  onClick={() => setShowPreview(!showPreview)}
                  variant="outline"
                  className="flex-1 min-w-0"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? 'Hide' : 'Preview'}
                </Button>
                
                <Button
                  onClick={handleManualSave}
                  variant="outline"
                  className="flex-1 min-w-0"
                  disabled={isSaved}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                
                {hasAdvancedScheduling && (
                  <Button
                    variant="outline"
                    className="flex-1 min-w-0"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Wand2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your generated content will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Platform Preview */}
      {generatedContent && showPreview && (
        <PlatformPreview 
          content={generatedContent}
          platform={primaryPlatform}
          hashtags={selectedHashtags}
        />
      )}

      {/* Hashtag Suggestions */}
      {generatedContent && contentMetadata && (
        <HashtagSuggestions 
          platform={contentMetadata.platform}
          topic={contentMetadata.topic}
          tone={contentMetadata.tone}
          onHashtagsSelected={setSelectedHashtags}
        />
      )}

      {/* Hashtag Research */}
      {generatedContent && (
        <HashtagResearch />
      )}

      {/* Social Media Posting Actions */}
      {generatedContent && (
        <SocialPostingActions 
          content={generatedContent}
          platforms={selectedPlatforms}
        />
      )}
    </div>
  );
};
