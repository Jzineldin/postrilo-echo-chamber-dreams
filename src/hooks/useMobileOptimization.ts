
import { useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const useMobileOptimization = () => {
  const isMobile = useIsMobile();

  const getOptimizedProps = useCallback((baseProps: any) => {
    if (isMobile) {
      return {
        ...baseProps,
        autoFocus: false,
        inputMode: baseProps.type === 'number' ? 'numeric' : 'text',
      };
    }
    return baseProps;
  }, [isMobile]);

  const getMobileStyles = useCallback(() => {
    if (isMobile) {
      return {
        fontSize: '16px',
        WebkitAppearance: 'none' as const,
      };
    }
    return {};
  }, [isMobile]);

  const getOptimizedClassName = useCallback((baseClasses: string) => {
    if (isMobile) {
      return `${baseClasses} touch-manipulation`;
    }
    return baseClasses;
  }, [isMobile]);

  const settings = {
    enableVirtualKeyboard: !isMobile,
    touchOptimization: isMobile,
    touchOptimized: isMobile
  };

  return {
    isMobile,
    getOptimizedProps,
    getMobileStyles,
    getOptimizedClassName,
    settings,
  };
};
