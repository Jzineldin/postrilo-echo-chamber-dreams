
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface KeyPointsFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const KeyPointsField = ({ value, onChange }: KeyPointsFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="keyPoints">Key Points (Optional)</Label>
      <Textarea
        id="keyPoints"
        placeholder="List important points, benefits, or messages..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
      />
    </div>
  );
};
