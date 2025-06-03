
import React from "react";
import { Button } from "@/components/ui/button";
import { ConsistentButton } from "@/components/ui/consistent-button";
import { ArrowRight, Sparkles, FileText, Target } from "lucide-react";
import { useOnboarding } from "@/hooks/useOnboarding";

interface MobileOptimizedHeroProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
  onBrowseTemplates: () => void;
  user: any;
  isMobile: boolean;
}

export const MobileOptimizedHero = ({
  onGetStarted,
  onTryDemo,
  onBrowseTemplates,
  user,
  isMobile
}: MobileOptimizedHeroProps) => {
  const { restartOnboarding } = useOnboarding();

  return (
    <div className="relative bg-gradient-to-b from-purple-50 to-white pt-6 pb-16 px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-purple-100 p-2 rounded-full">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          Create Engaging Content with AI
        </h1>
        
        <p className="text-gray-600 max-w-md mx-auto">
          Generate social media posts, articles, and marketing copy tailored to your brand in seconds.
        </p>

        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <ConsistentButton
            variant="primary"
            fullWidth
            icon={Target}
            onClick={user ? () => window.location.hash = '#dashboard' : onGetStarted}
            className="create-content-button"
          >
            {user ? "Go to Dashboard" : "Get Started"}
          </ConsistentButton>

          {!user && (
            <ConsistentButton
              variant="secondary"
              fullWidth
              icon={FileText}
              onClick={onTryDemo}
            >
              Try Demo
            </ConsistentButton>
          )}

          <ConsistentButton
            variant="outline"
            fullWidth
            icon={ArrowRight}
            onClick={onBrowseTemplates}
            className="content-library-link"
          >
            Browse Templates
          </ConsistentButton>

          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={restartOnboarding}
              className="mt-4 text-sm"
            >
              Restart guided tour
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
