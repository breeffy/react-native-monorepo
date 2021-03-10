import { deepFreeze } from '../helpers';
import type {
  CalendarTheme,
  CalendarDayTheme,
  CalendarDaysOfWeekTheme,
  CalendarHeaderTheme,
  CalendarLineDelimiterTheme
} from '../types/theme';

const calendarDaysOfWeekTheme: CalendarDaysOfWeekTheme = {
  textFont: 'Gilroy-SemiBold',
  textSize: 14,
  textColor: 'rgba(68, 82, 95, 0.4)'
};

const calendarDayTheme: Omit<CalendarDayTheme, 'textColor'> = {
  textFont: 'Gilroy-Medium',
  textSize: 16,
  circleColor: '#2D9AFC'
};

const calendarHeaderTheme: CalendarHeaderTheme = {
  textFont: 'Gilroy-SemiBold',
  textSize: 19,
  textColor: 'rgba(68, 82, 95, 0.9)'
};

const calendarLineDelimiterTheme: CalendarLineDelimiterTheme = {
  lineColor: 'rgba(68, 82, 95, 0.1)',
  lineWidth: 1
};

const makeCalendarDayTheme = (textColor: string): CalendarDayTheme => {
  return { ...calendarDayTheme, textColor };
};

export const CalendarThemeLight: CalendarTheme = deepFreeze({
  sheet: {
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  header: {
    month: calendarHeaderTheme,
    year: calendarHeaderTheme
  },
  daysOfWeek: calendarDaysOfWeekTheme,
  lineDelimiter: calendarLineDelimiterTheme,
  day: {
    default: makeCalendarDayTheme('rgba(68, 82, 95, 0.9)'),
    active: makeCalendarDayTheme('rgba(45, 154, 252, 1)'),
    selected: makeCalendarDayTheme('rgba(45, 154, 252, 1)'),
    disabled: makeCalendarDayTheme('rgba(68, 82, 95, 0.3)')
  }
});
