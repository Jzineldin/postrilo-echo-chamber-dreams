
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Zap } from "lucide-react";

interface CacheSettingsCardProps {
  useCache: boolean;
  onCacheToggle: (checked: boolean) => void;
  cacheStats: {
    size: number;
    hitRate: number;
  };
}

export const CacheSettingsCard = ({ useCache, onCacheToggle, cacheStats }: CacheSettingsCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4" />
          Smart Caching
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Enable Caching</Label>
            <p className="text-xs text-gray-500">Reuse similar content to save processing time</p>
          </div>
          <Switch
            checked={useCache}
            onCheckedChange={onCacheToggle}
          />
        </div>

        {cacheStats.size > 0 && (
          <div className="text-xs text-gray-600 bg-white/60 rounded p-2">
            Cache: {cacheStats.size} items, {cacheStats.hitRate.toFixed(1)}% hit rate
          </div>
        )}
      </CardContent>
    </Card>
  );
};
