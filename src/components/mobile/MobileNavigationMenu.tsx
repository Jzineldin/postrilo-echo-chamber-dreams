
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Home, 
  Sparkles, 
  Library, 
  Settings, 
  User,
  BarChart3,
  CreditCard
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileNavigationMenuProps {
  onNavigate: (section: string) => void;
  currentSection: string;
  postsRemaining?: number;
}

export const MobileNavigationMenu = ({
  onNavigate,
  currentSection,
  postsRemaining = 5
}: MobileNavigationMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create', label: 'Create Content', icon: Sparkles },
    { id: 'library', label: 'Content Library', icon: Library },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'account', label: 'Account', icon: User }
  ];

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-md"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Usage Badge */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Badge variant="outline" className="bg-white/95 backdrop-blur-sm">
          {postsRemaining} left
        </Badge>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)}>
          <Card className="absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl">
            <CardContent className="p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentSection === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start h-12"
                      onClick={() => handleNavigate(item.id)}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 text-center">
                  {postsRemaining} posts remaining this month
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => handleNavigate('upgrade')}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
