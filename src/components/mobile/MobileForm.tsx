
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface MobileFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export const MobileForm = ({ children, onSubmit, className }: MobileFormProps) => {
  return (
    <form 
      onSubmit={onSubmit}
      className={cn('space-y-4 md:space-y-6', className)}
      noValidate
    >
      {children}
    </form>
  );
};

interface MobileFormFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const MobileFormField = ({
  label,
  id,
  type = 'text',
  placeholder,
  required = false,
  error,
  value,
  onChange,
  className
}: MobileFormFieldProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Label 
        htmlFor={id}
        className="text-sm font-medium text-gray-900 block"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'w-full text-base min-h-[48px] px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all bg-white',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
        )}
        style={{ fontSize: '16px' }} // Prevent zoom on iOS
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && (
        <p 
          id={`${id}-error`}
          className="text-sm text-red-600 mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

interface MobileTextareaFieldProps {
  label: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
  className?: string;
}

export const MobileTextareaField = ({
  label,
  id,
  placeholder,
  required = false,
  error,
  value,
  onChange,
  rows = 4,
  className
}: MobileTextareaFieldProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Label 
        htmlFor={id}
        className="text-sm font-medium text-gray-900 block"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        rows={rows}
        className={cn(
          'w-full text-base px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all bg-white resize-y',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
        )}
        style={{ fontSize: '16px' }} // Prevent zoom on iOS
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && (
        <p 
          id={`${id}-error`}
          className="text-sm text-red-600 mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

interface MobileSubmitButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const MobileSubmitButton = ({
  children,
  loading = false,
  disabled = false,
  variant = 'primary',
  className
}: MobileSubmitButtonProps) => {
  const baseClasses = 'w-full min-h-[48px] text-base font-semibold rounded-lg transition-all duration-200 touch-manipulation';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg',
    secondary: 'border-2 border-purple-300 hover:border-purple-400 bg-white hover:bg-purple-50 text-purple-700'
  };

  return (
    <Button
      type="submit"
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Processing...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
