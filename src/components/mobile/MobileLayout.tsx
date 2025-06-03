
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  safeArea?: boolean;
  maxWidth?: boolean;
}

export const MobileLayout = ({ 
  children, 
  className,
  padding = 'md',
  safeArea = true,
  maxWidth = true
}: MobileLayoutProps) => {
  const paddingClasses = {
    none: '',
    sm: 'px-3 py-2',
    md: 'px-4 py-4',
    lg: 'px-6 py-6'
  };

  return (
    <div className={cn(
      'w-full',
      maxWidth && 'max-w-7xl mx-auto',
      paddingClasses[padding],
      safeArea && 'safe-area-padding',
      className
    )}>
      {children}
    </div>
  );
};

interface MobileSectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'none' | 'subtle' | 'gradient';
  spacing?: 'sm' | 'md' | 'lg';
}

export const MobileSection = ({ 
  children, 
  className,
  background = 'none',
  spacing = 'md'
}: MobileSectionProps) => {
  const backgroundClasses = {
    none: '',
    subtle: 'bg-gray-50/50',
    gradient: 'bg-gradient-to-br from-purple-50/50 via-white to-pink-50/30'
  };

  const spacingClasses = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-20'
  };

  return (
    <section className={cn(
      'relative',
      backgroundClasses[background],
      spacingClasses[spacing],
      className
    )}>
      <MobileLayout>
        {children}
      </MobileLayout>
    </section>
  );
};

interface MobileGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MobileGrid = ({ 
  children, 
  columns = 1,
  gap = 'md',
  className
}: MobileGridProps) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6 md:gap-8',
    lg: 'gap-8 md:gap-12'
  };

  return (
    <div className={cn(
      'grid',
      columnClasses[columns],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};
