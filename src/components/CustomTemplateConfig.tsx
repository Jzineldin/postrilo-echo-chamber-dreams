
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomTemplateConfigProps {
  templateId: string;
  onSave: (config: CustomTemplateConfig) => void;
  onClose: () => void;
}

interface CustomTemplateConfig {
  name: string;
  description: string;
  tone: string;
  structure: string;
  keyElements: string[];
  callToAction: string;
  targetAudience: string;
}

export const CustomTemplateConfig = ({ templateId, onSave, onClose }: CustomTemplateConfigProps) => {
  const { toast } = useToast();
  const [config, setConfig] = useState<CustomTemplateConfig>({
    name: "",
    description: "",
    tone: "professional",
    structure: "",
    keyElements: [""],
    callToAction: "",
    targetAudience: ""
  });

  const handleElementChange = (index: number, value: string) => {
    const newElements = [...config.keyElements];
    newElements[index] = value;
    setConfig({ ...config, keyElements: newElements });
  };

  const addElement = () => {
    setConfig({ ...config, keyElements: [...config.keyElements, ""] });
  };

  const removeElement = (index: number) => {
    const newElements = config.keyElements.filter((_, i) => i !== index);
    setConfig({ ...config, keyElements: newElements });
  };

  const handleSave = () => {
    if (!config.name.trim()) {
      toast({
        title: "Missing Template Name",
        description: "Please enter a name for your custom template.",
        variant: "destructive"
      });
      return;
    }

    // Filter out empty elements
    const filteredElements = config.keyElements.filter(el => el.trim());
    const finalConfig = { ...config, keyElements: filteredElements };

    onSave(finalConfig);
    toast({
      title: "Template Saved!",
      description: "Your custom template configuration has been saved."
    });
    onClose();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg">Configure Custom Template</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>
          Customize your template to generate content that matches your brand voice and style.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Name */}
        <div className="space-y-2">
          <Label htmlFor="template-name">Template Name</Label>
          <Input
            id="template-name"
            placeholder="e.g., My Brand Voice Post"
            value={config.name}
            onChange={(e) => setConfig({ ...config, name: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="template-description">Description</Label>
          <Input
            id="template-description"
            placeholder="What type of content will this template create?"
            value={config.description}
            onChange={(e) => setConfig({ ...config, description: e.target.value })}
          />
        </div>

        {/* Tone */}
        <div className="space-y-2">
          <Label>Content Tone</Label>
          <Select value={config.tone} onValueChange={(value) => setConfig({ ...config, tone: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual & Friendly</SelectItem>
              <SelectItem value="humorous">Humorous</SelectItem>
              <SelectItem value="inspirational">Inspirational</SelectItem>
              <SelectItem value="educational">Educational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content Structure */}
        <div className="space-y-2">
          <Label htmlFor="structure">Content Structure</Label>
          <Textarea
            id="structure"
            placeholder="Describe how you want your content structured (e.g., Hook -> Problem -> Solution -> CTA)"
            value={config.structure}
            onChange={(e) => setConfig({ ...config, structure: e.target.value })}
            className="min-h-20"
          />
        </div>

        {/* Key Elements */}
        <div className="space-y-3">
          <Label>Key Elements to Always Include</Label>
          {config.keyElements.map((element, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="e.g., Brand mention, specific hashtag, emoji style"
                value={element}
                onChange={(e) => handleElementChange(index, e.target.value)}
              />
              {config.keyElements.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeElement(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addElement}>
            Add Element
          </Button>
        </div>

        {/* Call to Action */}
        <div className="space-y-2">
          <Label htmlFor="cta">Default Call to Action</Label>
          <Input
            id="cta"
            placeholder="e.g., Follow for more tips, Visit our website, Comment below"
            value={config.callToAction}
            onChange={(e) => setConfig({ ...config, callToAction: e.target.value })}
          />
        </div>

        {/* Target Audience */}
        <div className="space-y-2">
          <Label htmlFor="audience">Target Audience</Label>
          <Input
            id="audience"
            placeholder="e.g., Small business owners, fitness enthusiasts, tech professionals"
            value={config.targetAudience}
            onChange={(e) => setConfig({ ...config, targetAudience: e.target.value })}
          />
        </div>

        {/* Save Button */}
        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Template Configuration
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
