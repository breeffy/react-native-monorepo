import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Line } from './Svg';
import { dayOfWeekWidth } from '../constants';

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
  return (
    <>
      <View style={styles.container}>
        {DaysOfWeek.map((dayOfWeek, _) => {
          return (
            <View key={dayOfWeek.id} style={styles.rowView}>
              <Text style={styles.rowText}>{dayOfWeek.name}</Text>
            </View>
          );
        })}
      </View>
      {showBottomLine && <Line style={styles.line} />}
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
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 14,
    color: 'rgba(68, 82, 95, 0.4)',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  line: {
    marginTop: 4
  }
});
