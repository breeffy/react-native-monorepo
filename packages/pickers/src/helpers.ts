import type { TextStyle } from 'react-native';
import type { PickerItemTheme, PickerTextTheme } from './types/pickerTheme';

export const textThemeToTextStyle = (textTheme: PickerTextTheme): TextStyle => {
  return {
    fontFamily: textTheme.textFont,
    fontWeight: textTheme.textWeight,
    fontSize: textTheme.textSize,
    color: textTheme.textColor
  };
};

export const pickerItemThemeToTextStyle = (
  textTheme: PickerItemTheme
): TextStyle => {
  return {
    fontFamily: textTheme.textFont,
    fontWeight: textTheme.textWeight,
    fontSize: textTheme.textSize,
    color: textTheme.textColor,
    backgroundColor: textTheme.textBackgroundColor
  };
};
