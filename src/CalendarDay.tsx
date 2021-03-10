import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMemoOne } from 'use-memo-one';
import { Circle } from './components/Svg';
import { dayOfWeekWidth } from './constants';
import { calendarDayThemeToTextStyle } from './helpers';
import { useCalendarTheme } from './hooks/useCalendarTheme';
import type { ViewStyleProp } from './types';

export enum CalendarDayKind {
  DEFAULT,
  ACTIVE,
  SELECTED,
  DISABLED
}

export type CalendarDayProps = {
  kind?: CalendarDayKind;
  day: number;
} & ViewStyleProp;

export const CalendarDay = ({
  kind = CalendarDayKind.DEFAULT,
  day,
  style
}: CalendarDayProps) => {
  // console.log(`CalendarDay: kind: ${kind}, day: ${day}`);
  const theme = useCalendarTheme();
  const calendarDayTheme = useMemoOne(() => {
    switch (kind) {
      case CalendarDayKind.DEFAULT:
        return theme.day.default;
      case CalendarDayKind.DISABLED:
        return theme.day.disabled;
      case CalendarDayKind.ACTIVE:
        return theme.day.active;
      case CalendarDayKind.SELECTED:
        return theme.day.selected;
    }
  }, [kind, theme]);

  const containerStyle = useMemoOne(() => {
    return [styles.container, style];
  }, [styles.container, style]);

  const textStyle = useMemoOne(() => {
    return [styles.text, calendarDayThemeToTextStyle(calendarDayTheme)];
  }, [styles.text, calendarDayTheme]);

  return (
    <View style={containerStyle}>
      {kind === CalendarDayKind.SELECTED && (
        <Circle color={calendarDayTheme.circleColor} style={styles.circle} />
      )}
      <Text style={textStyle}>{String(day)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dayOfWeekWidth,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    position: 'absolute'
  },
  text: {
    flexGrow: 1,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
