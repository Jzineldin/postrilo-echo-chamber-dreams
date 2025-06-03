
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  History, 
  Star, 
  Copy, 
  Trash, 
  Download, 
  Search,
  Filter,
  Calendar
} from 'lucide-react';
import { EnhancedContentStorage, EnhancedContentItem } from '@/services/enhancedContentStorage';
import { useToast } from '@/hooks/use-toast';

export const ContentHistoryManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [content, setContent] = useState<EnhancedContentItem[]>(
    EnhancedContentStorage.getAllContent()
  );
  const { toast } = useToast();

  const filteredContent = content.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPlatform = selectedPlatform === 'all' || item.platform === selectedPlatform;
    const matchesType = selectedType === 'all' || item.contentType === selectedType;
    
    return matchesSearch && matchesPlatform && matchesType;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'platform':
        return a.platform.localeCompare(b.platform);
      default:
        return 0;
    }
  });

  const handleToggleFavorite = (id: string) => {
    const item = content.find(c => c.id === id);
    if (item) {
      EnhancedContentStorage.updateContent(id, { isFavorite: !item.isFavorite });
      setContent(EnhancedContentStorage.getAllContent());
      toast({
        title: item.isFavorite ? "Removed from favorites" : "Added to favorites",
        duration: 2000,
      });
    }
  };

  const handleCopyContent = (item: EnhancedContentItem) => {
    navigator.clipboard.writeText(item.content);
    toast({
      title: "Content copied",
      description: "Content has been copied to your clipboard",
      duration: 2000,
    });
  };

  const handleDeleteContent = (id: string) => {
    EnhancedContentStorage.deleteContent(id);
    setContent(EnhancedContentStorage.getAllContent());
    toast({
      title: "Content deleted",
      description: "Content has been permanently deleted",
      duration: 2000,
    });
  };

  const handleExportContent = (item: EnhancedContentItem) => {
    EnhancedContentStorage.exportContent([item], 'txt');
    toast({
      title: "Content exported",
      description: "Content has been downloaded as a text file",
      duration: 2000,
    });
  };

  const platforms = [...new Set(content.map(item => item.platform))];
  const contentTypes = [...new Set(content.map(item => item.contentType))];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Content History & Library
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {platforms.map(platform => (
                  <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {contentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="platform">Platform</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredContent.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No content found matching your criteria</p>
              </div>
            ) : (
              filteredContent.map((item) => (
                <Card key={item.id} className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium truncate">{item.title}</h4>
                          {item.isFavorite && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {item.content}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline">{item.platform}</Badge>
                          <Badge variant="outline">{item.contentType}</Badge>
                          <Badge variant="outline">{item.tone}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                          <span>{item.wordCount} words</span>
                          <span>{item.characterCount} chars</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleFavorite(item.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Star className={`w-4 h-4 ${item.isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyContent(item)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleExportContent(item)}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteContent(item.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
