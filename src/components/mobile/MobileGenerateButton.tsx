
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';

interface MobileGenerateButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
  canGenerateMore: boolean;
  hasValidTopic: boolean;
}

export const MobileGenerateButton = ({
  onGenerate,
  isGenerating,
  canGenerateMore,
  hasValidTopic
}: MobileGenerateButtonProps) => {
  return (
    <Button
      onClick={onGenerate}
      disabled={!hasValidTopic || isGenerating || !canGenerateMore}
      className="w-full h-12 text-base"
      size="lg"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Creating Content...
        </>
      ) : !canGenerateMore ? (
        'Limit Reached'
      ) : (
        <>
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Content
        </>
      )}
    </Button>
  );
};
