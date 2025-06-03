
import { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from './use-mobile';

interface GestureState {
  isActive: boolean;
  startPosition: { x: number; y: number } | null;
  currentPosition: { x: number; y: number } | null;
  deltaX: number;
  deltaY: number;
}

interface UseMobileGesturesOptions {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onLongPress?: () => void;
  longPressDelay?: number;
}

export const useMobileGestures = (options: UseMobileGesturesOptions = {}) => {
  const {
    threshold = 50,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onLongPress,
    longPressDelay = 500
  } = options;

  const isMobile = useIsMobile();
  const [gestureState, setGestureState] = useState<GestureState>({
    isActive: false,
    startPosition: null,
    currentPosition: null,
    deltaX: 0,
    deltaY: 0
  });

  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    const startPosition = { x: touch.clientX, y: touch.clientY };

    setGestureState({
      isActive: true,
      startPosition,
      currentPosition: startPosition,
      deltaX: 0,
      deltaY: 0
    });

    // Start long press timer
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        onLongPress();
        clearLongPressTimer();
      }, longPressDelay);
    }
  }, [onLongPress, longPressDelay, clearLongPressTimer]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    const currentPosition = { x: touch.clientX, y: touch.clientY };

    setGestureState(prev => {
      if (!prev.startPosition) return prev;

      const deltaX = currentPosition.x - prev.startPosition.x;
      const deltaY = currentPosition.y - prev.startPosition.y;

      // Cancel long press if moved too much
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        clearLongPressTimer();
      }

      return {
        ...prev,
        currentPosition,
        deltaX,
        deltaY
      };
    });
  }, [clearLongPressTimer]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    clearLongPressTimer();

    setGestureState(prev => {
      if (!prev.startPosition || !prev.currentPosition) return prev;

      const absX = Math.abs(prev.deltaX);
      const absY = Math.abs(prev.deltaY);

      // Check for tap
      if (absX < 10 && absY < 10 && onTap) {
        onTap();
      }
      // Check for swipe
      else if (Math.max(absX, absY) >= threshold) {
        if (absX > absY) {
          // Horizontal swipe
          if (prev.deltaX > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (prev.deltaX < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
        } else {
          // Vertical swipe
          if (prev.deltaY > 0 && onSwipeDown) {
            onSwipeDown();
          } else if (prev.deltaY < 0 && onSwipeUp) {
            onSwipeUp();
          }
        }
      }

      return {
        isActive: false,
        startPosition: null,
        currentPosition: null,
        deltaX: 0,
        deltaY: 0
      };
    });
  }, [threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, clearLongPressTimer]);

  useEffect(() => {
    if (!isMobile || !elementRef.current) return;

    const element = elementRef.current;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      clearLongPressTimer();
    };
  }, [isMobile, handleTouchStart, handleTouchMove, handleTouchEnd, clearLongPressTimer]);

  const bindToElement = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
  }, []);

  return {
    gestureState,
    bindToElement,
    isMobile
  };
};
