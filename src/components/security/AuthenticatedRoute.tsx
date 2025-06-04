
import React from 'react';
import { AuthGuard } from '@/services/security/authGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock } from 'lucide-react';

interface AuthenticatedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  fallbackMessage?: string;
}

export const AuthenticatedRoute = ({ 
  children, 
  requireAdmin = false,
  fallbackMessage = "Please sign in to access this feature."
}: AuthenticatedRouteProps) => {
  
  if (requireAdmin) {
    const { hasAccess, isLoading } = AuthGuard.useRequireAdmin();
    
    if (isLoading) {
      return (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying admin access...</p>
          </CardContent>
        </Card>
      );
    }

    if (!hasAccess) {
      return (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Lock className="w-5 h-5" />
              Admin Access Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">
              This feature requires administrator privileges. Please contact your system administrator if you believe you should have access.
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      );
    }
  } else {
    const { isAuthenticated, isLoading } = AuthGuard.useRequireAuth();
    
    if (isLoading) {
      return (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Checking authentication...</p>
          </CardContent>
        </Card>
      );
    }

    if (!isAuthenticated) {
      return (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Shield className="w-5 h-5" />
              Authentication Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700 mb-4">{fallbackMessage}</p>
            <Button onClick={() => window.location.href = '/auth'}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      );
    }
  }

  return <>{children}</>;
};
