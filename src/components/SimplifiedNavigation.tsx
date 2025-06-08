
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ResponsiveButton } from "@/components/ui/ResponsiveButton";
import { 
  Home, 
  Wand2, 
  Archive,
  Settings, 
  Crown
} from "lucide-react";
import { useMobileNavigation } from "@/hooks/useMobileNavigation";

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

export const SimplifiedNavigation = ({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  user,
  isPro = false
}: SimplifiedNavigationProps) => {
  
  const { 
    isMobile, 
    isNavigating, 
    navigateWithMobileOptimizations 
  } = useMobileNavigation();

  const handleTabClick = (tab: string) => {
    console.log('Tab clicked:', tab, 'Current:', activeTab);
    
    // Prevent navigation to same tab
    if (activeTab === tab) {
      console.log('Already on tab:', tab);
      return;
    }
    
    onTabChange(tab);
  };

  const handleUpgradeClick = () => {
    navigateWithMobileOptimizations('/pricing');
    onTabChange('pricing');
  };

  const handleLogoutClick = () => {
    if (!isNavigating) {
      onLogout();
    }
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
              <ResponsiveButton
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size={isMobile ? "default" : "sm"}
                onClick={() => handleTabClick(item.id)}
                disabled={isNavigating && !isActive}
                loading={isNavigating && isActive}
                icon={item.icon}
                className="flex items-center space-x-2 relative group"
                aria-label={item.description}
              >
                <span className="hidden md:inline">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full" />
                )}
              </ResponsiveButton>
            );
          })}
          
          {/* Secondary Actions */}
          {!isPro && (
            <ResponsiveButton
              variant="outline"
              size={isMobile ? "default" : "sm"}
              onClick={handleUpgradeClick}
              disabled={isNavigating}
              icon={Crown}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700"
              aria-label="Upgrade to Pro plan"
            >
              <span className="hidden md:inline">Upgrade</span>
            </ResponsiveButton>
          )}
        </div>

        {/* User Actions */}
        {user && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 hidden lg:inline">
              {user.email?.split('@')[0]}
            </span>
            <ResponsiveButton 
              variant="ghost" 
              size={isMobile ? "default" : "sm"}
              onClick={handleLogoutClick}
              disabled={isNavigating}
              loading={isNavigating && activeTab === 'logout'}
              className="text-gray-600 hover:text-gray-800"
              aria-label="Sign out of your account"
            >
              Sign Out
            </ResponsiveButton>
          </div>
        )}
      </div>
    </nav>
  );
};
