import type { CalendarDayTheme } from 'src/types';

export const makeCalendarDayTheme = (
  calendarDayTheme: Omit<CalendarDayTheme, 'textColor'>
) => (textColor: string): CalendarDayTheme => {
  return { ...calendarDayTheme, textColor };
};

export const deepFreeze = <T extends { [key: string]: any }>(object: T) => {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
};
