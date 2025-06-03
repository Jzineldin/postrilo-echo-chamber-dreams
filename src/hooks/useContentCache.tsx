
import { useState, useEffect } from 'react';

interface CachedContent {
  prompt: string;
  content: string;
  timestamp: number;
  usage: any;
}

interface ContentCacheHook {
  getCachedContent: (prompt: string) => CachedContent | null;
  setCachedContent: (prompt: string, content: string, usage: any) => void;
  clearCache: () => void;
  getCacheStats: () => { size: number; hitRate: number };
}

export const useContentCache = (): ContentCacheHook => {
  const [cache, setCache] = useState<Map<string, CachedContent>>(new Map());
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  const MAX_CACHE_SIZE = 100;

  const generateCacheKey = (prompt: string): string => {
    return btoa(prompt.toLowerCase().trim()).slice(0, 32);
  };

  const getCachedContent = (prompt: string): CachedContent | null => {
    const key = generateCacheKey(prompt);
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setHits(prev => prev + 1);
      return cached;
    }
    
    if (cached) {
      setCache(prev => {
        const newCache = new Map(prev);
        newCache.delete(key);
        return newCache;
      });
    }
    
    setMisses(prev => prev + 1);
    return null;
  };

  const setCachedContent = (prompt: string, content: string, usage: any): void => {
    const key = generateCacheKey(prompt);
    const newEntry: CachedContent = {
      prompt,
      content,
      timestamp: Date.now(),
      usage
    };

    setCache(prev => {
      const newCache = new Map(prev);
      
      // Remove oldest entries if cache is full
      if (newCache.size >= MAX_CACHE_SIZE) {
        const oldestKey = Array.from(newCache.keys())[0];
        newCache.delete(oldestKey);
      }
      
      newCache.set(key, newEntry);
      return newCache;
    });
  };

  const clearCache = (): void => {
    setCache(new Map());
    setHits(0);
    setMisses(0);
  };

  const getCacheStats = () => {
    const total = hits + misses;
    return {
      size: cache.size,
      hitRate: total > 0 ? (hits / total) * 100 : 0
    };
  };

  return {
    getCachedContent,
    setCachedContent,
    clearCache,
    getCacheStats
  };
};
