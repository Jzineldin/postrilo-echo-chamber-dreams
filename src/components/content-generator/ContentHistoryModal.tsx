
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Copy, Download, Trash2, RefreshCw } from "lucide-react";
import { ContentHistoryService } from "@/services/contentHistoryService";
import { useToast } from "@/hooks/use-toast";

interface ContentHistoryModalProps {
  onSelectContent?: (content: {
    content: string;
    platform: string;
    contentType: string;
    tone: string;
    goal: string;
    topic: string;
    hashtags?: string[];
  }) => void;
}

export const ContentHistoryModal = ({ onSelectContent }: ContentHistoryModalProps) => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState(ContentHistoryService.getHistory());
  const { toast } = useToast();

  const refreshHistory = () => {
    setHistory(ContentHistoryService.getHistory());
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  const handleDelete = (id: string) => {
    ContentHistoryService.deleteContent(id);
    refreshHistory();
    toast({
      title: "Deleted",
      description: "Content removed from history",
    });
  };

  const handleExport = (content: any) => {
    ContentHistoryService.exportContent(content, 'txt');
    toast({
      title: "Exported",
      description: "Content exported successfully",
    });
  };

  const handleUseAsTemplate = (content: any) => {
    if (onSelectContent) {
      onSelectContent({
        content: content.content,
        platform: content.platform,
        contentType: content.contentType,
        tone: content.tone,
        goal: content.goal,
        topic: content.topic,
        hashtags: content.hashtags
      });
      setOpen(false);
      toast({
        title: "Template Applied",
        description: "Content loaded as template",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <History className="h-4 w-4" />
          Content History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Content History</span>
            <Button variant="ghost" size="sm" onClick={refreshHistory}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh]">
          {history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No content history yet</p>
              <p className="text-sm">Generated content will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <Card key={item.id} className="relative">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.topic}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.platform}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {item.contentType}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="bg-gray-50 p-3 rounded text-sm mb-3 max-h-32 overflow-y-auto">
                      {item.content}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">{item.tone}</Badge>
                        <Badge variant="outline" className="text-xs">{item.goal}</Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(item.content)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleExport(item)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        {onSelectContent && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUseAsTemplate(item)}
                          >
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
