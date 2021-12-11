import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  runOnJS,
  useDerivedValue,
  useSharedValue
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  TapGestureHandler
} from 'react-native-gesture-handler';
import { DateTime } from 'luxon';
import { CalendarProvider } from './contexts/external';
import { CalendarInternalProvider } from './contexts/internal';
import { CalendarAnimatedProvider } from './contexts/animated';
import { CalendarDaysOfWeekHeader } from './components/CalendarDaysOfWeekHeader';
import { calendarYearAndMonthToMonths } from './helpers';
import { CalendarScrollableMonths } from './CalendarScrollableMonths';
import { calculateScrollProgress } from './worklets';
import { CalendarHeaderMonth } from './components/header/CalendarHeaderMonth';
import { CalendarHeaderYear } from './components/header/CalendarHeaderYear';
import { CalendarHeaderDecorator } from './components/header/CalendarHeaderDecorator';
import { CalendarDayKind } from './CalendarDay';
import { CalendarThemeProvider } from './contexts/theme';
import { useCalendarInterval, useSelectedDates } from './hooks';
import { CalendarThemeLight } from './themes';
import type { ForwardedRef } from 'react';
import type { FlatListProps } from 'react-native';
import type { FlatList as RNGestureHandlerFlatList } from 'react-native-gesture-handler';
import type { CalendarAnimatedContextInterface } from './contexts/animated';
import type {
  CalendarCurrentAnimatedMonthFromCommonEra,
  CalendarStartMonthFromCommonEra,
  CalendarEndMonthFromCommonEra,
  CalendarDate,
  CalendarKind,
  CalendarMethods,
  CalendarYearAndMonth,
  ViewStyleProp,
  CalendarSelectionMode,
  CalendarTheme,
  CalendarPerformanceProps,
  CalendarDisabledRange
} from './types';
import type { CalendarInternalContextInterface } from './contexts/internal';

// @ts-expect-error
const AnimatedTapGestureHandler: typeof TapGestureHandler =
  Animated.createAnimatedComponent(
    // @ts-ignore
    TapGestureHandler
  );

export type CalendarProps = {
  /**
   * Calendar kind (type).
   * @defaultValue `gregorian`
   */
  kind?: CalendarKind;

  /**
   * Initial month to be shown.
   * If not provided, year and month of current local datetime will be selected.
   */
  initialCalendarYearAndMonth?: CalendarYearAndMonth;

  /**
   * Initial selected dates.
   *
   * If `selectionMode` is `singleDay` only array with one date is allowed.
   *
   * If any date from this range falls into `disabledDateRanges` ranges,
   * it **becomes disabled** and **will not be selected**.
   * @defaultValue `[]`
   */
  initialSelectedDates?: CalendarDate[];

  /**
   * Ranges of dates which will be shown as **disabled**.
   * They appear with greyed color, unresponsive (can't be selected or unselected).
   *
   * If `startDateInclusive` is set as `undefined` all dates up until `endDateExclusive` **become disabled**.
   *
   * If `endDateExclusive` is set as `undefined` all dates after `startDateInclusive` (including this date) **become disabled**.
   *
   * If both `startDateInclusive` and `endDateExclusive` are set as `undefined` **all dates become disabled**.
   * @defaultValue `[]`
   */
  disabledDateRanges?: CalendarDisabledRange[];

  /**
   * Amount of months before initial year and month,
   * which will be shown in a calendar.
   * @defaultValue `50`
   */
  monthsBefore?: number;

  /**
   * Amount of months after initial year and month,
   * which will be shown in a calendar.
   * @defaultValue `50`
   */
  monthsAfter?: number;

  /**
   * How much days can be selected simultaneously.
   * @defaultValue `singleDay`
   */
  selectionMode?: CalendarSelectionMode;

  /**
   * If calendar has only one (last) selected date,
   * can we unselect it by tapping on this date?
   * @defaultValue `true`
   */
  allowDeselectLastSelectedDate?: boolean;

  /**
   * How much months can be scrolled over.
   * @defaultValue `multipleMonths`
   */
  scrollMode?: 'oneMonth' | 'multipleMonths' | 'anyOffset';

  /**
   * How quickly the calendar scrolling decelerates after the user lifts their finger.
   * @defaultValue `normal`
   */
  scrollModeDeceleration?: FlatListProps<any>['decelerationRate'];

  /**
   * Active (current) calendar day.
   * If provided, it will be highlighted in active color.
   *
   * If date falls into `disabledDateRanges` ranges,
   * it **becomes disabled** and **will not be active**.
   */
  activeCalendarDay?: CalendarDate;

  /**
   * Theme object to customize calendar appearance
   */
  theme?: CalendarTheme;

  /**
   * Properties to customize performance characteristics
   */
  performanceProps?: CalendarPerformanceProps;

  /**
   * Reference to internal animated FlatList
   */
  animatedFlatListRef?: ForwardedRef<RNGestureHandlerFlatList<any>>;

  /**
   * Callback is called when state of a day changes,
   * i.e. it's selected / unselected.
   *
   * **Note:** for `singleDay` selection mode day unselected by
   * other selected day is not notified.
   * You can understand it was unselected by checking
   * current `selectionMode`.
   */
  onDayStateChange?: (day: CalendarDate, kind: CalendarDayKind) => void;
} & ViewStyleProp;

export const Calendar = forwardRef<CalendarMethods, CalendarProps>(
  (
    {
      initialCalendarYearAndMonth: _initialCalendarYearAndMonth,
      initialSelectedDates = [],
      disabledDateRanges = [],
      monthsBefore = 50,
      monthsAfter = 50,
      selectionMode = 'singleDay',
      scrollMode = 'oneMonth',
      scrollModeDeceleration = 'normal',
      activeCalendarDay: _activeCalendarDay,
      allowDeselectLastSelectedDate = true,
      theme = CalendarThemeLight,
      performanceProps,
      style: _containerStyle,
      animatedFlatListRef,
      onDayStateChange
    }: CalendarProps,
    ref
  ) => {
    const [activeCalendarDay] = useMemo<[CalendarDate]>(() => {
      const nowTime = DateTime.local();
      return [
        _activeCalendarDay ?? {
          year: nowTime.year,
          month: nowTime.month,
          day: nowTime.day
        }
      ];
    }, [_activeCalendarDay]);

    const initialCalendarYearAndMonth = useMemo<CalendarYearAndMonth>(() => {
      const nowTime = DateTime.local();
      return (
        _initialCalendarYearAndMonth ?? {
          year: nowTime.year,
          month: nowTime.month
        }
      );
    }, [_initialCalendarYearAndMonth]);

    const [startCalendarYearAndMonth, endCalendarYearAndMonth] = useMemo<
      [CalendarYearAndMonth, CalendarYearAndMonth]
    >(() => {
      const currentYearAndMonth = DateTime.fromObject(
        initialCalendarYearAndMonth
      );
      const startDateTime = currentYearAndMonth
        .minus({ months: monthsBefore })
        .startOf('month');
      const endDateTime = currentYearAndMonth
        .plus({ months: monthsAfter })
        .startOf('month');

      const startYearAndMonth: CalendarYearAndMonth = {
        year: startDateTime.year,
        month: startDateTime.month
      };

      const endYearAndMonth: CalendarYearAndMonth = {
        year: endDateTime.year,
        month: endDateTime.month
      };
      return [startYearAndMonth, endYearAndMonth];
    }, [initialCalendarYearAndMonth, monthsBefore, monthsAfter]);

    const calendarInterval = useCalendarInterval(
      startCalendarYearAndMonth,
      endCalendarYearAndMonth
    );

    const [calendarStartMonthFromCommonEra, calendarEndMonthFromCommonEra] =
      useMemo<
        readonly [
          CalendarStartMonthFromCommonEra,
          CalendarEndMonthFromCommonEra
        ]
      >(() => {
        return [
          calendarYearAndMonthToMonths(startCalendarYearAndMonth),
          calendarYearAndMonthToMonths(endCalendarYearAndMonth)
        ] as const;
      }, [startCalendarYearAndMonth, endCalendarYearAndMonth]);

    const calendarAnimatedCommonEraMonth: CalendarCurrentAnimatedMonthFromCommonEra =
      useDerivedValue(() => {
        return (
          initialCalendarYearAndMonth.year * 12 +
          initialCalendarYearAndMonth.month
        );
      }, [initialCalendarYearAndMonth]);

    const calendarCurrentAnimatedMonthInYear = useDerivedValue(() => {
      return initialCalendarYearAndMonth.month;
    }, [initialCalendarYearAndMonth]);

    const calendarInitialScrollProgress = useMemo(() => {
      return runOnJS(calculateScrollProgress)(calendarAnimatedCommonEraMonth, [
        calendarStartMonthFromCommonEra,
        calendarEndMonthFromCommonEra
      ]) as unknown as number;
    }, [calendarStartMonthFromCommonEra, calendarEndMonthFromCommonEra]);

    const calendarAnimatedScrollProgress = useSharedValue(
      calendarInitialScrollProgress
    );

    const animatedContextVariables = useMemo<CalendarAnimatedContextInterface>(
      () => ({
        calendarAnimatedCommonEraMonth: calendarAnimatedCommonEraMonth,
        calendarCurrentAnimatedMonthInYear: calendarCurrentAnimatedMonthInYear,
        calendarAnimatedScrollProgress: calendarAnimatedScrollProgress,
        calendarStartMonthFromCommonEra: calendarStartMonthFromCommonEra,
        calendarEndMonthFromCommonEra: calendarEndMonthFromCommonEra
      }),
      [
        calendarAnimatedCommonEraMonth,
        calendarCurrentAnimatedMonthInYear,
        calendarAnimatedScrollProgress,
        calendarStartMonthFromCommonEra,
        calendarEndMonthFromCommonEra
      ]
    );

    const [selectedDates, isLastSelectedDate, selectDate, deselectDate] =
      useSelectedDates(selectionMode, initialSelectedDates);

    const onCalendarDayStateChange = useCallback(
      (day: CalendarDate, calendarKind: CalendarDayKind) => {
        if (calendarKind === CalendarDayKind.SELECTED) {
          selectDate(day);
          onDayStateChange?.(day, calendarKind);
        } else if (calendarKind === CalendarDayKind.DEFAULT) {
          deselectDate(day, allowDeselectLastSelectedDate);
          if (allowDeselectLastSelectedDate || !isLastSelectedDate) {
            onDayStateChange?.(day, calendarKind);
          }
        }
      },
      [
        allowDeselectLastSelectedDate,
        isLastSelectedDate,
        selectDate,
        deselectDate,
        onDayStateChange
      ]
    );

    useImperativeHandle(
      ref,
      () => ({
        select: selectDate,
        deselect: deselectDate
      }),
      [selectDate, deselectDate]
    );

    const contentWrapperRef = useRef<typeof AnimatedTapGestureHandler>(null);

    // const contentWrapperVariables = useMemo<ContentWrapperContextInterface>(
    //   () => ({
    //     contentWrapperRef: contentWrapperRef
    //   }),
    //   [contentWrapperRef]
    // );

    const internalContextVariables = useMemo<CalendarInternalContextInterface>(
      () => ({
        activeAnimatedMonth: calendarAnimatedCommonEraMonth,
        activeCalendarDay: activeCalendarDay,
        activeCalendarYearAndMonth: initialCalendarYearAndMonth,
        selectDate: selectDate,
        deselectDate: deselectDate,
        selectedDates: selectedDates,
        disabledDateRanges: disabledDateRanges,
        allowDeselectLastSelectedDate: allowDeselectLastSelectedDate,
        monthsBefore,
        monthsAfter,
        startCalendarYearAndMonth: startCalendarYearAndMonth,
        endCalendarYearAndMonth: endCalendarYearAndMonth,
        calendarInterval: calendarInterval,
        contentWrapperRef: contentWrapperRef,
        onCalendarDayStateChange: onCalendarDayStateChange
      }),
      [
        calendarAnimatedCommonEraMonth,
        activeCalendarDay,
        initialCalendarYearAndMonth,
        selectDate,
        deselectDate,
        selectedDates,
        disabledDateRanges,
        allowDeselectLastSelectedDate,
        monthsBefore,
        monthsAfter,
        startCalendarYearAndMonth,
        endCalendarYearAndMonth,
        calendarInterval,
        contentWrapperRef,
        onCalendarDayStateChange
      ]
    );

    const externalContextVariables = useMemo<CalendarMethods>(
      () => ({
        select: selectDate,
        deselect: deselectDate
      }),
      [selectDate, deselectDate]
    );

    const [calendarHeader] = useState(40);

    return (
      <GestureHandlerRootView style={theme.sheet}>
        <CalendarThemeProvider value={theme}>
          <CalendarProvider value={externalContextVariables}>
            <CalendarInternalProvider value={internalContextVariables}>
              <CalendarAnimatedProvider value={animatedContextVariables}>
                <CalendarHeaderDecorator style={styles.headerDecoratorStyle}>
                  <CalendarHeaderMonth
                    style={styles.headerMonthStyle}
                    height={calendarHeader}
                  />
                  <CalendarHeaderYear height={calendarHeader} />
                </CalendarHeaderDecorator>

                <CalendarDaysOfWeekHeader />
                <CalendarScrollableMonths
                  ref={animatedFlatListRef}
                  scrollMode={scrollMode}
                  scrollModeDeceleration={scrollModeDeceleration}
                  activeCalendarDay={activeCalendarDay}
                  selectedDates={selectedDates}
                  performanceProps={performanceProps}
                  onCalendarDayPress={onCalendarDayStateChange}
                />
              </CalendarAnimatedProvider>
            </CalendarInternalProvider>
          </CalendarProvider>
        </CalendarThemeProvider>
      </GestureHandlerRootView>
    );
  }
);

const styles = StyleSheet.create({
  headerDecoratorStyle: {
    marginBottom: 4,
    marginTop: 4
  },
  headerMonthStyle: { marginRight: 8 },
  gestureView: {
    flexGrow: 1
  }
});
