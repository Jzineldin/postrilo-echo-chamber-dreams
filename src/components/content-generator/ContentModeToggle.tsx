
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContentModeToggleProps {
  usePromptTemplate: boolean;
  onToggle: (value: boolean) => void;
}

export const ContentModeToggle = ({ usePromptTemplate, onToggle }: ContentModeToggleProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
      <CardHeader className={`${isMobile ? 'pb-3 px-4 pt-4' : 'pb-4'}`}>
        <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} text-emerald-900 font-bold`}>
          🎯 AI Behavior System
        </CardTitle>
      </CardHeader>
      <CardContent className={`space-y-4 ${isMobile ? 'px-4 pb-4' : ''}`}>
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Advanced Template System</Label>
            <p className="text-sm text-emerald-700 mt-1">
              Dynamic AI behavior that adapts to content type & platform
            </p>
          </div>
          <Switch
            checked={usePromptTemplate}
            onCheckedChange={onToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
};
