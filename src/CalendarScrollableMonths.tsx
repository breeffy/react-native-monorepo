import React, { forwardRef, useImperativeHandle } from 'react';
import { FlatList, FlatListProps, ListRenderItem } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useDerivedValue
} from 'react-native-reanimated';
import { useCallbackOne, useMemoOne } from 'use-memo-one';
import { getIdFromCalendarYearAndMonth } from './helpers';
import { useCalendarScroll } from './hooks/useCalendarScrollView';
import { useCalendarInternal } from './hooks/useCalendarInternal';
import { useCalendarAnimated } from './hooks';
import {
  CalendarPerformanceProps,
  ScrollState,
  windowWidth
} from './constants';
import { calculateScrollProgress } from './worklets';
import { round } from 'react-native-redash';
import { getStartOfEveryMonth } from './utils';
import { CalendarMonthWithContext } from './components/CalendarMonthWithContext';
import type { CalendarDate, CalendarYearAndMonth } from './types';
import type { CalendarProps } from './Calendar';
import type { CalendarDayKind } from './CalendarDay';

// @ts-expect-error
const AnimatedFlatList: typeof FlatList = Animated.createAnimatedComponent(
  // @ts-ignore
  FlatList
);

export interface CalendarScrollableMonthsProps {
  scrollMode: CalendarProps['scrollMode'];
  scrollModeDeceleration: FlatListProps<any>['decelerationRate'];
  activeCalendarDay: CalendarDate;
  selectedDates: CalendarDate[];
  performanceProps: CalendarProps['performanceProps'];
  onCalendarDayPress?: (day: CalendarDate, kind: CalendarDayKind) => void;
}

export const CalendarScrollableMonths = forwardRef<
  any,
  CalendarScrollableMonthsProps
>(
  (
    {
      scrollMode,
      scrollModeDeceleration,
      performanceProps = CalendarPerformanceProps
    },
    ref
  ) => {
    const scrollModeProps = useMemoOne<Partial<FlatListProps<any>>>(() => {
      if (scrollMode === 'oneMonth') {
        return {
          pagingEnabled: true
        };
      } else if (scrollMode === 'multipleMonths') {
        return {
          snapToInterval: windowWidth
        };
      } else {
        return {};
      }
    }, [scrollMode]);

    const { monthsBefore, calendarInterval } = useCalendarInternal();

    const {
      scrollRef,
      scrollHandler,
      scrollState,
      scrollContentOffset,
      scrollContentSize
    } = useCalendarScroll();

    // useImperativeHandle(ref, () => scrollRef.current);
    useImperativeHandle(ref, () => scrollRef);

    const {
      calendarAnimatedCommonEraMonth,
      calendarCurrentAnimatedMonthInYear,
      calendarAnimatedScrollProgress,
      calendarStartMonthFromCommonEra,
      calendarEndMonthFromCommonEra
    } = useCalendarAnimated();

    useDerivedValue(() => {
      if (scrollState.value !== ScrollState.UNDETERMINED) {
        calendarAnimatedCommonEraMonth.value = round(
          interpolate(
            scrollContentOffset.value.x,
            [0, scrollContentSize.value.width - windowWidth],
            [calendarStartMonthFromCommonEra, calendarEndMonthFromCommonEra],
            Extrapolate.CLAMP
          ),
          4
        );

        calendarCurrentAnimatedMonthInYear.value =
          calendarAnimatedCommonEraMonth.value % 12;

        calendarAnimatedScrollProgress.value = calculateScrollProgress(
          calendarAnimatedCommonEraMonth,
          [calendarStartMonthFromCommonEra, calendarEndMonthFromCommonEra]
        );
      }
    }, [calendarStartMonthFromCommonEra, calendarEndMonthFromCommonEra]);

    const calendarMonths = useMemoOne(() => {
      return getStartOfEveryMonth(calendarInterval).map<CalendarYearAndMonth>(
        (dt) => {
          return {
            year: dt.year,
            month: dt.month
          };
        }
      );
    }, [calendarInterval]);

    const renderItem = useCallbackOne<ListRenderItem<CalendarYearAndMonth>>(
      ({ item }) => {
        return <CalendarMonthWithContext calendarYearAndMonth={item} />;
      },
      []
    );

    const keyExtractor = useCallbackOne(
      (item: CalendarYearAndMonth, _: number) => {
        return getIdFromCalendarYearAndMonth(item);
      },
      []
    );

    const getItemLayout = useCallbackOne(
      (_: CalendarYearAndMonth[] | null | undefined, index: number) => {
        return {
          length: windowWidth,
          offset: windowWidth * index,
          index
        };
      },
      []
    );

    return (
      <AnimatedFlatList
        // @ts-ignore
        ref={scrollRef}
        // ref={scrollRef}
        data={calendarMonths}
        initialScrollIndex={monthsBefore}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={scrollModeDeceleration}
        initialNumToRender={performanceProps.initialNumToRender}
        windowSize={performanceProps.windowSize}
        maxToRenderPerBatch={performanceProps.maxToRenderPerBatch}
        scrollEventThrottle={performanceProps.scrollEventThrottle}
        onScroll={scrollHandler}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        {...scrollModeProps}
      />
    );
  }
);
