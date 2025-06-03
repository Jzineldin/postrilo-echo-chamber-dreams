
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PromptTemplate } from "@/services/ai/promptTemplate/types";
import { Wand2 } from "lucide-react";

interface PromptTemplateSelectorProps {
  templates: PromptTemplate[];
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
}

export const PromptTemplateSelector = ({
  templates,
  selectedTemplate,
  onSelectTemplate
}: PromptTemplateSelectorProps) => {
  const getTemplateIcon = (category: string) => {
    return <Wand2 className="w-5 h-5" />;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'social-media':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'video':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (selectedTemplate) {
    return null; // Hide selector when template is selected
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5" />
          Choose a Prompt Template
        </CardTitle>
        <p className="text-sm text-gray-600">
          Select a template to generate AI content with dynamic variables
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-purple-200"
              onClick={() => onSelectTemplate(template.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                    {getTemplateIcon(template.category)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getCategoryColor(template.category)}`}
                      >
                        {template.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {template.variables.length} variables
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
