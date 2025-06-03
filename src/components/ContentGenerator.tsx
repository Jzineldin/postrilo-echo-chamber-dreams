
import React from "react";
import UnifiedContentGenerator from "./UnifiedContentGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

const ContentGenerator = () => {
  console.log("ContentGenerator: Routing to UnifiedContentGenerator");
  
  try {
    return <UnifiedContentGenerator />;
  } catch (error) {
    console.error("ContentGenerator: Error loading UnifiedContentGenerator", error);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                Content Generator Error
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-red-600">
                There was an error loading the content generator. This might be due to a temporary issue.
              </p>
              <div className="bg-red-100 p-3 rounded-lg">
                <p className="text-sm text-red-700 font-mono">
                  Error: {error instanceof Error ? error.message : 'Failed to load content generator'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-red-600">Try these solutions:</p>
                <ul className="text-sm text-red-600 list-disc ml-4 space-y-1">
                  <li>Refresh the page</li>
                  <li>Clear your browser cache</li>
                  <li>Check your internet connection</li>
                  <li>Try again in a few minutes</li>
                </ul>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => window.location.reload()} 
                  className="flex-1"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Page
                </Button>
                <Button 
                  onClick={() => window.location.hash = 'dashboard'} 
                  className="flex-1"
                  variant="outline"
                >
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
};

export default ContentGenerator;
