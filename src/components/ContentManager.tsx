
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SavedContent, useContentStorage } from "@/hooks/useContentStorage";
import { Search, Trash2, Download, Copy, Calendar, Tag, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContentManager = () => {
  const { toast } = useToast();
  const { savedContent, deleteContent } = useContentStorage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("all");
  const [viewingContent, setViewingContent] = useState<SavedContent | null>(null);

  const filteredContent = savedContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTemplate = selectedTemplate === "all" || item.templateType === selectedTemplate;
    return matchesSearch && matchesTemplate;
  });

  const templateTypes = [
    { id: "all", name: "All Templates" },
    { id: "educational-carousel", name: "Educational Carousel" },
    { id: "brand-story", name: "Brand Story" },
    { id: "product-launch", name: "Product Launch" },
    { id: "quote-inspiration", name: "Quote & Inspiration" },
    { id: "behind-scenes", name: "Behind the Scenes" },
    { id: "community-post", name: "Community Post" },
    { id: "tutorial-post", name: "Tutorial/How-To" },
    { id: "batch-generator", name: "Batch Generated" }
  ];

  const copyContent = (content: SavedContent) => {
    const text = content.content.join('\n\n---\n\n');
    navigator.clipboard.writeText(text);
    toast({
      title: "Content Copied!",
      description: "Content has been copied to clipboard."
    });
  };

  const exportContent = (content: SavedContent) => {
    const text = `${content.title}\n\nCreated: ${new Date(content.createdAt).toLocaleDateString()}\nTemplate: ${content.templateType}\n\n${content.content.join('\n\n---\n\n')}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${content.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = (id: string) => {
    deleteContent(id);
    toast({
      title: "Content Deleted",
      description: "Content has been removed from your history."
    });
  };

  const exportAllContent = () => {
    if (filteredContent.length === 0) {
      toast({
        title: "No Content",
        description: "No content available to export."
      });
      return;
    }

    const allContent = filteredContent.map(content => 
      `${content.title}\n\nCreated: ${new Date(content.createdAt).toLocaleDateString()}\nTemplate: ${content.templateType}\nTags: ${content.tags.join(', ')}\n\n${content.content.join('\n\n---\n\n')}`
    ).join('\n\n' + '='.repeat(50) + '\n\n');

    const blob = new Blob([allContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all_content_export_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete!",
      description: `Exported ${filteredContent.length} pieces of content.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Manager</h2>
        <p className="text-gray-600">Manage your saved social media content</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search your content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              {templateTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            <Button variant="outline" onClick={exportAllContent}>
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid gap-4">
        {filteredContent.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <p>No saved content found. Create some content to see it here!</p>
            </CardContent>
          </Card>
        ) : (
          filteredContent.map((content) => (
            <Card key={content.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{content.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{content.templateType}</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(content.createdAt).toLocaleDateString()}
                      </div>
                      {content.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Tag className="w-4 h-4 text-gray-400" />
                          <div className="flex gap-1">
                            {content.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {content.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{content.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{content.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {content.content.map((slide, index) => (
                            <Card key={index} className="border-l-4 border-l-blue-500">
                              <CardHeader>
                                <CardTitle className="text-sm text-gray-500">Slide {index + 1}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="whitespace-pre-wrap text-gray-700">{slide}</div>
                              </CardContent>
                            </Card>
                          ))}
                          <div className="flex gap-2 pt-4">
                            <Button onClick={() => copyContent(content)} variant="outline" className="flex-1">
                              <Copy className="w-4 h-4 mr-2" />
                              Copy All
                            </Button>
                            <Button onClick={() => exportContent(content)} variant="outline" className="flex-1">
                              <Download className="w-4 h-4 mr-2" />
                              Export
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyContent(content)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => exportContent(content)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(content.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {content.content.slice(0, 2).map((slide, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded text-sm">
                      <p className="line-clamp-3">{slide}</p>
                    </div>
                  ))}
                  {content.content.length > 2 && (
                    <p className="text-sm text-gray-500">
                      +{content.content.length - 2} more slides
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
