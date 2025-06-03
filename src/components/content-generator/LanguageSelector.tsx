import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Info } from "lucide-react";
import { LanguageService, LanguageConfig } from "@/services/i18n/languageService";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  showCulturalInfo?: boolean;
}

export const LanguageSelector = ({ 
  selectedLanguage, 
  onLanguageChange, 
  showCulturalInfo = true 
}: LanguageSelectorProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const languages = LanguageService.getAllLanguages();
  const selectedLang = LanguageService.getLanguage(selectedLanguage);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Globe className="w-4 h-4" />
          Language & Cultural Adaptation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={selectedLanguage === language.code ? "default" : "outline"}
              size="sm"
              onClick={() => onLanguageChange(language.code)}
              className="flex items-center gap-2 justify-start"
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-xs">{language.nativeName}</span>
            </Button>
          ))}
        </div>

        {/* Nordic Languages Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            Nordic Focus
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="h-6 px-2"
          >
            <Info className="w-3 h-3" />
          </Button>
        </div>

        {/* Cultural Context */}
        {showCulturalInfo && selectedLang && showDetails && (
          <div className="bg-blue-50 p-3 rounded-lg border">
            <h4 className="font-medium text-sm text-blue-900 mb-2">
              {selectedLang.name} Cultural Context
            </h4>
            <div className="space-y-1 text-xs text-blue-800">
              <p><strong>Communication:</strong> {selectedLang.culturalContext.communicationStyle}</p>
              <p><strong>Business:</strong> {selectedLang.culturalContext.businessEtiquette}</p>
              <p><strong>Social Media:</strong> {selectedLang.culturalContext.socialMediaHabits}</p>
            </div>
          </div>
        )}

        {/* Selected Language Info */}
        {selectedLang && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{selectedLang.flag}</span>
            <span>Content will be adapted for {selectedLang.name} audience</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
