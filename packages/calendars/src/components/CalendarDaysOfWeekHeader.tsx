import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { dayOfWeekWidth } from '../constants';
import { calendarDaysOfWeekToTextStyle } from '../helpers';
import { useCalendarTheme } from '../hooks';
import { SvgLine } from './shapes';

interface DayOfWeek {
  id: string;
  name: string;
}

const DaysOfWeek: DayOfWeek[] = [
  { id: '0', name: 'Mon' },
  { id: '1', name: 'Tue' },
  { id: '2', name: 'Wed' },
  { id: '3', name: 'Thu' },
  { id: '4', name: 'Fri' },
  { id: '5', name: 'Sat' },
  { id: '6', name: 'Sun' }
];

export interface CalendarDaysOfWeekHeaderProps {
  showBottomLine?: boolean;
}

export const CalendarDaysOfWeekHeader = ({
  showBottomLine = true
}: CalendarDaysOfWeekHeaderProps) => {
  const theme = useCalendarTheme();
  const textStyle = useMemo(
    () => [styles.rowText, calendarDaysOfWeekToTextStyle(theme.daysOfWeek)],
    [styles.rowText, theme]
  );

  return (
    <>
      <View style={styles.container}>
        {DaysOfWeek.map((dayOfWeek, _) => {
          return (
            <View key={dayOfWeek.id} style={styles.rowView}>
              <Text style={textStyle}>{dayOfWeek.name}</Text>
            </View>
          );
        })}
      </View>
      {showBottomLine && (
        <SvgLine
          color={theme.lineDelimiter.lineColor}
          width={theme.lineDelimiter.lineWidth}
          style={styles.line}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 16,
    marginRight: 16
  },
  rowView: {
    width: dayOfWeekWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowText: {
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  line: {
    marginTop: 4
  }
});
