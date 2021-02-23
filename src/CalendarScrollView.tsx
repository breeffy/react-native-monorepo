import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useDerivedValue
} from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import { ScrollState } from './constants';
import { calendarYearAndMonthToMonths } from './helpers';
import { useCalendarAnimated } from './hooks/useCalendarAnimated';
import { useCalendarInternal } from './hooks/useCalendarInternal';
import { useCalendarScroll } from './hooks/useCalendarScrollView';
import type BaseScrollView from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView';
import type { ScrollViewDefaultProps } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView';

export const CalendarScrollView = React.forwardRef<
  ScrollViewDefaultProps,
  BaseScrollView
>(({ children, onScroll, ...props }, ref) => {
  console.log(
    `ScrollViewWithHeader: passed props: ${Object.getOwnPropertyNames(props)}`
  );

  const {
    startCalendarYearAndMonth,
    endCalendarYearAndMonth
  } = useCalendarInternal();

  const { calendarAnimatedCommonEraMonth } = useCalendarAnimated();

  const {
    scrollHandler,
    scrollState,
    scrollContentOffset,
    scrollContentSize,
    scrollLayoutMeasurement,
    scrollVelocity
  } = useCalendarScroll();

  const [
    startCalendarMonthsFromEra,
    endCalendarMonthsFromEra
  ] = useMemoOne(() => {
    return [
      calendarYearAndMonthToMonths(startCalendarYearAndMonth),
      calendarYearAndMonthToMonths(endCalendarYearAndMonth)
    ] as const;
  }, [startCalendarYearAndMonth, endCalendarYearAndMonth]);

  useDerivedValue(() => {
    if (scrollState.value !== ScrollState.UNDETERMINED) {
      // console.log(`!!!!! scrollState: ${scrollState.value}`);
      // console.log(
      //   `calendarAnimatedCommonEraMonth: ${calendarAnimatedCommonEraMonth}`
      // );
      calendarAnimatedCommonEraMonth.value = interpolate(
        scrollContentOffset.value.x,
        [0, scrollContentSize.value.width],
        [startCalendarMonthsFromEra, endCalendarMonthsFromEra],
        Extrapolate.CLAMP
      );
    }
  }, [startCalendarMonthsFromEra, endCalendarMonthsFromEra]);

  // useAnimatedReaction(
  //   () => {
  //     console.log(
  //       `useAnimatedReaction: scrollContentOffset.value.x: ${JSON.stringify(
  //         scrollContentOffset.value
  //       )}`
  //     );

  //     scrollContentOffset.value !== null ? interpolate(
  //       scrollContentOffset.value.x,
  //       [0, scrollContentSize.value.width],
  //       [startCalendarMonthsFromEra, endCalendarMonthsFromEra],
  //       Extrapolate.CLAMP
  //     ) :
  //   },
  //   (currentMonthsFromCalendarEra) => {
  //     console.log(`currentMonthsFromCalendarEra: ${currentMonthsFromCalendarEra}`)
  //     activeAnimatedMonth.value = currentMonthsFromCalendarEra;
  //   },
  //   [startCalendarMonthsFromEra, endCalendarMonthsFromEra]
  // );
  // onScroll={scrollHandler}
  return (
    <Animated.ScrollView ref={ref} {...props} onScroll={scrollHandler}>
      {children}
    </Animated.ScrollView>
  );
});
