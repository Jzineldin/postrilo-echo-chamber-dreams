
export class ContentHistoryService {
  private static readonly STORAGE_KEY = 'postrilo_content_history';

  static saveContent(contentData: any): void {
    try {
      const existing = this.getHistory();
      const newItem = {
        id: crypto.randomUUID(),
        ...contentData,
        createdAt: new Date().toISOString()
      };
      const updated = [newItem, ...existing];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
      console.log('Saving content to history:', contentData);
    } catch (error) {
      console.error('Failed to save content to history:', error);
      throw error;
    }
  }

  static getHistory(): any[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load content history:', error);
      return [];
    }
  }

  static deleteContent(id: string): void {
    try {
      const existing = this.getHistory();
      const filtered = existing.filter(item => item.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete content:', error);
      throw error;
    }
  }

  static exportContent(content: any, format: 'txt' | 'json' = 'txt'): void {
    try {
      let exportData: string;
      let filename: string;
      let mimeType: string;

      if (format === 'json') {
        exportData = JSON.stringify(content, null, 2);
        filename = `content-${Date.now()}.json`;
        mimeType = 'application/json';
      } else {
        exportData = content.content || '';
        filename = `content-${Date.now()}.txt`;
        mimeType = 'text/plain';
      }

      const blob = new Blob([exportData], { type: mimeType });
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
      throw error;
    }
  }
}
