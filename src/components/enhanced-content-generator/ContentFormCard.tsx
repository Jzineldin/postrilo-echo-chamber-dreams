
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { PlatformSelector } from "./PlatformSelector";
import { ContentGoalSelector } from "./ContentGoalSelector";
import { BrandVoiceSettings } from "./BrandVoiceSettings";
import { TopicField } from "./form-fields/TopicField";
import { ToneSelector } from "./form-fields/ToneSelector";
import { KeyPointsField } from "./form-fields/KeyPointsField";
import { FormData } from "./types";

interface ContentFormCardProps {
  formData: FormData;
  onFormDataChange: (updates: Partial<FormData>) => void;
}

export const ContentFormCard = ({ formData, onFormDataChange }: ContentFormCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ContentTypeSelector 
          contentType={formData.contentType}
          onContentTypeChange={(value) => onFormDataChange({ contentType: value as FormData["contentType"] })}
        />
        
        <TopicField
          value={formData.topic}
          onChange={(value) => onFormDataChange({ topic: value })}
        />

        <PlatformSelector 
          platform={formData.platform}
          onPlatformChange={(value) => onFormDataChange({ platform: value as FormData["platform"] })}
        />

        <ContentGoalSelector 
          goal={formData.goal}
          onGoalChange={(value) => onFormDataChange({ goal: value as FormData["goal"] })}
        />

        <ToneSelector
          value={formData.tone}
          onChange={(value) => onFormDataChange({ tone: value as FormData["tone"] })}
        />

        <KeyPointsField
          value={formData.keyPoints}
          onChange={(value) => onFormDataChange({ keyPoints: value })}
        />

        <BrandVoiceSettings 
          emojiUsage={formData.emojiUsage}
          hashtagDensity={formData.hashtagDensity}
          shortSentences={formData.shortSentences}
          onEmojiToggle={(checked) => onFormDataChange({ emojiUsage: checked })}
          onHashtagToggle={(checked) => onFormDataChange({ hashtagDensity: checked })}
          onShortSentencesToggle={(checked) => onFormDataChange({ shortSentences: checked })}
        />
      </CardContent>
    </Card>
  );
};
