import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { round } from 'react-native-redash';
import type {
  CalendarEndMonthFromCommonEra,
  CalendarStartMonthFromCommonEra
} from './types';

export const calculateProgress = (
  value: Animated.SharedValue<number>,
  inputRange: [number, number],
  precision: number | undefined = 4
): number => {
  'worklet';
  return round(
    interpolate(value.value, inputRange, [0, 100], Extrapolate.CLAMP),
    precision
  );
};

export const calculateScrollProgress = (
  value: Animated.SharedValue<number>,
  inputRange: [CalendarStartMonthFromCommonEra, CalendarEndMonthFromCommonEra]
) => {
  'worklet';
  return calculateProgress(value, [inputRange[0], inputRange[1] - 1]);
};
