
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  content: string;
  platforms: string[];
  rating: number;
  isActive: boolean;
}

export const TemplateManager = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Product Launch Announcement',
      description: 'Perfect for announcing new products or features',
      category: 'Social Media',
      content: 'Exciting news! We\'re thrilled to introduce [Product Name] - [Brief Description]. This revolutionary [Product Type] will [Key Benefits]. Get ready to [Call to Action]! #ProductLaunch #Innovation',
      platforms: ['Instagram', 'LinkedIn', 'Twitter'],
      rating: 95,
      isActive: true
    },
    {
      id: '2',
      name: 'Educational Tutorial',
      description: 'Share valuable knowledge with your audience',
      category: 'Educational',
      content: 'Today we\'re diving deep into [Topic]. Here\'s what you\'ll learn: 1. [Point 1] 2. [Point 2] 3. [Point 3]. Save this post for later! What would you like to learn next? #Education #Tips',
      platforms: ['Instagram', 'LinkedIn'],
      rating: 88,
      isActive: true
    }
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    name: '',
    description: '',
    category: 'Social Media',
    content: '',
    platforms: [],
    rating: 0,
    isActive: true
  });

  const categories = ['Social Media', 'Educational', 'Video', 'Marketing', 'Personal'];
  const availablePlatforms = ['Instagram', 'LinkedIn', 'Twitter', 'TikTok', 'Facebook', 'YouTube'];

  const handleSave = () => {
    if (isEditing) {
      setTemplates(prev => 
        prev.map(t => t.id === isEditing ? { ...t, ...newTemplate } : t)
      );
      setIsEditing(null);
    } else {
      const template: Template = {
        ...newTemplate as Template,
        id: Date.now().toString(),
        rating: Math.floor(Math.random() * 20) + 80 // Random rating between 80-100
      };
      setTemplates(prev => [...prev, template]);
    }
    setNewTemplate({ 
      name: '', 
      description: '', 
      category: 'Social Media', 
      content: '', 
      platforms: [], 
      rating: 0, 
      isActive: true 
    });
  };

  const handleEdit = (template: Template) => {
    setNewTemplate(template);
    setIsEditing(template.id);
  };

  const handleDelete = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  const toggleActive = (id: string) => {
    setTemplates(prev => 
      prev.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t)
    );
  };

  const togglePlatform = (platform: string) => {
    setNewTemplate(prev => ({
      ...prev,
      platforms: prev.platforms?.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...(prev.platforms || []), platform]
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Template' : 'Add New Template'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={newTemplate.name || ''}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Template name"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={newTemplate.category} 
                onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={newTemplate.description || ''}
              onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the template"
            />
          </div>

          <div>
            <Label htmlFor="content">Template Content</Label>
            <Textarea
              id="content"
              value={newTemplate.content || ''}
              onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Template content with placeholders like [Product Name]"
              rows={4}
            />
          </div>

          <div>
            <Label>Supported Platforms</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availablePlatforms.map(platform => (
                <Button
                  key={platform}
                  variant={newTemplate.platforms?.includes(platform) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => togglePlatform(platform)}
                >
                  {platform}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {isEditing ? 'Update' : 'Add'} Template
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">Existing Templates</h3>
        {templates.map((template) => (
          <Card key={template.id} className={!template.isActive ? 'opacity-50' : ''}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{template.name}</h4>
                    <Badge variant="outline">{template.category}</Badge>
                    <Badge variant="secondary">{template.rating}% rating</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {template.platforms.map(platform => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={template.isActive ? 'default' : 'secondary'}>
                    {template.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(template.id)}
                  >
                    {template.isActive ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(template)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(template.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Content Preview:</strong>
                <p className="mt-1 italic">"{template.content.substring(0, 150)}..."</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
