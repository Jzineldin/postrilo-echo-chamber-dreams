
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Wand2, 
  Archive,
  Settings, 
  CreditCard,
  Crown
} from "lucide-react";

interface SimplifiedNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  user: any;
  isPro?: boolean;
}

// Core features only
const coreNavigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Your content overview' },
  { id: 'create', label: 'Create Content', icon: Wand2, description: 'Generate new content' },
  { id: 'library', label: 'Content Library', icon: Archive, description: 'Saved content' },
  { id: 'settings', label: 'Settings', icon: Settings, description: 'Account & preferences' },
];

// Secondary features (available in dropdown)
const secondaryItems = [
  { id: 'pricing', label: 'Upgrade', icon: CreditCard },
];

export const SimplifiedNavigation = ({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  user,
  isPro = false 
}: SimplifiedNavigationProps) => {
  return (
    <nav className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl p-2">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Wand2 className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-900">Postrilo</h1>
          </div>
          {isPro && (
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
              <Crown className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          )}
        </div>
        
        {/* Core Navigation */}
        <div className="flex items-center space-x-1">
          {coreNavigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(item.id)}
              className="flex items-center space-x-2 relative group"
              title={item.description}
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden md:inline">{item.label}</span>
            </Button>
          ))}
          
          {/* Secondary Actions */}
          {!isPro && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTabChange('pricing')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700"
            >
              <Crown className="w-4 h-4 mr-1" />
              <span className="hidden md:inline">Upgrade</span>
            </Button>
          )}
        </div>

        {/* User Actions */}
        {user && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 hidden lg:inline">
              {user.email?.split('@')[0]}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
