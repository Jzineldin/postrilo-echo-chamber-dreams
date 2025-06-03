
import React from 'react';
import { Loader, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EnhancedLoadingProps {
  isLoading: boolean;
  message?: string;
  variant?: 'default' | 'minimal' | 'detailed';
  className?: string;
}

export const EnhancedLoading = ({ 
  isLoading, 
  message = "Loading...", 
  variant = "default",
  className 
}: EnhancedLoadingProps) => {
  if (!isLoading) return null;

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Loader className="w-4 h-4 animate-spin" />
        <span className="text-sm">{message}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-4", className)}>
      <div className="relative mb-2">
        <Loader className="w-6 h-6 animate-spin text-purple-600" />
        <Sparkles className="w-3 h-3 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
      </div>
      <p className="text-sm text-gray-600 animate-pulse">{message}</p>
    </div>
  );
};
