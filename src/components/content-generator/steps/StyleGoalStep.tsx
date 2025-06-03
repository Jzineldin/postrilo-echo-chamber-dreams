
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormData } from "../multi-step/types";
import { tones, goals } from "@/components/enhanced-content-generator/types";

interface StyleGoalStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export const StyleGoalStep = ({ formData, updateFormData }: StyleGoalStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Set your style and goals</h2>
        <p className="text-gray-600">How should your content sound and what should it achieve?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tone">Tone</Label>
          <Select 
            value={formData.tone} 
            onValueChange={(value) => updateFormData({ tone: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              {tones.map((tone) => (
                <SelectItem key={tone.value} value={tone.value}>
                  {tone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="goal">Goal</Label>
          <Select 
            value={formData.goal} 
            onValueChange={(value) => updateFormData({ goal: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select goal" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              {goals.map((goal) => (
                <SelectItem key={goal.value} value={goal.value}>
                  {goal.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="emojis"
              checked={formData.includeEmojis}
              onCheckedChange={(checked) => updateFormData({ includeEmojis: checked === true })}
            />
            <Label htmlFor="emojis">Include Emojis</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hashtags"
              checked={formData.includeHashtags}
              onCheckedChange={(checked) => updateFormData({ includeHashtags: checked === true })}
            />
            <Label htmlFor="hashtags">Include Hashtags</Label>
          </div>
        </CardContent>
      </Card>

      {(!formData.tone || !formData.goal) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            Please select both tone and goal to continue.
          </p>
        </div>
      )}
    </div>
  );
};
