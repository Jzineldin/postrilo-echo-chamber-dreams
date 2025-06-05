
import React from "react";
import { MultiStepContentGenerator } from "./MultiStepContentGenerator";
import { useSubscription } from "@/hooks/useSubscription";

const ContentGenerator = () => {
  console.log("ContentGenerator: Loading MultiStepContentGenerator");
  
  const { postsUsedThisMonth, monthlyPostsLimit } = useSubscription();
  const postsRemaining = Math.max(0, monthlyPostsLimit - postsUsedThisMonth);
  const canGenerateMore = postsRemaining > 0;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <MultiStepContentGenerator 
        canGenerateMore={canGenerateMore}
        postsRemaining={postsRemaining}
      />
    </div>
  );
};

export default ContentGenerator;
