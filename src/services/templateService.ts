
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export interface TemplateData {
  id: string;
  name: string;
  description: string;
  category: string;
  platforms: string[];
  variables: string[];
  exampleContent: string | Record<string, string>;
  features?: string[];
  rating?: number;
  uses?: number;
  icon?: string;
  color?: string;
  popularity?: number;
}

export interface TemplatePreviewData {
  content: string;
  platform: string;
  characterCount: number;
  hashtagCount: number;
  estimatedEngagement: string;
}

export class TemplateService {
  private static instance: TemplateService;
  private favorites: Set<string> = new Set();
  private recentTemplates: string[] = [];

  static getInstance(): TemplateService {
    if (!TemplateService.instance) {
      TemplateService.instance = new TemplateService();
    }
    return TemplateService.instance;
  }

  // Get preview content for a template
  getTemplatePreview(template: TemplateData, platform: string = 'instagram'): TemplatePreviewData {
    let content = '';
    
    if (typeof template.exampleContent === 'string') {
      content = template.exampleContent;
    } else if (template.exampleContent[platform]) {
      content = template.exampleContent[platform];
    } else {
      // Get first available platform content
      const firstPlatform = Object.keys(template.exampleContent)[0];
      content = template.exampleContent[firstPlatform] || '';
    }

    const characterCount = content.length;
    const hashtagCount = (content.match(/#\w+/g) || []).length;
    const estimatedEngagement = this.calculateEngagementEstimate(characterCount, hashtagCount, platform);

    return {
      content,
      platform,
      characterCount,
      hashtagCount,
      estimatedEngagement
    };
  }

  // Calculate engagement estimate based on content characteristics
  private calculateEngagementEstimate(charCount: number, hashtagCount: number, platform: string): string {
    let baseScore = 50;
    
    // Character count optimization
    if (platform === 'twitter' && charCount <= 280) baseScore += 20;
    if (platform === 'instagram' && charCount >= 100 && charCount <= 2200) baseScore += 15;
    if (platform === 'linkedin' && charCount >= 150 && charCount <= 3000) baseScore += 15;
    
    // Hashtag optimization
    if (hashtagCount >= 3 && hashtagCount <= 11) baseScore += 10;
    
    if (baseScore >= 80) return 'High';
    if (baseScore >= 60) return 'Medium-High';
    if (baseScore >= 40) return 'Medium';
    return 'Low-Medium';
  }

  // Add template to favorites
  addToFavorites(templateId: string): void {
    this.favorites.add(templateId);
    localStorage.setItem('favoriteTemplates', JSON.stringify([...this.favorites]));
  }

  // Remove template from favorites
  removeFromFavorites(templateId: string): void {
    this.favorites.delete(templateId);
    localStorage.setItem('favoriteTemplates', JSON.stringify([...this.favorites]));
  }

  // Check if template is favorited
  isFavorite(templateId: string): boolean {
    return this.favorites.has(templateId);
  }

  // Add template to recent usage
  addToRecent(templateId: string): void {
    this.recentTemplates = [templateId, ...this.recentTemplates.filter(id => id !== templateId)].slice(0, 10);
    localStorage.setItem('recentTemplates', JSON.stringify(this.recentTemplates));
  }

  // Get recent templates
  getRecentTemplates(): string[] {
    return this.recentTemplates;
  }

  // Initialize from localStorage
  initialize(): void {
    const favorites = localStorage.getItem('favoriteTemplates');
    if (favorites) {
      this.favorites = new Set(JSON.parse(favorites));
    }
    
    const recent = localStorage.getItem('recentTemplates');
    if (recent) {
      this.recentTemplates = JSON.parse(recent);
    }
  }
}

// Hook for using template service
export const useTemplateService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const service = TemplateService.getInstance();

  const useTemplate = (template: TemplateData, variables?: Record<string, string>) => {
    try {
      // Add to recent templates
      service.addToRecent(template.id);
      
      // Prepare data for content generator
      const templateData = {
        templateId: template.id,
        templateName: template.name,
        platforms: template.platforms,
        variables: variables || {},
        category: template.category
      };
      
      // Store template data for content generator
      sessionStorage.setItem('selectedTemplate', JSON.stringify(templateData));
      
      // Navigate to content generator
      navigate('/create');
      
      toast({
        title: "Template Selected",
        description: `Using "${template.name}" template for content creation.`
      });
    } catch (error) {
      console.error('Error using template:', error);
      toast({
        title: "Error",
        description: "Failed to use template. Please try again.",
        variant: "destructive"
      });
    }
  };

  const previewTemplate = (template: TemplateData, platform: string = 'instagram') => {
    return service.getTemplatePreview(template, platform);
  };

  const copyPreviewContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Template content copied to clipboard."
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive"
      });
    }
  };

  return {
    useTemplate,
    previewTemplate,
    copyPreviewContent,
    addToFavorites: service.addToFavorites.bind(service),
    removeFromFavorites: service.removeFromFavorites.bind(service),
    isFavorite: service.isFavorite.bind(service),
    getRecentTemplates: service.getRecentTemplates.bind(service)
  };
};
