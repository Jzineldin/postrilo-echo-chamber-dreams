
export interface EnhancedContentItem {
  id: string;
  title: string;
  content: string;
  platform: string;
  contentType: string;
  tone: string;
  goal: string;
  topic: string;
  createdAt: string;
  updatedAt?: string;
  wordCount: number;
  characterCount: number;
  hashtags?: string[];
  isFavorite: boolean;
  tags?: string[];
  metadata?: Record<string, any>;
}

export class EnhancedContentStorage {
  private static readonly STORAGE_KEY = 'postrilo_enhanced_content';

  static saveContent(content: EnhancedContentItem): void {
    try {
      const existing = this.getAllContent();
      const updated = [content, ...existing.filter(c => c.id !== content.id)];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  }

  static getAllContent(): EnhancedContentItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load content:', error);
      return [];
    }
  }

  static searchContent(query: string, filters?: { platform?: string }): EnhancedContentItem[] {
    const allContent = this.getAllContent();
    
    let filtered = allContent;
    
    if (filters?.platform) {
      filtered = filtered.filter(item => item.platform === filters.platform);
    }
    
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm) ||
        item.topic.toLowerCase().includes(searchTerm)
      );
    }
    
    return filtered;
  }

  static getContentById(id: string): EnhancedContentItem | null {
    return this.getAllContent().find(item => item.id === id) || null;
  }

  static updateContent(id: string, updates: Partial<EnhancedContentItem>): void {
    const content = this.getContentById(id);
    if (content) {
      const updated = { ...content, ...updates, updatedAt: new Date().toISOString() };
      this.saveContent(updated);
    }
  }

  static deleteContent(id: string): void {
    try {
      const existing = this.getAllContent();
      const filtered = existing.filter(c => c.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete content:', error);
    }
  }

  static exportContent(items: EnhancedContentItem[], format: 'json' | 'txt' = 'json'): void {
    try {
      let content: string;
      let filename: string;
      let mimeType: string;

      if (format === 'json') {
        content = JSON.stringify(items, null, 2);
        filename = `postrilo-content-${new Date().toISOString().split('T')[0]}.json`;
        mimeType = 'application/json';
      } else {
        content = items.map(item => `${item.title}\n\n${item.content}\n\n---\n\n`).join('');
        filename = `postrilo-content-${new Date().toISOString().split('T')[0]}.txt`;
        mimeType = 'text/plain';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export content:', error);
    }
  }

  static clearAllContent(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear content:', error);
    }
  }
}
