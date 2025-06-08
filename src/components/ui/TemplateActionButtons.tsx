
import React, { useState } from 'react';
import { ResponsiveButton } from '@/components/ui/ResponsiveButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, ArrowRight, Copy, Heart } from 'lucide-react';
import { useTemplateService, TemplateData } from '@/services/templateService';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface TemplateActionButtonsProps {
  template: TemplateData;
  showPreview?: boolean;
  showUseTemplate?: boolean;
  showFavorite?: boolean;
  variant?: 'compact' | 'full';
  className?: string;
  onPreview?: (template: TemplateData) => void;
  onUseTemplate?: (template: TemplateData) => void;
}

export const TemplateActionButtons = ({
  template,
  showPreview = true,
  showUseTemplate = true,
  showFavorite = true,
  variant = 'full',
  className,
  onPreview,
  onUseTemplate
}: TemplateActionButtonsProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(template.platforms[0] || 'instagram');
  const isMobile = useIsMobile();
  
  const {
    useTemplate,
    previewTemplate,
    copyPreviewContent,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  } = useTemplateService();

  const handlePreview = () => {
    if (onPreview) {
      onPreview(template);
    } else {
      setPreviewOpen(true);
    }
  };

  const handleUseTemplate = () => {
    if (onUseTemplate) {
      onUseTemplate(template);
    } else {
      useTemplate(template);
    }
  };

  const handleFavorite = () => {
    if (isFavorite(template.id)) {
      removeFromFavorites(template.id);
    } else {
      addToFavorites(template.id);
    }
  };

  const previewData = previewTemplate(template, selectedPlatform);
  const isCompact = variant === 'compact';
  const isFavorited = isFavorite(template.id);

  return (
    <>
      <div className={cn(
        'flex gap-2',
        isCompact ? 'flex-row' : 'flex-col sm:flex-row',
        className
      )}>
        {showPreview && (
          <ResponsiveButton
            variant="outline"
            size={isCompact ? "sm" : "default"}
            onClick={handlePreview}
            icon={Eye}
            iconPosition="left"
            className="flex-1"
            aria-label={`Preview ${template.name} template`}
          >
            {!isCompact && "Preview"}
          </ResponsiveButton>
        )}

        {showUseTemplate && (
          <ResponsiveButton
            variant="default"
            size={isCompact ? "sm" : "default"}
            onClick={handleUseTemplate}
            icon={ArrowRight}
            iconPosition="right"
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            aria-label={`Use ${template.name} template`}
          >
            {isCompact ? "Use" : "Use Template"}
          </ResponsiveButton>
        )}

        {showFavorite && (
          <ResponsiveButton
            variant="ghost"
            size={isCompact ? "sm" : "default"}
            onClick={handleFavorite}
            icon={Heart}
            className={cn(
              "p-2",
              isFavorited && "text-red-500 hover:text-red-600"
            )}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
          </ResponsiveButton>
        )}
      </div>

      {/* Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {template.name} Preview
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Platform Selector */}
            {template.platforms.length > 1 && (
              <div className="flex gap-1 flex-wrap">
                {template.platforms.map((platform) => (
                  <Badge
                    key={platform}
                    variant={selectedPlatform === platform ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedPlatform(platform)}
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Badge>
                ))}
              </div>
            )}

            {/* Preview Content */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Content Preview</h4>
                  <ResponsiveButton
                    variant="ghost"
                    size="sm"
                    onClick={() => copyPreviewContent(previewData.content)}
                    icon={Copy}
                    className="p-1"
                    aria-label="Copy preview content"
                  >
                  </ResponsiveButton>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {previewData.content}
                  </p>
                </div>

                {/* Content Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div className="text-center">
                    <div className="font-medium">{previewData.characterCount}</div>
                    <div className="text-gray-500">Characters</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{previewData.hashtagCount}</div>
                    <div className="text-gray-500">Hashtags</div>
                  </div>
                  <div className="text-center col-span-2 sm:col-span-1">
                    <div className="font-medium">{previewData.estimatedEngagement}</div>
                    <div className="text-gray-500">Est. Engagement</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <ResponsiveButton
                variant="outline"
                onClick={() => copyPreviewContent(previewData.content)}
                icon={Copy}
                iconPosition="left"
                className="flex-1"
              >
                Copy Content
              </ResponsiveButton>
              
              <ResponsiveButton
                variant="default"
                onClick={() => {
                  handleUseTemplate();
                  setPreviewOpen(false);
                }}
                icon={ArrowRight}
                iconPosition="right"
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Use This Template
              </ResponsiveButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
