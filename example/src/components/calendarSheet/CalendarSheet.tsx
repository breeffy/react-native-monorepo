import React, { useMemo, useRef } from 'react';
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

export const CalendarSheet = ({ onDaySelectionChange }: CalendarSheetProps) => {
  const calendarRef = useRef<CalendarMethods>(null);
  const { theme } = useAppContext();
  const calendarTheme = useMemo(() => {
    return theme === 'light' ? CalendarThemeLight : CalendarThemeDark;
  }, [theme]);

  return (
    <Calendar
      ref={calendarRef}
      selectionMode="singleDay"
      scrollMode="multipleMonths"
      scrollModeDeceleration="fast"
      monthsBefore={12}
      monthsAfter={24}
      theme={calendarTheme}
      onDaySelectionChange={onDaySelectionChange}
    />
  );
};
