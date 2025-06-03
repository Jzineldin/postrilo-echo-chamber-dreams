
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Sparkles, Plus, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardWelcomeHeaderProps {
  user: any;
  subscribed: boolean;
  planName: string;
  canGenerateMore: boolean;
  isMobile: boolean;
  onCreateContent: () => void;
}

export const DashboardWelcomeHeader = ({
  user,
  subscribed,
  planName,
  canGenerateMore,
  isMobile,
  onCreateContent
}: DashboardWelcomeHeaderProps) => {
  return (
    <>
      {/* Welcome Section */}
      <div className="flex items-center justify-between dashboard-welcome">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Creator'}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Ready to create amazing content today?
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            variant={subscribed ? "default" : "secondary"}
            className={`${subscribed ? "bg-purple-600" : ""} flex items-center gap-1`}
          >
            {subscribed ? <Crown className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
            {planName}
          </Badge>
          <Button 
            variant="default" 
            className="create-content-button"
            onClick={onCreateContent}
            disabled={!canGenerateMore}
          >
            <Plus className="w-4 h-4 mr-1" />
            {canGenerateMore ? "Create Content" : "Limit Reached"}
          </Button>
        </div>
      </div>

      {/* Mobile-specific warning if needed */}
      {isMobile && !canGenerateMore && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <p className="text-orange-700 text-sm">
                You've reached your monthly content limit. Upgrade to continue creating content on mobile.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
