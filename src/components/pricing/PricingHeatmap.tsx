
import { useEffect, useRef } from "react";

interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
  timestamp: number;
}

export const PricingHeatmap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heatmapData = useRef<HeatmapPoint[]>([]);

  useEffect(() => {
    // Disable heatmap in production to prevent visual interference
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    let animationFrame: number;

    const trackMouseMovement = (e: MouseEvent) => {
      const point: HeatmapPoint = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
        intensity: 1,
        timestamp: Date.now()
      };

      heatmapData.current.push(point);
      
      // Keep only recent data (last 5 minutes)
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      heatmapData.current = heatmapData.current.filter(p => p.timestamp > fiveMinutesAgo);
    };

    const trackClicks = (e: MouseEvent) => {
      const point: HeatmapPoint = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
        intensity: 5, // Higher intensity for clicks
        timestamp: Date.now()
      };

      heatmapData.current.push(point);

      // Track click analytics
      const target = e.target as HTMLElement;
      const planCard = target.closest('[data-pricing-card]');
      const planName = planCard?.getAttribute('data-plan');
      
      if (planName) {
        console.log('Click tracked on plan:', planName, { x: point.x, y: point.y });
      }
    };

    const drawHeatmap = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${document.documentElement.scrollHeight}px`;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw in development mode and with reduced opacity
      if (process.env.NODE_ENV === 'development') {
        heatmapData.current.forEach(point => {
          const age = Date.now() - point.timestamp;
          const maxAge = 5 * 60 * 1000; // 5 minutes
          const opacity = Math.max(0, 1 - age / maxAge);

          if (opacity > 0) {
            const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 15);
            gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * point.intensity * 0.02})`);
            gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(point.x - 15, point.y - 15, 30, 30);
          }
        });
      }

      animationFrame = requestAnimationFrame(drawHeatmap);
    };

    // Only add event listeners in development
    if (process.env.NODE_ENV === 'development') {
      document.addEventListener('mousemove', trackMouseMovement);
      document.addEventListener('click', trackClicks);
      animationFrame = requestAnimationFrame(drawHeatmap);
    }

    return () => {
      document.removeEventListener('mousemove', trackMouseMovement);
      document.removeEventListener('click', trackClicks);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Don't render canvas in production
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-50 opacity-10"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};
