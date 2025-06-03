
import { useCallback, useEffect } from 'react';
import { useAppState } from '@/contexts/AppStateContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSubscription } from '@/hooks/useSubscription';

export const useAppStateManager = () => {
  const { state, dispatch } = useAppState();
  const isMobile = useIsMobile();
  const { postsUsedThisMonth, monthlyPostsLimit } = useSubscription();

  // Sync mobile state
  useEffect(() => {
    dispatch({ type: 'SET_MOBILE', payload: isMobile });
  }, [isMobile, dispatch]);

  // Sync usage data
  useEffect(() => {
    dispatch({ 
      type: 'UPDATE_USAGE', 
      payload: { used: postsUsedThisMonth, limit: monthlyPostsLimit } 
    });
  }, [postsUsedThisMonth, monthlyPostsLimit, dispatch]);

  // Navigation management
  const setCurrentRoute = useCallback((route: string) => {
    dispatch({ type: 'SET_ROUTE', payload: route });
  }, [dispatch]);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, [dispatch]);

  // User preferences
  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  }, [dispatch]);

  const setLanguage = useCallback((language: string) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  }, [dispatch]);

  const toggleAutoSave = useCallback(() => {
    dispatch({ type: 'TOGGLE_AUTO_SAVE' });
  }, [dispatch]);

  // Notifications
  const addNotification = useCallback((type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type, message } });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: '' });
    }, 5000);
  }, [dispatch]);

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  }, [dispatch]);

  // Computed values
  const canGenerateMore = state.postsUsedThisMonth < state.monthlyPostsLimit;
  const postsRemaining = Math.max(0, state.monthlyPostsLimit - state.postsUsedThisMonth);

  return {
    // State
    isMobile: state.isMobile,
    currentRoute: state.currentRoute,
    sidebarOpen: state.sidebarOpen,
    theme: state.theme,
    language: state.language,
    autoSave: state.autoSave,
    notifications: state.notifications,
    canGenerateMore,
    postsRemaining,
    
    // Actions
    setCurrentRoute,
    toggleSidebar,
    setTheme,
    setLanguage,
    toggleAutoSave,
    addNotification,
    removeNotification
  };
};
