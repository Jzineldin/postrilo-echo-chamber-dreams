
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSecureContentGeneration } from "@/hooks/useSecureContentGeneration";
import { AuthGuard } from "@/services/security/authGuard";
import { ContentFormCard } from "./ContentFormCard";
import { ContentResultsSection } from "./ContentResultsSection";
import { FormData, GeneratedContent, GenerationError } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";

interface RefactoredEnhancedContentGeneratorFormProps {
  canGenerateMore: boolean;
  postsRemaining: number;
}

export const RefactoredEnhancedContentGeneratorForm = ({
  canGenerateMore,
  postsRemaining,
}: RefactoredEnhancedContentGeneratorFormProps) => {
  const { toast } = useToast();
  
  // Authentication guard
  const { isAuthenticated, isLoading: authLoading } = AuthGuard.useRequireAuth();

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [generationError, setGenerationError] = useState<GenerationError | null>(null);

  const [formData, setFormData] = useState<FormData>({
    topic: "",
    platform: "instagram" as const,
    goal: "engagement" as const,
    tone: "professional" as const,
    contentType: "post",
    keyPoints: "",
    emojiUsage: true,
    hashtagDensity: true,
    shortSentences: true,
    useCache: true,
  });

  // Use secure content generation
  const { generateContent: secureGenerateContent, isGenerating, validationErrors } = useSecureContentGeneration();

  if (authLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying security credentials...</p>
        </CardContent>
      </Card>
    );
  }

  if (!isAuthenticated) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-5 h-5" />
            Security Access Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700">
            Secure content generation requires authentication. Please sign in to continue.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleFormDataChange = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleGenerate = async () => {
    if (!canGenerateMore) {
      toast({
        title: "Post limit reached",
        description: "You've reached your monthly post limit. Please upgrade to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for your content.",
        variant: "destructive",
      });
      return;
    }

    // Clear previous results
    setGeneratedContent(null);
    setGenerationError(null);

    try {
      // Use secure content generation
      const result = await secureGenerateContent({
        prompt: formData.topic,
        type: formData.contentType === 'video-script' ? 'video-script' : 'content',
        platforms: [formData.platform],
        temperature: 0.7,
        maxTokens: 600
      });

      const content: GeneratedContent = {
        id: Date.now().toString(),
        content: result.content || 'No content generated',
        platform: formData.platform,
        contentType: formData.contentType,
        tone: formData.tone,
        goal: formData.goal,
        topic: formData.topic,
        timestamp: Date.now(),
        hashtags: [],
        cached: false,
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0
        },
        metadata: {
          platform: formData.platform,
          contentType: formData.contentType,
          generatedAt: Date.now(),
          promptVersion: '1.0'
        }
      };
      
      setGeneratedContent(content);
      setGenerationError(null);
      
    } catch (error) {
      const generationError: GenerationError = {
        type: 'security_error',
        message: error instanceof Error ? error.message : 'Security validation failed',
        userFriendlyMessage: 'Content generation failed security validation. Please try with different content.',
        retryable: true
      };
      setGenerationError(generationError);
      setGeneratedContent(null);
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-green-600" />
        <span className="text-sm font-medium text-green-700">Secure Content Generation Active</span>
      </div>
      
      {validationErrors.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="text-red-700">
              <strong>Security Validation Issues:</strong>
              <ul className="list-disc ml-4 mt-2">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
      
      <ContentFormCard formData={formData} onFormDataChange={handleFormDataChange} />

      <ContentResultsSection
        isGenerating={isGenerating}
        generatedContent={generatedContent}
        generationError={generationError}
        canGenerateMore={canGenerateMore}
        postsRemaining={postsRemaining}
        onGenerate={handleGenerate}
        onRegenerate={handleRegenerate}
      />
    </div>
  );
};
