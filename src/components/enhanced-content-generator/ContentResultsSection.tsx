
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Clock, AlertTriangle, CheckCircle2, Zap } from "lucide-react";
import { GeneratedContent, GenerationError } from "./types";
import { ProgressIndicator } from "@/components/ui/progress-indicator";

interface ContentResultsSectionProps {
  generatedContent: GeneratedContent | null;
  generationError: GenerationError | null;
  isGenerating: boolean;
  canGenerateMore: boolean;
  postsRemaining: number;
  generationProgress?: {
    stage: 'initializing' | 'analyzing' | 'generating' | 'optimizing' | 'finalizing' | 'completed' | 'error';
    message: string;
    progress: number;
    estimatedTimeRemaining?: number;
  };
  onGenerate: () => void;
  onRegenerate: () => void;
}

export const ContentResultsSection = ({
  generatedContent,
  generationError,
  isGenerating,
  canGenerateMore,
  postsRemaining,
  generationProgress,
  onGenerate,
  onRegenerate
}: ContentResultsSectionProps) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Show progress indicator if generating
  if (isGenerating && generationProgress) {
    return (
      <ProgressIndicator
        progress={generationProgress}
        isVisible={true}
        className="h-96"
      />
    );
  }

  if (!generatedContent && !isGenerating) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Enhanced AI content generation ready</p>
          <p className="text-sm mt-2">Fill out the form and generate content to see results</p>
          {canGenerateMore && (
            <Button 
              onClick={onGenerate}
              className="mt-4"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Content"}
            </Button>
          )}
        </div>
      </Card>
    );
  }

  if (!generatedContent) {
    return null;
  }

  return (
    <>
      {/* Content Display */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Generated Content</CardTitle>
            <div className="flex items-center gap-2">
              {generatedContent.cached && (
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Cached
                </Badge>
              )}
              {generationError ? (
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  With Errors
                </Badge>
              ) : (
                <Badge variant="default" className="text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Success
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="whitespace-pre-line text-gray-800 leading-relaxed">
              {generatedContent.content}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(generatedContent.content)}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              disabled={isGenerating}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generation Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Generation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {generatedContent.usage && (
            <div className="text-sm text-gray-600">
              <p>Tokens used: {generatedContent.usage.totalTokens}</p>
              <p>Generated: {new Date(generatedContent.metadata?.generatedAt || Date.now()).toLocaleString()}</p>
            </div>
          )}
          
          {generationError && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-sm text-red-800 font-medium">Error Details:</p>
              <p className="text-sm text-red-700">{generationError.message}</p>
              {generationError.retryAfter && (
                <p className="text-xs text-red-600 mt-1">
                  Rate limit: Retry after {generationError.retryAfter} seconds
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
