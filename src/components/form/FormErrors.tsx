
import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

interface FormErrorsProps {
  generalError?: string;
  isFormValid: boolean;
  hasAttemptedSubmit: boolean;
}

export const FormErrors = ({ generalError, isFormValid, hasAttemptedSubmit }: FormErrorsProps) => {
  if (generalError) {
    return (
      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
        <p className="text-sm text-red-600 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {generalError}
        </p>
      </div>
    );
  }

  if (isFormValid && hasAttemptedSubmit) {
    return (
      <div className="p-3 bg-green-50 border border-green-200 rounded-md">
        <p className="text-sm text-green-600 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Form is ready to submit!
        </p>
      </div>
    );
  }

  return null;
};
