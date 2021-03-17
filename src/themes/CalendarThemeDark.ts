import { makeCalendarDayTheme, deepFreeze } from './utils';
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
  textColor: 'rgba(255, 255, 255, 0.4)'
};

const calendarDayTheme: Omit<CalendarDayTheme, 'textColor'> = {
  textFont: 'Gilroy-Medium',
  textSize: 16,
  circleColor: 'rgba(255, 255, 255, 1)'
};

const calendarHeaderTheme: CalendarHeaderTheme = {
  textFont: 'Gilroy-SemiBold',
  textSize: 19,
  textColor: 'rgba(255, 255, 255, 1)'
};

const calendarLineDelimiterTheme: CalendarLineDelimiterTheme = {
  lineColor: 'rgba(255, 255, 255, 0.1)',
  lineWidth: 1
};

const factoryCalendarDayTheme = makeCalendarDayTheme(calendarDayTheme);

export const CalendarThemeDark: CalendarTheme = deepFreeze({
  sheet: {
    backgroundColor: 'rgba(68, 82, 95, 1)'
  },
  header: {
    month: calendarHeaderTheme,
    year: calendarHeaderTheme
  },
  daysOfWeek: calendarDaysOfWeekTheme,
  lineDelimiter: calendarLineDelimiterTheme,
  day: {
    default: factoryCalendarDayTheme('rgba(255, 255, 255, 1)'),
    active: factoryCalendarDayTheme('rgba(45, 154, 252, 1)'),
    selected: factoryCalendarDayTheme('rgba(45, 154, 252, 1)'),
    disabled: factoryCalendarDayTheme('rgba(255, 255, 255, 0.3)')
  }
});
