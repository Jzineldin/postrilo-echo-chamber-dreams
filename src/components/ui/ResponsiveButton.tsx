
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ResponsiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const ResponsiveButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'default',
  size = 'default',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  'aria-label': ariaLabel,
  ...props
}: ResponsiveButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const sizeClasses = {
    sm: 'min-h-[44px] px-4 py-2 text-sm',
    default: 'min-h-[48px] px-6 py-3 text-base',
    lg: 'min-h-[56px] px-8 py-4 text-lg'
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || loading}
      variant={variant}
      className={cn(
        // Base mobile optimizations
        'touch-manipulation select-none transition-all duration-200',
        'active:scale-[0.98] active:transition-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2',
        // Size-based touch targets
        sizeClasses[size],
        // Full width option
        fullWidth && 'w-full',
        // Loading state styling
        loading && 'cursor-not-allowed',
        // Custom className
        className
      )}
      aria-label={ariaLabel}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
        </>
      )}
    </Button>
  );
};
