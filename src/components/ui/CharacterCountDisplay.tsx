
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { CharacterCountService } from "@/services/characterCountService";

interface CharacterCountDisplayProps {
  content: string;
  platform: string;
  className?: string;
}

export const CharacterCountDisplay = ({ content, platform, className }: CharacterCountDisplayProps) => {
  const validation = CharacterCountService.validateContent(content, platform);
  
  const getStatusColor = () => {
    switch (validation.status) {
      case 'optimal': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (validation.status) {
      case 'optimal': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className={className}>
      <Alert className={`${getStatusColor()} border`}>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <AlertDescription className="font-medium">
            {validation.message}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};
