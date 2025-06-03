
import React, { useEffect, useRef } from 'react';

interface HeatmapPoint {
  x: number;
  y: number;
  timestamp: number;
  element?: string;
}

interface HeatmapTrackerProps {
  enabled?: boolean;
  sampleRate?: number;
}

export const HeatmapTracker = ({ enabled = true, sampleRate = 0.1 }: HeatmapTrackerProps) => {
  const pointsRef = useRef<HeatmapPoint[]>([]);

  useEffect(() => {
    if (!enabled || Math.random() > sampleRate) return;

    const handleClick = (e: MouseEvent) => {
      const point: HeatmapPoint = {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
        element: (e.target as HTMLElement)?.tagName || 'unknown'
      };

      pointsRef.current.push(point);
      
      // Store in localStorage (simplified)
      const stored = JSON.parse(localStorage.getItem('heatmap_data') || '[]');
      stored.push(point);
      localStorage.setItem('heatmap_data', JSON.stringify(stored.slice(-100)));

      console.log('Heatmap click tracked:', point);
    };

    const handleScroll = () => {
      const scrollData = {
        scrollY: window.scrollY,
        maxScroll: document.documentElement.scrollHeight - window.innerHeight,
        timestamp: Date.now()
      };

      const stored = JSON.parse(localStorage.getItem('scroll_data') || '[]');
      stored.push(scrollData);
      localStorage.setItem('scroll_data', JSON.stringify(stored.slice(-50)));
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled, sampleRate]);

  return null; // This is a tracking component with no UI
};
