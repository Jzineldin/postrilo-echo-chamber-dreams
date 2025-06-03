
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useEnhancedContentGeneration } from "./hooks/useEnhancedContentGeneration";
import { ContentFormCard } from "./ContentFormCard";
import { ContentResultsSection } from "./ContentResultsSection";
import { FormData, GeneratedContent, GenerationError } from "./types";

interface RefactoredEnhancedContentGeneratorFormProps {
  canGenerateMore: boolean;
  postsRemaining: number;
}

export const RefactoredEnhancedContentGeneratorForm = ({
  canGenerateMore,
  postsRemaining,
}: RefactoredEnhancedContentGeneratorFormProps) => {
  const { toast } = useToast();

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

  const { isGenerating, generateEnhancedContent } = useEnhancedContentGeneration(
    (content: GeneratedContent) => {
      setGeneratedContent(content);
      setGenerationError(null);
    },
    (error: GenerationError) => {
      setGenerationError(error);
      setGeneratedContent(null);
    }
  );

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

    // Generate content with type-safe assignments
    const generateFormData: FormData = {
      ...formData,
      contentType: formData.contentType as FormData["contentType"],
      tone: formData.tone as FormData["tone"],
    };

    await generateEnhancedContent(generateFormData);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="space-y-6">
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
