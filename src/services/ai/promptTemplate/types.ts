
export interface PromptVariable {
  name: string;
  type: 'text' | 'select' | 'boolean' | 'textarea';
  defaultValue: string | boolean;
  options?: string[]; // For select type
  description?: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: PromptVariable[];
  category: string;
  // New fields for template behavior system
  behavior?: string;
  contentStyle?: string;
  requirements?: string;
  structure?: string;
}

export interface TemplateBehavior {
  behavior: string;
  contentStyle: string;
  requirements: string;
  structure: string;
}

export interface ValidationResult {
  isValid: boolean;
  missingRequired: string[];
}
