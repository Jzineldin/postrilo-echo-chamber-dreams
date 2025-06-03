
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Sparkles, Clock } from "lucide-react";

interface RecentContentProps {
  isMobile: boolean;
}

export const RecentContent = ({ isMobile }: RecentContentProps) => {
  // Mock recent content - in real app this would come from database
  const recentContent = [];

  const handleCreateContent = () => {
    // This would navigate to the content generator
    console.log('Navigate to content generator');
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-white/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="w-5 h-5" />
          Recent Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentContent.length > 0 ? (
          <div className="space-y-3">
            {recentContent.map((content: any, index: number) => (
              <div key={index} className="p-3 bg-white/60 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{content.title}</span>
                  <span className="text-xs text-gray-500">{content.platform}</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{content.preview}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{content.date}</span>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">No content yet</h3>
              <p className="text-sm text-gray-600">
                Start creating amazing content with AI assistance
              </p>
            </div>
            <div className="space-y-3">
              <Button 
                onClick={handleCreateContent}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Post
              </Button>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 text-sm mb-1">
                  <Clock className="w-4 h-4" />
                  Getting Started
                </div>
                <p className="text-xs text-blue-600">
                  Your generated content will appear here. Start by choosing a platform and topic!
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
