
export interface FormData {
  contentType: string;
  topic: string;
  platform: string;
  language: string;
  tone: string;
  goal: string;
  template: string;
  bulletPoints: string[];
  includeEmojis: boolean;
  includeHashtags: boolean;
}

export interface MultiStepContentGeneratorProps {
  canGenerateMore: boolean;
  postsRemaining: number;
}

export interface Step {
  id: number;
  title: string;
  description: string;
}

export const steps: Step[] = [
  { id: 1, title: "Content Type & Language", description: "Choose content type and language" },
  { id: 2, title: "Topic & Platform", description: "Define your topic and target platform" },
  { id: 3, title: "Style & Goal", description: "Set tone, goal, and content options" },
  { id: 4, title: "Key Points", description: "Add specific points to include (optional)" },
  { id: 5, title: "Review & Generate", description: "Review your settings and generate content" }
];
