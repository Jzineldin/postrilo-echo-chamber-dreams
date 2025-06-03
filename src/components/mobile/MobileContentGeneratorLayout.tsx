
import React from 'react';
import { MobileResponsiveContainer } from './MobileResponsiveContainer';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileContentGeneratorLayoutProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
}

export const MobileContentGeneratorLayout = ({
  children,
  title = "Content Generator",
  showHeader = true
}: MobileContentGeneratorLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="px-4 py-3">
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          </div>
        </header>
      )}

      <main className="flex-1">
        <MobileResponsiveContainer
          variant="default"
          padding={isMobile ? "sm" : "default"}
        >
          {children}
        </MobileResponsiveContainer>
      </main>
    </div>
  );
};
