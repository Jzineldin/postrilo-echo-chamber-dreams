
import React from "react";
import { EducationalCarousel } from "../templates/EducationalCarousel";
import { BrandStory } from "../templates/BrandStory";
import { ProductLaunch } from "../templates/ProductLaunch";
import { QuoteInspiration } from "../templates/QuoteInspiration";
import { BehindTheScenes } from "../templates/BehindTheScenes";
import { CommunityPost } from "../templates/CommunityPost";
import { TutorialPost } from "../templates/TutorialPost";
import { ContentScheduler } from "../ContentScheduler";
import { BatchGenerator } from "../BatchGenerator";
import { SettingsPanel } from "../SettingsPanel";
import { AIHealthChecker } from "../debug/AIHealthChecker";
import { AIContentTest } from "../debug/AIContentTest";

interface TemplateRendererProps {
  activeTemplate: string;
}

export const TemplateRenderer = ({ activeTemplate }: TemplateRendererProps) => {
  console.log("TemplateRenderer rendering template:", activeTemplate);

  switch (activeTemplate) {
    case "educational-carousel":
      return <EducationalCarousel />;
    case "brand-story":
      return <BrandStory />;
    case "product-launch":
      return <ProductLaunch />;
    case "quote-inspiration":
      return <QuoteInspiration />;
    case "behind-scenes":
      return <BehindTheScenes />;
    case "community-post":
      return <CommunityPost />;
    case "tutorial-post":
      return <TutorialPost />;
    case "content-scheduler":
      return <ContentScheduler />;
    case "batch-generator":
      return <BatchGenerator />;
    case "settings":
      return <SettingsPanel />;
    case "ai-health-check":
      return <AIHealthChecker />;
    case "ai-content-test":
      return <AIContentTest />;
    default:
      console.warn(`Unknown template: ${activeTemplate}`);
      return (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Template Not Found</h3>
          <p className="text-gray-500">The template "{activeTemplate}" could not be loaded.</p>
        </div>
      );
  }
};
