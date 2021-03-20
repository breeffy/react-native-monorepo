import { createContext } from 'react';

export interface AppContextState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const AppContext = createContext<AppContextState | null>(null);
export const AppProvider = AppContext.Provider;
