'use client';

import { createContext, useState, ReactNode } from 'react';

// Define the interface for the context
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context with an empty object as default (but properly typed)
export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

// DarkModeProvider component to wrap around the app
export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
