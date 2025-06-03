
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingDown } from 'lucide-react';

interface DropoffPoint {
  step: string;
  visitors: number;
  dropoffRate: number;
}

export const DropoffAnalytics = () => {
  const [dropoffData, setDropoffData] = useState<DropoffPoint[]>([]);

  useEffect(() => {
    // Simulate dropoff analytics data
    const data: DropoffPoint[] = [
      { step: 'Landing Page View', visitors: 1000, dropoffRate: 0 },
      { step: 'CTA Click', visitors: 650, dropoffRate: 35 },
      { step: 'Sign Up Form', visitors: 420, dropoffRate: 35.4 },
      { step: 'Email Verification', visitors: 380, dropoffRate: 9.5 },
      { step: 'First Content Creation', visitors: 285, dropoffRate: 25 },
      { step: 'Content Completion', visitors: 245, dropoffRate: 14 }
    ];

    setDropoffData(data);

    // Track current page for dropoff analysis
    const trackPageView = () => {
      const pageData = {
        page: window.location.hash || '/',
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      };

      const stored = JSON.parse(localStorage.getItem('page_views') || '[]');
      stored.push(pageData);
      localStorage.setItem('page_views', JSON.stringify(stored.slice(-100)));
    };

    trackPageView();
    window.addEventListener('hashchange', trackPageView);

    return () => window.removeEventListener('hashchange', trackPageView);
  }, []);

  const getWorstDropoff = () => {
    return dropoffData.reduce((worst, current) => 
      current.dropoffRate > worst.dropoffRate ? current : worst
    , dropoffData[0]);
  };

  const worstDropoff = getWorstDropoff();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5" />
          User Journey Dropoff Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dropoffData.map((point, index) => (
            <div key={point.step} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{point.step}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{point.visitors} users</span>
                  {point.dropoffRate > 30 && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Progress 
                  value={100 - point.dropoffRate} 
                  className="flex-1"
                />
                <span className={`text-sm font-medium ${
                  point.dropoffRate > 30 ? 'text-red-600' : 
                  point.dropoffRate > 20 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  -{point.dropoffRate}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {worstDropoff && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">
              🚨 Highest Dropoff Point
            </h4>
            <p className="text-red-700 text-sm">
              <strong>{worstDropoff.step}</strong> has a {worstDropoff.dropoffRate}% dropoff rate. 
              Consider optimizing this step to improve conversion.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
