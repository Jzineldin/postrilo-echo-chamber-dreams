
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TopicFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const TopicField = ({ value, onChange }: TopicFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="topic">Topic or Product *</Label>
      <Input
        id="topic"
        placeholder="e.g., NOCCO energy drink, morning productivity routine..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
