import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useDerivedValue
} from 'react-native-reanimated';
import { FlatList as RNGestureHandlerFlatList } from 'react-native-gesture-handler';
import { getIdFromCalendarYearAndMonth } from './helpers';
import { useCalendarScroll } from './hooks/useCalendarScrollView';
import { useCalendarInternal } from './hooks/useCalendarInternal';
import { useCalendarAnimated } from './hooks/useCalendarAnimated';
import {
  CalendarPerformanceProps,
  ScrollState,
  windowWidth
} from './constants';
import { calculateScrollProgress } from './worklets';
import { round } from 'react-native-redash';
import { getStartOfEveryMonth } from './utils';
import { CalendarMonthWithContext } from './components/CalendarMonthWithContext';
import type { FlatListProps, ListRenderItem } from 'react-native';
import type { CalendarDate, CalendarYearAndMonth } from './types/public';
import type { CalendarProps } from './Calendar';
import type { CalendarDayKind } from './CalendarDay';

// @ts-expect-error
const AnimatedFlatList: typeof RNGestureHandlerFlatList =
  Animated.createAnimatedComponent(
    // @ts-ignore
    RNGestureHandlerFlatList
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
    const scrollModeProps = useMemo<Partial<FlatListProps<any>>>(() => {
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

    const calendarMonths = useMemo(() => {
      return getStartOfEveryMonth(calendarInterval).map<CalendarYearAndMonth>(
        dt => {
          return {
            year: dt.year,
            month: dt.month
          };
        }
      );
    }, [calendarInterval]);

    const renderItem = useCallback<ListRenderItem<CalendarYearAndMonth>>(
      ({ item }) => {
        return <CalendarMonthWithContext calendarYearAndMonth={item} />;
      },
      []
    );

    const keyExtractor = useCallback(
      (item: CalendarYearAndMonth, _: number) => {
        return getIdFromCalendarYearAndMonth(item);
      },
      []
    );

    const getItemLayout = useCallback(
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
