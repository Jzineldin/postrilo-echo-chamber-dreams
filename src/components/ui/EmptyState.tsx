
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'minimal' | 'centered';
  className?: string;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default',
  className = ''
}: EmptyStateProps) => {
  const baseClasses = "flex flex-col items-center justify-center text-center";
  
  const variantClasses = {
    default: "py-12 px-6",
    minimal: "py-8 px-4", 
    centered: "min-h-[400px] py-16 px-6"
  };

  const content = (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="mb-4 rounded-full bg-gray-100 p-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          {actionLabel}
        </Button>
      )}
    </div>
  );

  if (variant === 'minimal') {
    return content;
  }

  return (
    <Card className="border-dashed border-2 border-gray-200">
      <CardContent className="p-0">
        {content}
      </CardContent>
    </Card>
  );
};
