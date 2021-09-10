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

export interface PickerTextTheme {
  textFont: TextFont;
  textSize: TextSize;
  textColor: TextColor;
  textWeight?: TextWeight;
}

export interface PickerSeparatorTheme {
  /**
   * Size of separator between items
   */
  size: number;
  /**
   * Color of separator between items
   */
  color: string;
}

export interface PickerItemTheme extends PickerTextTheme {
  textBackgroundColor?: BackgroundColor;
}

export interface PickerLineDelimiterTheme {
  lineColor: LineColor;
  lineWidth: LineWidth;
}

export interface PickerSheetTheme {
  backgroundColor: BackgroundColor;
}

export interface PickerTheme {
  sheet: PickerSheetTheme;
  lineDelimiter: PickerLineDelimiterTheme;
  item: PickerItemTheme;
  separator: PickerSeparatorTheme;
}
