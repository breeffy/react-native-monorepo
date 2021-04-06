import React, { forwardRef, useMemo } from 'react';
import {
  Calendar,
  CalendarProps,
  CalendarThemeLight,
  CalendarThemeDark
} from '@breeffy/react-native-calendar';
import { useAppContext } from '../../hooks';
import type { CalendarMethods } from '@breeffy/react-native-calendar';

export const CalendarSheet = forwardRef<CalendarMethods, CalendarProps>(
  (props, ref) => {
    const { theme } = useAppContext();
    const calendarTheme = useMemo(() => {
      return theme === 'light' ? CalendarThemeLight : CalendarThemeDark;
    }, [theme]);

    return (
      <Calendar
        ref={ref}
        monthsBefore={12}
        monthsAfter={24}
        selectionMode="singleDay"
        scrollMode="oneMonth"
        scrollModeDeceleration="fast"
        theme={calendarTheme}
        {...props}
      />
    );
  }
);
