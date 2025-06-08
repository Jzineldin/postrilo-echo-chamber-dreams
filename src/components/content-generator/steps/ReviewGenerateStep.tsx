
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Copy, Save, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import { FormData } from "../multi-step/types";
import { ContentQualityService } from "@/services/ai/contentQualityService";

interface ReviewGenerateStepProps {
  formData: FormData;
  generatedContent: string;
  generatedHashtags: string[];
  isGenerating: boolean;
  canGenerateMore: boolean;
  onGenerate: () => void;
  onPrevious?: () => void;
  onStartOver?: () => void;
}

export const ReviewGenerateStep = ({
  formData,
  generatedContent,
  generatedHashtags,
  isGenerating,
  canGenerateMore,
  onGenerate,
  onPrevious,
  onStartOver
}: ReviewGenerateStepProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  // Get platform for quality evaluation
  const platform = formData.platform || formData.platforms?.[0] || 'instagram';

  // Evaluate content quality if content exists
  const qualityEvaluation = generatedContent ? 
    ContentQualityService.evaluateContent(generatedContent, platform, formData.language) : 
    null;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Review & Generate</h2>
        <p className="text-gray-600">Review your settings and generate your content</p>
      </div>

      {/* Settings Review */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Type:</span> {formData.contentType}
            </div>
            <div>
              <span className="font-medium">Platform:</span> {platform}
            </div>
            <div>
              <span className="font-medium">Language:</span> {formData.language}
            </div>
            <div>
              <span className="font-medium">Tone:</span> {formData.tone}
            </div>
            <div>
              <span className="font-medium">Goal:</span> {formData.goal}
            </div>
            <div>
              <span className="font-medium">Emojis:</span> {formData.includeEmojis ? 'Yes' : 'No'}
            </div>
          </div>
          
          <div className="pt-2">
            <span className="font-medium">Topic:</span>
            <p className="text-gray-600 mt-1">{formData.topic}</p>
          </div>

          {/* Handle both keyPoints and bulletPoints */}
          {((formData.keyPoints && formData.keyPoints.length > 0) || (formData.bulletPoints && formData.bulletPoints.length > 0)) && (
            <div className="pt-2">
              <span className="font-medium">Key Points:</span>
              <ul className="list-disc list-inside text-gray-600 mt-1">
                {(formData.keyPoints || formData.bulletPoints || []).map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="text-center">
        <Button
          onClick={onGenerate}
          disabled={isGenerating || !canGenerateMore}
          size="lg"
          className="px-8"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Content"
          )}
        </Button>
        
        {!canGenerateMore && (
          <p className="text-sm text-red-600 mt-2">
            Generation limit reached.
          </p>
        )}
      </div>

      {/* Generated Content */}
      {generatedContent && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                Generated Content
                {qualityEvaluation && (
                  <Badge variant={qualityEvaluation.score >= 80 ? "default" : "destructive"}>
                    Quality: {qualityEvaluation.score}%
                  </Badge>
                )}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={onGenerate}>
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Regenerate
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quality Assessment */}
            {qualityEvaluation && (qualityEvaluation.issues.length > 0 || qualityEvaluation.suggestions.length > 0) && (
              <div className="space-y-2">
                {qualityEvaluation.issues.length > 0 && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-red-700">Content Issues:</div>
                      <ul className="text-sm text-red-600 mt-1">
                        {qualityEvaluation.issues.map((issue, index) => (
                          <li key={index}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {qualityEvaluation.suggestions.length > 0 && (
                  <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-700">Suggestions:</div>
                      <ul className="text-sm text-blue-600 mt-1">
                        {qualityEvaluation.suggestions.map((suggestion, index) => (
                          <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
              {generatedContent}
            </div>
            
            {/* Generated Hashtags */}
            {generatedHashtags && generatedHashtags.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Suggested Hashtags:</h4>
                <div className="flex flex-wrap gap-1">
                  {generatedHashtags.map((hashtag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{hashtag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {(onPrevious || onStartOver) && (
        <div className="flex justify-between pt-4">
          {onPrevious && (
            <Button variant="outline" onClick={onPrevious}>
              Previous
            </Button>
          )}
          {onStartOver && (
            <Button variant="outline" onClick={onStartOver}>
              Start Over
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
