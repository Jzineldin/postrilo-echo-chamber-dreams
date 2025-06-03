
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contentTypes } from "./types";

interface ContentTypeSelectorProps {
  contentType: string;
  onContentTypeChange: (value: string) => void;
}

export const ContentTypeSelector = ({ contentType, onContentTypeChange }: ContentTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="content-type">Content Type</Label>
      <Select value={contentType} onValueChange={onContentTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select content type" />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg z-50">
          {contentTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
