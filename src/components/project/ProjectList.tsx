
import { ProjectCard } from "./ProjectCard";

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

interface ProjectListProps {
  projects: Project[];
  onProjectSelect?: (projectId: string) => void;
}

export const ProjectList = ({ projects, onProjectSelect }: ProjectListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onProjectSelect={onProjectSelect} 
        />
      ))}
    </div>
  );
};
