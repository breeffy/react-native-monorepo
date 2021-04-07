import { DateTime } from 'luxon';
import Animated, { Extrapolate } from 'react-native-reanimated';
import type { Interval } from 'luxon';

/** At least two numbers are required for interpolation */
export type InterpolateNumbers = [number, ...number[], number];
export type InterpolateInput = InterpolateNumbers;
export type InterpolateOutput = InterpolateNumbers;

export type InterpolateConfig = [
  input: InterpolateInput,
  output: InterpolateOutput,
  type?: Animated.Extrapolate | undefined
];

function isInterpolateNumbers(array: number[]): array is InterpolateNumbers {
  return array.length >= 2;
}

export const range = (
  start: number,
  end: number,
  inclusiveEnd: boolean | undefined = false
): number[] => {
  const size = end - start + (inclusiveEnd ? 1 : 0);
  return Array<number>(size)
    .fill(0)
    .map((_, index) => {
      return start + index;
    });
};

export const getMonthInterpolateConfig = (
  start: number,
  end: number,
  height: number
): InterpolateConfig => {
  // console.log(
  //   `getMonthInterpolateConfig: ${JSON.stringify({ start, end, height })}`
  // );
  const input: InterpolateInput = [start, end];
  const output: InterpolateOutput = [0, height * (end - start)];
  return [input, output, Extrapolate.CLAMP];
};

export const getYearInterpolateConfig = (
  start: number,
  end: number,
  height: number
): InterpolateConfig => {
  const input: number[] = [];
  const output: number[] = [];
  const type = Extrapolate.CLAMP;

  let currentOffsetY = 0;
  let prevIsDecember = false;
  for (let i = start; i <= end; ++i) {
    const isDecember = i % 12 === 0;

    if (i === start) {
      // Always add zero offset for first month
      input.push(i);
      output.push(0);
    }

    if (isDecember || i === end) {
      input.push(i);
      output.push(currentOffsetY);
      prevIsDecember = true;
    } else if (prevIsDecember) {
      currentOffsetY += height;
      input.push(i);
      output.push(currentOffsetY);
      prevIsDecember = false;
    }
  }

  if (input.length === output.length) {
    if (isInterpolateNumbers(input) && isInterpolateNumbers(output)) {
      return [input, output, type];
    }
  }

  throw new Error(
    `failed to calculate month interpolation config: input [${JSON.stringify(
      input
    )}], output [${JSON.stringify(output)}], type [${type}]`
  );
};

export const getStartOfEveryMonth = (
  calendarInterval: Interval
): DateTime[] => {
  return calendarInterval
    .splitBy({ month: 1 })
    .map((monthInterval) => monthInterval.start);
};

export const getUniqueYearsInInterval = (
  calendarInterval: Interval
): DateTime[] => {
  const uniqueYears = getStartOfEveryMonth(calendarInterval).map(
    (dt) => dt.year
  );
  return Array.from(new Set(uniqueYears)).map((year) => {
    return DateTime.fromObject({ year });
  });
};
