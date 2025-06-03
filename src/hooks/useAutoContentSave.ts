
import { useCallback } from 'react';
import { generateId } from '@/lib/utils';

export const useAutoContentSave = () => {
  const saveGeneratedContent = useCallback((contentData: any) => {
    try {
      const id = generateId();
      // Auto-save logic here
      console.log('Auto-saving content:', id);
      return id;
    } catch (error) {
      console.error('Failed to auto-save content:', error);
      return null;
    }
  }, []);

  return {
    saveGeneratedContent,
  };
};
