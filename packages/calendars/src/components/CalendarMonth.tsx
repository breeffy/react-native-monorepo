import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { DateTime, Interval } from 'luxon';
import { CalendarRow } from '../CalendarRow';
import { Constants } from '../constants';
import { NotCalendarWeek } from '../exceptions';
import {
  dateTimeArraysDifference,
  isCalendarDatesEqual,
  isCalendarWeek,
  isCalendarYearAndMonthEqual,
  monthContainsSomeDate
} from '../helpers';
import type {
  CalendarDate,
  CalendarYearAndMonth,
  CalendarDisabledRange
} from '../types';
import type { CalendarDayKind } from '../CalendarDay';

export interface CalendarMonthProps {
  calendarYearAndMonth: CalendarYearAndMonth;
  activeCalendarDay: CalendarDate;
  selectedDates: CalendarDate[];
  disabledDateRanges: CalendarDisabledRange[];
  onCalendarDayPress?: (day: CalendarDate, kind: CalendarDayKind) => void;
}

const CalendarMonthComponent = ({
  calendarYearAndMonth,
  activeCalendarDay,
  selectedDates,
  disabledDateRanges,
  onCalendarDayPress
}: CalendarMonthProps) => {
  // console.log(
  //   `[CalendarMonth] render: calendarYearAndMonth: ${JSON.stringify(
  //     calendarYearAndMonth
  //   )}`
  // );

  const daysInMonth = useMemo(() => {
    const dateTimeYearAndMonth = DateTime.fromObject(calendarYearAndMonth);
    const firstDay = dateTimeYearAndMonth.startOf('month');
    const lastDay = dateTimeYearAndMonth.endOf('month');

    const daysOfLastMonth = firstDay.weekday - 1;
    const daysOfNextMonth =
      Constants.CalendarRows * Constants.DaysInWeek -
      (dateTimeYearAndMonth.daysInMonth + daysOfLastMonth);

    const startDay = firstDay.minus({ days: daysOfLastMonth });
    const endDay = lastDay.plus({ days: daysOfNextMonth });
    return Interval.fromDateTimes(startDay, endDay);
  }, [calendarYearAndMonth]);

  const weeks = useMemo(() => {
    return daysInMonth.splitBy({ weeks: 1 }).map((weekInterval, weekIndex) => {
      const calendarWeek = weekInterval
        .splitBy({ days: 1 })
        .map(iv => iv.start)
        .map<CalendarDate>(dt => ({
          year: dt.year,
          month: dt.month,
          day: dt.day
        }));

      if (isCalendarWeek(calendarWeek)) {
        return {
          calendarWeekIndex: weekIndex,
          calendarWeek: calendarWeek
        } as const;
      } else {
        throw new NotCalendarWeek(
          `CalendarWeek requires to have exactly 7 days, 
           but CalendarDate[] has ${calendarWeek.length} days).`
        );
      }
    });
  }, [daysInMonth]);

  return (
    <View style={styles.container}>
      {weeks.map(week => {
        return (
          <CalendarRow
            style={styles.calendarRow}
            key={week.calendarWeekIndex}
            calendarWeek={week.calendarWeek}
            calendarYearAndMonth={calendarYearAndMonth}
            activeCalendarDay={activeCalendarDay}
            selectedDates={selectedDates}
            disabledDateRanges={disabledDateRanges}
            onCalendarDayPress={onCalendarDayPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8
  },
  calendarRow: {
    minHeight: 38,
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8
  }
});

export const CalendarMonth = memo(CalendarMonthComponent, (prev, next) => {
  const deletedDates = dateTimeArraysDifference(
    prev.selectedDates,
    next.selectedDates
  );

  const addedDates = dateTimeArraysDifference(
    next.selectedDates,
    prev.selectedDates
  );

  if (monthContainsSomeDate(next.calendarYearAndMonth, deletedDates)) {
    return false;
  } else if (monthContainsSomeDate(next.calendarYearAndMonth, addedDates)) {
    return false;
  }

  const isActiveCalendarDaysEqual = isCalendarDatesEqual(
    prev.activeCalendarDay,
    next.activeCalendarDay
  );
  if (!isActiveCalendarDaysEqual) {
    return false;
  }

  const isCalendarYearAndMonthsEqual = isCalendarYearAndMonthEqual(
    prev.calendarYearAndMonth,
    next.calendarYearAndMonth
  );
  if (!isCalendarYearAndMonthsEqual) {
    return false;
  }

  if (prev.onCalendarDayPress !== next.onCalendarDayPress) {
    return false;
  }

  return true;
});
