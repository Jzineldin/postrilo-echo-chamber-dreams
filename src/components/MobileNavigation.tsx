
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Home, 
  Plus, 
  BarChart3, 
  Settings, 
  Archive,
  Target,
  CheckSquare,
  Zap,
  ArrowLeft
} from "lucide-react";

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCreateProject?: () => void;
  unreadNotifications?: number;
}

export const MobileNavigation = ({ 
  activeTab, 
  onTabChange, 
  onCreateProject,
  unreadNotifications = 0 
}: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, badge: null },
    { id: "create", label: "Create Content", icon: Plus, badge: null },
    { id: "library", label: "Content Library", icon: Archive, badge: null },
    { id: "analytics", label: "Analytics", icon: BarChart3, badge: unreadNotifications > 0 ? unreadNotifications : null },
    { id: "brand-voice", label: "Brand Voice", icon: Target, badge: null },
    { id: "scheduler", label: "Scheduler", icon: CheckSquare, badge: null },
    { id: "settings", label: "Settings", icon: Settings, badge: null }
  ];

  const handleNavigation = (tabId: string) => {
    onTabChange(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 safe-area-bottom-padding">
        <div className="flex items-center justify-around">
          <Button
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavigation("dashboard")}
            className="flex flex-col gap-1 h-auto py-2 px-3 touch-friendly"
          >
            <Home className="w-4 h-4" />
            <span className="text-xs">Home</span>
          </Button>

          <Button
            variant={activeTab === "create" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavigation("create")}
            className="flex flex-col gap-1 h-auto py-2 px-3 touch-friendly"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs">Create</span>
          </Button>

          <Button
            variant={activeTab === "library" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavigation("library")}
            className="flex flex-col gap-1 h-auto py-2 px-3 touch-friendly"
          >
            <Archive className="w-4 h-4" />
            <span className="text-xs">Library</span>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col gap-1 h-auto py-2 px-3 touch-friendly"
              >
                <Menu className="w-4 h-4" />
                <span className="text-xs">More</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 safe-area-padding">
              <div className="space-y-6 pt-6">
                {/* Back to Dashboard */}
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation("dashboard")}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                  </Button>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">Navigation</h2>
                  <div className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      
                      return (
                        <Button
                          key={item.id}
                          variant={isActive ? "default" : "ghost"}
                          className="w-full justify-start touch-friendly min-h-[48px]"
                          onClick={() => handleNavigation(item.id)}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {item.label}
                          {item.badge && (
                            <Badge className="ml-auto bg-red-500 text-white">
                              {item.badge}
                            </Badge>
                          )}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start touch-friendly min-h-[48px]"
                      onClick={() => {
                        handleNavigation("create");
                      }}
                    >
                      <Zap className="w-4 h-4 mr-3" />
                      Quick Post
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden lg:flex lg:justify-center mb-6">
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg p-1">
          {navigationItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {item.badge && (
                  <Badge className="ml-1 bg-red-500 text-white">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};
