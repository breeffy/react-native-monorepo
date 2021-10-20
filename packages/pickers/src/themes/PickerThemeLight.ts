import { deepFreeze } from '@breeffy/utils';
import type {
  PickerItemTheme,
  PickerLineDelimiterTheme,
  PickerTheme
} from '../types/pickerTheme';

const pickerItemTheme: PickerItemTheme = {
  textFont: 'Gilroy-Medium',
  textSize: 32,
  textColor: 'rgba(68, 82, 95, 0.9)',
  textBackgroundColor: 'transparent'
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
    color: 'transparent'
  }
});
