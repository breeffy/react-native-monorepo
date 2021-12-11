import { createContext } from 'react';
import type { Interval } from 'luxon';
import type {
  CalendarDate,
  CalendarYearAndMonth,
  CalendarCurrentAnimatedMonthFromCommonEra,
  CalendarDisabledRange
} from '../types';
import type { CalendarDayKind } from '../CalendarDay';

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
  disabledDateRanges: CalendarDisabledRange[];
  monthsBefore: number;
  monthsAfter: number;
}

export const CalendarInternalContext =
  // @ts-expect-error
  createContext<CalendarInternalContextInterface>();
export const CalendarInternalProvider = CalendarInternalContext.Provider;
