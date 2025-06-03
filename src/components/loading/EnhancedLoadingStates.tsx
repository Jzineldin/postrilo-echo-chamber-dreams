
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Wifi, WifiOff } from 'lucide-react';

export const LoadingSpinner = ({ size = "md", message }: { size?: "sm" | "md" | "lg"; message?: string }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-purple-600`} />
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export const NetworkStatusIndicator = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <Card className="bg-orange-100 border-orange-300">
        <CardContent className="p-3 flex items-center gap-2">
          <WifiOff className="h-4 w-4 text-orange-600" />
          <span className="text-sm text-orange-800">You're offline</span>
        </CardContent>
      </Card>
    </div>
  );
};

export const ProgressiveLoadingBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1">
      <div 
        className="bg-gradient-to-r from-purple-600 to-pink-600 h-1 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};

export const SmartLoadingBoundary = ({ 
  children, 
  isLoading, 
  error, 
  fallback 
}: { 
  children: React.ReactNode;
  isLoading: boolean;
  error?: Error | null;
  fallback?: React.ReactNode;
}) => {
  if (error) {
    return (
      <Card className="mx-auto max-w-md mt-8 border-red-200">
        <CardContent className="p-6 text-center">
          <div className="text-red-600 mb-2">⚠️</div>
          <h3 className="font-semibold text-red-900 mb-2">Something went wrong</h3>
          <p className="text-sm text-red-600">{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return fallback || <LoadingSpinner message="Loading content..." />;
  }

  return <>{children}</>;
};
