
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { FormData } from "../multi-step/types";

interface TopicPlatformStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onBack?: () => void;
}

export const TopicPlatformStep = ({ formData, updateFormData, onBack }: TopicPlatformStepProps) => {
  const platforms = [
    { id: "twitter", name: "Twitter/X", icon: "𝕏", description: "280 chars, trending topics" },
    { id: "instagram", name: "Instagram", icon: "📷", description: "Visual content, hashtags" },
    { id: "facebook", name: "Facebook", icon: "📘", description: "Longer posts, community" },
    { id: "linkedin", name: "LinkedIn", icon: "💼", description: "Professional content" },
    { id: "tiktok", name: "TikTok", icon: "🎵", description: "Short videos, trends" },
    { id: "youtube", name: "YouTube", icon: "📺", description: "Long-form videos" }
  ];

  const handleTopicChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ topic: e.target.value });
  };

  const handlePlatformSelect = (platformId: string) => {
    console.log('Platform selected:', platformId);
    updateFormData({ platform: platformId });
  };

  const handleBackToDashboard = () => {
    if (onBack) {
      onBack();
    } else {
      // Fallback navigation
      window.location.hash = 'dashboard';
    }
  };

  const isFormValid = formData.topic?.trim() && formData.platform;

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Tell us about your content</h2>
        <p className="text-gray-600">What topic would you like to create content about?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Topic or Description</label>
          <Textarea
            value={formData.topic || ""}
            onChange={handleTopicChange}
            placeholder="Describe what you want to create content about... (e.g., 'The benefits of remote work for productivity')"
            className="min-h-[120px]"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.topic?.length || 0}/500 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Target Platform</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {platforms.map((platform) => {
              const isSelected = formData.platform === platform.id;
              
              return (
                <Card
                  key={platform.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handlePlatformSelect(platform.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{platform.icon}</div>
                    <div className="font-medium text-sm">{platform.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{platform.description}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {!isFormValid && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            Please complete both the topic description and platform selection to continue.
          </p>
        </div>
      )}
    </div>
  );
};
