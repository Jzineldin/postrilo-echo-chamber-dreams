
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Keyboard } from "lucide-react";

interface ShortcutIndicatorProps {
  shortcut: string;
  className?: string;
}

export const ShortcutIndicator = ({ shortcut, className = "" }: ShortcutIndicatorProps) => {
  return (
    <Badge variant="outline" className={`text-xs ${className}`}>
      <Keyboard className="w-3 h-3 mr-1" />
      {shortcut}
    </Badge>
  );
};
