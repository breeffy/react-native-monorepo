import { useMemo } from 'react';
import { DateTime, Interval } from 'luxon';
import type { CalendarYearAndMonth } from '../types/public';

export const useCalendarInterval = (
  start: CalendarYearAndMonth,
  end: CalendarYearAndMonth
) => {
  return useMemo(() => {
    const _start = DateTime.fromObject(start);
    const _end = DateTime.fromObject(end).plus({ month: 1 });

    return Interval.fromDateTimes(_start, _end);
  }, [start, end]);
};
