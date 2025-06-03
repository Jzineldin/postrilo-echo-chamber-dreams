
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle } from "lucide-react";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "textarea" | "select";
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  maxLength?: number;
}

export const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  options,
  rows = 3,
  maxLength
}: FormFieldProps) => {
  const hasError = error && touched;
  const hasValue = value.trim().length > 0;
  const isValid = hasValue && !error && touched;

  const getFieldClassName = () => {
    if (hasError) return 'border-red-500 focus:ring-red-500';
    if (isValid) return 'border-green-500 focus:ring-green-500';
    return '';
  };

  const renderField = () => {
    switch (type) {
      case "textarea":
        return (
          <div className="relative">
            <Textarea
              id={id}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              className={`resize-none ${getFieldClassName()}`}
              placeholder={placeholder}
              rows={rows}
            />
            <div className="absolute top-2 right-2">
              {hasError && <AlertCircle className="w-4 h-4 text-red-500" />}
              {isValid && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
          </div>
        );

      case "select":
        return (
          <div className="relative">
            <select
              id={id}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              className={`w-full px-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${getFieldClassName()} ${
                !getFieldClassName() ? 'border-gray-300 focus:ring-purple-500' : ''
              }`}
            >
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-8 flex items-center pr-3">
              {hasError && <AlertCircle className="w-4 h-4 text-red-500" />}
              {isValid && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
          </div>
        );

      default:
        return (
          <div className="relative">
            <Input
              id={id}
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              className={`pr-10 ${getFieldClassName()}`}
              placeholder={placeholder}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {hasError && <AlertCircle className="w-4 h-4 text-red-500" />}
              {isValid && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {renderField()}
      {hasError && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
      {type === "textarea" && maxLength && (
        <div className="flex justify-end">
          <span className={`text-xs ${
            value.length > maxLength * 0.9 ? 'text-red-500' : 'text-gray-500'
          }`}>
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
};
