
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";

interface ProjectDashboardHeaderProps {
  onCreateProject?: () => void;
}

export const ProjectDashboardHeader = ({ onCreateProject }: ProjectDashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Project Dashboard</h2>
        <p className="text-gray-600">Manage your content creation projects</p>
      </div>
      <Button onClick={onCreateProject} className="w-full sm:w-auto">
        <Target className="w-4 h-4 mr-2" />
        New Project
      </Button>
    </div>
  );
};
