
import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  lines?: number;
  variant?: 'text' | 'card' | 'button' | 'avatar';
}

export const SkeletonLoader = ({ 
  className, 
  lines = 3, 
  variant = 'text' 
}: SkeletonLoaderProps) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded';

  const variants = {
    text: 'h-4 w-full mb-2',
    card: 'h-32 w-full',
    button: 'h-10 w-24',
    avatar: 'h-10 w-10 rounded-full'
  };

  if (variant !== 'text') {
    return (
      <div className={cn(baseClasses, variants[variant], className)} />
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            baseClasses,
            variants.text,
            index === lines - 1 && 'w-3/4' // Last line is shorter
          )}
        />
      ))}
    </div>
  );
};
