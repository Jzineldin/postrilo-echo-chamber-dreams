
import React from 'react';
import { Button } from '@/components/ui/button';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import { LucideIcon } from 'lucide-react';

interface MobileActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export const MobileActionButton = ({
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  children,
  variant = 'default',
  size = 'default',
  className = ''
}: MobileActionButtonProps) => {
  const { getOptimizedClassName } = useMobileOptimization();

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      className={getOptimizedClassName(`
        ${size === 'default' ? 'h-12 px-6' : ''}
        ${size === 'lg' ? 'h-14 px-8 text-lg' : ''}
        active:scale-95 transition-transform duration-150
        ${className}
      `)}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      ) : Icon ? (
        <Icon className="w-5 h-5 mr-2" />
      ) : null}
      {children}
    </Button>
  );
};
