
import React, { createContext, useContext, useReducer } from 'react';

interface ContentGenerationState {
  currentFormData: any;
  isFormValid: boolean;
  isGenerating: boolean;
  generationProgress: number;
  generatedContent: any;
  contentHistory: any[];
  lastError: any;
  activeTab: string;
  showAdvancedSettings: boolean;
}

interface ContentGenerationAction {
  type: string;
  payload?: any;
}

const initialState: ContentGenerationState = {
  currentFormData: {},
  isFormValid: false,
  isGenerating: false,
  generationProgress: 0,
  generatedContent: null,
  contentHistory: [],
  lastError: null,
  activeTab: 'form',
  showAdvancedSettings: false
};

const ContentGenerationContext = createContext<{
  state: ContentGenerationState;
  dispatch: React.Dispatch<ContentGenerationAction>;
} | undefined>(undefined);

function contentGenerationReducer(state: ContentGenerationState, action: ContentGenerationAction): ContentGenerationState {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return { ...state, currentFormData: { ...state.currentFormData, ...action.payload } };
    case 'SET_FORM_VALIDITY':
      return { ...state, isFormValid: action.payload };
    case 'START_GENERATION':
      return { ...state, isGenerating: true, lastError: null };
    case 'GENERATION_SUCCESS':
      return { ...state, isGenerating: false, generatedContent: action.payload };
    case 'GENERATION_ERROR':
      return { ...state, isGenerating: false, lastError: action.payload };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'TOGGLE_ADVANCED_SETTINGS':
      return { ...state, showAdvancedSettings: !state.showAdvancedSettings };
    case 'CLEAR_ERROR':
      return { ...state, lastError: null };
    case 'RESET_GENERATION_STATE':
      return { ...state, isGenerating: false, generatedContent: null, lastError: null };
    default:
      return state;
  }
}

export const ContentGenerationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(contentGenerationReducer, initialState);

  return (
    <ContentGenerationContext.Provider value={{ state, dispatch }}>
      {children}
    </ContentGenerationContext.Provider>
  );
};

export const useContentGenerationContext = () => {
  const context = useContext(ContentGenerationContext);
  if (context === undefined) {
    throw new Error('useContentGenerationContext must be used within a ContentGenerationProvider');
  }
  return context;
};
