
import { PromptTemplate, ValidationResult } from './types';

export class TemplateCompiler {
  static compileTemplate(template: PromptTemplate, variables: Record<string, any>): string {
    let compiledTemplate = template.template;

    // Add template behavior context
    const behaviorContext = {
      behavior: template.behavior || 'general AI assistant',
      content_style: template.contentStyle || 'engaging',
      requirements: template.requirements || 'Create engaging content',
      structure: template.structure || 'Standard format'
    };

    // Merge behavior context with user variables
    const allVariables = { ...behaviorContext, ...variables };

    // Replace all variables in the template
    template.variables.forEach(variable => {
      const value = allVariables[variable.name] !== undefined 
        ? allVariables[variable.name] 
        : variable.defaultValue;
      
      // Convert boolean values to Yes/No for better AI understanding
      const displayValue = typeof value === 'boolean' 
        ? (value ? 'Yes' : 'No')
        : String(value);

      const regex = new RegExp(`{{${variable.name}}}`, 'g');
      compiledTemplate = compiledTemplate.replace(regex, displayValue);
    });

    // Replace behavior context variables
    Object.entries(behaviorContext).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      compiledTemplate = compiledTemplate.replace(regex, value);
    });

    return compiledTemplate;
  }

  static validateVariables(template: PromptTemplate, variables: Record<string, any>): ValidationResult {
    const missingRequired: string[] = [];
    
    template.variables.forEach(variable => {
      // Required variables are those without default values (except booleans)
      const isRequired = variable.type !== 'boolean' && 
                        (variable.defaultValue === '' || variable.defaultValue === undefined);
      
      if (isRequired && (!variables[variable.name] || variables[variable.name] === '')) {
        missingRequired.push(variable.name);
      }
    });

    return {
      isValid: missingRequired.length === 0,
      missingRequired
    };
  }
}
