
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from "lucide-react";

interface GenerateButtonProps {
  isGenerating: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const GenerateButton = ({ isGenerating, disabled, onClick }: GenerateButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold"
    >
      {isGenerating ? (
        <>
          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
          Generating Enhanced Content...
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Enhanced Content
        </>
      )}
    </Button>
  );
};
