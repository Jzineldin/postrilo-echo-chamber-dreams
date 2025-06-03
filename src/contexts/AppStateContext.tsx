
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AppState {
  // UI state
  isMobile: boolean;
  currentRoute: string;
  sidebarOpen: boolean;
  
  // User preferences
  theme: 'light' | 'dark' | 'system';
  language: string;
  autoSave: boolean;
  
  // Usage tracking
  postsUsedThisMonth: number;
  monthlyPostsLimit: number;
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: number;
  }>;
}

type AppStateAction =
  | { type: 'SET_MOBILE'; payload: boolean }
  | { type: 'SET_ROUTE'; payload: string }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'TOGGLE_AUTO_SAVE' }
  | { type: 'UPDATE_USAGE'; payload: { used: number; limit: number } }
  | { type: 'ADD_NOTIFICATION'; payload: { type: 'success' | 'error' | 'warning' | 'info'; message: string } }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const initialState: AppState = {
  isMobile: false,
  currentRoute: 'dashboard',
  sidebarOpen: true,
  theme: 'system',
  language: 'en',
  autoSave: true,
  postsUsedThisMonth: 0,
  monthlyPostsLimit: 5,
  notifications: []
};

function appStateReducer(state: AppState, action: AppStateAction): AppState {
  switch (action.type) {
    case 'SET_MOBILE':
      return { ...state, isMobile: action.payload };
    
    case 'SET_ROUTE':
      return { ...state, currentRoute: action.payload };
    
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    
    case 'TOGGLE_AUTO_SAVE':
      return { ...state, autoSave: !state.autoSave };
    
    case 'UPDATE_USAGE':
      return {
        ...state,
        postsUsedThisMonth: action.payload.used,
        monthlyPostsLimit: action.payload.limit
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: Math.random().toString(36).substr(2, 9),
            ...action.payload,
            timestamp: Date.now()
          }
        ]
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    default:
      return state;
  }
}

const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppStateAction>;
} | null>(null);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);
  
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};
