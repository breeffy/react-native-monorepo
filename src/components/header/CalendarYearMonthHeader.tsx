import { DateTime, Interval } from 'luxon';
import React, { useMemo } from 'react';
import {
  PointPropType,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  scrollTo,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue
} from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import { HeaderComponentWrapper } from './HeaderComponentWrapper';
import type { CalendarYearAndMonth } from '../../types';
import { useCalendarAnimated } from '../../hooks/useCalendarAnimated';
import { useCalendarInternal } from '../../hooks/useCalendarInternal';
import {
  calendarYearAndMonthToMonths,
  getIdFromCalendarYearAndMonth
} from '../../helpers';
import { useCalendarScroll } from '../../hooks/useCalendarScrollView';
import {
  getMonthInterpolateConfig,
  getYearInterpolateConfig,
  range
} from '../../utils';

interface CalendarMonthHeaderProps {
  width: number;
  height: number;
  yearAndMonth: CalendarYearAndMonth;
  monthFormatString?: string;
  yearFormatString?: string;
}

export const CalendarYearMonthHeader = ({
  width = 0,
  height = 50,
  yearAndMonth,
  monthFormatString = 'LLLL',
  yearFormatString = 'yyyy'
}: CalendarMonthHeaderProps) => {
  const {
    startCalendarYearAndMonth,
    endCalendarYearAndMonth
  } = useCalendarInternal();

  const monthsInCalendar = useMemoOne(() => {
    const start = DateTime.fromObject(startCalendarYearAndMonth).startOf(
      'month'
    );
    const end = DateTime.fromObject(endCalendarYearAndMonth).startOf('month');
    return Interval.fromDateTimes(start, end);
  }, [startCalendarYearAndMonth, endCalendarYearAndMonth]);

  const numOfMonths = useMemoOne(() => {
    return monthsInCalendar.toDuration('months').as('months');
  }, [monthsInCalendar]);

  // const allMonths = monthsInCalendar.toDuration('months').as('months');
  console.log(`!!!! monthsInCalendar has ${numOfMonths} months`);

  const {
    arrayOfFormattedYearAndMonths,
    arrayOfFormattedYears
  } = useMemoOne(() => {
    const setOfYears = new Set<string>();
    const formattedYearAndMonth = monthsInCalendar
      .splitBy({ months: 1 })
      .map((monthInterval, _) => {
        const monthDateTime = monthInterval.start;

        const textMonth = monthDateTime.toFormat(monthFormatString);
        const textYear = monthDateTime.toFormat(yearFormatString);
        setOfYears.add(textYear);

        return {
          textMonth,
          textYear
        } as const;
      });

    const listOfYears = [...setOfYears];
    return {
      arrayOfFormattedYearAndMonths: formattedYearAndMonth,
      arrayOfFormattedYears: listOfYears
    };
  }, [monthsInCalendar]);

  console.log(`formattedYears: ${JSON.stringify(arrayOfFormattedYears)}`);

  // const { scrollContentSize, scrollContentOffset } = useCalendarScroll();

  // const test = useDerivedValue(() => {
  //   console.log(
  //     `[CalendarYearMonthHeader] scrollContentOffset: ${JSON.stringify(
  //       scrollContentOffset.value
  //     )}`
  //   );
  //   return scrollContentOffset.value;
  //   // console.log({
  //   //   scrollContentSize: scrollContentSize.value,
  //   //   scrollContentOffset: scrollContentOffset.value
  //   // });
  // }, []);

  const {
    calendarAnimatedCommonEraMonth,
    calendarStartMonthFromCommonEra,
    calendarEndMonthFromCommonEra,
    calendarCurrentAnimatedMonthInYear,
    calendarAnimatedScrollProgress
  } = useCalendarAnimated();

  const monthInterpolateConfig = useMemoOne(() => {
    return getMonthInterpolateConfig(
      calendarYearAndMonthToMonths(startCalendarYearAndMonth),
      calendarYearAndMonthToMonths(endCalendarYearAndMonth),
      height
    );
  }, [height, startCalendarYearAndMonth, endCalendarYearAndMonth]);

  const yearInterpolateConfig = useMemoOne(() => {
    return getYearInterpolateConfig(
      calendarYearAndMonthToMonths(startCalendarYearAndMonth),
      calendarYearAndMonthToMonths(endCalendarYearAndMonth),
      height
    );
  }, [height, startCalendarYearAndMonth, endCalendarYearAndMonth]);

  // console.log(
  //   `yearInterpolateConfig: ${JSON.stringify(yearInterpolateConfig)}`
  // );

  const monthScrollToY = useDerivedValue(() => {
    console.log(
      `calendarAnimatedCommonEraMonth: ${calendarAnimatedCommonEraMonth.value}`
    );
    return interpolate(
      calendarAnimatedCommonEraMonth.value,
      ...monthInterpolateConfig
    );
  }, [monthInterpolateConfig]);

  const yearScrollToY = useDerivedValue(() => {
    return interpolate(
      calendarAnimatedCommonEraMonth.value,
      ...yearInterpolateConfig
    );
  }, [yearInterpolateConfig]);

  const monthScrollViewRef = useAnimatedRef();
  const yearScrollViewRef = useAnimatedRef();
  useDerivedValue(() => {
    console.log(
      `[CalendarYearMonthHeader] yearScrollToY: ${yearScrollToY.value}`
    );
    scrollTo(monthScrollViewRef, 0, monthScrollToY.value, false);
    scrollTo(yearScrollViewRef, 0, yearScrollToY.value, false);
  }, []);

  const style = useMemoOne<StyleProp<ViewStyle>>(
    () => ({
      // width: 200,
      height,
      flexDirection: 'column',
      flexGrow: 0,
      backgroundColor: 'red'
    }),
    [width, height]
  );

  const monthInitialContentOffset = useMemoOne<PointPropType>(() => {
    return {
      x: 0,
      y: monthScrollToY.value
    };
  }, []);

  const yearInitialContentOffset = useMemoOne<PointPropType>(() => {
    return {
      x: 0,
      y: yearScrollToY.value
    };
  }, []);

  return (
    <View
      style={{
        flexBasis: height,
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <Animated.ScrollView
        ref={monthScrollViewRef}
        style={style}
        bounces={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentOffset={monthInitialContentOffset}
      >
        {arrayOfFormattedYearAndMonths.map((formattedYearAndMonth) => {
          return (
            <HeaderComponentWrapper
              key={`${formattedYearAndMonth.textYear}-${formattedYearAndMonth.textMonth}`}
              // width={width}
              height={height}
            >
              <Text style={styles.text}>{formattedYearAndMonth.textMonth}</Text>
            </HeaderComponentWrapper>
          );
        })}

        {/* <Text style={styles.text}>{textMonth}</Text> */}
      </Animated.ScrollView>
      <Animated.ScrollView
        ref={yearScrollViewRef}
        style={style}
        bounces={false}
        showsVerticalScrollIndicator={false}
        // scrollEnabled={false}
        contentOffset={yearInitialContentOffset}
      >
        {arrayOfFormattedYears.map((formattedYear) => {
          return (
            <HeaderComponentWrapper
              key={formattedYear}
              // width={width}
              height={height}
            >
              <Text style={styles.text}>{formattedYear}</Text>
            </HeaderComponentWrapper>
          );
        })}

        {/* <Text style={styles.text}>{textMonth}</Text> */}
      </Animated.ScrollView>
    </View>
  );
};

// const { activeAnimatedMonth } = useCalendarInternal();

// useDerivedValue(() => {
//   console.log(
//     `[CalendarYearMonthHeader] activeAnimatedMonth: ${activeAnimatedMonth.value}`
//   );
// }, []);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 19,
    color: 'rgba(68, 82, 95, 0.9)',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: 'beige'
    // backgroundColor: 'rgba(250, 215, 101, 0.9)'
    // backgroundColor: 'orange'
  }
});
