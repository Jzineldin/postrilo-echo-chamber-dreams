
import { ReactNode } from "react";

interface EnhancedContentGeneratorLayoutProps {
  formSection: ReactNode;
  resultsSection: ReactNode;
}

export const EnhancedContentGeneratorLayout = ({
  formSection,
  resultsSection
}: EnhancedContentGeneratorLayoutProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-6">
        {formSection}
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {resultsSection}
      </div>
    </div>
  );
};
