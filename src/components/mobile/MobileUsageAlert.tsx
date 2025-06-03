
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface MobileUsageAlertProps {
  canGenerateMore: boolean;
  postsRemaining?: number;
}

export const MobileUsageAlert = ({ 
  canGenerateMore, 
  postsRemaining = 0 
}: MobileUsageAlertProps) => {
  if (canGenerateMore && postsRemaining > 1) {
    return null; // Don't show alert when user has plenty of posts remaining
  }

  const getAlertVariant = () => {
    if (!canGenerateMore) return 'destructive';
    if (postsRemaining === 1) return 'warning';
    return 'default';
  };

  const getIcon = () => {
    if (!canGenerateMore) return XCircle;
    if (postsRemaining === 1) return AlertTriangle;
    return CheckCircle;
  };

  const getMessage = () => {
    if (!canGenerateMore) {
      return 'You\'ve reached your monthly limit. Upgrade to continue creating content.';
    }
    if (postsRemaining === 1) {
      return 'You have 1 post remaining this month. Consider upgrading for unlimited access.';
    }
    return 'Almost at your monthly limit. Upgrade for unlimited content generation.';
  };

  const Icon = getIcon();
  const variant = getAlertVariant();

  return (
    <Alert className={`mb-4 ${
      variant === 'destructive' ? 'border-red-200 bg-red-50' :
      variant === 'warning' ? 'border-orange-200 bg-orange-50' :
      'border-blue-200 bg-blue-50'
    }`}>
      <Icon className={`h-4 w-4 ${
        variant === 'destructive' ? 'text-red-600' :
        variant === 'warning' ? 'text-orange-600' :
        'text-blue-600'
      }`} />
      <AlertDescription className={`flex items-center justify-between ${
        variant === 'destructive' ? 'text-red-700' :
        variant === 'warning' ? 'text-orange-700' :
        'text-blue-700'
      }`}>
        <span className="text-sm">{getMessage()}</span>
        <Badge variant="outline" className="ml-2">
          {postsRemaining} left
        </Badge>
      </AlertDescription>
    </Alert>
  );
};
