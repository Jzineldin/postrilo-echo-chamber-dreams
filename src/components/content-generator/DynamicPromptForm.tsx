
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PromptTemplate, PromptVariable } from "@/services/ai/promptTemplate/types";

interface DynamicPromptFormProps {
  template: PromptTemplate;
  values: Record<string, any>;
  onChange: (variable: string, value: any) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const DynamicPromptForm = ({
  template,
  values,
  onChange,
  onGenerate,
  isGenerating
}: DynamicPromptFormProps) => {
  const renderVariableInput = (variable: PromptVariable) => {
    const value = values[variable.name] !== undefined 
      ? values[variable.name] 
      : variable.defaultValue;

    switch (variable.type) {
      case 'text':
        return (
          <Input
            value={value as string}
            onChange={(e) => onChange(variable.name, e.target.value)}
            placeholder={variable.description}
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value as string}
            onChange={(e) => onChange(variable.name, e.target.value)}
            placeholder={variable.description}
            rows={3}
          />
        );

      case 'select':
        return (
          <Select 
            value={value as string} 
            onValueChange={(newValue) => onChange(variable.name, newValue)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {variable.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={value as boolean}
              onCheckedChange={(checked) => onChange(variable.name, checked)}
            />
            <Label className="text-sm">
              {value ? 'Yes' : 'No'}
            </Label>
          </div>
        );

      default:
        return null;
    }
  };

  const getVariableLabel = (variable: PromptVariable) => {
    return variable.name
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const isFormValid = () => {
    return template.variables.every(variable => {
      if (variable.type === 'boolean') return true;
      if (variable.defaultValue !== '') return true;
      
      const value = values[variable.name];
      return value && value.toString().trim() !== '';
    });
  };

  return (
    <div className="space-y-6">
      {/* Template Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-blue-900">
              {template.name}
            </CardTitle>
            <Badge variant="outline" className="bg-blue-100 text-blue-700">
              {template.category}
            </Badge>
          </div>
          <p className="text-sm text-blue-700">{template.description}</p>
        </CardHeader>
      </Card>

      {/* Dynamic Form Fields */}
      <div className="grid gap-4 md:grid-cols-2">
        {template.variables.map((variable) => (
          <Card key={variable.name} className="bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-4">
              <div className="space-y-2">
                <Label htmlFor={variable.name} className="font-medium">
                  {getVariableLabel(variable)}
                </Label>
                {variable.description && (
                  <p className="text-xs text-gray-500">{variable.description}</p>
                )}
                {renderVariableInput(variable)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generate Button */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="pt-4">
          <button
            onClick={onGenerate}
            disabled={!isFormValid() || isGenerating}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
              isFormValid() && !isGenerating
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating Content...
              </div>
            ) : (
              'Generate Content'
            )}
          </button>
          
          {!isFormValid() && (
            <p className="text-sm text-red-600 mt-2 text-center">
              Please fill in all required fields
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
