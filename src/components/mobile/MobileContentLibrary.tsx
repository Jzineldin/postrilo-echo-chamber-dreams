
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Heart, 
  Copy, 
  Share2, 
  MoreVertical,
  Archive,
  Filter,
  Grid3X3,
  List
} from "lucide-react";
import { EnhancedContentStorage, EnhancedContentItem } from "@/services/enhancedContentStorage";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export const MobileContentLibrary = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const allContent = EnhancedContentStorage.getAllContent();
  
  const filteredContent = useMemo(() => {
    let content = EnhancedContentStorage.searchContent(searchQuery, {
      platform: selectedPlatform || undefined
    });

    return content.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [searchQuery, selectedPlatform]);

  const uniquePlatforms = useMemo(() => 
    [...new Set(allContent.map(item => item.platform))],
    [allContent]
  );

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  const handleToggleFavorite = (id: string, currentStatus: boolean) => {
    EnhancedContentStorage.updateContent(id, { isFavorite: !currentStatus });
    toast({
      title: currentStatus ? "Removed from favorites" : "Added to favorites",
    });
    setSearchQuery(prev => prev); // Force re-render
  };

  if (!isMobile) {
    return null; // Use regular component for desktop
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Mobile Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Content Library</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search your content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-base"
          style={{ fontSize: '16px' }}
        />
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <Card className="bg-gray-50/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Platform</label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="All platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All platforms</SelectItem>
                    {uniquePlatforms.map(platform => (
                      <SelectItem key={platform} value={platform}>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedPlatform("");
                  setSearchQuery("");
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredContent.length} of {allContent.length} items
      </div>

      {/* Mobile Content Grid */}
      <div className={`space-y-3 ${viewMode === "grid" ? "grid grid-cols-1 gap-3" : ""}`}>
        {filteredContent.length === 0 ? (
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8 text-center text-gray-500">
              <Archive className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No content found</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedPlatform("");
                  setSearchQuery("");
                }}
                className="mt-2"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredContent.map((item) => (
            <Card key={item.id} className="bg-white/95 backdrop-blur-sm border-white/60">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2 text-gray-900">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {item.platform}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.contentType}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleFavorite(item.id, item.isFavorite)}
                      className="shrink-0"
                    >
                      <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    </Button>
                  </div>

                  {/* Content Preview */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-800 line-clamp-3">
                      {item.content}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{item.wordCount} words</span>
                    <span>{item.characterCount} chars</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleCopyContent(item.content)}
                      className="flex-1"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                    >
                      <Share2 className="w-3 h-3 mr-1" />
                      Share
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                    >
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
