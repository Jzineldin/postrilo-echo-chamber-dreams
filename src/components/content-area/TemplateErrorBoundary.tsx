
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

interface TemplateErrorBoundaryProps {
  children: ReactNode;
  activeTemplate: string;
  onBackToTemplates?: () => void;
}

interface TemplateErrorDisplayProps {
  activeTemplate: string;
  onBackToTemplates?: () => void;
  isNotFound?: boolean;
}

export const TemplateErrorDisplay = ({ 
  activeTemplate, 
  onBackToTemplates, 
  isNotFound = false 
}: TemplateErrorDisplayProps) => {
  return (
    <div className="flex items-center justify-center h-96 text-gray-500">
      <div className="text-center space-y-4">
        <AlertCircle className={`w-12 h-12 mx-auto ${isNotFound ? 'text-gray-400' : 'text-red-500'}`} />
        <div>
          <p className="text-lg font-medium">
            {isNotFound ? 'Template Not Found' : 'Error Loading Template'}
          </p>
          <p className="text-sm">
            {isNotFound 
              ? `The requested template "${activeTemplate}" is not available.`
              : `There was an error loading the "${activeTemplate}" template.`
            }
          </p>
        </div>
        {onBackToTemplates && (
          <Button onClick={onBackToTemplates} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Button>
        )}
      </div>
    </div>
  );
};

export const TemplateErrorBoundary = ({ 
  children, 
  activeTemplate, 
  onBackToTemplates 
}: TemplateErrorBoundaryProps) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error("Error rendering template:", error);
    return (
      <TemplateErrorDisplay 
        activeTemplate={activeTemplate}
        onBackToTemplates={onBackToTemplates}
        isNotFound={false}
      />
    );
  }
};
