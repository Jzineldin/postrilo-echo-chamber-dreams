
export interface ValidationRule {
  field: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

class ValidationService {
  validateForm(data: Record<string, any>, rules: ValidationRule[]): ValidationResult {
    const errors: Record<string, string> = {};
    const warnings: Record<string, string> = {};

    for (const rule of rules) {
      const value = data[rule.field];
      const error = this.validateField(value, rule);
      
      if (error) {
        errors[rule.field] = error;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      warnings
    };
  }

  private validateField(value: any, rule: ValidationRule): string | null {
    // Required check
    if (rule.required && (value === undefined || value === null || value === '')) {
      return `${rule.field} is required`;
    }

    // Skip other validations if value is empty and not required
    if (!value && !rule.required) {
      return null;
    }

    // String validations
    if (typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        return `${rule.field} must be at least ${rule.minLength} characters`;
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        return `${rule.field} must not exceed ${rule.maxLength} characters`;
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        return `${rule.field} format is invalid`;
      }
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }

  // Common validation patterns
  static patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    url: /^https?:\/\/[^\s$.?#].[^\s]*$/,
    hashtag: /^#[a-zA-Z0-9_]+$/,
    mention: /^@[a-zA-Z0-9_]+$/
  };

  // Platform-specific content validation
  validateContentForPlatform(content: string, platform: string): ValidationResult {
    const rules: ValidationRule[] = [
      { field: 'content', required: true, minLength: 1 }
    ];

    // Platform-specific rules
    const platformLimits = {
      twitter: { maxLength: 280 },
      instagram: { maxLength: 2200 },
      facebook: { maxLength: 63206 },
      linkedin: { maxLength: 1300 },
      tiktok: { maxLength: 150 },
      youtube: { maxLength: 5000 }
    };

    const limit = platformLimits[platform as keyof typeof platformLimits];
    if (limit) {
      rules[0].maxLength = limit.maxLength;
    }

    return this.validateForm({ content }, rules);
  }
}

export const validationService = new ValidationService();
