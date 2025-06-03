
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileResponsiveContainerProps {
  children: React.ReactNode;
  variant?: 'default' | 'full' | 'centered';
  padding?: 'default' | 'none' | 'sm' | 'lg';
  className?: string;
}

export const MobileResponsiveContainer = ({
  children,
  variant = 'default',
  padding = 'default',
  className
}: MobileResponsiveContainerProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-2',
    default: 'p-4',
    lg: 'p-6'
  };

  const variantClasses = {
    default: 'max-w-4xl mx-auto',
    full: 'w-full',
    centered: 'max-w-md mx-auto'
  };

  return (
    <div className={cn(
      variantClasses[variant],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
};

interface MobileStackProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'default' | 'lg';
  className?: string;
}

export const MobileStack = ({
  children,
  spacing = 'default',
  className
}: MobileStackProps) => {
  const spacingClasses = {
    sm: 'space-y-2',
    default: 'space-y-4',
    lg: 'space-y-6'
  };

  return (
    <div className={cn(spacingClasses[spacing], className)}>
      {children}
    </div>
  );
};
