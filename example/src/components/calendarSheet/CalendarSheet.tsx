import React, { forwardRef, useMemo, useRef } from 'react';
import {
  Calendar,
  CalendarProps,
  CalendarThemeLight,
  CalendarThemeDark
} from '@breeffy/react-native-calendar';
import { useAppContext } from '../../hooks';
import type { CalendarMethods } from '@breeffy/react-native-calendar';
import type { ViewStyleProp } from '../../../../src/types';

export type CalendarSheetProps = {
  scrollEnabled?: boolean;
  onDaySelectionChange?: CalendarProps['onDaySelectionChange'];
} & ViewStyleProp;

export const CalendarSheet = forwardRef<CalendarMethods, CalendarSheetProps>(
  ({ onDaySelectionChange }, ref) => {
    console.log(`Calendar: ref is ${JSON.stringify(ref)}`);
    const { theme } = useAppContext();
    const calendarTheme = useMemo(() => {
      return theme === 'light' ? CalendarThemeLight : CalendarThemeDark;
    }, [theme]);

    return (
      <Calendar
        ref={ref}
        selectionMode="singleDay"
        scrollMode="multipleMonths"
        scrollModeDeceleration="fast"
        monthsBefore={12}
        monthsAfter={24}
        theme={calendarTheme}
        onDaySelectionChange={onDaySelectionChange}
      />
    );
  }
);
