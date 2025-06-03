
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { ContentFormData } from '@/types/contentGeneration';

interface MobileContentSettingsProps {
  formData: ContentFormData;
  updateFormData: (updates: Partial<ContentFormData>) => void;
}

export const MobileContentSettings = ({
  formData,
  updateFormData
}: MobileContentSettingsProps) => {
  return (
    <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Include Emojis</span>
        <Switch
          checked={formData.emojiUsage}
          onCheckedChange={(checked) => updateFormData({ emojiUsage: checked })}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Add Hashtags</span>
        <Switch
          checked={formData.hashtagDensity}
          onCheckedChange={(checked) => updateFormData({ hashtagDensity: checked })}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Short Sentences</span>
        <Switch
          checked={formData.shortSentences}
          onCheckedChange={(checked) => updateFormData({ shortSentences: checked })}
        />
      </div>
    </div>
  );
};
