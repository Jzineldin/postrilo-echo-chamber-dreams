
import { useState } from "react";
import { ProjectChecklistHeader } from "./project-checklist/ProjectChecklistHeader";
import { ProjectProgressOverview } from "./project-checklist/ProjectProgressOverview";
import { AddTaskForm } from "./project-checklist/AddTaskForm";
import { TaskCategory } from "./project-checklist/TaskCategory";
import { ChecklistItem } from "./project-checklist/TaskItem";

interface ProjectChecklistProps {
  projectId?: string;
  onBack?: () => void;
}

export const ProjectChecklist = ({ projectId, onBack }: ProjectChecklistProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: "1",
      title: "Define target audience",
      description: "Research and define the primary demographic for this campaign",
      completed: true,
      priority: "high",
      assignee: "Marketing Team",
      dueDate: "2024-01-05",
      category: "Planning"
    },
    {
      id: "2",
      title: "Create content calendar",
      description: "Plan out 30 days of content with posting schedule",
      completed: true,
      priority: "high",
      assignee: "Content Team",
      dueDate: "2024-01-08",
      category: "Planning"
    },
    {
      id: "3",
      title: "Design visual assets",
      description: "Create branded templates and graphics",
      completed: false,
      priority: "medium",
      assignee: "Design Team",
      dueDate: "2024-01-12",
      category: "Design"
    },
    {
      id: "4",
      title: "Write copy for posts",
      description: "Develop engaging captions and copy",
      completed: false,
      priority: "high",
      assignee: "Copywriter",
      dueDate: "2024-01-15",
      category: "Content"
    },
    {
      id: "5",
      title: "Set up analytics tracking",
      description: "Configure UTM parameters and tracking pixels",
      completed: false,
      priority: "medium",
      assignee: "Analytics Team",
      dueDate: "2024-01-10",
      category: "Technical"
    }
  ]);

  const completedTasks = checklist.filter(item => item.completed).length;
  const totalTasks = checklist.length;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const toggleTask = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addTask = (title: string) => {
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority: "medium",
      category: "General"
    };
    
    setChecklist(prev => [...prev, newItem]);
  };

  const deleteTask = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  const groupedTasks = checklist.reduce((groups, task) => {
    const category = task.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(task);
    return groups;
  }, {} as Record<string, ChecklistItem[]>);

  return (
    <div className="space-y-4 p-4">
      <ProjectChecklistHeader onBack={onBack} />

      <ProjectProgressOverview 
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        completionPercentage={completionPercentage}
      />

      <AddTaskForm onAddTask={addTask} />

      <div className="space-y-4">
        {Object.entries(groupedTasks).map(([category, tasks]) => (
          <TaskCategory
            key={category}
            category={category}
            tasks={tasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};
