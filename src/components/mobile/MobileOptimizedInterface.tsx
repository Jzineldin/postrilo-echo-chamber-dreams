
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

interface MobileOptimizedInterfaceProps {
  children: React.ReactNode;
  title?: string;
  showDeviceInfo?: boolean;
}

export const MobileOptimizedInterface = ({ 
  children, 
  title = "Content Creator",
  showDeviceInfo = false 
}: MobileOptimizedInterfaceProps) => {
  const isMobile = useIsMobile();
  const { settings, getOptimizedClassName } = useMobileOptimization();

  const getDeviceIcon = () => {
    if (window.innerWidth < 768) return Smartphone;
    if (window.innerWidth < 1024) return Tablet;
    return Monitor;
  };

  const DeviceIcon = getDeviceIcon();

  return (
    <div className={getOptimizedClassName("min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50")}>
      {/* Mobile-optimized header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DeviceIcon className="w-5 h-5 text-purple-600" />
              {title}
            </h1>
            {showDeviceInfo && (
              <div className="flex gap-2">
                <Badge variant={isMobile ? "default" : "secondary"} className="text-xs">
                  {isMobile ? "Mobile" : "Desktop"}
                </Badge>
                {settings.touchOptimized && (
                  <Badge variant="outline" className="text-xs">
                    Touch
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content area with mobile optimizations */}
      <div className={getOptimizedClassName("container mx-auto px-4 py-6 space-y-6")}>
        {children}
      </div>

      {/* Mobile-friendly footer spacer */}
      <div className="h-20" />
    </div>
  );
};
