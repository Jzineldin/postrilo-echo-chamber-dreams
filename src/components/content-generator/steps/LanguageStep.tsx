
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { LanguageSelector } from "../LanguageSelector";

interface LanguageStepProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const LanguageStep = ({ 
  selectedLanguage, 
  onLanguageChange, 
  onNext, 
  onPrevious 
}: LanguageStepProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Choose Language & Cultural Adaptation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
          showCulturalInfo={true}
        />
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>
          <Button onClick={onNext} disabled={!selectedLanguage}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
