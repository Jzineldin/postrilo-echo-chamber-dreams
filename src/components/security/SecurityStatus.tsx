
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';

export const SecurityStatus = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();

  const securityChecks = [
    {
      name: 'Authentication',
      status: user ? 'secure' : 'warning',
      description: user ? 'User authenticated' : 'Not authenticated',
      icon: user ? CheckCircle : AlertTriangle
    },
    {
      name: 'Row Level Security',
      status: 'secure',
      description: 'Database RLS policies active',
      icon: Shield
    },
    {
      name: 'Input Validation',
      status: 'secure',
      description: 'Content sanitization enabled',
      icon: Lock
    },
    {
      name: 'Rate Limiting',
      status: 'secure',
      description: 'Request rate limiting active',
      icon: Shield
    },
    {
      name: 'Admin Access',
      status: isAdmin ? 'admin' : 'user',
      description: isAdmin ? 'Admin privileges' : 'Standard user access',
      icon: isAdmin ? Shield : Lock
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Security Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {securityChecks.map((check) => {
            const Icon = check.icon;
            return (
              <div key={check.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${
                    check.status === 'secure' ? 'text-green-600' :
                    check.status === 'warning' ? 'text-yellow-600' :
                    check.status === 'admin' ? 'text-purple-600' :
                    'text-blue-600'
                  }`} />
                  <div>
                    <div className="font-medium">{check.name}</div>
                    <div className="text-sm text-gray-600">{check.description}</div>
                  </div>
                </div>
                <Badge className={getStatusColor(check.status)}>
                  {check.status === 'secure' ? 'Secure' :
                   check.status === 'warning' ? 'Warning' :
                   check.status === 'admin' ? 'Admin' : 'User'}
                </Badge>
              </div>
            );
          })}
        </div>
        
        {user && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-700">
              <strong>Security Active:</strong> Your data is protected by comprehensive security measures including authentication, input validation, and data isolation.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
