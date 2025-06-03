
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, Zap } from "lucide-react";

interface Project {
  id: string;
  name: string;
  platform: string;
  status: "planning" | "in-progress" | "review" | "completed";
  progress: number;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completedTasks: number;
  totalTasks: number;
}

interface ProjectCardProps {
  project: Project;
  onProjectSelect?: (projectId: string) => void;
}

export const ProjectCard = ({ project, onProjectSelect }: ProjectCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Zap className="w-4 h-4 text-blue-500" />;
      case "review":
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "review":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer" 
      onClick={() => onProjectSelect?.(project.id)}
    >
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Project Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {getStatusIcon(project.status)}
                <h4 className="font-semibold text-gray-900 truncate">{project.name}</h4>
              </div>
              <p className="text-sm text-gray-600">{project.platform}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={`text-xs ${getPriorityColor(project.priority)}`}>
                {project.priority}
              </Badge>
              <Badge variant="secondary" className={`text-xs ${getStatusColor(project.status)}`}>
                {project.status}
              </Badge>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{project.completedTasks}/{project.totalTasks} tasks</span>
              <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
