
import { useState } from "react";
import { EnhancedContentGeneratorHeader } from "./EnhancedContentGeneratorHeader";
import { EnhancedContentGeneratorLayout } from "./EnhancedContentGeneratorLayout";
import { RefactoredEnhancedContentGeneratorForm } from "./RefactoredEnhancedContentGeneratorForm";

export const RefactoredEnhancedContentGenerator = () => {
  // Mock data for now - these would come from user subscription/usage tracking
  const canGenerateMore = true;
  const postsRemaining = 5;

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      <EnhancedContentGeneratorHeader />
      <EnhancedContentGeneratorLayout 
        formSection={
          <RefactoredEnhancedContentGeneratorForm 
            canGenerateMore={canGenerateMore}
            postsRemaining={postsRemaining}
          />
        }
        resultsSection={<div></div>}
      />
    </div>
  );
};
