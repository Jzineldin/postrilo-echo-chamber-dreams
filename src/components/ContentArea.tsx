
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ContentGenerator from "@/components/ContentGenerator";
import { TemplateRenderer } from "./content-area/TemplateRenderer";
import { TemplateErrorBoundary, TemplateErrorDisplay } from "./content-area/TemplateErrorBoundary";
import { ContentAreaHeader } from "./content-area/ContentAreaHeader";

interface ContentAreaProps {
  activeTemplate: string;
  selectedPlatform?: string;
  onBackToTemplates?: () => void;
}

export const ContentArea = ({ activeTemplate, selectedPlatform, onBackToTemplates }: ContentAreaProps) => {
  console.log("ContentArea rendering with:", { activeTemplate, selectedPlatform });

  // Don't show the card wrapper for the content generator as it has its own layout
  if (activeTemplate === "content-generator") {
    return <ContentGenerator />;
  }

  // Check if template exists (including debug templates)
  const validTemplates = [
    "educational-carousel",
    "brand-story", 
    "product-launch",
    "quote-inspiration",
    "behind-scenes",
    "community-post",
    "tutorial-post",
    "content-scheduler",
    "batch-generator",
    "settings",
    "ai-health-check",
    "ai-content-test"
  ];

  const templateExists = validTemplates.includes(activeTemplate);

  return (
    <Card className="min-h-[600px] bg-white/80 backdrop-blur-sm border-white/20">
      <CardHeader className="pb-4">
        <ContentAreaHeader 
          onBackToTemplates={onBackToTemplates}
          selectedPlatform={selectedPlatform}
        />
      </CardHeader>
      <CardContent className="p-6">
        {templateExists ? (
          <TemplateErrorBoundary 
            activeTemplate={activeTemplate}
            onBackToTemplates={onBackToTemplates}
          >
            <TemplateRenderer activeTemplate={activeTemplate} />
          </TemplateErrorBoundary>
        ) : (
          <TemplateErrorDisplay 
            activeTemplate={activeTemplate}
            onBackToTemplates={onBackToTemplates}
            isNotFound={true}
          />
        )}
      </CardContent>
    </Card>
  );
};
