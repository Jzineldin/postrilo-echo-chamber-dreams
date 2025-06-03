
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface MobileTouchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}

export const MobileTouchInput = ({
  value,
  onChange,
  placeholder = "Enter your content topic...",
  maxLength = 500,
  rows = 4
}: MobileTouchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Card className={`p-3 transition-all duration-200 ${isFocused ? 'ring-2 ring-blue-500' : ''}`}>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className="border-0 p-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{ fontSize: '16px' }} // Prevents zoom on iOS
      />
      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        <span>{value.length}/{maxLength}</span>
        {isFocused && <span>Touch-optimized input</span>}
      </div>
    </Card>
  );
};
