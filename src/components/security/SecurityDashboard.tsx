
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SecurityLogger } from '@/services/security/securityLogger';
import { RateLimitService } from '@/services/security/rateLimit';
import { Shield, AlertTriangle, Activity, Clock, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const SecurityDashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadData = () => {
      setEvents(SecurityLogger.getEvents(undefined, undefined, 20));
      setStats(SecurityLogger.getEventStats());
    };
    
    loadData();
    const interval = setInterval(loadData, 5000); // Refresh every 5 seconds
    
    return () => clearInterval(interval);
  }, [refreshKey]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const refresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Dashboard
          </CardTitle>
          <Button onClick={refresh} variant="outline" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.recent24h}</div>
                <div className="text-sm text-gray-600">Last 24h</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {(stats.bySeverity.critical || 0) + (stats.bySeverity.high || 0)}
                </div>
                <div className="text-sm text-gray-600">High Priority</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {user ? RateLimitService.getRemainingRequests(user.id, 'content_generation') : 0}
                </div>
                <div className="text-sm text-gray-600">Rate Limit Remaining</div>
              </div>
            </div>
          )}

          <Tabs defaultValue="events">
            <TabsList>
              <TabsTrigger value="events">Recent Events</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-3">
              {events.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No security events recorded yet
                </div>
              ) : (
                events.map((event) => (
                  <Card key={event.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(event.severity)}>
                            {event.severity.toUpperCase()}
                          </Badge>
                          <span className="font-medium">{event.event}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {new Date(event.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          User: {event.userId.substring(0, 8)}...
                        </div>
                        <div>Source: {event.source}</div>
                      </div>
                      {event.details && Object.keys(event.details).length > 0 && (
                        <div className="mt-2 text-xs bg-gray-50 p-2 rounded">
                          <pre>{JSON.stringify(event.details, null, 2)}</pre>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="summary">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Event Breakdown by Severity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {stats && (
                      <div className="space-y-2">
                        {Object.entries(stats.bySeverity).map(([severity, count]) => (
                          <div key={severity} className="flex justify-between items-center">
                            <Badge className={getSeverityColor(severity)}>{severity}</Badge>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
