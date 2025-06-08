
export interface MultiStepContentGeneratorProps {
  canGenerateMore: boolean;
  postsRemaining: number;
  onBack?: () => void;
  initialTemplate?: any;
}

export interface FormData {
  contentType: string;
  topic: string;
  platforms: string[];
  tone: string;
  goal: string;
  keyPoints: string[];
  language: string;
}

export interface ContentGenerationResult {
  content: string;
  hashtags: string[];
  platform: string;
}
