
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
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
  isNavigating?: boolean;
}

// Core features only
const coreNavigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Your content overview' },
  { id: 'create', label: 'Create Content', icon: Wand2, description: 'Generate new content' },
  { id: 'library', label: 'Content Library', icon: Archive, description: 'Saved content' },
  { id: 'settings', label: 'Settings', icon: Settings, description: 'Account & preferences' },
];

export const SimplifiedNavigation = ({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  user,
  isPro = false,
  isNavigating = false
}: SimplifiedNavigationProps) => {
  
  const handleTabClick = (tab: string) => {
    if (isNavigating) return; // Prevent clicks during navigation
    onTabChange(tab);
  };

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
          {coreNavigationItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => handleTabClick(item.id)}
                disabled={isNavigating}
                className="flex items-center space-x-2 relative group disabled:opacity-50"
                title={item.description}
              >
                {isNavigating && isActive ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <item.icon className="w-4 h-4" />
                )}
                <span className="hidden md:inline">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full" />
                )}
              </Button>
            );
          })}
          
          {/* Secondary Actions */}
          {!isPro && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleTabClick('pricing')}
              disabled={isNavigating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
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
              disabled={isNavigating}
              className="text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              {isNavigating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Sign Out"
              )}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
