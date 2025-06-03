
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { EnhancedContentGeneratorForm } from "./enhanced-content-generator/EnhancedContentGeneratorForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Copy, Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GeneratedContent {
  content: string;
  cached?: boolean;
  metadata?: {
    platform: string;
    contentType: string;
    generatedAt: number;
    promptVersion: string;
  };
}

interface GenerationError {
  type: string;
  message: string;
}

export const EnhancedContentGenerator = () => {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [generationError, setGenerationError] = useState<GenerationError | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleContentGenerated = (content: GeneratedContent) => {
    setGeneratedContent(content);
    setGenerationError(null);
  };

  const handleGenerationError = (error: GenerationError) => {
    setGenerationError(error);
    setGeneratedContent(null);
  };

  const handleCopy = () => {
    if (generatedContent?.content) {
      navigator.clipboard.writeText(generatedContent.content);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
    }
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    toast({
      title: "Saved!",
      description: "Content saved to your library",
    });
  };

  const handleRegenerate = () => {
    setGeneratedContent(null);
    setGenerationError(null);
    // The form will handle regeneration
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${isMobile ? 'px-3 py-4' : 'px-4 py-8'}`}>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-purple-600" />
          Enhanced Content Generator
        </h1>
        <p className="text-gray-600">Create AI-powered content optimized for any platform</p>
      </div>

      <EnhancedContentGeneratorForm
        onContentGenerated={handleContentGenerated}
        onGenerationError={handleGenerationError}
      />

      {generationError && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="text-red-700">
              <strong>Error:</strong> {generationError.message}
            </div>
          </CardContent>
        </Card>
      )}

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Content</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleCopy}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button size="sm" variant="outline" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleRegenerate}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="whitespace-pre-wrap text-gray-800">
                {generatedContent.content}
              </div>
            </div>
            {generatedContent.metadata && (
              <div className="mt-4 text-sm text-gray-500">
                Platform: {generatedContent.metadata.platform} | 
                Type: {generatedContent.metadata.contentType} |
                {generatedContent.cached ? " (Cached)" : " (Fresh)"}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
