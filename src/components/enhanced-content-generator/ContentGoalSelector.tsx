
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { goals } from "./types";

interface ContentGoalSelectorProps {
  goal: string;
  onGoalChange: (value: string) => void;
}

export const ContentGoalSelector = ({ goal, onGoalChange }: ContentGoalSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="goal">Content Goal</Label>
      <Select value={goal} onValueChange={onGoalChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select goal" />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg z-50">
          {goals.map((g) => (
            <SelectItem key={g.value} value={g.value}>
              {g.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
