
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MobileEnhancedBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
}

export const MobileEnhancedBadge = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className
}: MobileEnhancedBadgeProps) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <Badge 
      variant={variant}
      className={cn(
        'flex items-center gap-1.5 font-medium rounded-full',
        sizeClasses[size],
        className
      )}
    >
      {icon}
      {children}
    </Badge>
  );
};
