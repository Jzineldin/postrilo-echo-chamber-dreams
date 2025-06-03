
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormSubmitButtonProps {
  isSubmitting: boolean;
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
}

export const FormSubmitButton = ({ 
  isSubmitting, 
  isLoading, 
  children, 
  loadingText = "Loading..." 
}: FormSubmitButtonProps) => {
  const isDisabled = isSubmitting || isLoading;

  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDisabled ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};
