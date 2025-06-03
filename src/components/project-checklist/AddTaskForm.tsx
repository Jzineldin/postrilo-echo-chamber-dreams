
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddTaskFormProps {
  onAddTask: (title: string) => void;
}

export const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [newTask, setNewTask] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    onAddTask(newTask);
    setNewTask("");
    setShowAddTask(false);
  };

  return (
    <Card>
      <CardContent className="p-4">
        {!showAddTask ? (
          <Button 
            onClick={() => setShowAddTask(true)} 
            variant="outline" 
            className="w-full border-dashed"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Task
          </Button>
        ) : (
          <div className="space-y-3">
            <Input
              placeholder="Enter task title..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              className="text-base"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddTask} size="sm" className="flex-1">
                Add Task
              </Button>
              <Button 
                onClick={() => {
                  setShowAddTask(false);
                  setNewTask("");
                }} 
                variant="outline" 
                size="sm"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
