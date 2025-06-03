
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MobileOptimizedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
  icon?: LucideIcon;
  className?: string;
  fullWidth?: boolean;
}

export const MobileOptimizedButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'default',
  size = 'default',
  icon: Icon,
  className,
  fullWidth = false
}: MobileOptimizedButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      className={cn(
        // Base mobile optimizations
        'min-h-[44px] touch-manipulation active:scale-95 transition-all duration-150',
        // Size-specific optimizations
        size === 'sm' && 'min-h-[40px] text-sm px-4',
        size === 'default' && 'min-h-[44px] px-6',
        size === 'lg' && 'min-h-[48px] px-8 text-lg',
        // Full width option
        fullWidth && 'w-full',
        // Loading state
        loading && 'cursor-not-allowed',
        className
      )}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : Icon ? (
        <Icon className="w-5 h-5 mr-2" />
      ) : null}
      {children}
    </Button>
  );
};
