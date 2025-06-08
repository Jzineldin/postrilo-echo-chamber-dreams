
import React from "react";
import { MultiStepContentGenerator } from "./MultiStepContentGenerator";
import { useSubscription } from "@/hooks/useSubscription";
import { UniversalHeader } from "./navigation/UniversalHeader";
import { useNavigate } from "react-router-dom";

const ContentGenerator = () => {
  console.log("ContentGenerator: Loading MultiStepContentGenerator");
  
  const { postsUsedThisMonth, monthlyPostsLimit } = useSubscription();
  const navigate = useNavigate();
  const postsRemaining = Math.max(0, monthlyPostsLimit - postsUsedThisMonth);
  const canGenerateMore = postsRemaining > 0;

  const handleBack = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <UniversalHeader 
        title="Create Content"
        currentPage="Generate social media content tailored to your brand"
        onBack={handleBack}
      />
      <div className="pt-4">
        <MultiStepContentGenerator 
          canGenerateMore={canGenerateMore}
          postsRemaining={postsRemaining}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default ContentGenerator;
