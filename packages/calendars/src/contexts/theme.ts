import { createContext } from 'react';
import type { CalendarTheme } from '../types';

// @ts-expect-error
export const CalendarThemeContext = createContext<CalendarTheme>();
export const CalendarThemeProvider = CalendarThemeContext.Provider;
