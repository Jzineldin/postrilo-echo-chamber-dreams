
interface EnhancedContentGeneratorHeaderProps {
  title?: string;
  subtitle?: string;
}

export const EnhancedContentGeneratorHeader = ({ 
  title = "Enhanced Content Generator",
  subtitle = "AI-powered content creation with advanced optimization"
}: EnhancedContentGeneratorHeaderProps) => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
      <p className="text-xl text-gray-600">{subtitle}</p>
    </div>
  );
};
