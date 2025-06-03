
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, BarChart3, FolderOpen, Settings } from "lucide-react";

interface NavigationTabsProps {
  activeTab: string;
}

export const NavigationTabs = ({ activeTab }: NavigationTabsProps) => {
  return (
    <div className="flex justify-center">
      <TabsList className="grid grid-cols-4 w-fit bg-white/70 backdrop-blur-sm">
        <TabsTrigger value="create" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create
        </TabsTrigger>
        <TabsTrigger value="manage" className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4" />
          Manage
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
