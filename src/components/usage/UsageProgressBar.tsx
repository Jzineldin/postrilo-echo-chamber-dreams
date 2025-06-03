
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface UsageProgressBarProps {
  used: number;
  total: number;
  label: string;
  showWarning?: boolean;
  className?: string;
}

export const UsageProgressBar = ({ 
  used, 
  total, 
  label, 
  showWarning = true,
  className = "" 
}: UsageProgressBarProps) => {
  const percentage = total > 0 ? (used / total) * 100 : 0;
  const isNearLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;
  
  return (
    <Card className={`${className} ${isAtLimit ? 'border-red-200 bg-red-50' : isNearLimit ? 'border-amber-200 bg-amber-50' : 'border-green-200 bg-green-50'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <div className="flex items-center gap-2">
            <Badge variant={isAtLimit ? "destructive" : isNearLimit ? "secondary" : "outline"}>
              {used}/{total}
            </Badge>
            {isAtLimit && showWarning && <AlertTriangle className="w-4 h-4 text-red-500" />}
            {!isNearLimit && <CheckCircle className="w-4 h-4 text-green-500" />}
          </div>
        </div>
        
        <Progress 
          value={percentage} 
          className={`h-3 ${isAtLimit ? 'bg-red-100' : isNearLimit ? 'bg-amber-100' : 'bg-green-100'}`}
        />
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
          <span>{Math.round(percentage)}% used</span>
          <span>{total - used} remaining</span>
        </div>
        
        {isAtLimit && showWarning && (
          <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Limit reached - Consider upgrading
          </p>
        )}
        {isNearLimit && !isAtLimit && showWarning && (
          <p className="text-xs text-amber-600 mt-2">
            Approaching limit
          </p>
        )}
      </CardContent>
    </Card>
  );
};
