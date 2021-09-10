import { deepFreeze } from './utils';
import type {
  PickerItemTheme,
  PickerLineDelimiterTheme,
  PickerTheme
} from '../types/pickerTheme';

const pickerItemTheme: PickerItemTheme = {
  textFont: 'Gilroy-Medium',
  textSize: 24,
  textColor: 'orange',
  textBackgroundColor: 'pink'
};

const pickerLineDelimiterTheme: PickerLineDelimiterTheme = {
  lineColor: 'rgba(68, 82, 95, 0.1)',
  lineWidth: 1
};

export const PickerThemeLight: PickerTheme = deepFreeze({
  sheet: {
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  lineDelimiter: pickerLineDelimiterTheme,
  item: pickerItemTheme,
  separator: {
    size: 30,
    color: 'green'
  }
});
