
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContentGuidelinesCardProps {
  formData: {
    bannedWords: string;
  };
  setFormData: (data: any) => void;
}

export const ContentGuidelinesCard = ({ formData, setFormData }: ContentGuidelinesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Guidelines</CardTitle>
        <p className="text-sm text-gray-600">
          Set rules for what language and style to use or avoid
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="bannedWords">Banned Words or Phrases</Label>
          <Textarea
            id="bannedWords"
            value={formData.bannedWords}
            onChange={(e) => setFormData({...formData, bannedWords: e.target.value})}
            placeholder="Enter words or phrases to avoid, separated by commas"
            rows={3}
          />
          <p className="text-sm text-gray-600 mt-1">
            These words will be avoided in AI-generated content. Example: "cheap, discount, free trial"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
