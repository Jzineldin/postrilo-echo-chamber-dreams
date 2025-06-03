
import { PromptTemplate, TemplateBehavior, ValidationResult } from './types';
import { PROMPT_TEMPLATES } from './templateData';
import { TemplateCompiler } from './templateCompiler';

export class PromptTemplateService {
  private templates: PromptTemplate[] = PROMPT_TEMPLATES;

  getTemplates(): PromptTemplate[] {
    return this.templates;
  }

  getTemplateById(id: string): PromptTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  getTemplatesByCategory(category: string): PromptTemplate[] {
    return this.templates.filter(template => template.category === category);
  }

  compileTemplate(templateId: string, variables: Record<string, any>): string {
    const template = this.getTemplateById(templateId);
    if (!template) {
      throw new Error(`Template with id ${templateId} not found`);
    }

    return TemplateCompiler.compileTemplate(template, variables);
  }

  validateVariables(templateId: string, variables: Record<string, any>): ValidationResult {
    const template = this.getTemplateById(templateId);
    if (!template) {
      return { isValid: false, missingRequired: [] };
    }

    return TemplateCompiler.validateVariables(template, variables);
  }

  getTemplateBehavior(templateId: string): TemplateBehavior | null {
    const template = this.getTemplateById(templateId);
    if (!template) return null;

    return {
      behavior: template.behavior || 'general AI assistant',
      contentStyle: template.contentStyle || 'engaging',
      requirements: template.requirements || 'Create engaging content',
      structure: template.structure || 'Standard format'
    };
  }
}

export const promptTemplateService = new PromptTemplateService();
