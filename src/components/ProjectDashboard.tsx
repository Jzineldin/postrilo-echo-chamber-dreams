
import { useState } from "react";
import { ProjectDashboardHeader } from "./project/ProjectDashboardHeader";
import { ProjectStatsOverview } from "./project/ProjectStatsOverview";
import { ProjectList } from "./project/ProjectList";

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

interface ProjectDashboardProps {
  onCreateProject?: () => void;
  onProjectSelect?: (projectId: string) => void;
}

export const ProjectDashboard = ({ onCreateProject, onProjectSelect }: ProjectDashboardProps) => {
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "Instagram Campaign Q1",
      platform: "Instagram",
      status: "in-progress",
      progress: 65,
      dueDate: "2024-01-15",
      priority: "high",
      completedTasks: 13,
      totalTasks: 20
    },
    {
      id: "2",
      name: "TikTok Viral Series",
      platform: "TikTok",
      status: "planning",
      progress: 25,
      dueDate: "2024-01-20",
      priority: "medium",
      completedTasks: 5,
      totalTasks: 20
    },
    {
      id: "3",
      name: "LinkedIn Thought Leadership",
      platform: "LinkedIn",
      status: "review",
      progress: 90,
      dueDate: "2024-01-10",
      priority: "high",
      completedTasks: 18,
      totalTasks: 20
    }
  ]);

  return (
    <div className="space-y-4 p-4">
      <ProjectDashboardHeader onCreateProject={onCreateProject} />
      <ProjectStatsOverview />
      <ProjectList projects={projects} onProjectSelect={onProjectSelect} />
    </div>
  );
};
