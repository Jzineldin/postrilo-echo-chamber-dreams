
import { useState, useCallback } from 'react';

interface ContentFilters {
  search: string;
  platform: string;
  contentType: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
  tags: string[];
  sortBy: string;
  sortOrder: string;
}

const defaultFilters: ContentFilters = {
  search: '',
  platform: '',
  contentType: '',
  dateRange: {},
  tags: [],
  sortBy: 'date',
  sortOrder: 'desc'
};

export const useContentFilters = () => {
  const [filters, setFilters] = useState<ContentFilters>(defaultFilters);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const updateFilters = useCallback((newFilters: Partial<ContentFilters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const toggleViewMode = useCallback(() => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  }, []);

  return {
    filters,
    viewMode,
    updateFilters,
    resetFilters,
    setViewMode,
    toggleViewMode
  };
};
