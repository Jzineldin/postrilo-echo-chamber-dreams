
import { useState, useEffect } from 'react';

export interface SavedContent {
  id: string;
  templateType: string;
  title: string;
  content: string[];
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  platform?: string;
}

export const useContentStorage = () => {
  const [savedContent, setSavedContent] = useState<SavedContent[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('social-content-history');
    if (stored) {
      try {
        setSavedContent(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
  }, []);

  const saveContent = (
    templateType: string,
    title: string,
    content: string[],
    metadata: Record<string, any>,
    tags: string[] = []
  ) => {
    const newContent: SavedContent = {
      id: Date.now().toString(),
      templateType,
      title,
      content,
      metadata,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags
    };

    const updated = [newContent, ...savedContent].slice(0, 50); // Keep last 50
    setSavedContent(updated);
    localStorage.setItem('social-content-history', JSON.stringify(updated));
    return newContent.id;
  };

  const deleteContent = (id: string) => {
    const updated = savedContent.filter(item => item.id !== id);
    setSavedContent(updated);
    localStorage.setItem('social-content-history', JSON.stringify(updated));
  };

  const updateContent = (id: string, updates: Partial<SavedContent>) => {
    const updated = savedContent.map(item => 
      item.id === id 
        ? { ...item, ...updates, updatedAt: new Date().toISOString() }
        : item
    );
    setSavedContent(updated);
    localStorage.setItem('social-content-history', JSON.stringify(updated));
  };

  const getContentByTemplate = (templateType: string) => {
    return savedContent.filter(item => item.templateType === templateType);
  };

  return {
    savedContent,
    saveContent,
    deleteContent,
    updateContent,
    getContentByTemplate
  };
};
