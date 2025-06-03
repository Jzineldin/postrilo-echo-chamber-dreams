
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface BrandVoiceSettingsProps {
  emojiUsage: boolean;
  hashtagDensity: boolean;
  shortSentences: boolean;
  onEmojiToggle: (checked: boolean) => void;
  onHashtagToggle: (checked: boolean) => void;
  onShortSentencesToggle: (checked: boolean) => void;
}

export const BrandVoiceSettings = ({
  emojiUsage,
  hashtagDensity,
  shortSentences,
  onEmojiToggle,
  onHashtagToggle,
  onShortSentencesToggle
}: BrandVoiceSettingsProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">Brand Voice Settings</Label>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="emoji-usage" className="font-medium">Emoji Usage</Label>
            <p className="text-sm text-gray-500">Include emojis in the content</p>
          </div>
          <Switch
            id="emoji-usage"
            checked={emojiUsage}
            onCheckedChange={onEmojiToggle}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="hashtag-density" className="font-medium">High Hashtag Density</Label>
            <p className="text-sm text-gray-500">Use more hashtags for reach</p>
          </div>
          <Switch
            id="hashtag-density"
            checked={hashtagDensity}
            onCheckedChange={onHashtagToggle}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="short-sentences" className="font-medium">Short Sentences</Label>
            <p className="text-sm text-gray-500">Use brief, punchy sentences</p>
          </div>
          <Switch
            id="short-sentences"
            checked={shortSentences}
            onCheckedChange={onShortSentencesToggle}
          />
        </div>
      </div>
    </div>
  );
};
