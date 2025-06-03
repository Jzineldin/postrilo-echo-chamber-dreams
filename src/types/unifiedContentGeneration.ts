
export interface ContentGeneratorProps {
  canGenerateMore?: boolean;
  postsRemaining?: number;
  onContentGenerated?: (content: any) => void;
  onGenerationError?: (error: any) => void;
  showHeader?: boolean;
  className?: string;
}

export interface ContentGeneratorState {
  formData: any;
  isGenerating: boolean;
  generatedContent: any | null;
  generationError: any | null;
  retryCount: number;
}

export interface UseContentGeneratorResult {
  state: ContentGeneratorState;
  actions: {
    updateFormData: (updates: any) => void;
    generateContent: () => Promise<void>;
    retryGeneration: () => void;
    copyContent: () => void;
    clearError: () => void;
  };
}
