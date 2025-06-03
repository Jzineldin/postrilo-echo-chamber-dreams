
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Home, Settings, HelpCircle, User, BarChart3 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface MobileNavMenuProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const MobileNavMenu = ({ currentPath, onNavigate }: MobileNavMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', requiresAuth: true },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', requiresAuth: true },
    { icon: Settings, label: 'Settings', path: '/settings', requiresAuth: true },
    { icon: HelpCircle, label: 'Help & Support', path: '/help', requiresAuth: false },
    { icon: User, label: user ? 'Account' : 'Sign In', path: user ? '/account' : '/auth', requiresAuth: false },
  ];

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    onNavigate?.(path);
  };

  const visibleItems = navigationItems.filter(item => !item.requiresAuth || user);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="touch-friendly bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-gray-50"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 p-0 safe-area-padding">
          <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-heading font-semibold text-gray-900">
                Navigation
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="touch-friendly"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;
                  
                  return (
                    <Button
                      key={item.path}
                      variant={isActive ? "default" : "ghost"}
                      className={`
                        w-full justify-start touch-friendly min-h-[56px] px-4
                        ${isActive 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            {user && (
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-600">
                      Free Plan
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
