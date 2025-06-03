
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { steps, Step } from "./types";

interface ProgressHeaderProps {
  currentStep: number;
  postsRemaining: number;
  onStepClick: (stepNumber: number) => void;
}

export const ProgressHeader = ({ currentStep, postsRemaining, onStepClick }: ProgressHeaderProps) => {
  const isMobile = useIsMobile();
  const progress = (currentStep / steps.length) * 100;

  return (
    <Card className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-purple-200 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-2xl font-display text-slate-900">
              Create Content - Step {currentStep} of {steps.length}
            </CardTitle>
            <p className="text-slate-600 mt-1">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
          <div className="text-sm text-purple-600 font-medium">
            {postsRemaining} posts remaining
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>{steps[currentStep - 1]?.title}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {/* Interactive Step Indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`flex flex-col items-center ${isMobile ? 'text-xs' : 'text-sm'} cursor-pointer transition-all duration-200 hover:scale-105`}
              onClick={() => onStepClick(step.id)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 hover:shadow-lg ${
                currentStep > step.id
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : currentStep === step.id
                  ? 'bg-purple-500 text-white hover:bg-purple-600'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}>
                {step.id}
              </div>
              <span className={`mt-1 ${isMobile ? 'hidden' : 'block'} transition-colors duration-200 ${
                currentStep === step.id ? 'text-purple-600 font-medium' : 'text-gray-500 hover:text-gray-700'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
};
