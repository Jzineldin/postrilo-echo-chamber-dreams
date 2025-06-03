
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ContentEditingService, ContentEditRequest, ContentDuplicateRequest } from '@/services/contentEditingService';
import { ContentItem } from '@/services/contentManagementService';

export const useContentEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const { toast } = useToast();

  const startEditing = useCallback((item: ContentItem) => {
    setEditingItem(item);
    setIsEditing(true);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingItem(null);
    setIsEditing(false);
  }, []);

  const saveContent = useCallback(async (request: ContentEditRequest) => {
    try {
      const result = await ContentEditingService.updateContent(request);
      
      if (result.success) {
        toast({
          title: "Content Updated",
          description: "Your content has been successfully updated."
        });
        setIsEditing(false);
        setEditingItem(null);
        return result.item;
      } else {
        toast({
          title: "Update Failed",
          description: result.error || "Failed to update content",
          variant: "destructive"
        });
        return null;
      }
    } catch (error) {
      toast({
        title: "Update Error",
        description: "An unexpected error occurred while updating content",
        variant: "destructive"
      });
      return null;
    }
  }, [toast]);

  const duplicateContent = useCallback(async (request: ContentDuplicateRequest) => {
    try {
      const result = await ContentEditingService.duplicateContent(request);
      
      if (result.success) {
        toast({
          title: "Content Duplicated",
          description: "Content has been successfully duplicated."
        });
        return result.item;
      } else {
        toast({
          title: "Duplication Failed",
          description: result.error || "Failed to duplicate content",
          variant: "destructive"
        });
        return null;
      }
    } catch (error) {
      toast({
        title: "Duplication Error",
        description: "An unexpected error occurred while duplicating content",
        variant: "destructive"
      });
      return null;
    }
  }, [toast]);

  const deleteContent = useCallback(async (id: string) => {
    try {
      const result = await ContentEditingService.deleteContent(id);
      
      if (result.success) {
        toast({
          title: "Content Deleted",
          description: "Content has been successfully deleted."
        });
        return true;
      } else {
        toast({
          title: "Deletion Failed",
          description: result.error || "Failed to delete content",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Deletion Error",
        description: "An unexpected error occurred while deleting content",
        variant: "destructive"
      });
      return false;
    }
  }, [toast]);

  const validateContent = useCallback((content: string, platform?: string) => {
    return ContentEditingService.validateContent(content, platform);
  }, []);

  return {
    isEditing,
    editingItem,
    startEditing,
    cancelEditing,
    saveContent,
    duplicateContent,
    deleteContent,
    validateContent
  };
};
