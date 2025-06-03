
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Calendar as CalendarIcon,
  X,
  SlidersHorizontal 
} from "lucide-react";
import { format } from "date-fns";

interface ContentFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  availablePlatforms: string[];
  availableContentTypes: string[];
  availableTags: string[];
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  resultCount: number;
  totalCount: number;
}

export const ContentFiltersComponent = ({
  filters,
  onFiltersChange,
  availablePlatforms,
  availableContentTypes,
  availableTags,
  viewMode,
  onViewModeChange,
  resultCount,
  totalCount,
}: ContentFiltersProps) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handlePlatformChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      platform: value === "all_platforms" ? "" : value 
    });
  };

  const handleContentTypeChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      contentType: value === "all_types" ? "" : value 
    });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');
    onFiltersChange({ ...filters, sortBy, sortOrder });
  };

  const handleDateRangeChange = (range: any) => {
    onFiltersChange({ ...filters, dateRange: range || {} });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      platform: '',
      contentType: '',
      dateRange: {},
      tags: [],
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  const activeFiltersCount = [
    filters.search,
    filters.platform,
    filters.contentType,
    filters.tags?.length > 0,
    filters.dateRange?.from
  ].filter(Boolean).length;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Filters & Search
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} active
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {resultCount} of {totalCount} items
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange(viewMode === "grid" ? "list" : "grid")}
            >
              {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search content..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Platform Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Platform</label>
            <Select value={filters.platform || "all_platforms"} onValueChange={handlePlatformChange}>
              <SelectTrigger>
                <SelectValue placeholder="All platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_platforms">All platforms</SelectItem>
                {availablePlatforms.map(platform => (
                  <SelectItem key={platform} value={platform}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content Type Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Content Type</label>
            <Select value={filters.contentType || "all_types"} onValueChange={handleContentTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_types">All types</SelectItem>
                {availableContentTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Sort By</label>
            <Select 
              value={`${filters.sortBy || 'date'}-${filters.sortOrder || 'desc'}`} 
              onValueChange={handleSortChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest first</SelectItem>
                <SelectItem value="date-asc">Oldest first</SelectItem>
                <SelectItem value="title-asc">Title A-Z</SelectItem>
                <SelectItem value="title-desc">Title Z-A</SelectItem>
                <SelectItem value="platform-asc">Platform A-Z</SelectItem>
                <SelectItem value="platform-desc">Platform Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange?.from ? (
                    filters.dateRange.to ? (
                      <>
                        {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                        {format(filters.dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(filters.dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={filters.dateRange?.from}
                  selected={filters.dateRange}
                  onSelect={handleDateRangeChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Active Filters & Clear */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Search: "{filters.search}"
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handleSearchChange('')}
                  />
                </Badge>
              )}
              {filters.platform && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Platform: {filters.platform}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handlePlatformChange("all_platforms")}
                  />
                </Badge>
              )}
              {filters.contentType && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Type: {filters.contentType}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handleContentTypeChange("all_types")}
                  />
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
