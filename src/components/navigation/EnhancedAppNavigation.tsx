
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Wand2, 
  Archive,
  Settings, 
  CreditCard,
  TestTube,
  Crown,
  LogOut
} from 'lucide-react';

interface EnhancedAppNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  user: any;
  isPro?: boolean;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Your content overview', path: '/#dashboard' },
  { id: 'create', label: 'Create', icon: Wand2, description: 'Generate new content', path: '/#create' },
  { id: 'library', label: 'Library', icon: Archive, description: 'Saved content', path: '/#library' },
  { id: 'settings', label: 'Settings', icon: Settings, description: 'Account & preferences', path: '/#settings' },
  { id: 'testing', label: 'Testing', icon: TestTube, description: 'System testing', path: '/testing' },
];

export const EnhancedAppNavigation = ({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  user,
  isPro = false 
}: EnhancedAppNavigationProps) => {
  const location = useLocation();

  const handleNavigation = (item: typeof navigationItems[0]) => {
    if (item.path.startsWith('/#')) {
      // Hash-based navigation for main app
      onTabChange(item.id);
    } else {
      // Route-based navigation for separate pages
      window.location.href = item.path;
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl p-2 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            onClick={() => onTabChange('home')}
          >
            <Wand2 className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-900">Postrilo</h1>
          </Link>
          {isPro && (
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
              <Crown className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          )}
        </div>
        
        {/* Core Navigation */}
        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === '/testing' 
              ? item.id === 'testing'
              : activeTab === item.id;
              
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item)}
                className="flex items-center space-x-2 relative group transition-all duration-200"
                title={item.description}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden md:inline">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full" />
                )}
              </Button>
            );
          })}
          
          {/* Upgrade Button */}
          {!isPro && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTabChange('pricing')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
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
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
