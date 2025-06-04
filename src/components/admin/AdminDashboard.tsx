
import React from 'react';
import { AuthenticatedRoute } from '@/components/security/AuthenticatedRoute';
import { SecurityStatus } from '@/components/security/SecurityStatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, Activity, Settings } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <AuthenticatedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-600" />
                Admin Dashboard
              </CardTitle>
              <p className="text-gray-600">
                Monitor and manage system security, users, and platform health.
              </p>
            </CardHeader>
          </Card>

          {/* Admin Tabs */}
          <Tabs defaultValue="security" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="security" className="mt-6">
              <div className="grid gap-6">
                <SecurityStatus />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Security Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      Security monitoring is active. Events are logged to the browser console in development mode.
                      In production, these would be sent to a centralized logging service.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    User management features would be implemented here, including user roles, 
                    subscription management, and account administration.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    System activity monitoring including API usage, content generation metrics,
                    and performance statistics would be displayed here.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    Global system configuration, security policies, and administrative 
                    settings would be managed here.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthenticatedRoute>
  );
};
