import type { ComponentProps } from 'react';
import type { TextStyle } from 'react-native';
import type { Circle, Line } from 'react-native-svg';

type TextColor = NonNullable<TextStyle['color']>;
type TextFont = NonNullable<TextStyle['fontFamily']>;
type TextSize = NonNullable<TextStyle['fontSize']>;
type TextWeight = NonNullable<TextStyle['fontWeight']>;

type BackgroundColor = NonNullable<TextStyle['backgroundColor']>;
type CircleColor = NonNullable<ComponentProps<typeof Circle>['fill']>;

type LineColor = NonNullable<ComponentProps<typeof Line>['stroke']>;
type LineWidth = NonNullable<ComponentProps<typeof Line>['strokeWidth']>;

export interface CalendarTextTheme {
  textFont: TextFont;
  textSize: TextSize;
  textColor: TextColor;
  textWeight?: TextWeight;
}

export interface CalendarDayTheme extends CalendarTextTheme {
  circleColor: CircleColor;
}

export interface CalendarDaysOfWeekTheme extends CalendarTextTheme {}
export interface CalendarHeaderTheme extends CalendarTextTheme {}

export interface CalendarLineDelimiterTheme {
  lineColor: LineColor;
  lineWidth: LineWidth;
}

export interface CalendarSheetTheme {
  backgroundColor: BackgroundColor;
}

export interface CalendarTheme {
  sheet: CalendarSheetTheme;
  header: {
    month: CalendarHeaderTheme;
    year: CalendarHeaderTheme;
  };
  daysOfWeek: CalendarDaysOfWeekTheme;
  lineDelimiter: CalendarLineDelimiterTheme;
  day: {
    default: CalendarDayTheme;
    active: CalendarDayTheme;
    selected: CalendarDayTheme;
    disabled: CalendarDayTheme;
  };
}
