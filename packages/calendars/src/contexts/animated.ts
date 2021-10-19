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

export const CalendarAnimatedContext =
  // @ts-expect-error
  createContext<CalendarAnimatedContextInterface>();
export const CalendarAnimatedProvider = CalendarAnimatedContext.Provider;
