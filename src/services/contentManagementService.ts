
import { useToast } from "@/hooks/use-toast";

export interface ContentItem {
  id: string;
  content: string;
  platform: string;
  createdAt: string;
  status: 'draft' | 'scheduled' | 'published';
  hashtags?: string[];
}

export class ContentManagementService {
  private static storageKey = 'postrilo_content_history';

  static getAllContent(): ContentItem[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading content history:', error);
      return [];
    }
  }

  static saveContent(content: Omit<ContentItem, 'id' | 'createdAt'>): ContentItem {
    const newItem: ContentItem = {
      ...content,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    try {
      const existing = this.getAllContent();
      const updated = [newItem, ...existing];
      localStorage.setItem(this.storageKey, JSON.stringify(updated));
      console.log('✅ Content saved successfully:', newItem.id);
      return newItem;
    } catch (error) {
      console.error('Error saving content:', error);
      throw new Error('Failed to save content');
    }
  }

  static updateContent(id: string, updates: Partial<ContentItem>): boolean {
    try {
      const existing = this.getAllContent();
      const index = existing.findIndex(item => item.id === id);
      
      if (index === -1) {
        throw new Error('Content not found');
      }

      existing[index] = { ...existing[index], ...updates };
      localStorage.setItem(this.storageKey, JSON.stringify(existing));
      console.log('✅ Content updated successfully:', id);
      return true;
    } catch (error) {
      console.error('Error updating content:', error);
      throw new Error('Failed to update content');
    }
  }

  static deleteContent(id: string): boolean {
    try {
      const existing = this.getAllContent();
      const filtered = existing.filter(item => item.id !== id);
      
      if (filtered.length === existing.length) {
        throw new Error('Content not found');
      }

      localStorage.setItem(this.storageKey, JSON.stringify(filtered));
      console.log('✅ Content deleted successfully:', id);
      return true;
    } catch (error) {
      console.error('Error deleting content:', error);
      throw new Error('Failed to delete content');
    }
  }

  static getContentById(id: string): ContentItem | null {
    const content = this.getAllContent();
    return content.find(item => item.id === id) || null;
  }

  static duplicateContent(id: string): ContentItem {
    const original = this.getContentById(id);
    if (!original) {
      throw new Error('Content not found');
    }

    return this.saveContent({
      content: original.content + ' (Copy)',
      platform: original.platform,
      status: 'draft',
      hashtags: original.hashtags
    });
  }
}

export const contentManagementService = new ContentManagementService();
