
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { contentTypes } from "../constants/demoData";

interface ContentTypeSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export const ContentTypeSelector = ({ selectedTemplate, onTemplateSelect }: ContentTypeSelectorProps) => {
  return (
    <div className="space-y-3">
      {contentTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = selectedTemplate === type.id;
        return (
          <Card 
            key={type.id} 
            className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
              isSelected ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => onTemplateSelect(type.id)}
          >
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{type.name}</p>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
              {isSelected && <CheckCircle className="w-5 h-5 text-purple-600" />}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
