
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Calendar, Trash2 } from "lucide-react";

export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  assignee?: string;
  dueDate?: string;
  category: string;
}

interface TaskItemProps {
  item: ChecklistItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ item, onToggle, onDelete }: TaskItemProps) => {
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

  return (
    <div 
      className={`p-3 rounded-lg border transition-all ${
        item.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
      }`}
    >
      <div className="space-y-3">
        {/* Task Header */}
        <div className="flex items-start gap-3">
          <Checkbox
            checked={item.completed}
            onCheckedChange={() => onToggle(item.id)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <h4 className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {item.title}
            </h4>
            {item.description && (
              <p className={`text-sm mt-1 ${item.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                {item.description}
              </p>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDelete(item.id)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Task Metadata */}
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge className={getPriorityColor(item.priority)}>
            {item.priority}
          </Badge>
          {item.assignee && (
            <div className="flex items-center gap-1 text-gray-500">
              <User className="w-3 h-3" />
              {item.assignee}
            </div>
          )}
          {item.dueDate && (
            <div className="flex items-center gap-1 text-gray-500">
              <Calendar className="w-3 h-3" />
              {new Date(item.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
