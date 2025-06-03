
import React from "react";
import { EnhancedInteractiveDemo } from "@/components/enhanced-demo/EnhancedInteractiveDemo";

interface DemoModeViewProps {
  onClose: () => void;
}

export const DemoModeView = ({ onClose }: DemoModeViewProps) => {
  return <EnhancedInteractiveDemo onClose={onClose} />;
};
