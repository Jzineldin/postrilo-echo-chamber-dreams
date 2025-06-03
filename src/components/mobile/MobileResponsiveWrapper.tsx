
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileResponsiveWrapperProps {
  children: React.ReactNode;
  mobileComponent: React.ReactNode;
  breakpoint?: number;
}

export const MobileResponsiveWrapper = ({
  children,
  mobileComponent,
  breakpoint = 768
}: MobileResponsiveWrapperProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="mobile-responsive-wrapper">
      {isMobile ? (
        <div className="mobile-view">
          {mobileComponent}
        </div>
      ) : (
        <div className="desktop-view">
          {children}
        </div>
      )}
    </div>
  );
};
