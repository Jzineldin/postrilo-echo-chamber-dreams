
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ContentItem {
  id: string;
  text: string;
  platform: string;
  createdAt: string;
  status: 'draft' | 'published' | 'scheduled';
}

export const useContentManagement = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const updateContent = useCallback(async (contentId: string, newText: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setContents(prev => prev.map(content => 
        content.id === contentId 
          ? { ...content, text: newText }
          : content
      ));

      // Store in localStorage for persistence
      const updatedContents = contents.map(content => 
        content.id === contentId 
          ? { ...content, text: newText }
          : content
      );
      localStorage.setItem('saved-content', JSON.stringify(updatedContents));

      return { success: true };
    } catch (error) {
      console.error('Failed to update content:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [contents]);

  const deleteContent = useCallback(async (contentId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setContents(prev => prev.filter(content => content.id !== contentId));

      // Update localStorage
      const updatedContents = contents.filter(content => content.id !== contentId);
      localStorage.setItem('saved-content', JSON.stringify(updatedContents));

      toast({
        title: "Content Deleted",
        description: "Content has been successfully deleted."
      });

      return { success: true };
    } catch (error) {
      console.error('Failed to delete content:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete content. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [contents, toast]);

  const duplicateContent = useCallback(async (contentId: string) => {
    const originalContent = contents.find(c => c.id === contentId);
    if (!originalContent) return;

    const duplicatedContent: ContentItem = {
      ...originalContent,
      id: `${contentId}-copy-${Date.now()}`,
      text: `${originalContent.text} (Copy)`,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };

    setContents(prev => [duplicatedContent, ...prev]);

    // Update localStorage
    const updatedContents = [duplicatedContent, ...contents];
    localStorage.setItem('saved-content', JSON.stringify(updatedContents));

    toast({
      title: "Content Duplicated",
      description: "Content has been successfully duplicated."
    });
  }, [contents, toast]);

  return {
    contents,
    isLoading,
    updateContent,
    deleteContent,
    duplicateContent,
    setContents
  };
};
