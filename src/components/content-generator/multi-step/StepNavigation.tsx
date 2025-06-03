
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => boolean;
  isNextDisabled?: boolean;
  nextButtonText?: string;
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isNextDisabled = false,
  nextButtonText = "Next"
}: StepNavigationProps) => {
  const { toast } = useToast();

  const handleNext = () => {
    console.log('Next button clicked, current step:', currentStep);
    
    if (isNextDisabled) {
      toast({
        title: "Cannot Proceed",
        description: "Please complete all required fields before continuing.",
        variant: "destructive"
      });
      return;
    }

    const success = onNext();
    if (!success) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to continue.",
        variant: "destructive"
      });
    }
  };

  const handlePrevious = () => {
    console.log('Previous button clicked, current step:', currentStep);
    onPrevious();
  };

  return (
    <div className="flex justify-between items-center pt-6">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={currentStep === 1}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="text-sm text-gray-500">
        Step {currentStep} of {totalSteps}
      </div>

      <Button
        onClick={handleNext}
        disabled={isNextDisabled}
        className="flex items-center gap-2"
      >
        {nextButtonText}
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
