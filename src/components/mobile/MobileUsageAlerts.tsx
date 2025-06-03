
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface MobileUsageAlertsProps {
  canGenerateMore: boolean;
  postsRemaining: number;
}

export const MobileUsageAlerts = ({ canGenerateMore, postsRemaining }: MobileUsageAlertsProps) => {
  if (!canGenerateMore) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-700">
          You've reached your monthly limit. {postsRemaining} posts remaining.
        </AlertDescription>
      </Alert>
    );
  }

  if (canGenerateMore && postsRemaining <= 5 && postsRemaining > 0) {
    return (
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-700">
          Only {postsRemaining} posts remaining this month.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};
