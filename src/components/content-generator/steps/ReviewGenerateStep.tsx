
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, Sparkles, RefreshCw, RotateCcw } from "lucide-react";
import { FormData } from "../multi-step/types";
import { useToast } from "@/hooks/use-toast";

interface ReviewGenerateStepProps {
  formData: FormData;
  generatedContent?: string;
  generatedHashtags?: string[];
  isGenerating: boolean;
  onGenerate: () => void;
  canGenerateMore: boolean;
  onPrevious?: () => void;
  onStartOver?: () => void;
}

export const ReviewGenerateStep = ({ 
  formData, 
  generatedContent, 
  generatedHashtags, 
  isGenerating, 
  onGenerate,
  canGenerateMore,
  onPrevious,
  onStartOver
}: ReviewGenerateStepProps) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const platformDisplay = formData.platforms?.length > 0 
    ? formData.platforms.join(", ") 
    : formData.platform || "Not specified";

  const reviewItems = [
    { label: "Content Type", value: formData.contentType },
    { label: "Topic", value: formData.topic },
    { label: "Platform(s)", value: platformDisplay },
    { label: "Tone", value: formData.tone },
    { label: "Goal", value: formData.goal },
    { label: "Language", value: formData.language },
  ];

  // Add optional fields if they exist
  if (formData.includeEmojis) {
    reviewItems.push({ label: "Include Emojis", value: "Yes" });
  }
  
  if (formData.includeHashtags) {
    reviewItems.push({ label: "Include Hashtags", value: "Yes" });
  }

  if (formData.keyPoints && formData.keyPoints.length > 0) {
    reviewItems.push({ 
      label: "Key Points", 
      value: formData.keyPoints.join(", ") 
    });
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Review & Generate</h2>
        <p className="text-gray-600">Review your settings and generate your content</p>
      </div>

      {/* Review Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Content Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reviewItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{item.label}:</span>
              <Badge variant="secondary">{item.value}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button
          onClick={onGenerate}
          disabled={isGenerating || !canGenerateMore}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>
      </div>

      {/* Generated Content */}
      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Content</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generatedContent)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="whitespace-pre-wrap">{generatedContent}</p>
            </div>
            
            {generatedHashtags && generatedHashtags.length > 0 && (
              <>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-medium mb-2">Suggested Hashtags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {generatedHashtags.map((hashtag, index) => (
                      <Badge key={index} variant="outline">
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {generatedContent && (
        <div className="flex gap-3 justify-center">
          {onPrevious && (
            <Button variant="outline" onClick={onPrevious}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Previous Step
            </Button>
          )}
          {onStartOver && (
            <Button variant="outline" onClick={onStartOver}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
