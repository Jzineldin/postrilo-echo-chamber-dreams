
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SmartTemplateService, SmartTemplate } from '@/services/ai/smartTemplateService';
import { TrendingUp, Search, Sparkles, Target } from 'lucide-react';

interface SmartTemplateSelectorProps {
  platform: string;
  tone: string;
  goal: string;
  topic: string;
  onTemplateSelect: (template: SmartTemplate) => void;
}

export const SmartTemplateSelector = ({
  platform,
  tone,
  goal,
  topic,
  onTemplateSelect
}: SmartTemplateSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [templates, setTemplates] = useState<SmartTemplate[]>([]);
  const [optimalTemplate, setOptimalTemplate] = useState<SmartTemplate | null>(null);

  useEffect(() => {
    // Get optimal template for current settings
    const optimal = SmartTemplateService.getOptimalTemplate(platform, tone, goal);
    setOptimalTemplate(optimal);

    // Get all templates
    let allTemplates = SmartTemplateService.getAllTemplates();

    // Filter by platform
    if (platform) {
      allTemplates = allTemplates.filter(t => t.platforms.includes(platform));
    }

    // Filter by search query
    if (searchQuery) {
      allTemplates = SmartTemplateService.searchTemplates(searchQuery);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      allTemplates = allTemplates.filter(t => t.category === selectedCategory);
    }

    setTemplates(allTemplates);
  }, [platform, tone, goal, searchQuery, selectedCategory]);

  const categories = ['all', ...SmartTemplateService.getCategories()];
  const popularTemplates = SmartTemplateService.getPopularTemplates();

  const handleTemplateSelect = (template: SmartTemplate) => {
    onTemplateSelect(template);
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 80) return 'text-blue-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Optimal Template Recommendation */}
      {optimalTemplate && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Sparkles className="w-5 h-5" />
              Recommended Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-blue-900">{optimalTemplate.name}</h3>
                <p className="text-sm text-blue-700 mb-2">{optimalTemplate.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {optimalTemplate.category}
                  </Badge>
                  <Badge className={getDifficultyColor(optimalTemplate.difficulty)}>
                    {optimalTemplate.difficulty}
                  </Badge>
                  {optimalTemplate.metrics && (
                    <Badge variant="outline" className="text-xs">
                      {optimalTemplate.metrics}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getSuccessRateColor(optimalTemplate.successRate)}`}>
                  {optimalTemplate.successRate}%
                </div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>
            <Button 
              onClick={() => handleTemplateSelect(optimalTemplate)}
              className="w-full"
            >
              <Target className="w-4 h-4 mr-2" />
              Use Recommended Template
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleTemplateSelect(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-sm">{template.name}</CardTitle>
                  <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${getSuccessRateColor(template.successRate)}`}>
                    {template.successRate}%
                  </div>
                  <div className="text-xs text-gray-500">Success</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex gap-1 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                  <Badge className={getDifficultyColor(template.difficulty)}>
                    {template.difficulty}
                  </Badge>
                </div>
                
                {template.metrics && (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    {template.metrics}
                  </div>
                )}

                <div className="text-xs text-gray-600">
                  <p className="font-medium">Structure:</p>
                  <p>{template.structure}</p>
                </div>

                <div className="flex gap-1 flex-wrap">
                  {template.platforms.slice(0, 3).map((platform) => (
                    <Badge key={platform} variant="secondary" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                  {template.platforms.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.platforms.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Templates Section */}
      {selectedCategory === 'all' && !searchQuery && (
        <div>
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Popular Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTemplates.slice(0, 6).map((template) => (
              <Card 
                key={template.id} 
                className="cursor-pointer hover:shadow-md transition-shadow border-orange-200"
                onClick={() => handleTemplateSelect(template)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      Popular
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge className={getDifficultyColor(template.difficulty)}>
                      {template.difficulty}
                    </Badge>
                    <div className={`text-sm font-bold ${getSuccessRateColor(template.successRate)}`}>
                      {template.successRate}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
