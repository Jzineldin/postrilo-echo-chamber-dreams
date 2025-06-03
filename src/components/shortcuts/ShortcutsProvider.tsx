
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ShortcutsContextType {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const ShortcutsContext = createContext<ShortcutsContextType | undefined>(undefined);

export const useShortcuts = () => {
  const context = useContext(ShortcutsContext);
  if (context === undefined) {
    throw new Error('useShortcuts must be used within a ShortcutsProvider');
  }
  return context;
};

interface ShortcutsProviderProps {
  children: React.ReactNode;
}

export const ShortcutsProvider = ({ children }: ShortcutsProviderProps) => {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!enabled) return;
      
      // Basic keyboard shortcuts - can be expanded later
      if (event.metaKey || event.ctrlKey) {
        switch (event.key) {
          case 'k':
            event.preventDefault();
            // Could open search/command palette in the future
            console.log('Keyboard shortcut: Cmd/Ctrl + K');
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);

  const value: ShortcutsContextType = {
    enabled,
    setEnabled
  };

  return (
    <ShortcutsContext.Provider value={value}>
      {children}
    </ShortcutsContext.Provider>
  );
};
