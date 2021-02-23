import { DateTime, Interval } from 'luxon';
import { useMemoOne } from 'use-memo-one';
import type { CalendarYearAndMonth } from 'src/types';

export const useCalendarInterval = (
  start: CalendarYearAndMonth,
  end: CalendarYearAndMonth
) => {
  return useMemoOne(() => {
    const _start = DateTime.fromObject(start);
    const _end = DateTime.fromObject(end).plus({ month: 1 });

    return Interval.fromDateTimes(_start, _end);
  }, [start, end]);
};
