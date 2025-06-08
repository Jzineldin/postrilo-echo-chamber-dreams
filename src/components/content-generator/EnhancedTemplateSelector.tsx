
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateActionButtons } from "@/components/ui/TemplateActionButtons";
import { enhancedTemplateService } from "@/services/ai/enhancedTemplateService";
import { useTemplateService, TemplateData } from "@/services/templateService";
import { Sparkles, Video, MessageSquare, Image, Zap } from "lucide-react";

interface EnhancedTemplateSelectorProps {
  selectedPlatforms: string[];
  onTemplateSelect: (templateId: string, variables: Record<string, string>) => void;
  onBack: () => void;
}

export const EnhancedTemplateSelector = ({ 
  selectedPlatforms, 
  onTemplateSelect, 
  onBack 
}: EnhancedTemplateSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState('engagement');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});
  
  const { useTemplate } = useTemplateService();

  const categories = enhancedTemplateService.getCategories();
  const templates = enhancedTemplateService.getTemplatesByCategory(selectedCategory);
  
  const filteredTemplates = selectedPlatforms.length > 0
    ? templates.filter(template => 
        template.platforms.some(platform => selectedPlatforms.includes(platform))
      )
    : templates;

  const selectedTemplateData = selectedTemplate 
    ? enhancedTemplateService.getTemplate(selectedTemplate)
    : null;

  const handleVariableChange = (variable: string, value: string) => {
    setTemplateVariables(prev => ({ ...prev, [variable]: value }));
  };

  const handleUseEnhancedTemplate = () => {
    if (selectedTemplate && selectedTemplateData) {
      onTemplateSelect(selectedTemplate, templateVariables);
    }
  };

  const handleQuickUseTemplate = (template: any) => {
    // Convert enhanced template to TemplateData format
    const templateData: TemplateData = {
      id: template.id,
      name: template.name,
      description: template.description,
      category: template.category,
      platforms: template.platforms,
      variables: template.variables,
      exampleContent: enhancedTemplateService.interpolateTemplate(template, {
        topic: 'your topic',
        tone: 'professional',
        platform: selectedPlatforms[0] || 'instagram'
      })
    };
    
    useTemplate(templateData);
  };

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case 'post': return MessageSquare;
      case 'video-script': return Video;
      case 'carousel': return Image;
      case 'thread': return Zap;
      default: return Sparkles;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      engagement: 'bg-blue-100 text-blue-700',
      education: 'bg-green-100 text-green-700',
      viral: 'bg-purple-100 text-purple-700',
      branding: 'bg-orange-100 text-orange-700',
      promotion: 'bg-red-100 text-red-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Enhanced Templates</CardTitle>
          <Button variant="outline" onClick={onBack}>
            Back to Standard
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="viral">Viral</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="promotion">Promotion</TabsTrigger>
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid gap-4">
                {enhancedTemplateService.getTemplatesByCategory(category)
                  .filter(template => 
                    selectedPlatforms.length === 0 || 
                    template.platforms.some(platform => selectedPlatforms.includes(platform))
                  )
                  .map(template => {
                    const Icon = getContentTypeIcon(template.contentType);
                    const isSelected = selectedTemplate === template.id;
                    
                    return (
                      <Card 
                        key={template.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5 text-gray-600" />
                              <div>
                                <h3 className="font-medium">{template.name}</h3>
                                <p className="text-sm text-gray-600">{template.description}</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <Badge className={getCategoryColor(template.category)}>
                                {template.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {template.contentType}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1 flex-wrap">
                              {template.platforms.slice(0, 3).map(platform => (
                                <Badge key={platform} variant="secondary" className="text-xs">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                            
                            <TemplateActionButtons
                              template={{
                                id: template.id,
                                name: template.name,
                                description: template.description,
                                category: template.category,
                                platforms: template.platforms,
                                variables: template.variables,
                                exampleContent: enhancedTemplateService.interpolateTemplate(template, {
                                  topic: 'your topic',
                                  tone: 'professional',
                                  platform: selectedPlatforms[0] || 'instagram'
                                })
                              }}
                              variant="compact"
                              showFavorite={false}
                              onUseTemplate={() => handleQuickUseTemplate(template)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {selectedTemplateData && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg">Configure Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                {selectedTemplateData.description}
              </div>
              
              {selectedTemplateData.variables.map(variable => (
                <div key={variable} className="space-y-2">
                  <Label htmlFor={variable} className="capitalize">
                    {variable.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  {variable === 'tone' ? (
                    <Select 
                      value={templateVariables[variable] || ''} 
                      onValueChange={(value) => handleVariableChange(variable, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="inspirational">Inspirational</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : variable === 'platform' ? (
                    <Select 
                      value={templateVariables[variable] || selectedPlatforms[0] || ''} 
                      onValueChange={(value) => handleVariableChange(variable, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedTemplateData.platforms.map(platform => (
                          <SelectItem key={platform} value={platform}>
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={variable}
                      value={templateVariables[variable] || ''}
                      onChange={(e) => handleVariableChange(variable, e.target.value)}
                      placeholder={`Enter ${variable}...`}
                    />
                  )}
                </div>
              ))}

              <Button 
                onClick={handleUseEnhancedTemplate}
                className="w-full"
                disabled={!selectedTemplateData.variables.every(variable => 
                  templateVariables[variable]?.trim() || 
                  (variable === 'platform' && selectedPlatforms.length > 0)
                )}
              >
                Use This Template
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
