
import { ContentManagementService, ContentItem } from './contentManagementService';

export interface ContentEditRequest {
  id: string;
  content: string;
  platform?: string;
  hashtags?: string[];
  metadata?: Record<string, any>;
}

export interface ContentDuplicateRequest {
  id: string;
  modifications?: {
    platform?: string;
    content?: string;
    hashtags?: string[];
  };
}

export class ContentEditingService {
  static async updateContent(request: ContentEditRequest): Promise<{ success: boolean; item?: ContentItem; error?: string }> {
    try {
      // Validate request
      if (!request.id) {
        return { success: false, error: 'Content ID is required' };
      }

      if (!request.content?.trim()) {
        return { success: false, error: 'Content cannot be empty' };
      }

      // Get existing item
      const existingItem = ContentManagementService.getContentById(request.id);
      if (!existingItem) {
        return { success: false, error: 'Content not found' };
      }

      // Prepare updates
      const updates: Partial<ContentItem> = {
        content: request.content.trim(),
      };

      if (request.platform) {
        updates.platform = request.platform;
      }

      if (request.hashtags) {
        updates.hashtags = request.hashtags;
      }

      // Update the content
      const updateSuccess = ContentManagementService.updateContent(request.id, updates);
      
      if (!updateSuccess) {
        return { success: false, error: 'Failed to update content' };
      }

      // Get updated item
      const updatedItem = ContentManagementService.getContentById(request.id);
      
      return { 
        success: true, 
        item: updatedItem || undefined 
      };

    } catch (error) {
      console.error('Content editing error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update content' 
      };
    }
  }

  static async duplicateContent(request: ContentDuplicateRequest): Promise<{ success: boolean; item?: ContentItem; error?: string }> {
    try {
      // Validate request
      if (!request.id) {
        return { success: false, error: 'Content ID is required' };
      }

      // Get original item
      const originalItem = ContentManagementService.getContentById(request.id);
      if (!originalItem) {
        return { success: false, error: 'Original content not found' };
      }

      // Create new content with modifications
      const newContent = {
        content: request.modifications?.content || `${originalItem.content} (Copy)`,
        platform: request.modifications?.platform || originalItem.platform,
        status: 'draft' as const,
        hashtags: request.modifications?.hashtags || originalItem.hashtags
      };

      const duplicatedItem = ContentManagementService.saveContent(newContent);

      return { 
        success: true, 
        item: duplicatedItem 
      };

    } catch (error) {
      console.error('Content duplication error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to duplicate content' 
      };
    }
  }

  static async deleteContent(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!id) {
        return { success: false, error: 'Content ID is required' };
      }

      const deleteSuccess = ContentManagementService.deleteContent(id);
      
      if (!deleteSuccess) {
        return { success: false, error: 'Content not found or failed to delete' };
      }

      return { success: true };

    } catch (error) {
      console.error('Content deletion error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete content' 
      };
    }
  }

  static async bulkUpdatePlatform(contentIds: string[], newPlatform: string): Promise<{ success: boolean; updatedCount: number; error?: string }> {
    try {
      if (!contentIds.length) {
        return { success: false, updatedCount: 0, error: 'No content IDs provided' };
      }

      if (!newPlatform) {
        return { success: false, updatedCount: 0, error: 'Platform is required' };
      }

      let updatedCount = 0;
      const errors: string[] = [];

      for (const id of contentIds) {
        try {
          const success = ContentManagementService.updateContent(id, { platform: newPlatform });
          if (success) {
            updatedCount++;
          } else {
            errors.push(`Failed to update content ${id}`);
          }
        } catch (error) {
          errors.push(`Error updating content ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      return {
        success: updatedCount > 0,
        updatedCount,
        error: errors.length > 0 ? `Some updates failed: ${errors.join(', ')}` : undefined
      };

    } catch (error) {
      console.error('Bulk update error:', error);
      return {
        success: false,
        updatedCount: 0,
        error: error instanceof Error ? error.message : 'Failed to perform bulk update'
      };
    }
  }

  static validateContent(content: string, platform?: string): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic validation
    if (!content.trim()) {
      errors.push('Content cannot be empty');
    }

    // Platform-specific validation
    if (platform) {
      const platformLimits = {
        twitter: { max: 280, recommended: 250 },
        instagram: { max: 2200, recommended: 125 },
        facebook: { max: 63206, recommended: 80 },
        linkedin: { max: 1300, recommended: 150 },
        tiktok: { max: 150, recommended: 100 },
        youtube: { max: 5000, recommended: 200 }
      };

      const limits = platformLimits[platform as keyof typeof platformLimits];
      if (limits) {
        if (content.length > limits.max) {
          errors.push(`Content exceeds ${platform} maximum of ${limits.max} characters`);
        } else if (content.length > limits.recommended) {
          warnings.push(`Content is longer than recommended ${limits.recommended} characters for ${platform}`);
        }
      }
    }

    // Check for common issues
    if (content.includes('http://') && !content.includes('https://')) {
      warnings.push('Consider using HTTPS links for better security');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}

export const contentEditingService = new ContentEditingService();
