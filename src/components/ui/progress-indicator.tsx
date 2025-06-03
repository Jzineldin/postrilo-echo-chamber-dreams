
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle, Zap, Target, Sparkles, TrendingUp, FileText } from 'lucide-react';

interface GenerationProgress {
  stage: 'initializing' | 'analyzing' | 'generating' | 'optimizing' | 'finalizing' | 'completed' | 'error';
  message: string;
  progress: number;
  estimatedTimeRemaining?: number;
}

interface ProgressIndicatorProps {
  progress: GenerationProgress;
  isVisible: boolean;
  className?: string;
}

const stageIcons = {
  initializing: Loader2,
  analyzing: Target,
  generating: Zap,
  optimizing: TrendingUp,
  finalizing: Sparkles,
  completed: CheckCircle,
  error: AlertCircle
};

const stageColors = {
  initializing: 'text-blue-500',
  analyzing: 'text-purple-500', 
  generating: 'text-green-500',
  optimizing: 'text-orange-500',
  finalizing: 'text-pink-500',
  completed: 'text-green-600',
  error: 'text-red-500'
};

export const ProgressIndicator = ({ progress, isVisible, className }: ProgressIndicatorProps) => {
  if (!isVisible) return null;

  const IconComponent = stageIcons[progress.stage];
  const iconColor = stageColors[progress.stage];

  const formatTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  const getProgressColor = () => {
    if (progress.stage === 'error') return 'bg-red-500';
    if (progress.stage === 'completed') return 'bg-green-500';
    return 'bg-gradient-to-r from-purple-500 to-pink-500';
  };

  return (
    <Card className={`bg-white/95 backdrop-blur-sm border-purple-200 ${className}`}>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <IconComponent 
            className={`w-6 h-6 ${iconColor} ${progress.stage !== 'completed' && progress.stage !== 'error' ? 'animate-spin' : ''}`}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{progress.message}</h3>
              {progress.estimatedTimeRemaining && progress.stage !== 'completed' && progress.stage !== 'error' && (
                <span className="text-sm text-gray-500">
                  ~{formatTime(progress.estimatedTimeRemaining)} remaining
                </span>
              )}
            </div>
            <div className="relative">
              <Progress 
                value={progress.progress} 
                className="h-2"
              />
              <div 
                className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor()}`}
                style={{ width: `${progress.progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600 capitalize">
                {progress.stage === 'error' ? 'Failed' : progress.stage}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {progress.progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Stage breakdown */}
        <div className="grid grid-cols-5 gap-2 mt-4">
          {(['initializing', 'analyzing', 'generating', 'optimizing', 'finalizing'] as const).map((stage, index) => {
            const StageIcon = stageIcons[stage];
            const isActive = stage === progress.stage;
            const isCompleted = ['initializing', 'analyzing', 'generating', 'optimizing', 'finalizing'].indexOf(progress.stage) > index;
            
            return (
              <div key={stage} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isActive 
                    ? 'bg-purple-100 text-purple-600' 
                    : isCompleted 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  <StageIcon className="w-4 h-4" />
                </div>
                <span className={`text-xs capitalize ${
                  isActive || isCompleted ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
