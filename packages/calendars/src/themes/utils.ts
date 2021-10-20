import type { CalendarDayTheme } from '../types/theme';

export const makeCalendarDayTheme =
  (calendarDayTheme: Omit<CalendarDayTheme, 'textColor'>) =>
  (textColor: string): CalendarDayTheme => {
    return { ...calendarDayTheme, textColor };
  };
