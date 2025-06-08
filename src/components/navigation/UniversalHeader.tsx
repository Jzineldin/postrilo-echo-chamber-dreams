
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Wand2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface UniversalHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  onHome?: () => void;
  currentPage?: string;
}

export const UniversalHeader = ({ 
  title, 
  showBackButton = true, 
  onBack, 
  onHome,
  currentPage 
}: UniversalHeaderProps) => {
  const isMobile = useIsMobile();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      // Default back behavior - go to dashboard
      window.location.hash = 'dashboard';
    }
  };

  const handleHomeClick = () => {
    if (onHome) {
      onHome();
    } else {
      // Default home behavior
      window.location.hash = 'dashboard';
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo - always clickable to go home */}
            <div 
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleHomeClick}
            >
              <Wand2 className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Postrilo
              </span>
            </div>

            {/* Back Button */}
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                {!isMobile && 'Back'}
              </Button>
            )}

            {/* Page Title */}
            {title && (
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                {currentPage && (
                  <p className="text-sm text-gray-500">{currentPage}</p>
                )}
              </div>
            )}
          </div>

          {/* Home Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleHomeClick}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            {!isMobile && 'Dashboard'}
          </Button>
        </div>
      </div>
    </div>
  );
};
