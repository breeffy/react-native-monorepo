import { createContext } from 'react';
import type {
  CalendarCurrentAnimatedMonthFromCommonEra,
  CalendarEndMonthFromCommonEra,
  CalendarStartMonthFromCommonEra,
  CalendarAnimatedScrollProgress,
  CalendarCurrentAnimatedMonthInYear
} from '../types';

export interface CalendarAnimatedContextInterface {
  calendarAnimatedCommonEraMonth: CalendarCurrentAnimatedMonthFromCommonEra;
  calendarCurrentAnimatedMonthInYear: CalendarCurrentAnimatedMonthInYear;
  calendarStartMonthFromCommonEra: CalendarStartMonthFromCommonEra;
  calendarEndMonthFromCommonEra: CalendarEndMonthFromCommonEra;
  calendarAnimatedScrollProgress: CalendarAnimatedScrollProgress;
}

// @ts-expect-error
export const CalendarAnimatedContext = createContext<CalendarAnimatedContextInterface>();
export const CalendarAnimatedProvider = CalendarAnimatedContext.Provider;
