
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube } from 'lucide-react';

export const TestingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="w-5 h-5" />
              Testing Page
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a placeholder testing page for development purposes.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
