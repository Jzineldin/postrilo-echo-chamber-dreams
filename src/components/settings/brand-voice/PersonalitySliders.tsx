
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Palette } from "lucide-react";

interface PersonalitySlidersProps {
  personalitySliders: {
    professionalCasual: number[];
    seriousHumorous: number[];
    formalInformal: number[];
    conservativeProgressive: number[];
  };
  setPersonalitySliders: (sliders: any) => void;
}

export const PersonalitySliders = ({ personalitySliders, setPersonalitySliders }: PersonalitySlidersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Brand Personality
        </CardTitle>
        <p className="text-sm text-gray-600">
          Adjust these sliders to define your brand's communication style
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Professional ←→ Casual</Label>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-600">Professional</span>
            <Slider
              value={personalitySliders.professionalCasual}
              onValueChange={(value) => setPersonalitySliders({...personalitySliders, professionalCasual: value})}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-gray-600">Casual</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Professional: "We recommend our solutions" vs Casual: "Check this out!"
          </p>
        </div>
        
        <div>
          <Label>Serious ←→ Humorous</Label>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-600">Serious</span>
            <Slider
              value={personalitySliders.seriousHumorous}
              onValueChange={(value) => setPersonalitySliders({...personalitySliders, seriousHumorous: value})}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-gray-600">Humorous</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Serious: Fact-focused content vs Humorous: Light, entertaining content
          </p>
        </div>
        
        <div>
          <Label>Formal ←→ Informal</Label>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-600">Formal</span>
            <Slider
              value={personalitySliders.formalInformal}
              onValueChange={(value) => setPersonalitySliders({...personalitySliders, formalInformal: value})}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-gray-600">Informal</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Formal: "Good morning" vs Informal: "Hey there!"
          </p>
        </div>
        
        <div>
          <Label>Conservative ←→ Progressive</Label>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-600">Conservative</span>
            <Slider
              value={personalitySliders.conservativeProgressive}
              onValueChange={(value) => setPersonalitySliders({...personalitySliders, conservativeProgressive: value})}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-gray-600">Progressive</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Conservative: Traditional approaches vs Progressive: Innovation-focused
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
