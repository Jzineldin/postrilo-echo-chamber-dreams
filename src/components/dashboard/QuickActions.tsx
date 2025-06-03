
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  FileText, 
  BarChart3, 
  Calendar,
  Crown,
  Info,
  Zap
} from "lucide-react";

interface QuickActionsProps {
  user: any;
  isMobile: boolean;
  onCreateContent?: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const QuickActions = ({ user, isMobile, onCreateContent, onNavigateToTab }: QuickActionsProps) => {
  const handleViewSaved = () => {
    if (onNavigateToTab) {
      onNavigateToTab('library');
    }
  };

  const handleScheduleContent = () => {
    if (onNavigateToTab) {
      onNavigateToTab('scheduler');
    }
  };

  const handleViewAnalytics = () => {
    if (onNavigateToTab) {
      onNavigateToTab('analytics');
    }
  };

  if (isMobile) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded-lg">
            <Info className="w-4 h-4 inline mr-1" />
            Tap to start creating content or manage your existing posts
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={onCreateContent}
            className="w-full h-16 flex flex-col gap-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="w-6 h-6" />
            <span className="text-sm font-semibold">Start Creating</span>
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-14 flex flex-col gap-1"
              onClick={handleViewSaved}
            >
              <FileText className="w-5 h-5" />
              <span className="text-xs">Library</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 flex flex-col gap-1"
              onClick={handleScheduleContent}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Schedule</span>
            </Button>
          </div>
          
          {user.subscription === "free" && (
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4" />
                <span className="font-semibold">Upgrade to Premium</span>
              </div>
              <p className="text-sm text-white/90 mb-3">
                Unlock unlimited generations, analytics, brand voice customization, and more!
              </p>
              <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                Upgrade Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Content Actions
        </CardTitle>
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <Info className="w-4 h-4 inline mr-2" />
          <strong>Get Started:</strong>
          <ul className="mt-2 space-y-1 text-xs">
            <li>• <strong>Start Creating:</strong> Generate AI-powered content for social media</li>
            <li>• <strong>Content Library:</strong> Access your saved content and templates</li>
            <li>• <strong>Schedule Posts:</strong> Plan content for optimal timing</li>
            <li>• <strong>View Analytics:</strong> Track performance metrics (Premium)</li>
          </ul>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={onCreateContent}
          className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12"
        >
          <Plus className="w-5 h-5 mr-2" />
          Start Creating Content
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={handleViewSaved}
        >
          <FileText className="w-4 h-4 mr-2" />
          Content Library
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={handleScheduleContent}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Content
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={handleViewAnalytics}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          View Analytics {user.subscription === "free" && <Badge variant="secondary" className="ml-2">Premium</Badge>}
        </Button>
        
        {user.subscription === "free" && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4" />
              <span className="font-semibold">Upgrade to Premium</span>
            </div>
            <p className="text-sm text-white/90 mb-3">
              Unlock unlimited generations, analytics, brand voice customization, and more!
            </p>
            <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
              Upgrade Now
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
