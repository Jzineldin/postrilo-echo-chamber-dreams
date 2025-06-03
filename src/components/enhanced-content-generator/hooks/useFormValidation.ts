
import { FormData } from "../types";

export const useFormValidation = () => {
  const validateForm = (formData: FormData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!formData.topic.trim()) {
      errors.push("Topic is required");
    }

    if (!formData.platform) {
      errors.push("Platform is required");
    }

    if (!formData.goal) {
      errors.push("Goal is required");
    }

    if (!formData.tone) {
      errors.push("Tone is required");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  return { validateForm };
};
