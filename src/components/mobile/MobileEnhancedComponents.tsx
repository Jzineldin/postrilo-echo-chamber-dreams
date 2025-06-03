
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowRight, Play, Eye, Sparkles } from 'lucide-react';

interface MobileEnhancedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export const MobileEnhancedButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className
}: MobileEnhancedButtonProps) => {
  const baseClasses = 'touch-friendly transition-all duration-200 font-semibold rounded-xl shadow-sm hover:shadow-md active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300',
    outline: 'border-2 border-purple-300 hover:border-purple-400 bg-white/80 backdrop-blur-sm hover:bg-purple-50 text-purple-700'
  };

  const sizeClasses = {
    sm: 'px-4 py-3 text-sm min-h-[48px]',
    md: 'px-6 py-4 text-base min-h-[56px]',
    lg: 'px-8 py-5 text-lg min-h-[64px]'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
};

interface MobileEnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const MobileEnhancedCard = ({
  children,
  className,
  hover = true,
  padding = 'md'
}: MobileEnhancedCardProps) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <Card className={cn(
      'bg-white/95 backdrop-blur-sm border border-white/60 rounded-xl shadow-sm',
      hover && 'hover:shadow-lg hover:scale-[1.02] transition-all duration-300',
      className
    )}>
      <div className={paddingClasses[padding]}>
        {children}
      </div>
    </Card>
  );
};

interface MobileEnhancedBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
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
  const variantClasses = {
    default: 'bg-purple-100 text-purple-700 border-purple-200',
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <Badge className={cn(
      'border font-medium rounded-full flex items-center gap-1.5',
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      {icon}
      {children}
    </Badge>
  );
};

interface MobileActionButtonsProps {
  primaryAction: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  tertiaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  isMobile?: boolean;
}

export const MobileActionButtons = ({
  primaryAction,
  secondaryAction,
  tertiaryAction,
  isMobile = false
}: MobileActionButtonsProps) => {
  return (
    <div className={cn(
      'flex gap-3 justify-center',
      isMobile ? 'flex-col' : 'flex-col sm:flex-row'
    )}>
      <MobileEnhancedButton
        variant="primary"
        size={isMobile ? "lg" : "md"}
        onClick={primaryAction.onClick}
        className="flex items-center gap-2 justify-center"
      >
        {primaryAction.label}
        {primaryAction.icon}
      </MobileEnhancedButton>
      
      {secondaryAction && (
        <MobileEnhancedButton
          variant="outline"
          size={isMobile ? "lg" : "md"}
          onClick={secondaryAction.onClick}
          className="flex items-center gap-2 justify-center"
        >
          {secondaryAction.icon}
          {secondaryAction.label}
        </MobileEnhancedButton>
      )}
      
      {tertiaryAction && (
        <button
          onClick={tertiaryAction.onClick}
          className="text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center gap-1 hover:underline touch-friendly py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors"
        >
          {tertiaryAction.icon}
          {tertiaryAction.label}
        </button>
      )}
    </div>
  );
};
