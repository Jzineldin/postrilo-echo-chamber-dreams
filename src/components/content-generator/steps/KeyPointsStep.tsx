
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface KeyPointsStepProps {
  formData: {
    bulletPoints: string[];
  };
  updateFormData: (updates: any) => void;
}

export const KeyPointsStep = ({ formData, updateFormData }: KeyPointsStepProps) => {
  const [newBulletPoint, setNewBulletPoint] = useState("");

  const addBulletPoint = () => {
    if (newBulletPoint.trim()) {
      updateFormData({
        bulletPoints: [...formData.bulletPoints, newBulletPoint.trim()]
      });
      setNewBulletPoint("");
    }
  };

  const removeBulletPoint = (index: number) => {
    updateFormData({
      bulletPoints: formData.bulletPoints.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">Add key points (Optional)</h2>
        <p className="text-lg text-slate-600">Include specific points you want to mention in your content</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-slate-900">Key Points to Include</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a key point to include..."
              value={newBulletPoint}
              onChange={(e) => setNewBulletPoint(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addBulletPoint()}
              className="bg-white/70 backdrop-blur-sm border-green-200 focus:border-green-400 text-base"
            />
            <Button 
              onClick={addBulletPoint}
              size="sm"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-4"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {formData.bulletPoints.length > 0 && (
          <div className="space-y-3">
            <Label className="text-base font-medium text-slate-700">Added Points:</Label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {formData.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-green-200">
                  <span className="text-slate-700 flex-1">• {point}</span>
                  <Button
                    onClick={() => removeBulletPoint(index)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 ml-3"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {formData.bulletPoints.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <div className="text-sm">
              No key points added yet. You can skip this step or add some specific points you want to include.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
