import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, CalendarProps } from '@breeffy/react-native-calendar';
import type { CalendarMethods } from '@breeffy/react-native-calendar';
import type { ViewStyleProp } from '../../../../src/types';

export type CalendarSheetProps = {
  scrollEnabled?: boolean;
  onDaySelectionChange?: CalendarProps['onDaySelectionChange'];
} & ViewStyleProp;

export const CalendarSheet = ({
  style,
  onDaySelectionChange
}: CalendarSheetProps) => {
  const calendarRef = useRef<CalendarMethods>(null);

  return (
    <View style={[styles.container, style]}>
      <Calendar
        style={styles.calendar}
        ref={calendarRef}
        selectionMode="singleDay"
        scrollMode="multipleMonths"
        scrollModeDeceleration="fast"
        monthsBefore={12}
        monthsAfter={24}
        onDaySelectionChange={onDaySelectionChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  calendar: {}
});
