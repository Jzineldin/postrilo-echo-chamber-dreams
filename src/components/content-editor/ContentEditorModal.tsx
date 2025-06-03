
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';
import { ContentItem } from '@/services/contentManagementService';
import { ContentEditingService } from '@/services/contentEditingService';

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContentItem | null;
  onSave: (id: string, updates: { content: string; platform?: string; hashtags?: string[] }) => Promise<ContentItem | null>;
}

export const ContentEditorModal = ({ isOpen, onClose, content, onSave }: ContentEditorModalProps) => {
  const [editedContent, setEditedContent] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [validation, setValidation] = useState<{ isValid: boolean; errors: string[]; warnings: string[] } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (content) {
      setEditedContent(content.content);
      setSelectedPlatform(content.platform);
      setHashtags(content.hashtags || []);
      setHashtagInput('');
    }
  }, [content]);

  useEffect(() => {
    if (editedContent) {
      const validationResult = ContentEditingService.validateContent(editedContent, selectedPlatform);
      setValidation(validationResult);
    }
  }, [editedContent, selectedPlatform]);

  const handleAddHashtag = () => {
    const tag = hashtagInput.trim();
    if (tag && !hashtags.includes(tag)) {
      const formattedTag = tag.startsWith('#') ? tag : `#${tag}`;
      setHashtags(prev => [...prev, formattedTag]);
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(prev => prev.filter(t => t !== tag));
  };

  const handleSave = async () => {
    if (!content || !validation?.isValid) return;

    setIsSaving(true);
    try {
      const result = await onSave(content.id, {
        content: editedContent,
        platform: selectedPlatform,
        hashtags: hashtags.length > 0 ? hashtags : undefined
      });

      if (result) {
        onClose();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && hashtagInput.trim()) {
      e.preventDefault();
      handleAddHashtag();
    }
  };

  if (!content) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Platform Selection */}
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="twitter">Twitter/X</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Enter your content..."
              className="min-h-[200px] resize-none"
            />
            <div className="text-sm text-gray-500">
              {editedContent.length} characters
            </div>
          </div>

          {/* Validation Messages */}
          {validation && (
            <div className="space-y-2">
              {validation.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  {validation.errors.map((error, index) => (
                    <div key={index} className="flex items-center gap-2 text-red-700 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      {error}
                    </div>
                  ))}
                </div>
              )}
              
              {validation.warnings.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  {validation.warnings.map((warning, index) => (
                    <div key={index} className="flex items-center gap-2 text-yellow-700 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      {warning}
                    </div>
                  ))}
                </div>
              )}

              {validation.isValid && validation.errors.length === 0 && (
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <div className="flex items-center gap-2 text-green-700 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Content is valid for {selectedPlatform}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hashtags */}
          <div className="space-y-2">
            <Label htmlFor="hashtags">Hashtags</Label>
            <div className="flex gap-2">
              <Input
                id="hashtags"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add hashtag..."
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddHashtag}
                disabled={!hashtagInput.trim()}
              >
                Add
              </Button>
            </div>
            
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {hashtags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveHashtag(tag)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!validation?.isValid || isSaving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
