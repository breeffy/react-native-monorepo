import { createContext } from 'react';
import type { Interval } from 'luxon';
import type { CalendarDayKind } from 'src/CalendarDay';
import type {
  CalendarDate,
  CalendarYearAndMonth,
  CalendarCurrentAnimatedMonthFromCommonEra
} from '../types';

export interface CalendarInternalContextInterface {
  activeAnimatedMonth: CalendarCurrentAnimatedMonthFromCommonEra;
  activeCalendarDay: CalendarDate;
  activeCalendarYearAndMonth: CalendarYearAndMonth;
  startCalendarYearAndMonth: CalendarYearAndMonth;
  endCalendarYearAndMonth: CalendarYearAndMonth;
  calendarInterval: Interval;
  selectDate: (day: CalendarDate) => void;
  deselectDate: (day: CalendarDate) => void;
  onCalendarDayStateChange: (day: CalendarDate, kind: CalendarDayKind) => void;
  selectedDates: CalendarDate[];
  monthsBefore: number;
  monthsAfter: number;
}

// @ts-expect-error
export const CalendarInternalContext = createContext<CalendarInternalContextInterface>();
export const CalendarInternalProvider = CalendarInternalContext.Provider;
