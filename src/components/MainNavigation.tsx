
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Wand2, 
  FileText, 
  Archive,
  BarChart3, 
  Settings, 
  CreditCard, 
  HelpCircle,
  LogOut,
  Crown
} from "lucide-react";

interface MainNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  user: any;
  isPro?: boolean;
}

export const MainNavigation = ({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  user,
  isPro = false 
}: MainNavigationProps) => {
  const navigationItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'create', label: 'Create Content', icon: Wand2 },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'library', label: 'Content Library', icon: Archive },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    window.location.hash = tabId;
  };

  return (
    <nav className="flex items-center justify-between w-full px-4 py-2 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-1">
        <div className="flex items-center space-x-4 mr-6">
          <h1 className="text-xl font-bold text-gray-900">Postrilo</h1>
          {isPro && (
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          )}
        </div>
        
        <div className="flex space-x-1">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => handleTabClick(item.id)}
              className="flex items-center space-x-2"
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden md:inline">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {user && (
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 hidden md:inline">
            {user.email}
          </span>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline ml-2">Logout</span>
          </Button>
        </div>
      )}
    </nav>
  );
};
