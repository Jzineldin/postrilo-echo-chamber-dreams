
import React from "react";
import { ResponsiveContentGenerator } from "./content-generator/ResponsiveContentGenerator";

interface MultiStepContentGeneratorProps {
  canGenerateMore: boolean;
  postsRemaining: number;
  onBack?: () => void;
  initialTemplate?: any;
  onContentGenerated?: (content: any) => void;
  onGenerationError?: (error: any) => void;
}

export const MultiStepContentGenerator = ({
  canGenerateMore,
  postsRemaining,
  onBack,
  initialTemplate,
  onContentGenerated,
  onGenerationError
}: MultiStepContentGeneratorProps) => {
  console.log("MultiStepContentGenerator: Rendering with props:", {
    canGenerateMore,
    postsRemaining,
    initialTemplate
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <ResponsiveContentGenerator
        canGenerateMore={canGenerateMore}
        postsRemaining={postsRemaining}
        onContentGenerated={onContentGenerated}
        onGenerationError={onGenerationError}
        showHeader={false}
        className="max-w-4xl mx-auto"
      />
      
      {initialTemplate && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-4xl mx-auto">
          <h3 className="font-semibold text-blue-900 mb-2">Template Selected:</h3>
          <p className="text-blue-700">{initialTemplate.templateName}</p>
          <p className="text-sm text-blue-600">{initialTemplate.templateDescription}</p>
        </div>
      )}
    </div>
  );
};
