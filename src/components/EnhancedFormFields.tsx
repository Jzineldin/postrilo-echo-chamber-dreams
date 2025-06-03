
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Plus, Palette, Type, Image as ImageIcon } from "lucide-react";

interface EnhancedFormFieldsProps {
  onStyleChange?: (styles: ContentStyles) => void;
  onTagsChange?: (tags: string[]) => void;
}

export interface ContentStyles {
  tone: string;
  style: string;
  length: string;
  callToAction: string;
  colorScheme: string;
  visualStyle: string;
}

export const EnhancedFormFields = ({ onStyleChange, onTagsChange }: EnhancedFormFieldsProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [styles, setStyles] = useState<ContentStyles>({
    tone: "professional",
    style: "informative",
    length: "medium",
    callToAction: "engagement",
    colorScheme: "vibrant",
    visualStyle: "modern"
  });

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setTagInput("");
      onTagsChange?.(newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const updateStyle = (key: keyof ContentStyles, value: string) => {
    const newStyles = { ...styles, [key]: value };
    setStyles(newStyles);
    onStyleChange?.(newStyles);
  };

  return (
    <div className="space-y-6">
      {/* Content Styling Options */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold">Content Styling</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tone</Label>
              <select
                value={styles.tone}
                onChange={(e) => updateStyle('tone', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="authoritative">Authoritative</option>
                <option value="playful">Playful</option>
                <option value="inspirational">Inspirational</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Content Style</Label>
              <select
                value={styles.style}
                onChange={(e) => updateStyle('style', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="informative">Informative</option>
                <option value="storytelling">Storytelling</option>
                <option value="educational">Educational</option>
                <option value="promotional">Promotional</option>
                <option value="conversational">Conversational</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Content Length</Label>
              <select
                value={styles.length}
                onChange={(e) => updateStyle('length', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="short">Short & Punchy</option>
                <option value="medium">Medium Length</option>
                <option value="detailed">Detailed & Comprehensive</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Call to Action</Label>
              <select
                value={styles.callToAction}
                onChange={(e) => updateStyle('callToAction', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="engagement">Encourage Engagement</option>
                <option value="share">Encourage Sharing</option>
                <option value="visit">Drive Traffic</option>
                <option value="purchase">Drive Sales</option>
                <option value="subscribe">Build Following</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags Management */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Content Tags</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="flex-1"
              />
              <Button onClick={addTag} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Visual Preferences */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold">Visual Style Preferences</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Color Scheme</Label>
              <select
                value={styles.colorScheme}
                onChange={(e) => updateStyle('colorScheme', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="vibrant">Vibrant & Bold</option>
                <option value="pastel">Soft & Pastel</option>
                <option value="monochrome">Monochrome</option>
                <option value="earth">Earth Tones</option>
                <option value="corporate">Corporate Colors</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Visual Style</Label>
              <select
                value={styles.visualStyle}
                onChange={(e) => updateStyle('visualStyle', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="modern">Modern & Clean</option>
                <option value="vintage">Vintage & Retro</option>
                <option value="minimalist">Minimalist</option>
                <option value="artistic">Artistic & Creative</option>
                <option value="professional">Professional</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
