
import React from "react";
import { TemplateGallery } from "@/components/TemplateGallery";
import { MobileResponsiveContainer, MobileStack } from "@/components/mobile/MobileResponsiveContainer";
import { useIsMobile } from "@/hooks/use-mobile";

interface TemplateGalleryViewProps {
  onSelectTemplate?: (template: any) => void;
  onTryTemplate?: (templateId: string) => void;
  onBack?: () => void;
  className?: string;
}

export const TemplateGalleryView = ({ 
  onSelectTemplate,
  onTryTemplate,
  onBack,
  className = ""
}: TemplateGalleryViewProps) => {
  const isMobile = useIsMobile();

  const handleTemplateSelect = (template: any) => {
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
    if (onTryTemplate && template.id) {
      onTryTemplate(template.id);
    }
  };

  const handleGetStarted = () => {
    // Default behavior for get started - could navigate to signup or create
    console.log("Get started clicked from template gallery");
    if (onTryTemplate) {
      onTryTemplate("default");
    }
  };

  return (
    <div className={`template-gallery-view ${className}`}>
      <MobileResponsiveContainer 
        variant="default"
        padding={isMobile ? "sm" : "default"}
      >
        <MobileStack spacing={isMobile ? "sm" : "default"}>
          {onBack && (
            <button 
              onClick={onBack}
              className="mb-4 text-blue-600 hover:text-blue-800"
            >
              ← Back
            </button>
          )}
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Content Templates
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our curated collection of high-performing content templates 
              designed to boost engagement across all social media platforms.
            </p>
          </div>

          <TemplateGallery onGetStarted={handleGetStarted} />
        </MobileStack>
      </MobileResponsiveContainer>
    </div>
  );
};
