import React, { useRef } from 'react';
import { Calendar, CalendarProps } from '@breeffy/react-native-calendar';
import type { CalendarMethods } from '@breeffy/react-native-calendar';
import type { ViewStyleProp } from '../../../../src/types';

export type CalendarSheetProps = {
  scrollEnabled?: boolean;
  onDaySelectionChange?: CalendarProps['onDaySelectionChange'];
} & ViewStyleProp;

export const CalendarSheet = ({ onDaySelectionChange }: CalendarSheetProps) => {
  const calendarRef = useRef<CalendarMethods>(null);

  return (
    <Calendar
      ref={calendarRef}
      selectionMode="singleDay"
      scrollMode="multipleMonths"
      scrollModeDeceleration="fast"
      monthsBefore={12}
      monthsAfter={24}
      onDaySelectionChange={onDaySelectionChange}
    />
  );
};
