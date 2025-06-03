
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Home, 
  LayoutDashboard, 
  DollarSign, 
  Settings, 
  LogOut, 
  User, 
  MessageSquare, 
  Calendar, 
  Shield, 
  Plus, 
  HelpCircle, 
  BarChart3,
  ChevronDown,
  Menu
} from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

interface ModernNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const ModernNavigation = ({ 
  activeTab, 
  onTabChange, 
  isAuthenticated, 
  onLogout 
}: ModernNavigationProps) => {
  const { isAdmin } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);

  console.log("ModernNavigation props:", { activeTab, isAuthenticated });

  const publicNavItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  const privateNavItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "create", label: "Create", icon: Plus },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "brand-voice", label: "Brand Voice", icon: MessageSquare },
    { id: "scheduler", label: "Scheduler", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleItemClick = (itemId: string) => {
    console.log("Navigation item clicked:", itemId);
    onTabChange(itemId);
    setIsOpen(false);
  };

  const currentItem = [...publicNavItems, ...privateNavItems].find(item => item.id === activeTab);

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-xl p-2 shadow-lg border border-white/30">
        
        {/* Main Navigation Dropdown */}
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 font-semibold"
            >
              {currentItem ? (
                <>
                  <currentItem.icon className="w-4 h-4" />
                  {currentItem.label}
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4" />
                  Menu
                </>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-56 bg-white shadow-lg border">
            {/* Public Navigation */}
            {publicNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center gap-3 p-3 cursor-pointer ${
                    isActive ? 'bg-purple-50 text-purple-700' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </DropdownMenuItem>
              );
            })}

            {/* Separator if authenticated */}
            {isAuthenticated && <DropdownMenuSeparator />}

            {/* Private Navigation */}
            {isAuthenticated && privateNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center gap-3 p-3 cursor-pointer ${
                    isActive ? 'bg-purple-50 text-purple-700' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {item.id === "settings" && isAdmin && (
                    <Badge className="ml-auto bg-red-500 text-white text-xs">
                      <Shield className="w-2 h-2" />
                    </Badge>
                  )}
                </DropdownMenuItem>
              );
            })}

            {/* Authentication Actions */}
            {isAuthenticated ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 cursor-pointer text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleItemClick("auth")}
                  className={`flex items-center gap-3 p-3 cursor-pointer ${
                    activeTab === "auth" ? 'bg-purple-50 text-purple-700' : ''
                  }`}
                >
                  <User className="w-4 h-4" />
                  Sign In
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
          {!isAuthenticated && (
            <Button
              variant="default"
              size="sm"
              onClick={() => handleItemClick("auth")}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Login
            </Button>
          )}
          
          {isAuthenticated && (
            <Button
              variant={activeTab === "create" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleItemClick("create")}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
