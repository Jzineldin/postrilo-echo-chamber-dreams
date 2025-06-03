
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { useContentStorage } from "@/hooks/useContentStorage";
import { useContentManagement } from "@/hooks/useContentManagement";
import { 
  Search, 
  FileText, 
  Calendar, 
  Edit, 
  Trash2, 
  Copy, 
  Download,
  Filter,
  Grid,
  List,
  Plus,
  Archive,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContentFiltersComponent } from "./content/ContentFilters";
import { useContentFilters } from "@/hooks/useContentFilters";
import { EnhancedLoadingState } from "./feedback/EnhancedLoadingState";
import { useSystemNotifications } from "./feedback/SystemNotifications";

export const ContentLibrary = () => {
  const { savedContent, deleteContent, updateContent } = useContentStorage();
  const { duplicateContent } = useContentManagement();
  const { toast } = useToast();
  const { showSuccess, showError } = useSystemNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const { filters, viewMode, updateFilters, setViewMode } = useContentFilters();
  const [activeTab, setActiveTab] = useState('saved');

  const availablePlatforms = useMemo(() => {
    const platforms = savedContent
      .map(item => item.platform || 'Unknown')
      .filter((value, index, self) => self.indexOf(value) === index);
    return platforms;
  }, [savedContent]);

  const availableContentTypes = useMemo(() => {
    const types = savedContent
      .map(item => item.templateType || 'Unknown')
      .filter((value, index, self) => self.indexOf(value) === index);
    return types;
  }, [savedContent]);

  const availableTags = useMemo(() => {
    const allTags = savedContent.flatMap(item => item.tags || []);
    return Array.from(new Set(allTags));
  }, [savedContent]);

  const filteredContent = useMemo(() => {
    return savedContent.filter(item => {
      // Search filter
      const matchesSearch = filters.search ? 
        (item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
         item.content.some(c => c.toLowerCase().includes(filters.search.toLowerCase()))) : true;
      
      // Platform filter
      const matchesPlatform = filters.platform ? 
        (item.platform === filters.platform) : true;
      
      // Content type filter
      const matchesContentType = filters.contentType ? 
        (item.templateType === filters.contentType) : true;
      
      // Date range filter
      let matchesDateRange = true;
      if (filters.dateRange.from) {
        const itemDate = new Date(item.createdAt);
        if (filters.dateRange.from && itemDate < filters.dateRange.from) {
          matchesDateRange = false;
        }
        if (filters.dateRange.to && itemDate > filters.dateRange.to) {
          matchesDateRange = false;
        }
      }
      
      // Tags filter
      const matchesTags = filters.tags.length > 0 ? 
        filters.tags.every(tag => item.tags.includes(tag)) : true;
      
      return matchesSearch && matchesPlatform && matchesContentType && matchesDateRange && matchesTags;
    }).sort((a, b) => {
      // Sorting
      if (filters.sortBy === 'date') {
        return filters.sortOrder === 'asc' ? 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() : 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      
      if (filters.sortBy === 'title') {
        return filters.sortOrder === 'asc' ? 
          a.title.localeCompare(b.title) : 
          b.title.localeCompare(a.title);
      }
      
      if (filters.sortBy === 'platform') {
        return filters.sortOrder === 'asc' ? 
          (a.platform || '').localeCompare(b.platform || '') : 
          (b.platform || '').localeCompare(a.platform || '');
      }
      
      return 0;
    });
  }, [savedContent, filters]);

  const handleEdit = async (id: string, newTitle: string) => {
    setIsLoading(true);
    try {
      updateContent(id, { title: newTitle });
      showSuccess("Content Updated", "Content title has been updated successfully.");
    } catch (error) {
      showError("Update Failed", "There was an error updating the content.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      deleteContent(id);
      showSuccess("Content Deleted", "The content has been deleted successfully.");
    } catch (error) {
      showError("Delete Failed", "There was an error deleting the content.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    setIsLoading(true);
    try {
      duplicateContent(id);
      showSuccess("Content Duplicated", "A copy of the content has been created.");
    } catch (error) {
      showError("Duplication Failed", "There was an error duplicating the content.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = (content: any) => {
    try {
      const dataStr = JSON.stringify(content, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${content.title}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showSuccess("Export Successful", "Content has been exported successfully.");
    } catch (error) {
      showError("Export Failed", "There was an error exporting the content.");
    }
  };

  const navigateToCreate = () => {
    window.location.hash = '#create';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Library</h1>
        <p className="text-gray-600">Manage all your saved content in one place</p>
      </div>

      {/* Enhanced Filters */}
      <ContentFiltersComponent 
        filters={filters}
        onFiltersChange={updateFilters}
        availablePlatforms={availablePlatforms}
        availableContentTypes={availableContentTypes}
        availableTags={availableTags}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        resultCount={filteredContent.length}
        totalCount={savedContent.length}
      />

      {/* Loading State */}
      <EnhancedLoadingState 
        isLoading={isLoading}
        message="Processing your request..."
        showProgress={false}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="saved">Saved Content ({savedContent.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="mt-6">
          {filteredContent.length === 0 ? (
            <EmptyState
              icon={savedContent.length > 0 ? Search : FileText}
              title={savedContent.length > 0 ? "No content found" : "No saved content yet"}
              description={
                savedContent.length > 0
                  ? "Try adjusting your search terms or filters to find what you're looking for."
                  : "Start creating content to build your library. All your generated posts will be saved here automatically."
              }
              actionLabel={savedContent.length > 0 ? "Clear Filters" : "Create Your First Post"}
              onAction={savedContent.length > 0 ? () => updateFilters({ search: '', platform: '', contentType: '', dateRange: {}, tags: [] }) : navigateToCreate}
              variant="centered"
            />
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredContent.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                      <Badge variant="secondary">{item.templateType}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Created {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-gray-700 line-clamp-3">
                        {item.content[0] || "No content preview available"}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item.id, prompt("New title:") || item.title)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDuplicate(item.id)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExport(item)}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="drafts">
          <EmptyState
            icon={Archive}
            title="No drafts yet"
            description="Your draft content will appear here. Save incomplete posts as drafts to finish them later."
            actionLabel="Create New Draft"
            onAction={navigateToCreate}
            variant="centered"
          />
        </TabsContent>

        <TabsContent value="published">
          <EmptyState
            icon={Send}
            title="No published content"
            description="Content you've published to social media platforms will be tracked here."
            actionLabel="Publish Your First Post"
            onAction={navigateToCreate}
            variant="centered"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
