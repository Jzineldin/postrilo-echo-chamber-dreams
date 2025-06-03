
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskItem, ChecklistItem } from "./TaskItem";

interface TaskCategoryProps {
  category: string;
  tasks: ChecklistItem[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskCategory = ({ category, tasks, onToggleTask, onDeleteTask }: TaskCategoryProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{category}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {tasks.filter(t => t.completed).length}/{tasks.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {tasks.map((item) => (
          <TaskItem
            key={item.id}
            item={item}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))}
      </CardContent>
    </Card>
  );
};
