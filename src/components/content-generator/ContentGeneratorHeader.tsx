
import React from "react";
import { ContentGeneratorStats } from "./ContentGeneratorStats";
import { ContextualNavigation } from "@/components/navigation/ContextualNavigation";
import { ContextualHelp } from "@/components/help/ContextualHelp";

interface ContentGeneratorHeaderProps {
  postsRemaining: number;
  monthlyPostsLimit: number;
  currentPlanName: string;
  canGenerateMore: boolean;
  onBack?: () => void;
}

export const ContentGeneratorHeader = (props: ContentGeneratorHeaderProps) => {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Create Content", current: true }
  ];

  const helpItems = [
    {
      title: "Getting Started",
      content: "Use our AI-powered content generator to create engaging posts for your social media platforms.",
    },
    {
      title: "Content Credits",
      content: "Each generated piece of content uses one credit. Credits reset monthly based on your plan.",
    },
    {
      title: "Best Practices",
      content: "Provide specific topics and key points for better AI-generated content. You can always edit the results.",
      link: "#"
    }
  ];

  return (
    <div className="space-y-4">
      <ContextualNavigation
        title="Create Content"
        onBack={props.onBack}
        breadcrumbItems={breadcrumbItems}
      />
      
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <ContentGeneratorStats {...props} />
        </div>
        
        <div className="lg:w-80">
          <ContextualHelp
            topic="Content Generation"
            helpItems={helpItems}
            position="inline"
          />
        </div>
      </div>
    </div>
  );
};
