
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

export interface Step {
  id: number;
  title: string;
  description: string;
}

export const steps: Step[] = [
  { id: 1, title: "Content Type", description: "Choose your content type" },
  { id: 2, title: "Topic & Platform", description: "Define your topic and target platform" },
  { id: 3, title: "Style & Goal", description: "Set tone, goal, and content options" },
  { id: 4, title: "Key Points", description: "Add specific points to include (optional)" },
  { id: 5, title: "Review & Generate", description: "Review your settings and generate content" }
];
