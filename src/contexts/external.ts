import { createContext } from 'react';
import type { CalendarMethods } from '../types';

// @ts-expect-error
export const CalendarContext = createContext<CalendarMethods>();
export const CalendarProvider = CalendarContext.Provider;
