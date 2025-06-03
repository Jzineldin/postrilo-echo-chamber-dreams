
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { platforms } from "./types";

interface PlatformSelectorProps {
  platform: string;
  onPlatformChange: (value: string) => void;
}

export const PlatformSelector = ({ platform, onPlatformChange }: PlatformSelectorProps) => {
  // Group platforms by region
  const globalPlatforms = platforms.filter(p => p.region === "global");
  const nordicPlatforms = platforms.filter(p => p.region === "nordic");

  return (
    <div className="space-y-2">
      <Label htmlFor="platform">Platform</Label>
      <Select value={platform} onValueChange={onPlatformChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select platform" />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg z-50">
          {globalPlatforms.length > 0 && (
            <>
              <div className="px-2 py-1 text-sm font-medium text-gray-500">Global Platforms</div>
              {globalPlatforms.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{p.label}</span>
                  </div>
                </SelectItem>
              ))}
            </>
          )}
          {nordicPlatforms.length > 0 && (
            <>
              <div className="px-2 py-1 text-sm font-medium text-gray-500 border-t mt-1 pt-2">Nordic Platforms</div>
              {nordicPlatforms.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{p.label}</span>
                    <Badge variant="secondary" className="text-xs ml-2">Nordic</Badge>
                  </div>
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
