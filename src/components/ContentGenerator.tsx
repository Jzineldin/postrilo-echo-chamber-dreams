
import React, { useEffect, useState } from "react";
import { MultiStepContentGenerator } from "./MultiStepContentGenerator";
import { useSubscription } from "@/hooks/useSubscription";
import { UniversalHeader } from "./navigation/UniversalHeader";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ContentGenerator = () => {
  console.log("ContentGenerator: Loading MultiStepContentGenerator");
  
  const { postsUsedThisMonth, monthlyPostsLimit } = useSubscription();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [templateData, setTemplateData] = useState<any>(null);
  const postsRemaining = Math.max(0, monthlyPostsLimit - postsUsedThisMonth);
  const canGenerateMore = postsRemaining > 0;

  // Check for template data from navigation
  useEffect(() => {
    const storedTemplate = sessionStorage.getItem('selectedTemplate');
    if (storedTemplate) {
      try {
        const template = JSON.parse(storedTemplate);
        setTemplateData(template);
        
        console.log('Template loaded from session:', template);
        
        // Show success message
        toast({
          title: "Template Loaded",
          description: `Using "${template.templateName}" template for content creation.`,
        });
        
        // Clear from session storage after use
        sessionStorage.removeItem('selectedTemplate');
      } catch (error) {
        console.error('Error parsing template data:', error);
        sessionStorage.removeItem('selectedTemplate');
      }
    }
  }, [toast]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleContentGenerated = (content: any) => {
    console.log('Content generated successfully:', content);
    toast({
      title: "Content Generated!",
      description: "Your content has been created successfully.",
    });
  };

  const handleGenerationError = (error: any) => {
    console.error('Content generation error:', error);
    toast({
      title: "Generation Failed",
      description: error.message || "Failed to generate content. Please try again.",
      variant: "destructive"
    });
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
          initialTemplate={templateData}
          onContentGenerated={handleContentGenerated}
          onGenerationError={handleGenerationError}
        />
      </div>
    </div>
  );
};

export default ContentGenerator;
