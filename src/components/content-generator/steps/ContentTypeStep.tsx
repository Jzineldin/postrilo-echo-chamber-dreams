
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, MessageSquare, Calendar, Globe } from "lucide-react";
import { FormData } from "../multi-step/types";
import { LanguageSelector } from "../LanguageSelector";

interface ContentTypeStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => boolean;
}

export const ContentTypeStep = ({ formData, updateFormData, onNext }: ContentTypeStepProps) => {
  const contentTypes = [
    {
      id: "post",
      name: "Social Media Post",
      description: "Create engaging posts for social platforms",
      icon: MessageSquare,
      popular: true
    },
    {
      id: "story",
      name: "Story Content",
      description: "Short-form content for Instagram/Facebook stories",
      icon: Calendar,
      popular: false
    },
    {
      id: "video-script",
      name: "Video Script",
      description: "Scripts for TikTok, YouTube, or Instagram Reels",
      icon: Video,
      popular: true
    },
    {
      id: "thread",
      name: "Thread/Carousel",
      description: "Multi-part content series",
      icon: FileText,
      popular: false
    }
  ];

  const handleSelectContentType = (contentTypeId: string) => {
    console.log('Selecting content type:', contentTypeId);
    updateFormData({ contentType: contentTypeId });
  };

  const handleLanguageChange = (language: string) => {
    console.log('Selecting language:', language);
    updateFormData({ language });
  };

  const handleNext = () => {
    console.log('Next button clicked, current content type:', formData.contentType, 'language:', formData.language);
    if (!formData.contentType || !formData.language) {
      console.log('Missing content type or language');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">What would you like to create?</h2>
        <p className="text-gray-600">Choose the type of content and language you want to generate</p>
      </div>

      {/* Content Type Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Content Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contentTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = formData.contentType === type.id;
            
            return (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSelectContentType(type.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon className="w-5 h-5" />
                      {type.name}
                    </CardTitle>
                    {type.popular && (
                      <Badge variant="secondary" className="text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Language Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Language & Cultural Adaptation
        </h3>
        <LanguageSelector
          selectedLanguage={formData.language}
          onLanguageChange={handleLanguageChange}
          showCulturalInfo={false}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleNext}
          disabled={!formData.contentType || !formData.language}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
