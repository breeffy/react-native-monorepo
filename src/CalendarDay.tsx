import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { useMemoOne } from 'use-memo-one';
import { SvgCircle } from './components/shapes';
import { dayOfWeekWidth } from './constants';
import { calendarDayThemeToTextStyle } from './helpers';
import { useCalendarTheme } from './hooks/useCalendarTheme';

export enum CalendarDayKind {
  DEFAULT,
  ACTIVE,
  SELECTED,
  DISABLED
}

export type CalendarDayProps = {
  kind?: CalendarDayKind;
  day: number;
  style?: StyleProp<TextStyle>;
};

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

  const textStyle = useMemoOne(() => {
    return [
      styles.container,
      styles.text,
      calendarDayThemeToTextStyle(calendarDayTheme),
      style
    ];
  }, [calendarDayTheme]);

  const circleStyle = useMemoOne(() => [styles.container, styles.circle], []);

  return (
    <>
      <Text style={textStyle}>{String(day)}</Text>
      {kind === CalendarDayKind.SELECTED && (
        <SvgCircle color={calendarDayTheme.circleColor} style={circleStyle} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dayOfWeekWidth,
    height: 38
  },
  circle: {
    position: 'absolute',
    alignItems: 'center'
  },
  text: {
    flexGrow: 1,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
