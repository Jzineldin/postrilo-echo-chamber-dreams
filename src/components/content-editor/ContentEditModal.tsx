
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Edit, Save, X, Copy, Share2 } from 'lucide-react';

interface ContentEditModalProps {
  content: {
    id: string;
    text: string;
    platform: string;
    createdAt: string;
  };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contentId: string, newText: string) => void;
}

export const ContentEditModal = ({ content, isOpen, onOpenChange, onSave }: ContentEditModalProps) => {
  const [editedText, setEditedText] = useState(content.text);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!editedText.trim()) {
      toast({
        title: "Empty Content",
        description: "Content cannot be empty.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      await onSave(content.id, editedText);
      toast({
        title: "Content Updated",
        description: "Your content has been successfully updated."
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedText);
    toast({
      title: "Copied",
      description: "Content copied to clipboard."
    });
  };

  const charCount = editedText.length;
  const platformLimits = {
    twitter: 280,
    instagram: 2200,
    facebook: 63206,
    linkedin: 1300
  };
  const limit = platformLimits[content.platform as keyof typeof platformLimits] || 2200;
  const isOverLimit = charCount > limit;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit Content
            <Badge variant="outline" className="ml-2">
              {content.platform}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="min-h-[200px] resize-none"
              placeholder="Edit your content..."
            />
            <div className="flex justify-between items-center text-sm">
              <span className={`${isOverLimit ? 'text-red-600' : 'text-gray-500'}`}>
                {charCount}/{limit} characters
              </span>
              {isOverLimit && (
                <span className="text-red-600 text-xs">
                  Exceeds {content.platform} limit
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={isSaving || isOverLimit || !editedText.trim()}
              >
                <Save className="w-4 h-4 mr-1" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
