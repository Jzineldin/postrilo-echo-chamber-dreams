
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/form/FormField";
import { FormErrors } from "@/components/form/FormErrors";
import { FormSubmitButton } from "@/components/form/FormSubmitButton";

interface FormValidationProps {
  onSubmit?: (data: any) => void;
  isLoading?: boolean;
}

interface FormErrors {
  email?: string;
  content?: string;
  platform?: string;
  general?: string;
}

interface FormData {
  email: string;
  content: string;
  platform: string;
}

export const FormValidation = ({ onSubmit, isLoading = false }: FormValidationProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    content: "",
    platform: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return undefined;
  };

  const validateContent = (content: string): string | undefined => {
    if (!content.trim()) return "Content is required";
    if (content.trim().length < 10) return "Content must be at least 10 characters long";
    if (content.trim().length > 500) return "Content must be less than 500 characters";
    return undefined;
  };

  const validatePlatform = (platform: string): string | undefined => {
    if (!platform) return "Please select a platform";
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: validateEmail(formData.email),
      content: validateContent(formData.content),
      platform: validatePlatform(formData.platform)
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    let fieldError: string | undefined;
    switch (field) {
      case 'email':
        fieldError = validateEmail(formData.email);
        break;
      case 'content':
        fieldError = validateContent(formData.content);
        break;
      case 'platform':
        fieldError = validatePlatform(formData.platform);
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: fieldError }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched({
      email: true,
      content: true,
      platform: true
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({ general: undefined });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      setFormData({ email: "", content: "", platform: "" });
      setTouched({});
      setErrors({});
      
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const platforms = [
    { value: "", label: "Select a platform..." },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "facebook", label: "Facebook" }
  ];

  const isFormValid = !Object.values(errors).some(error => error);
  const hasAttemptedSubmit = Object.keys(touched).length > 0;

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm border-white/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-heading font-bold text-center">
          Try Content Generation
        </CardTitle>
        <p className="text-sm text-gray-600 text-center">
          Test our AI with your content idea
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            onBlur={() => handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            placeholder="your@email.com"
          />

          <FormField
            id="platform"
            label="Target Platform"
            type="select"
            value={formData.platform}
            onChange={(value) => handleInputChange('platform', value)}
            onBlur={() => handleBlur('platform')}
            error={errors.platform}
            touched={touched.platform}
            options={platforms}
          />

          <FormField
            id="content"
            label="Content Topic or Idea"
            type="textarea"
            value={formData.content}
            onChange={(value) => handleInputChange('content', value)}
            onBlur={() => handleBlur('content')}
            error={errors.content}
            touched={touched.content}
            placeholder="Describe what you want to create content about..."
            rows={3}
            maxLength={500}
          />

          <FormErrors
            generalError={errors.general}
            isFormValid={isFormValid}
            hasAttemptedSubmit={hasAttemptedSubmit}
          />

          <FormSubmitButton
            isSubmitting={isSubmitting}
            isLoading={isLoading}
            loadingText="Generating Content..."
          >
            Generate Content
          </FormSubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};
