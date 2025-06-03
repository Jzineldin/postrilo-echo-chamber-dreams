
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

interface MobileLayoutWrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'padded' | 'full';
  safeArea?: boolean;
  showGradient?: boolean;
}

export const MobileLayoutWrapper = ({
  children,
  className,
  variant = 'default',
  safeArea = true,
  showGradient = true
}: MobileLayoutWrapperProps) => {
  const isMobile = useIsMobile();
  const { getOptimizedClassName } = useMobileOptimization();

  const variantClasses = {
    default: 'px-4 py-6',
    padded: 'px-6 py-8',
    full: 'p-0'
  };

  const backgroundClass = showGradient 
    ? 'bg-gradient-to-br from-purple-50 via-white to-pink-50'
    : 'bg-gray-50';

  return (
    <div className={getOptimizedClassName(cn(
      'min-h-screen',
      backgroundClass,
      variantClasses[variant],
      isMobile && 'pt-4 pb-6',
      !isMobile && 'pt-6',
      safeArea && 'safe-area-padding',
      className
    ))}>
      {children}
    </div>
  );
};

interface MobileSectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  centerContent?: boolean;
}

export const MobileSection = ({
  children,
  title,
  subtitle,
  className,
  centerContent = true
}: MobileSectionProps) => {
  const { getOptimizedClassName } = useMobileOptimization();

  return (
    <div className={getOptimizedClassName(cn('space-y-6', className))}>
      {(title || subtitle) && (
        <div className={cn(
          'space-y-2',
          centerContent && 'text-center'
        )}>
          {title && (
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
