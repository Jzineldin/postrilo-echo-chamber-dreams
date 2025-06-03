
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ProjectChecklistHeaderProps {
  onBack?: () => void;
}

export const ProjectChecklistHeader = ({ onBack }: ProjectChecklistHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      {onBack && (
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
      )}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-900">Project Checklist</h2>
        <p className="text-gray-600">Track your project progress</p>
      </div>
    </div>
  );
};
